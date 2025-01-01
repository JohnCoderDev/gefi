import { Component, Input, Optional } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar-button',
  imports: [MatIconModule, MatDividerModule],
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss'
})
export class NavbarButtonComponent {
  @Input() @Optional() icon !: string;
}
