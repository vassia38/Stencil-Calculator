import { newE2EPage } from '@stencil/core/testing';

describe('my-screen', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-screen></my-screen>');

    const element = await page.find('my-screen');
    expect(element).toHaveClass('hydrated');
  });
});
