import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLiveStreamComponent } from './member-live-stream.component';

describe('MemberLiveStreamComponent', () => {
  let component: MemberLiveStreamComponent;
  let fixture: ComponentFixture<MemberLiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberLiveStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberLiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
