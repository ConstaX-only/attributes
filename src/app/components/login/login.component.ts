
import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import { HexagonGraphComponent } from '../hexagon-graph/hexagon-graph.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HexagonGraphComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  i18n = inject(I18nService);
  authService = inject(AuthService);

  loadingProvider = signal<'Google' | 'X' | null>(null);

  // Translated text signals
  title = computed(() => this.i18n.t('login.title'));
  subtitle = computed(() => this.i18n.t('login.subtitle'));
  previewNoticeText = computed(() => this.i18n.t('login.previewNotice'));
  loginGoogleText = computed(() => this.i18n.t('login.loginWithGoogle'));
  loginXText = computed(() => this.i18n.t('login.loginWithX'));
  loggingInText = computed(() => this.i18n.t('login.loggingIn'));
  
  // Mock data for the preview graph
  mockData = {
    break: 85.5,
    slide: 12.8,
    handTravel: 11.2,
    spin: 9.3,
    peak: 14.1,
    rapid: 13.5
  };

  async login(provider: 'Google' | 'X') {
    if (this.loadingProvider()) return;
    this.loadingProvider.set(provider);
    try {
      await this.authService.loginWith(provider);
    } catch (e) {
      console.error('Login failed', e);
    } finally {
      this.loadingProvider.set(null);
    }
  }
}
