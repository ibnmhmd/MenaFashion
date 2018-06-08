import { ShopKSKPage } from './app.po';

describe('shop-ksk App', () => {
  let page: ShopKSKPage;

  beforeEach(() => {
    page = new ShopKSKPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
