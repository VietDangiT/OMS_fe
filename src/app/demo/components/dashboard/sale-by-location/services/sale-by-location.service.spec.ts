import { TestBed } from '@angular/core/testing';

import { SaleByLocationService } from './sale-by-location.service';

describe('SaleByLocationService', () => {
  let service: SaleByLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleByLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
