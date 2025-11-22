import { Component, ChangeDetectionStrategy, output, inject, computed } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { HexagonGraphComponent } from '../hexagon-graph/hexagon-graph.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HexagonGraphComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  i18n = inject(I18nService);
  loginRequest = output<void>();

  // Translated text signals
  title = computed(() => this.i18n.t('login.title'));
  subtitle = computed(() => this.i18n.t('login.subtitle'));
  previewNoticeText = computed(() => this.i18n.t('login.previewNotice'));
  loginGoogleText = computed(() => this.i18n.t('login.loginWithGoogle'));
  loginXText = computed(() => this.i18n.t('login.loginWithX'));
  
  // Mock data for the preview graph
  mockData = {
    break: 85.5,
    slide: 12.8,
    handTravel: 11.2,
    spin: 9.3,
    peak: 14.1,
    rapid: 13.5
  };

  // Mock login event
  login() {
    this.loginRequest.emit();
  }
}