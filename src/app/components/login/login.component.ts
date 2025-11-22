import { Component, ChangeDetectionStrategy, output, inject, computed } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  i18n = inject(I18nService);
  loginRequest = output<string>();

  // Translated text signals
  title = computed(() => this.i18n.t('login.title'));
  subtitle = computed(() => this.i18n.t('login.subtitle'));
  previewText = computed(() => this.i18n.t('login.preview'));
  loginGoogleText = computed(() => this.i18n.t('login.loginWithGoogle'));
  loginXText = computed(() => this.i18n.t('login.loginWithX'));
  
  // Attribute names for the preview graph
  attrBreak = computed(() => this.i18n.t('login.attributes.break'));
  attrSlide = computed(() => this.i18n.t('login.attributes.slide'));
  attrHandTravel = computed(() => this.i18n.t('login.attributes.handTravel'));
  attrSpin = computed(() => this.i18n.t('login.attributes.spin'));
  attrPeak = computed(() => this.i18n.t('login.attributes.peak'));
  attrRapid = computed(() => this.i18n.t('login.attributes.rapid'));

  // Mock login event
  login(provider: string) {
    this.loginRequest.emit(provider);
  }
}
