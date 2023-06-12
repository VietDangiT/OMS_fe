import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSaleChartComponent } from './total-sale-chart.component';

describe('TotalsalechartComponent', () => {
  let component: TotalSaleChartComponent;
  let fixture: ComponentFixture<TotalSaleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalSaleChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalSaleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
