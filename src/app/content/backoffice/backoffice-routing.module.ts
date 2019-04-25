import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';
import { DashboardModule } from './content/dashboard/dashboard.module';
import { UserSettingsModule } from './content/user-settings/user-settings.module';
import { EventsModule } from './content/events/events.module';

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
                loadChildren: () => UserSettingsModule,
            },
            {
                path: 'events',
                data: { state: 'events' },
                loadChildren: () => EventsModule,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BackoffficeRoutingModule {}
