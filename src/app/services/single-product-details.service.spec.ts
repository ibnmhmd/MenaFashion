import { TestBed, inject } from '@angular/core/testing';

import { SingleProductDetailsService } from './single-product-details.service';

describe('SingleProductDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleProductDetailsService]
    });
  });

  it('should ...', inject([SingleProductDetailsService], (service: SingleProductDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
