import { newSpecPage } from '@stencil/core/testing';
import { MyBoard } from '../my-board';

describe('my-board', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyBoard],
      html: `<my-board></my-board>`,
    });
    expect(page.root).toEqualHtml(`
      <my-board>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-board>
    `);
  });
});
