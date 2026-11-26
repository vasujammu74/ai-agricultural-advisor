'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Send,
  Mic,
  Square,
  Volume2,
  VolumeX,
  Trash2,
  Bot,
  User,
  Loader2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  demo?: boolean;
  createdAt: string;
}

interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: { length: number; [i: number]: SpeechRecognitionResultLike };
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null;

  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };

  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export default function AssistantPage() {
  const { t, lang, language } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceSupported] = useState<boolean>(() => Boolean(getRecognitionCtor()));

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from Supabase.
  useEffect(() => {
    let active = true;

    (async () => {
      if (!isSupabaseConfigured) return;

      const { data } = await supabase
        .from('chat_messages')
        .select('id, role, content, created_at')
        .order('created_at', { ascending: true })
        .limit(50);

      if (active && data && data.length) {
        setMessages(
          data.map((d) => ({
            id: d.id as string,
            role: d.role as 'user' | 'assistant',
            content: d.content as string,
            createdAt: d.created_at as string,
          }))
        );
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Welcome message when empty.
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: t('assistant.welcome'),
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Auto-scroll on new messages.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const persist = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!isSupabaseConfigured) return;

    try {
      await supabase.from('chat_messages').insert({
        role,
        content,
        language: lang,
      });
    } catch {
      /* non-fatal */
    }
  }, [lang]);

  const send = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();

      if (!content || loading) return;

      setError(null);
      setInput('');

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      };

      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-8);

      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            language: lang,
            history: history.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        // Read the response as text before trying to parse JSON.
        const responseText = await res.text();

        let data: {
          answer?: string;
          demo?: boolean;
          error?: string;
          detail?: string;
        };

        try {
          data = JSON.parse(responseText);
        } catch {
          console.error(
            'Chat API returned a non-JSON response:',
            responseText.slice(0, 500)
          );

          throw new Error(
            `Chat server returned an invalid response (HTTP ${res.status}). Please check Netlify function logs.`
          );
        }

        if (!res.ok) {
          throw new Error(
            data?.error || `Request failed (${res.status})`
          );
        }

        const answer: string = data.answer || '';
        const demo: boolean = Boolean(data.demo);

        if (!answer) {
          throw new Error('The AI returned an empty response.');
        }

        const aiMsg: Message = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: answer,
          demo,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, aiMsg]);

        void persist('user', content);
        void persist('assistant', answer);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';

        setError(msg);

        setMessages((prev) => [
          ...prev,
          {
            id: `e-${Date.now()}`,
            role: 'assistant',
            content: t('assistant.error'),
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, loading, messages, lang, persist, t]
  );

  const toggleMic = useCallback(() => {
    const Ctor = getRecognitionCtor();

    if (!Ctor) {
      setError(t('assistant.voiceUnsupported'));
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    setError(null);

    const recognition = new Ctor();

    recognition.lang = language.bcp47;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (e: SpeechRecognitionEventLike) => {
      const transcript = e.results[e.resultIndex]?.[0]?.transcript || '';

      if (transcript.trim()) {
        send(transcript.trim());
      }
    };

    recognition.onerror = () => {
      setListening(false);
      setError(t('assistant.error'));
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, [listening, language.bcp47, send, t]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setSpeakingId(null);
  }, []);

  // Stop any audio on unmount.
  useEffect(() => {
    return () => {
      stopSpeaking();

      try {
        recognitionRef.current?.abort();
      } catch {
        /* ignore */
      }
    };
  }, [stopSpeaking]);

  const browserSpeak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setError('Spoken responses are not available in this browser.');
        setSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = language.bcp47;
      utter.rate = 0.95;
      utter.onend = () => setSpeakingId(null);
      utter.onerror = () => setSpeakingId(null);

      window.speechSynthesis.speak(utter);
    },
    [language.bcp47]
  );

  const speak = useCallback(
    async (msg: Message) => {
      if (speakingId === msg.id) {
        stopSpeaking();
        return;
      }

      stopSpeaking();
      setSpeakingId(msg.id);

      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: msg.content,
            language: lang,
          }),
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);

          audioRef.current = audio;

          audio.onended = () => {
            setSpeakingId(null);
            URL.revokeObjectURL(url);
          };

          audio.onerror = () => {
            setSpeakingId(null);
            URL.revokeObjectURL(url);
          };

          await audio.play();
          return;
        }

        if (res.status === 501) {
          browserSpeak(msg.content);
          return;
        }

        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `TTS failed (${res.status})`);
      } catch (err) {
        setSpeakingId(null);

        const msg2 = err instanceof Error ? err.message : 'TTS error';
        setError(msg2);
      }
    },
    [speakingId, lang, stopSpeaking, browserSpeak]
  );

  const clearChat = useCallback(async () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: t('assistant.welcome'),
        createdAt: new Date().toISOString(),
      },
    ]);

    stopSpeaking();

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('chat_messages')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');
      } catch {
        /* non-fatal */
      }
    }
  }, [t, stopSpeaking]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Bot className="h-6 w-6" />
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {t('assistant.title')}
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          {t('assistant.subtitle')}
        </p>

        <Badge variant="secondary" className="mt-3 gap-1.5 bg-secondary">
          {language.nativeLabel} · {language.label}
        </Badge>
      </div>

      <div className="flex h-[65vh] min-h-[460px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            {t('assistant.history')}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="gap-1.5 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            {t('assistant.clear')}
          </Button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="scrollbar-thin flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-background to-secondary/20 p-4"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent/20 text-accent-foreground'
                )}
              >
                {m.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>

              <div
                className={cn(
                  'group max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm',
                  m.role === 'user'
                    ? 'rounded-tr-sm bg-primary text-primary-foreground'
                    : 'rounded-tl-sm bg-card border border-border/60'
                )}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>

                {m.demo && (
                  <div className="mt-2 flex items-start gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    <Info className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>{t('assistant.demo')}</span>
                  </div>
                )}

                {m.role === 'assistant' && m.id !== 'welcome' && (
                  <button
                    type="button"
                    onClick={() => speak(m)}
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                    aria-label={
                      speakingId === m.id
                        ? t('assistant.stop')
                        : t('assistant.speak')
                    }
                  >
                    {speakingId === m.id ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5" />
                        {t('assistant.stop')}
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5" />
                        {t('assistant.speak')}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <Bot className="h-4 w-4" />
              </div>

              <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-border/60 bg-card px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                {t('assistant.thinking')}
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border/60 bg-card p-3">
          <div className="flex items-end gap-2">
            <Button
              type="button"
              size="icon"
              variant={listening ? 'destructive' : 'outline'}
              onClick={toggleMic}
              className={cn(
                'h-11 w-11 shrink-0 rounded-full',
                listening && 'animate-pulse-ring'
              )}
              aria-label={t('assistant.mic')}
              title={
                voiceSupported
                  ? t('assistant.mic')
                  : t('assistant.voiceUnsupported')
              }
              disabled={!voiceSupported && !listening}
            >
              {listening ? (
                <Square className="h-4 w-4" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={
                listening
                  ? t('assistant.listening')
                  : t('assistant.placeholder')
              }
              rows={1}
              className="min-h-[44px] max-h-32 flex-1 resize-none border-border/60 bg-background text-base"
              disabled={loading}
            />

            <Button
              type="button"
              size="icon"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="h-11 w-11 shrink-0 rounded-full bg-primary"
              aria-label={t('assistant.send')}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          {listening && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
              <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
              {t('assistant.listening')}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {voiceSupported
          ? t('assistant.mic')
          : t('assistant.voiceUnsupported')}
      </p>
    </div>
  );
}
