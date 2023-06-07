import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByChannelHeatmapComponent } from './sale-by-channel-heatmap.component';

describe('SaleByChannelComponent', () => {
  let component: SaleByChannelHeatmapComponent;
  let fixture: ComponentFixture<SaleByChannelHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleByChannelHeatmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleByChannelHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
