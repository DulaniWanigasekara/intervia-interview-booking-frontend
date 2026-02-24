import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'slots',
    loadComponent: () =>
      import('./pages/slots/slots').then(m => m.SlotsComponent)
  },
  {
    path: 'my-booking',
    loadComponent: () =>
      import('./pages/my-booking/my-booking').then(m => m.MyBookingComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
