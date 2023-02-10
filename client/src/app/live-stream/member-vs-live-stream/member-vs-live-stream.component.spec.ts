import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVSLiveStreamComponent } from './member-vs-live-stream.component';

describe('MemberVSLiveStreamComponent', () => {
  let component: MemberVSLiveStreamComponent;
  let fixture: ComponentFixture<MemberVSLiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberVSLiveStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberVSLiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
