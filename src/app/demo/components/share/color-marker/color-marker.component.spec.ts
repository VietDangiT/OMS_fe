import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorMarkerComponent } from './color-marker.component';

describe('ColorMarkerComponent', () => {
  let component: ColorMarkerComponent;
  let fixture: ComponentFixture<ColorMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorMarkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
