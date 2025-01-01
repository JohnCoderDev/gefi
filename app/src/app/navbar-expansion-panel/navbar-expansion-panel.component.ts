import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-expansion-panel',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './navbar-expansion-panel.component.html',
  styleUrl: './navbar-expansion-panel.component.scss'
})
export class NavbarExpansionPanelComponent {
  @Input() icon !: string;
  @Input() label !: string;
}
