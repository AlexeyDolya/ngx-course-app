import { DashboardComponent } from './content/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsComponent } from './content/user-settings/user-settings.component';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { state: 'dashboard' }
      },
      {
        path: 'user',
        component: UserSettingsComponent,
        data: { state: 'user' }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackoffficeRoutingModule { }
