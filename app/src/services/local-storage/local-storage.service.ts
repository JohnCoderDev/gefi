import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorage = window.localStorage;
  constructor() { }

  setValue(key: string, value: string): void {
    this.localStorage.setItem(key, value);
  }

  getValue(key: string): string | null {
    return this.localStorage.getItem(key)
  }

  removeValue(key: string): void {
    this.localStorage.removeItem(key);
  }

  clearStorage(): void {
    this.localStorage.clear();
  }
}
