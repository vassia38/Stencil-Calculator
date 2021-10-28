import { newE2EPage } from '@stencil/core/testing';

describe('my-board', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-board></my-board>');

    const element = await page.find('my-board');
    expect(element).toHaveClass('hydrated');
  });
});
