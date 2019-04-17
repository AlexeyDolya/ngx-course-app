import { NgModule } from '@angular/core';
import { ChartsComponent } from './charts.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
    declarations: [ChartsComponent],
    imports: [SharedModule, ChartsRoutingModule],
})
export class ChartsModule {}
