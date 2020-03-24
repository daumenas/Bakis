import { TestBed } from '@angular/core/testing';

import { CityEventService } from './city-event.service';

describe('CityEventService', () => {
  let service: CityEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
