import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { DarkThemeService } from '../../services/dark-theme/dark-theme.service';


@Component({
  selector: 'app-base-window',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, MatExpansionModule, NavbarComponent, RouterOutlet],
  templateUrl: './base-window.component.html',
  styleUrl: './base-window.component.scss'
})
export class BaseWindowComponent implements OnInit {
  usingDarkTheme !: boolean;
  constructor(private darkThemeService: DarkThemeService) { }

  ngOnInit(): void {
    this.darkThemeService.setCurrentPreferedTheme();
    this.usingDarkTheme = this.darkThemeService.isUsingDarkTheme();
  }

  toggleTheme(): void {
    this.darkThemeService.toggleTheme();
    this.usingDarkTheme = this.darkThemeService.isUsingDarkTheme();
  }
}
