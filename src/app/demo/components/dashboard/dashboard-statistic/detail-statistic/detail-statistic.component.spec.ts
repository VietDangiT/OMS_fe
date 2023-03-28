import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStatisticComponent } from './detail-statistic.component';

describe('DetailStatisticComponent', () => {
  let component: DetailStatisticComponent;
  let fixture: ComponentFixture<DetailStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
