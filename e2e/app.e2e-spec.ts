import { BasuPage } from './app.po';

describe('basu App', function() {
  let page: BasuPage;

  beforeEach(() => {
    page = new BasuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
