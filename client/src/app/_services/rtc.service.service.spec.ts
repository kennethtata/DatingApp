import { TestBed } from '@angular/core/testing';

import { RtcServiceService } from './rtc.service.service';

describe('RtcServiceService', () => {
  let service: RtcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
