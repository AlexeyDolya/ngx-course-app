import { Pipe, PipeTransform } from '@angular/core';
import { INotify } from '../../../../store/reducers/notify.reducer';

@Pipe({
    name: 'eventsFilter',
})
export class EventsFilterPipe implements PipeTransform {
    public transform(events: INotify[], search: string): INotify[] {
        if (!search) {
            return events;
        }
        return events.filter((event: INotify) => {
            return event.text
                .trim()
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }
}
