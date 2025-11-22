
import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  uid: string;
  displayName: string;
  provider: 'Google' | 'X';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  
  currentUser = signal<User | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserFromStorage();

      // Persist user to localStorage on change
      effect(() => {
        const user = this.currentUser();
        if (user) {
          localStorage.setItem('attributesUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('attributesUser');
        }
      });
    }
  }

  private loadUserFromStorage() {
    try {
      const userString = localStorage.getItem('attributesUser');
      if (userString) {
        this.currentUser.set(JSON.parse(userString));
      }
    } catch (e) {
      console.error('Error loading user from storage', e);
      this.currentUser.set(null);
    }
  }

  // Simulate login
  async loginWith(provider: 'Google' | 'X'): Promise<void> {
    // In a real app, this would redirect to an OAuth provider.
    // Here, we'll just create a mock user.
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const mockUser: User = {
      uid: `mock-${Date.now()}`,
      displayName: `Player-${provider}`,
      provider: provider
    };
    
    this.currentUser.set(mockUser);
  }

  async logout(): Promise<void> {
    this.currentUser.set(null);
  }
}
