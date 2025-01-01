import { Routes } from '@angular/router';
import { DashboardGainVsLossComponent } from './dashboard-gain-vs-loss/dashboard-gain-vs-loss.component';
import { InitialRegisterComponent } from './initial-register/initial-register.component';

export const routes: Routes = [

    { path: 'dashboard/GainVSLoss', component: DashboardGainVsLossComponent },
    { path: 'cadastros/inicial', component: InitialRegisterComponent },
    { path: '', redirectTo: '/dashboard/GainVSLoss', pathMatch: 'full' },
    { path: 'dashboard', redirectTo: '/dashboard/GainVSLoss', pathMatch: 'full' }
];
