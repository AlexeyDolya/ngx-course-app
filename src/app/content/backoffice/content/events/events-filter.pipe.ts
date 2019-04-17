import { Pipe, PipeTransform } from '@angular/core';
import { IPeriodicElement } from './events.component';

@Pipe({
    name: 'eventsFilter',
})
export class EventsFilterPipe implements PipeTransform {
    public transform(events: IPeriodicElement[], search: string): IPeriodicElement[] {
        if (!search) {
            return events;
        }
        return events.filter((event: IPeriodicElement) => {
            return event.name
                .trim()
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }
}
