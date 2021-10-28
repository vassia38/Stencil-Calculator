import { newE2EPage } from '@stencil/core/testing';

describe('my-history', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-history></my-history>');

    const element = await page.find('my-history');
    expect(element).toHaveClass('hydrated');
  });
});
