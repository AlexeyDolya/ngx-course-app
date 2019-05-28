import { EventsFilterPipe } from './events-filter.pipe';
import { INotify } from '../../../../store/reducers/notify.reducer';

const mockedEvents: INotify[] = [
    {
        status: false,
        title: 'Message 1',
        text: 'Vue js',
        dateSend: new Date(),
        _id: '1',
    },
    {
        status: false,
        title: 'Message 1',
        text: 'Angular js',
        dateSend: new Date(),
        _id: '2',
    },
    {
        status: false,
        title: 'Message 1',
        text: 'React js',
        dateSend: new Date(),
        _id: '3',
    },
];

describe('Events filter', () => {
    let eventsFilterPipe: EventsFilterPipe;
    beforeEach(() => {
        eventsFilterPipe = new EventsFilterPipe();
    });

    it('Should filter', () => {
        expect(eventsFilterPipe.transform(mockedEvents, 'ang').length).toEqual(1);
    });
});
