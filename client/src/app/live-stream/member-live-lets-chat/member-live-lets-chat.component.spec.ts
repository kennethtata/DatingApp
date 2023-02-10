import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLiveLetsChatComponent } from './member-live-lets-chat.component';

describe('MemberLiveLetsChatComponent', () => {
  let component: MemberLiveLetsChatComponent;
  let fixture: ComponentFixture<MemberLiveLetsChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberLiveLetsChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberLiveLetsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
