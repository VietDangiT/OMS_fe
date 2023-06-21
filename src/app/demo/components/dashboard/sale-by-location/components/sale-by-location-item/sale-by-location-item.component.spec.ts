import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByLocationItemComponent } from './sale-by-location-item.component';

describe('SaleByLocationItemComponent', () => {
  let component: SaleByLocationItemComponent;
  let fixture: ComponentFixture<SaleByLocationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleByLocationItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleByLocationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
