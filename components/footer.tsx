'use client';

import Link from 'next/link';
import { Sprout, Mail, Github, Heart } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sprout className="h-4 w-4" />
              </span>
              AI Agricultural Advisor
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              {t('nav.home')}
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-primary">
              {t('nav.services')}
            </Link>
            <Link href="/assistant" className="text-muted-foreground hover:text-primary">
              {t('nav.assistant')}
            </Link>
            <Link href="/detect" className="text-muted-foreground hover:text-primary">
              {t('nav.detect')}
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary">
              {t('nav.contact')}
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {year} AI Agricultural Advisor. {t('footer.rights')}
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" /> for farmers
          </p>
        </div>
      </div>
    </footer>
  );
}
