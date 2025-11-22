import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { translations } from './translations';

export type Language = 'en' | 'ko' | 'ja';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private platformId = inject(PLATFORM_ID);

  availableLangs: Language[] = ['en', 'ko', 'ja'];
  
  currentLang = signal<Language>('en');

  private dictionary = computed(() => translations[this.currentLang()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.setInitialLanguage();
    }
  }

  private setInitialLanguage() {
    const browserLang = navigator.language.split('-')[0] as Language;
    if (this.availableLangs.includes(browserLang)) {
      this.currentLang.set(browserLang);
    } else {
      this.currentLang.set('en'); // Default to English
    }
  }

  setLanguage(lang: Language) {
    if (this.availableLangs.includes(lang)) {
        this.currentLang.set(lang);
    }
  }

  t(key: string, substitutions?: Record<string, string>): string {
    const keys = key.split('.');
    let result: any = this.dictionary();
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return key if translation not found
      }
    }

    let resultString = String(result);

    if (substitutions) {
        Object.keys(substitutions).forEach(subKey => {
            resultString = resultString.replace(`{{${subKey}}}`, substitutions[subKey]);
        });
    }

    return resultString;
  }
}
