import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSaleByChannelItemComponent } from './total-sale-by-channel-item.component';

describe('TotalSaleByChannelItemComponent', () => {
  let component: TotalSaleByChannelItemComponent;
  let fixture: ComponentFixture<TotalSaleByChannelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSaleByChannelItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSaleByChannelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
