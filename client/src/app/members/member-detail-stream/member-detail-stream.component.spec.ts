import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailStreamComponent } from './member-detail-stream.component';

describe('MemberDetailStreamComponent', () => {
  let component: MemberDetailStreamComponent;
  let fixture: ComponentFixture<MemberDetailStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberDetailStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberDetailStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
