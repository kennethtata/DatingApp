import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStreamComponent } from './member-stream.component';

describe('MemberStreamComponent', () => {
  let component: MemberStreamComponent;
  let fixture: ComponentFixture<MemberStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
