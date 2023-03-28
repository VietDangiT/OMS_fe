import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsellingproductComponent } from './topsellingproduct.component';

describe('TopsellingproductComponent', () => {
  let component: TopsellingproductComponent;
  let fixture: ComponentFixture<TopsellingproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopsellingproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopsellingproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
