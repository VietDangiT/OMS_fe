import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReturnComponent } from './total-return.component';

describe('DonutChartComponent', () => {
  let component: TotalReturnComponent;
  let fixture: ComponentFixture<TotalReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
