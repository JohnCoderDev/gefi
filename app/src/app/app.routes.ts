import { Routes } from '@angular/router';
import { DashboardGainVsLossComponent } from './dashboard-gain-vs-loss/dashboard-gain-vs-loss.component';
import { InitialRegisterComponent } from './initial-register/initial-register.component';
import { CurrencyRegisterComponent } from './currency-register/currency-register.component';
import { MovementRegisterComponent } from './movement-register/movement-register.component';

export const routes: Routes = [

    { path: 'dashboard/GainVSLoss', component: DashboardGainVsLossComponent },
    { path: 'cadastros/inicial', component: InitialRegisterComponent },
    { path: 'cadastros/moedas', component: CurrencyRegisterComponent },
    { path: 'cadastros/movimentacoes', component: MovementRegisterComponent },
    { path: '', redirectTo: '/cadastros/movimentacoes', pathMatch: 'full' },
    { path: 'dashboard', redirectTo: '/dashboard/GainVSLoss', pathMatch: 'full' }
];
