import { Component, Input, Optional } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-button',
  imports: [MatIconModule, MatDividerModule, RouterLink],
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss'
})
export class NavbarButtonComponent {
  @Input() @Optional() link !: string;
  @Input() @Optional() icon !: string;
}
