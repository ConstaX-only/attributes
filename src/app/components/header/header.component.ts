import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { I18nService, Language } from '../../i18n/i18n.service';
import { computed } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  i18n = inject(I18nService);

  title = computed(() => this.i18n.t('header.title'));

  changeLang(lang: Language) {
    this.i18n.setLanguage(lang);
  }
}
