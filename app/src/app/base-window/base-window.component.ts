import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-base-window',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, MatExpansionModule, NavbarComponent, RouterOutlet],
  templateUrl: './base-window.component.html',
  styleUrl: './base-window.component.scss'
})
export class BaseWindowComponent implements OnInit {
  useDarkTheme = true;

  ngOnInit(): void {
    const isDarkMode = window.localStorage.getItem('useDarkMode');
    this.useDarkTheme = isDarkMode === 'y';
    this.saveCurrentThemePreference();
  }

  toggleTheme(): void {
    this.useDarkTheme = !this.useDarkTheme;
    this.saveCurrentThemePreference();
  }

  private saveCurrentThemePreference(): void {
    window.localStorage.setItem('useDarkMode', this.useDarkTheme ? 'y' : 'n');
  }
}
