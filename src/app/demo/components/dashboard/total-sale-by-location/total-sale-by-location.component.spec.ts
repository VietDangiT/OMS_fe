import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSaleByLocationComponent } from './total-sale-by-location.component';

describe('TotalSaleByLocationComponent', () => {
  let component: TotalSaleByLocationComponent;
  let fixture: ComponentFixture<TotalSaleByLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSaleByLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSaleByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
