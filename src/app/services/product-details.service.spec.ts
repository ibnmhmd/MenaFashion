import { TestBed, inject } from '@angular/core/testing';

import { ProductDetailsService } from './product-details.service';

describe('ProductDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailsService]
    });
  });

  it('should ...', inject([ProductDetailsService], (service: ProductDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
