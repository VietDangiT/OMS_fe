import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatisticComponent } from './item-statistic.component';

describe('ItemStatisticComponent', () => {
  let component: ItemStatisticComponent;
  let fixture: ComponentFixture<ItemStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
