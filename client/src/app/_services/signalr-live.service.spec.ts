import { TestBed } from '@angular/core/testing';

import { SignalrLiveService } from './signalr-live.service';

describe('SignalrLiveService', () => {
  let service: SignalrLiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrLiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
