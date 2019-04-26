import { TestBed } from '@angular/core/testing';

import { EventsGuardService } from './events-guard.service';

describe('EventsGuardService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: EventsGuardService = TestBed.get(EventsGuardService);
        expect(service).toBeTruthy();
    });
});
