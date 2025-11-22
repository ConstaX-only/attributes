import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import { MaimaiData } from '../../maimai-data.model';
import { I18nService } from '../../i18n/i18n.service';
import { HexagonGraphComponent } from '../hexagon-graph/hexagon-graph.component';

interface Attributes {
  break: number;
  slide: number;
  handTravel: number;
  spin: number;
  peak: number;
  rapid: number;
}

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [HexagonGraphComponent],
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
  logoutText = computed(() => this.i18n.t('graph.logout'));
  resetText = computed(() => this.i18n.t('graph.reset'));

  // Placeholder logic to calculate attributes from data
  attributes = computed<Attributes>(() => {
    const songs = this.data().songs;
    if (!songs || songs.length === 0) {
      return { break: 0, slide: 0, handTravel: 0, spin: 0, peak: 0, rapid: 0 };
    }

    // This is placeholder logic. The final version will be more complex.
    const avgBreak = songs.reduce((acc, s) => acc + s.breakRatio, 0) / songs.length;
    const avgAchievement = songs.reduce((acc, s) => acc + s.achievement, 0) / songs.length;
    
    // Create some variance for the graph. These are just mock calculations.
    const base = Math.max(0, (avgAchievement - 97) * 2); // Base score from 0-6 for achievements > 97%

    return {
      break: Math.min(100, avgBreak),
      slide: Math.min(15, base + 3 + Math.random() * 4),
      handTravel: Math.min(15, base + 2 + Math.random() * 5),
      spin: Math.min(15, base + 1 + Math.random() * 6),
      peak: Math.min(15, base + 4 + Math.random() * 3),
      rapid: Math.min(15, base + 2 + Math.random() * 4)
    };
  });
}