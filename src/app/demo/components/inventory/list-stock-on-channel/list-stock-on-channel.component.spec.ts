import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockOnChannelComponent } from './list-stock-on-channel.component';

describe('ListStockOnChannelComponent', () => {
  let component: ListStockOnChannelComponent;
  let fixture: ComponentFixture<ListStockOnChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStockOnChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStockOnChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
