import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelStockComponent } from './channel-stock.component';

describe('ChannelStockComponent', () => {
  let component: ChannelStockComponent;
  let fixture: ComponentFixture<ChannelStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
