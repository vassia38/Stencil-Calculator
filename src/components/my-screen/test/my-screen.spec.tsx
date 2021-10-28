import { newSpecPage } from '@stencil/core/testing';
import { MyScreen } from '../my-screen';

describe('my-screen', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyScreen],
      html: `<my-screen></my-screen>`,
    });
    expect(page.root).toEqualHtml(`
      <my-screen>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-screen>
    `);
  });
});
