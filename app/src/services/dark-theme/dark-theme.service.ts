import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {
  private usingDarkTheme: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  setDarkTheme(): void {
    this.localStorageService.setValue('usingDarkTheme', 'y');
    this.usingDarkTheme = true;
    const htmlElement = document.querySelector('html');
    htmlElement?.classList.remove('light-theme');
    htmlElement?.classList.add('dark-theme');
  }

  unsetDarkTheme(): void {
    this.localStorageService.setValue('usingDarkTheme', 'n');
    this.usingDarkTheme = false;
    const htmlElement = document.querySelector('html');
    htmlElement?.classList.remove('dark-theme');
    htmlElement?.classList.add('light-theme');
  }

  setCurrentPreferedTheme(): void {
    if (this.usingDarkTheme) {
      this.setDarkTheme();
    } else {
      this.unsetDarkTheme();
    }
  }

  isUsingDarkTheme(): boolean {
    this.usingDarkTheme = this.localStorageService.getValue('usingDarkTheme') === 'y';
    return this.usingDarkTheme;
  }

  toggleTheme(): void {
    if (this.usingDarkTheme) {
      this.unsetDarkTheme();
    } else {
      this.setDarkTheme();
    }
  }
}
