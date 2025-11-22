import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-hexagon-graph',
  standalone: true,
  templateUrl: './hexagon-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HexagonGraphComponent {
  i18n = inject(I18nService);

  // Attribute values (0-15 for skills, 0-100 for break)
  break = input.required<number>();
  slide = input.required<number>();
  handTravel = input.required<number>();
  spin = input.required<number>();
  peak = input.required<number>();
  rapid = input.required<number>();

  // Translated attribute names for the graph labels
  attrBreak = computed(() => this.i18n.t('login.attributes.break'));
  attrSlide = computed(() => this.i18n.t('login.attributes.slide'));
  attrHandTravel = computed(() => this.i18n.t('login.attributes.handTravel'));
  attrSpin = computed(() => this.i18n.t('login.attributes.spin'));
  attrPeak = computed(() => this.i18n.t('login.attributes.peak'));
  attrRapid = computed(() => this.i18n.t('login.attributes.rapid'));

  readonly dataPolygonPoints = computed(() => {
    const values = [
      this.break() / 100,  // BREAK (normalized 0-1)
      this.slide() / 15,   // SLIDE (normalized 0-1)
      this.handTravel() / 15, // HAND TRAVEL (normalized 0-1)
      this.spin() / 15,    // SPIN (normalized 0-1)
      this.peak() / 15,    // PEAK (normalized 0-1)
      this.rapid() / 15,   // RAPID (normalized 0-1)
    ];

    const points = this.getHexagonPoints(values);
    return points.map(p => `${p.x},${p.y}`).join(' ');
  });

  private getHexagonPoints(values: number[]): Point[] {
    const center = { x: 100, y: 100 };
    const radius = 90;
    const points: Point[] = [];

    for (let i = 0; i < 6; i++) {
      const angle_deg = 60 * i - 90; // -90 to start from top
      const angle_rad = (Math.PI / 180) * angle_deg;
      const value = Math.max(0, Math.min(1, values[i] || 0)); // Clamp value between 0 and 1

      points.push({
        x: center.x + radius * value * Math.cos(angle_rad),
        y: center.y + radius * value * Math.sin(angle_rad),
      });
    }
    return points;
  }
}
