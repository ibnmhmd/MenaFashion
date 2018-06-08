import { TestBed, inject } from '@angular/core/testing';

import { AddProductCartService } from './add-product-cart.service';

describe('GetCartIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProductCartService]
    });
  });

  it('should ...', inject([AddProductCartService], (service: AddProductCartService) => {
    expect(service).toBeTruthy();
  }));
});
