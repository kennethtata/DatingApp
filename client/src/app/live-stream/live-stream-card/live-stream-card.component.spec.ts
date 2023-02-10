import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamCardComponent } from './live-stream-card.component';

describe('LiveStreamCardComponent', () => {
  let component: LiveStreamCardComponent;
  let fixture: ComponentFixture<LiveStreamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveStreamCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveStreamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
