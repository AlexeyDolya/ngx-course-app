import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { EventsFilterPipe } from './events-filter.pipe';
import { SharedModule } from '../../../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventsReducer } from './store/reducers/events.reducer';
import { eventsEffects } from './store/effects';

@NgModule({
    declarations: [EventsComponent, EventsFilterPipe],
    imports: [
        SharedModule,
        EventsRoutingModule,
        StoreModule.forFeature('events', eventsReducer),
        EffectsModule.forFeature(eventsEffects),
    ],
})
export class EventsModule {}
