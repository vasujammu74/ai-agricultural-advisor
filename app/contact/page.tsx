'use client';

import { useState } from 'react';
import { Mail, User, MessageSquare, Send, Loader2, CheckCircle2, AlertCircle, Sprout, MapPin, Github, Users } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    setErrorMsg('');

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('contact_submissions')
          .insert({ name: name.trim(), email: email.trim(), message: message.trim() });
        if (error) throw new Error(error.message);
      } else {
        // No database — simulate success after a short delay.
        await new Promise((r) => setTimeout(r, 800));
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 md:py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge variant="secondary" className="mb-3 gap-1.5 bg-primary/10 text-primary">
          <Mail className="h-3.5 w-3.5" /> {t('nav.contact')}
        </Badge>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          {t('contact.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground md:text-lg">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        {/* Form */}
        <Card className="border-border/60">
          <CardContent className="p-6 md:p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">{t('contact.success')}</h2>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setStatus('idle')}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    {t('contact.name')}
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.namePh')}
                    required
                    autoComplete="name"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    {t('contact.email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.emailPh')}
                    required
                    autoComplete="email"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                    {t('contact.message')}
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.messagePh')}
                    required
                    rows={5}
                    className="resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMsg || t('contact.error')}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full gap-2 bg-primary text-base"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t('contact.submit')}
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Team info */}
        <div className="space-y-6">
          <Card className="border-border/60 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="font-display text-lg font-bold">{t('contact.teamTitle')}</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('contact.team')}
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Sprout className="h-4 w-4 text-primary" />
                  AI Agricultural Advisor
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  agriadvisor@project.edu
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  Department of Computer Science & Engineering
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Github className="h-4 w-4 text-primary" />
                  Final-Year Capstone Project
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardContent className="p-6">
              <h3 className="mb-3 font-display text-base font-bold">What you can ask</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Crop selection and best practices
                </li>
                <li className="flex items-start gap-2">
                  <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Pest and disease management
                </li>
                <li className="flex items-start gap-2">
                  <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Soil health and fertilizer guidance
                </li>
                <li className="flex items-start gap-2">
                  <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Irrigation and weather tips
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
