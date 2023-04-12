import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmsTableComponent } from './oms-table.component';

describe('OmsTableComponent', () => {
  let component: OmsTableComponent;
  let fixture: ComponentFixture<OmsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
