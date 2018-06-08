import { TestBed, inject } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistService]
    });
  });

  it('should ...', inject([WishlistService], (service: WishlistService) => {
    expect(service).toBeTruthy();
  }));
});
