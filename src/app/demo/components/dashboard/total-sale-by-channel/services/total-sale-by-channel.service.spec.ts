import { TestBed } from '@angular/core/testing';

import { TotalSaleByChannelService } from './total-sale-by-channel.service';

describe('TotalSaleByChannelService', () => {
  let service: TotalSaleByChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalSaleByChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
