import { TestBed, inject } from '@angular/core/testing';

import { CouponCodeService } from './coupon-code.service';

describe('CouponCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CouponCodeService]
    });
  });

  it('should ...', inject([CouponCodeService], (service: CouponCodeService) => {
    expect(service).toBeTruthy();
  }));
});
