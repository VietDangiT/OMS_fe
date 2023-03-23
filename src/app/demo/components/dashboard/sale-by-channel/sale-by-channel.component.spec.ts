import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByChannelComponent } from './sale-by-channel.component';

describe('SaleByChannelComponent', () => {
  let component: SaleByChannelComponent;
  let fixture: ComponentFixture<SaleByChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleByChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleByChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
