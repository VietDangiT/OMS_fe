import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSaleByChannelComponent } from './total-sale-by-channel.component';

describe('TotalSaleByLocationComponent', () => {
  let component: TotalSaleByChannelComponent;
  let fixture: ComponentFixture<TotalSaleByChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSaleByChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSaleByChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
