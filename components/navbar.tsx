'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sprout, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useLanguage } from '@/components/language-provider';
import { LANGUAGES, LanguageCode } from '@/lib/languages';
import type { TranslationKey } from '@/lib/translations';
import { cn } from '@/lib/utils';

const NAV: { href: string; key: TranslationKey }[] = [
  { href: '/', key: 'nav.home' },
  { href: '/services', key: 'nav.services' },
  { href: '/assistant', key: 'nav.assistant' },
  { href: '/detect', key: 'nav.detect' },
  { href: '/contact', key: 'nav.contact' },
];

export function Navbar() {
  const { t, lang, language, setLang } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleLangChange = (code: LanguageCode) => setLang(code);

  const LanguagePicker = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={mobile ? 'ghost' : 'outline'}
          size="sm"
          className={cn('gap-1.5', mobile && 'w-full justify-start')}
        >
          <Globe className="h-4 w-4" />
          <span>{language.nativeLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? 'start' : 'end'} className="w-44">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => handleLangChange(l.code)}
            className={cn('justify-between', lang === l.code && 'font-semibold')}
          >
            <span>{l.nativeLabel}</span>
            <span className="text-xs text-muted-foreground">{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="hidden text-base font-bold tracking-tight sm:inline">
            AI Agricultural Advisor
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground'
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguagePicker />
          <Button asChild size="sm" className="bg-primary">
            <Link href="/assistant">{t('cta.getStarted')}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguagePicker />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex h-16 items-center justify-between border-b px-4">
                <span className="flex items-center gap-2 font-bold">
                  <Sprout className="h-5 w-5 text-primary" />
                  Menu
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                {NAV.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent/40'
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="mt-3 bg-primary">
                    <Link href="/assistant">{t('cta.getStarted')}</Link>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
