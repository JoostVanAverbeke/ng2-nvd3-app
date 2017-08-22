import { Ng3Nvd3AppPage } from './app.po';

describe('ng3-nvd3-app App', () => {
  let page: Ng3Nvd3AppPage;

  beforeEach(() => {
    page = new Ng3Nvd3AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
