import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTotalBoxComponent } from './sale-total-box.component';

describe('SaleTotalBoxComponent', () => {
  let component: SaleTotalBoxComponent;
  let fixture: ComponentFixture<SaleTotalBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleTotalBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleTotalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
