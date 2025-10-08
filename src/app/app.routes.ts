import { Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/acceso', pathMatch: 'full' },
  { path: 'acceso', component: AccessComponent },
  { path: 'fotos-de-las-fotos', component: BookComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/acceso' }
];
