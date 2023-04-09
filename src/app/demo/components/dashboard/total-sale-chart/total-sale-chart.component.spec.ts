import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsalechartComponent } from './total-sale-chart.component';

describe('TotalsalechartComponent', () => {
  let component: TotalsalechartComponent;
  let fixture: ComponentFixture<TotalsalechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalsalechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalsalechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
