import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOnChannelComponent } from './sale-on-channel.component';

describe('SaleOnChannelComponent', () => {
  let component: SaleOnChannelComponent;
  let fixture: ComponentFixture<SaleOnChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleOnChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleOnChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
