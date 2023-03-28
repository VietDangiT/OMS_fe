import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalestoreComponent } from './salestore.component';

describe('SalestoreComponent', () => {
  let component: SalestoreComponent;
  let fixture: ComponentFixture<SalestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
