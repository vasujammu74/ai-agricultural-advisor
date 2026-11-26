'use client';

import Link from 'next/link';
import {
  Sprout,
  Mic,
  Camera,
  Languages,
  Leaf,
  ArrowRight,
  MessageSquareText,
  Volume2,
  ShieldCheck,
  Wheat,
  Sun,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function HeroIllustration() {
  return (
    <div className="relative aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-accent/20 to-earth-light/40" />
      <div className="absolute inset-3 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm" />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full p-8"
        role="img"
        aria-label="Farmer in a field"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="100%" stopColor="#dcfce7" />
          </linearGradient>
          <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#3f6212" />
          </linearGradient>
          <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#sky)" rx="28" />
        <circle cx="320" cy="80" r="36" fill="#fde68a" opacity="0.9" />
        <circle cx="320" cy="80" r="48" fill="#fef3c7" opacity="0.4" />
        {/* hills */}
        <path d="M0 250 Q100 200 200 240 T400 230 V400 H0 Z" fill="#86efac" opacity="0.8" />
        <path d="M0 290 Q120 250 240 280 T400 270 V400 H0 Z" fill="url(#field)" />
        <rect y="360" width="400" height="40" fill="url(#soil)" rx="0" />
        {/* crop rows */}
        {[40, 100, 160, 220, 280, 340].map((x) => (
          <g key={x}>
            <path d={`M${x} 300 L${x} 380`} stroke="#365314" strokeWidth="2" opacity="0.5" />
            <circle cx={x} cy="298" r="4" fill="#a3e635" />
            <circle cx={x} cy="320" r="3" fill="#84cc16" />
          </g>
        ))}
        {/* farmer */}
        <g transform="translate(150 150)">
          <ellipse cx="50" cy="190" rx="60" ry="10" fill="#000" opacity="0.1" />
          {/* body */}
          <path d="M30 110 Q50 70 70 110 L78 185 H22 Z" fill="#1f6b3a" />
          {/* head */}
          <circle cx="50" cy="70" r="20" fill="#d4a574" />
          {/* turban */}
          <path d="M30 64 Q50 30 70 64 Q66 50 50 48 Q34 50 30 64 Z" fill="#f59e0b" />
          <path d="M32 60 Q50 40 68 60" stroke="#d97706" strokeWidth="2" fill="none" />
          {/* arms */}
          <path d="M30 115 Q10 140 18 175" stroke="#d4a574" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M70 115 Q90 135 82 168" stroke="#d4a574" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* smile */}
          <path d="M44 76 Q50 80 56 76" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="45" cy="70" r="2" fill="#78350f" />
          <circle cx="55" cy="70" r="2" fill="#78350f" />
        </g>
        {/* floating speech bubbles */}
        <g className="animate-float">
          <rect x="240" y="150" width="120" height="58" rx="14" fill="white" opacity="0.95" />
          <path d="M250 200 L240 215 L262 200 Z" fill="white" opacity="0.95" />
          <circle cx="265" cy="175" r="6" fill="#1f6b3a" />
          <circle cx="285" cy="175" r="6" fill="#65a30d" />
          <circle cx="305" cy="175" r="6" fill="#a3e635" />
          <rect x="255" y="186" width="90" height="6" rx="3" fill="#d1d5db" />
        </g>
        <g className="animate-float-slow">
          <rect x="40" y="60" width="90" height="44" rx="12" fill="white" opacity="0.95" />
          <path d="M120 80 L132 76 L120 92 Z" fill="white" opacity="0.95" />
          <path d="M52 78 Q62 70 72 78" stroke="#1f6b3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M72 78 L78 73" stroke="#1f6b3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <rect x="52" y="88" width="66" height="5" rx="2.5" fill="#e5e7eb" />
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageSquareText,
      title: t('home.feature1Title'),
      desc: t('home.feature1Desc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Camera,
      title: t('home.feature2Title'),
      desc: t('home.feature2Desc'),
      color: 'bg-accent/15 text-accent-foreground',
    },
    {
      icon: Volume2,
      title: t('home.feature3Title'),
      desc: t('home.feature3Desc'),
      color: 'bg-earth/15 text-earth',
    },
  ];

  const steps = [
    { icon: Mic, title: t('home.step1'), desc: t('home.step1Desc') },
    { icon: MessageSquareText, title: t('home.step2'), desc: t('home.step2Desc') },
    { icon: Leaf, title: t('home.step3'), desc: t('home.step3Desc') },
  ];

  const stats = [
    { value: '5', label: t('home.statsLanguages'), icon: Languages },
    { value: '100%', label: t('home.statsFarmers'), icon: Sprout },
    { value: 'AI', label: t('home.statsDiseases'), icon: Camera },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-radial">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container relative mx-auto max-w-6xl px-4 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="animate-fade-up space-y-6">
              <Badge
                variant="secondary"
                className="gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-primary"
              >
                <Sprout className="h-3.5 w-3.5" />
                {t('home.badge')}
              </Badge>
              <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
                AI Agricultural <span className="text-primary">Advisor</span>
              </h1>
              <p className="text-xl font-semibold text-foreground/80">{t('home.tagline')}</p>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('home.intro')}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-12 gap-2 rounded-full px-7 text-base">
                  <Link href="/assistant">
                    {t('cta.getStarted')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 rounded-full px-7 text-base"
                >
                  <Link href="/services">{t('cta.learnMore')}</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-3 divide-x divide-border/60">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-7 text-center">
                <s.icon className="mb-1 h-5 w-5 text-primary" />
                <div className="font-display text-2xl font-bold text-primary md:text-3xl">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3 gap-1.5 bg-accent/15 text-accent-foreground">
            <Leaf className="h-3.5 w-3.5" /> Features
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Farming help, the way you prefer it
          </h2>
          <p className="mt-3 text-muted-foreground">
            Voice, text, or photo — choose what works for you and get practical guidance in your
            language.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group relative overflow-hidden border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-7">
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${f.color}`}
                >
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </CardContent>
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 gap-1.5 bg-earth/15 text-earth">
              <Sun className="h-3.5 w-3.5" /> 3 steps
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t('home.howTitle')}
            </h2>
          </div>
          <div className="relative grid gap-8 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-border/60 md:block" />
            {steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                  <s.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary to-[#2d8a4f] text-primary-foreground">
          <CardContent className="relative z-10 flex flex-col items-center gap-6 p-10 text-center md:p-16">
            <ShieldCheck className="h-10 w-10" />
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Ready to grow smarter?
            </h2>
            <p className="max-w-xl text-primary-foreground/85">
              Ask your first question in your language, or check a sick plant with a photo. It only
              takes a moment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2 rounded-full bg-background px-7 text-base text-primary hover:bg-background/90"
              >
                <Link href="/assistant">
                  <Mic className="h-4 w-4" />
                  {t('cta.tryAssistant')}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 rounded-full border-primary-foreground/40 px-7 text-base text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/detect">
                  <Camera className="h-4 w-4" />
                  {t('cta.detectDisease')}
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Multilingual
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Voice & text
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Image analysis
              </span>
            </div>
          </CardContent>
          <Wheat className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-primary-foreground/10" />
          <Leaf className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 text-primary-foreground/10" />
        </Card>
      </section>
    </div>
  );
}
