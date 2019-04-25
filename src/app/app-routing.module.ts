import { AuthGuardService } from './shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeModule } from './content/backoffice/backoffice.module';
import { LoginModule } from './content/login/login.module';
import { SignupModule } from './content/signup/signup.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => LoginModule,
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    loadChildren: () => SignupModule,
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
