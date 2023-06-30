import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesChannelPerformanceComponent } from './sales-channel-performance.component';

describe('SalesChannelPerformanceComponent', () => {
  let component: SalesChannelPerformanceComponent;
  let fixture: ComponentFixture<SalesChannelPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesChannelPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesChannelPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
