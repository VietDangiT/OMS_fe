import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByLocationComponent } from './sale-by-location.component';

describe('SaleByLocationComponent', () => {
  let component: SaleByLocationComponent;
  let fixture: ComponentFixture<SaleByLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleByLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
