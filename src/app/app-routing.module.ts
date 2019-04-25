import { AuthGuardService } from './shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeModule } from './content/backoffice/backoffice.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './content/login/login.module#LoginModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    loadChildren: './content/signup/signup.module#SignupModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'backoffice',
    loadChildren: () => BackofficeModule,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'backoffice',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
