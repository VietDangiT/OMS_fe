import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleStoreComponent } from './sale-store.component';

describe('SalestoreComponent', () => {
  let component: SaleStoreComponent;
  let fixture: ComponentFixture<SaleStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
