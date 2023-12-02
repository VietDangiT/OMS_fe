import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OMSChartComponent } from './oms-chart.component';

describe('ChartComponent', () => {
  let component: OMSChartComponent;
  let fixture: ComponentFixture<OMSChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OMSChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OMSChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
