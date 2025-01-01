import { Component } from '@angular/core';
import { BaseWindowComponent } from './base-window/base-window.component';

@Component({
  selector: 'app-root',
  imports: [BaseWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GEFI';
}
