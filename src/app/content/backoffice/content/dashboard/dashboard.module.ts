import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { NgForGridDirective } from './ng-for-grid.directive';
import { SharedModule } from '../../../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effectsArr } from './store/effects';
import { dashboardReducer } from './store/reducers/dashboard.reducer';
import { CardComponent } from './card/card.component';
import { CardModalComponent } from './card-modal/card-modal.component';

@NgModule({
    declarations: [DashboardComponent, NgForGridDirective, CardComponent, CardModalComponent],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        StoreModule.forFeature('dashboard', dashboardReducer),
        EffectsModule.forFeature(effectsArr),
    ],
    exports: [CardModalComponent],
    entryComponents: [CardModalComponent],
})
export class DashboardModule {}
