import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-base-window',
  imports: [MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, MatExpansionModule, NavbarComponent],
  templateUrl: './base-window.component.html',
  styleUrl: './base-window.component.scss'
})
export class BaseWindowComponent { }
