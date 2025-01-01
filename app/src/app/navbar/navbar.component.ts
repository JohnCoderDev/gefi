import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { NavbarExpansionPanelComponent } from '../navbar-expansion-panel/navbar-expansion-panel.component';

@Component({
  selector: 'app-navbar',
  imports: [MatSidenavModule, MatExpansionModule, NavbarButtonComponent, NavbarExpansionPanelComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
}
