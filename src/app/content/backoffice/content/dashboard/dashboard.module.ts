import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { NgForGridDirective } from './ng-for-grid.directive';
import { SharedModule } from '../../../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effectsArr } from './store/effects';
import { dashboardReducer } from './store/reducers/dashboard.reducer';

@NgModule({
    declarations: [DashboardComponent, NgForGridDirective],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        StoreModule.forFeature('dashboard', dashboardReducer),
        EffectsModule.forFeature(effectsArr),
    ],
})
export class DashboardModule {}
