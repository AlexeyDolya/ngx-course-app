import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { EventsFilterPipe } from './events-filter.pipe';
import { SharedModule } from '@shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
    declarations: [EventsComponent, EventsFilterPipe],
    imports: [SharedModule, EventsRoutingModule],
})
export class EventsModule {}
