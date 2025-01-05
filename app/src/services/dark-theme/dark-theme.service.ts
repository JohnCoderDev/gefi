import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {
  constructor(private localStorageService: LocalStorageService) { }

  setDarkTheme(): void {
    this.localStorageService.setValue('usingDarkTheme', 'y');
    const htmlElement = document.querySelector('html');
    htmlElement?.classList.remove('light-theme');
    htmlElement?.classList.add('dark-theme');
  }

  unsetDarkTheme(): void {
    this.localStorageService.setValue('usingDarkTheme', 'n');
    const htmlElement = document.querySelector('html');
    htmlElement?.classList.remove('dark-theme');
    htmlElement?.classList.add('light-theme');
  }

  setCurrentPreferedTheme(): void {
    if (this.isUsingDarkTheme()) {
      this.setDarkTheme();
    } else {
      this.unsetDarkTheme();
    }
  }

  isUsingDarkTheme(): boolean {
    return this.localStorageService.getValue('usingDarkTheme') === 'y';
  }

  toggleTheme(): void {
    if (this.isUsingDarkTheme()) {
      this.unsetDarkTheme();
    } else {
      this.setDarkTheme();
    }
  }
}
