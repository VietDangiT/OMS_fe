import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTotalOrdersComponent } from './total-orders.component';

describe('TotalSalesComponent', () => {
  let component: DashboardTotalOrdersComponent;
  let fixture: ComponentFixture<DashboardTotalOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTotalOrdersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTotalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
