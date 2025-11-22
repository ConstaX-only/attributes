import { Component, ChangeDetectionStrategy, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './app/components/header/header.component';
import { LoginComponent } from './app/components/login/login.component';
import { ImportComponent } from './app/components/import/import.component';
import { GraphComponent } from './app/components/graph/graph.component';
import { MaimaiData } from './app/maimai-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, LoginComponent, ImportComponent, GraphComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  isLoggedIn = signal(false);
  maimaiData = signal<MaimaiData | null>(null);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkForData();

      window.addEventListener('storage', (event) => {
        if (event.key === 'maimaiDxAttributesData' && event.newValue) {
          this.checkForData();
        }
      });
    }
  }

  checkForData() {
    try {
      const dataString = localStorage.getItem('maimaiDxAttributesData');
      if (dataString) {
        const data = JSON.parse(dataString) as MaimaiData;
        this.maimaiData.set(data);
      } else {
        this.maimaiData.set(null);
      }
    } catch (e) {
      console.error('Error reading maimai data from localStorage', e);
      this.maimaiData.set(null);
    }
  }

  handleLogin() {
    // In a real app, this would involve an auth service.
    // For now, we simulate a successful login.
    this.isLoggedIn.set(true);
  }

  handleLogout() {
    this.isLoggedIn.set(false);
    this.maimaiData.set(null);
    if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('maimaiDxAttributesData');
    }
  }
  
  handleResetData() {
    this.maimaiData.set(null);
    if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('maimaiDxAttributesData');
    }
  }
}
