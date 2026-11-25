import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { InicioComponent } from './inicio/inicio';
import { PleitosComponent } from './pleitos/pleitos';
import { PersonasComponent } from './personas/personas';
import { EvidenciasComponent } from './evidencias/evidencias';
import { HistorialComponent } from './historial/historial';

import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pleitos',
    component: PleitosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'personas',
    component: PersonasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'evidencias',
    component: EvidenciasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];




