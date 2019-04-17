import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { NgForGridDirective } from './ng-for-grid.directive';
import { SharedModule } from '../../../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    declarations: [DashboardComponent, NgForGridDirective],
    imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
