import { TestBed, inject } from '@angular/core/testing';

import { CategoryListProductService } from './category-list-product.service';

describe('CategoryListProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryListProductService]
    });
  });

  it('should ...', inject([CategoryListProductService], (service: CategoryListProductService) => {
    expect(service).toBeTruthy();
  }));
});
