import { newSpecPage } from '@stencil/core/testing';
import { MyHistory } from '../my-history';

describe('my-history', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyHistory],
      html: `<my-history></my-history>`,
    });
    expect(page.root).toEqualHtml(`
      <my-history>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-history>
    `);
  });
});
