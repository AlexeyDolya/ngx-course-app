import { EventsFilterPipe } from './events-filter.pipe';

describe('EventsFilterPipe', () => {
    it('create an instance', () => {
        const pipe: EventsFilterPipe = new EventsFilterPipe();
        expect(pipe).toBeTruthy();
    });
});
