import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoFieldComponent } from './user-info-field.component';

describe('UserInfoFieldComponent', () => {
  let component: UserInfoFieldComponent;
  let fixture: ComponentFixture<UserInfoFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
