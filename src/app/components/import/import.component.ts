import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-import',
  standalone: true,
  templateUrl: './import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportComponent {
  private sanitizer = inject(DomSanitizer);
  i18n = inject(I18nService);

  bookmarkletHref: SafeUrl;

  readonly rawBookmarkletCode = computed(() => `(function(){console.log('[attributes] Scraping maimai DX data...');const mockData={playerName:'PLAYER-1',playCount:1234,songs:[{title:'Garakuta Doll Play',difficulty:'MASTER',achievement:100.5123,breakRatio:98.2},{title:'Oshama Scramble!',difficulty:'MASTER',achievement:99.8456,breakRatio:95.1},{title:'Our Wrenally',difficulty:'EXPERT',achievement:100.9111,breakRatio:99.9},{title:'Last Samurai',difficulty:'MASTER',achievement:97.5321,breakRatio:90.0},{title:'Caliburne ~Story of the Legendary sword~',difficulty:'RE:MASTER',achievement:100.0010,breakRatio:100.0}]};try{localStorage.setItem('maimaiDxAttributesData',JSON.stringify(mockData));alert('${this.i18n.t('bookmarklet.success')}');}catch(e){alert('${this.i18n.t('bookmarklet.error')}');console.error('[attributes] Bookmarklet error:',e);}})();`);

  // Translated text signals
  title = computed(() => this.i18n.t('import.title'));
  step1Title = computed(() => this.i18n.t('import.step1.title'));
  step1Desc = computed(() => this.i18n.t('import.step1.description'));
  step1Btn = computed(() => this.i18n.t('import.step1.button'));
  step2Title = computed(() => this.i18n.t('import.step2.title'));
  step2Desc = computed(() => this.i18n.t('import.step2.description'));
  step2Link = computed(() => this.i18n.t('import.step2.link'));
  step3Title = computed(() => this.i18n.t('import.step3.title'));
  step3Desc = computed(() => this.i18n.t('import.step3.description'));
  
  constructor() {
    this.bookmarkletHref = this.sanitizer.bypassSecurityTrustUrl(`javascript:${this.rawBookmarkletCode()}`);
  }
}
