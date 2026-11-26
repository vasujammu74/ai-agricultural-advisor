'use client';

import Link from 'next/link';
import {
  MessageSquareText,
  Mic,
  Microscope,
  Languages,
  Camera,
  ArrowRight,
  Leaf,
  Volume2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TranslationKey } from '@/lib/translations';
import { LANGUAGES } from '@/lib/languages';

export default function ServicesPage() {
  const { t } = useLanguage();

  const services: {
    icon: typeof MessageSquareText;
    titleKey: TranslationKey;
    descKey: TranslationKey;
    href: string;
    color: string;
    features: { en: string[]; te: string[]; hi: string[]; ta: string[]; kn: string[] };
  }[] = [
    {
      icon: MessageSquareText,
      titleKey: 'services.assistantTitle',
      descKey: 'services.assistantDesc',
      href: '/assistant',
      color: 'from-primary/15 to-primary/5 text-primary',
      features: {
        en: ['Ask by text or voice', 'Get practical answers', 'Chat history saved'],
        te: ['టెక్స్ట్/స్వరం', 'ఆచరణీయ సమాధానాలు', 'చరిత్ర భద్రం'],
        hi: ['टेक्स्ट/आवाज़', 'व्यावहारिक उत्तर', 'इतिहास सहेजा'],
        ta: ['உரை/குரல்', 'நடைமுறை பதில்கள்', 'வரலாறு சேமி'],
        kn: ['ಪಠ್ಯ/ಧ್ವನಿ', 'ಪ್ರಾಯೋಗಿಕ ಉತ್ತರ', 'ಇತಿಹಾಸ ಉಳಿಸಿ'],
      },
    },
    {
      icon: Mic,
      titleKey: 'services.voiceTitle',
      descKey: 'services.voiceDesc',
      href: '/assistant',
      color: 'from-earth/15 to-earth/5 text-earth',
      features: {
        en: ['Tap mic to speak', 'No typing needed', 'Hands-free guidance'],
        te: ['మైక్ నొక్కి మాట్లాడండి', 'టైప్ అవసరం లేదు', 'చేతుల స్వేచ్ఛ'],
        hi: ['माइक दबाकर बोलें', 'टाइपिंग नहीं', 'हाथों से आज़ाद'],
        ta: ['மைக் அழுத்தி பேசுங்கள்', 'தட்டச்சு இல்லை', 'கைகள் சுதந்திரம்'],
        kn: ['ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ', 'ಟೈಪ್ ಬೇಡ', 'ಕೈಗಳ ಸ್ವಾತಂತ್ರ್ಯ'],
      },
    },
    {
      icon: Microscope,
      titleKey: 'services.diseaseTitle',
      descKey: 'services.diseaseDesc',
      href: '/detect',
      color: 'from-destructive/10 to-destructive/5 text-destructive',
      features: {
        en: ['Upload or capture photo', 'Disease identification', 'Treatment advice'],
        te: ['ఫోటో అప్‌లోడ్/క్యాప్చర్', 'వ్యాధి గుర్తింపు', 'చికిత్స సలహా'],
        hi: ['फोटो अपलोड/कैप्चर', 'रोग पहचान', 'इलाज सलाह'],
        ta: ['புகைப்படம் பதிவேற்று/எடு', 'நோய் கண்டறிதல்', 'சிகிச்சை ஆலோசனை'],
        kn: ['ಫೋಟೋ ಅಪ್‌ಲೋಡ್/ಕ್ಯಾಪ್ಚರ್', 'ರೋಗ ಪತ್ತೆ', 'ಚಿಕಿತ್ಸೆ ಸಲಹೆ'],
      },
    },
    {
      icon: Languages,
      titleKey: 'services.multiTitle',
      descKey: 'services.multiDesc',
      href: '/assistant',
      color: 'from-sky/15 to-sky/5 text-sky',
      features: {
        en: ['5 Indian languages', 'Voice + text', 'Pick your language'],
        te: ['5 భారతీయ భాషలు', 'స్వరం + టెక్స్ట్', 'మీ భాష ఎంచుకోండి'],
        hi: ['5 भारतीय भाषाएँ', 'आवाज़ + टेक्स्ट', 'भाषा चुनें'],
        ta: ['5 இந்திய மொழிகள்', 'குரல் + உரை', 'மொழி தேர்ந்தெடுங்கள்'],
        kn: ['5 ಭಾರತೀಯ ಭಾಷೆಗಳು', 'ಧ್ವನಿ + ಪಠ್ಯ', 'ಭಾಷೆ ಆಯ್ಕೆ'],
      },
    },
    {
      icon: Camera,
      titleKey: 'services.imageTitle',
      descKey: 'services.imageDesc',
      href: '/detect',
      color: 'from-accent/15 to-accent/5 text-accent-foreground',
      features: {
        en: ['Kindwise AI engine', 'Plant identification', 'Health analysis'],
        te: ['Kindwise AI ఇంజిన్', 'మొక్క గుర్తింపు', 'ఆరోగ్య విశ్లేషణ'],
        hi: ['Kindwise AI इंजन', 'पौधा पहचान', 'स्वास्थ्य विश्लेषण'],
        ta: ['Kindwise AI இயந்திரம்', 'தாவர அடையாளம்', 'ஆரோக்கிய ஆய்வு'],
        kn: ['Kindwise AI ಎಂಜಿನ್', 'ಸಸ್ಯ ಗುರುತಿಸುವಿಕೆ', 'ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ'],
      },
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge variant="secondary" className="mb-3 gap-1.5 bg-primary/10 text-primary">
          <Leaf className="h-3.5 w-3.5" /> {t('nav.services')}
        </Badge>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          {t('services.title')}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground md:text-lg">
          {t('services.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Card
            key={i}
            className="group relative flex flex-col overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="flex flex-1 flex-col p-6">
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color}`}
              >
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold">{t(s.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(s.descKey)}
              </p>

              <ul className="mt-4 space-y-1.5">
                {s.features.en.map((_, fi) => (
                  <li
                    key={fi}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{s.features.en[fi]}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 group-hover:border-primary group-hover:text-primary"
                >
                  <Link href={s.href}>
                    {t('services.try')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Languages card */}
        <Card className="relative flex flex-col overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="flex flex-1 flex-col p-6">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky/15 text-sky">
              <Languages className="h-7 w-7" />
            </div>
            <h3 className="font-display text-xl font-bold">{t('services.multiTitle')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t('services.multiDesc')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <Badge
                  key={l.code}
                  variant="secondary"
                  className="gap-1 bg-background text-sm"
                >
                  <span className="font-bold text-primary">{l.flag}</span>
                  {l.nativeLabel}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How it works strip */}
      <div className="mt-14 rounded-2xl border border-border/60 bg-secondary/30 p-8">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Powered by
            </div>
            <h2 className="font-display text-2xl font-bold">Best-in-class AI, in one app</h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              OpenAI / Sarvam AI for farming answers and multilingual speech, Kindwise for plant
              identification and disease detection, and the Web Speech API for voice input — all
              secured server-side.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="gap-1">
                <Volume2 className="h-3 w-3" /> Sarvam TTS
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Camera className="h-3 w-3" /> Kindwise
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Mic className="h-3 w-3" /> Web Speech API
              </Badge>
            </div>
          </div>
          <Button asChild size="lg" className="gap-2 rounded-full bg-primary">
            <Link href="/assistant">
              {t('cta.tryAssistant')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
