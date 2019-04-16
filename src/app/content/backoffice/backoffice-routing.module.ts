import { DashboardComponent } from './content/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './content/user-settings/user-settings.component';
import { BackofficeComponent } from './backoffice.component';
import { ChartsComponent } from './content/charts/charts.component';
import { EventsComponent } from './content/events/events.component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { state: 'dashboard' },
            },
            {
                path: 'user',
                component: UserSettingsComponent,
                data: { state: 'user' },
            },
            {
                path: 'charts',
                component: ChartsComponent,
                data: { state: 'charts' },
            },
            {
                path: 'events',
                component: EventsComponent,
                data: { state: 'events' },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BackoffficeRoutingModule {}
