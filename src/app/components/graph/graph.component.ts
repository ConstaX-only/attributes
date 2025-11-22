import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import { MaimaiData } from '../../maimai-data.model';
import { I18nService } from '../../i18n/i18n.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent {
  i18n = inject(I18nService);
  
  data = input.required<MaimaiData>();
  
  logout = output();
  resetData = output();

  // Translated text signals
  title = computed(() => this.i18n.t('graph.title'));
  welcomeText = computed(() => this.i18n.t('graph.welcome'));
  playSummaryText = computed(() => this.i18n.t('graph.playSummary', { playCount: this.data().playCount.toString() }));
  viewGraphText = computed(() => this.i18n.t('graph.viewGraph'));
  logoutText = computed(() => this.i18n.t('graph.logout'));
  resetText = computed(() => this.i18n.t('graph.reset'));
}