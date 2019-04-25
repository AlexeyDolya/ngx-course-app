import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { DashboardModule } from './content/dashboard/dashboard.module';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        children: [
            {
                path: '',
                data: { state: 'dashboard' },
                loadChildren: () => DashboardModule,
            },
            {
                path: 'user',
                data: { state: 'user' },
                loadChildren: './content/user-settings/user-settings.module#UserSettingsModule',
            },
            {
                path: 'events',
                data: { state: 'events' },
                loadChildren: './content/events/events.module#EventsModule',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BackoffficeRoutingModule {}
