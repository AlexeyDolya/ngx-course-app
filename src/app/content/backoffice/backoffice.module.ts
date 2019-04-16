import { HttpClientModule } from '@angular/common/http';
import { BackofficeComponent } from './backoffice.component';
import { NgModule } from '@angular/core';
import { BackoffficeRoutingModule } from './backoffice-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserSettingsComponent } from './content/user-settings/user-settings.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { NgForGridDirective } from './content/dashboard/ng-for-grid.directive';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        BackofficeComponent,
        HeaderComponent,
        SidebarComponent,
        UserSettingsComponent,
        DashboardComponent,
        NgForGridDirective,
    ],
    imports: [SharedModule, BackoffficeRoutingModule, HttpClientModule],
})
export class BackofficeModule {}
