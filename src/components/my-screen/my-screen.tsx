import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-screen',
  styleUrl: 'my-screen.css'
})
export class MyScreen {
  @Prop({ attribute: 'content', reflect: true })
  content = '0';

  render() {
    return (
      <div class="screen-wrapper">
        {this.content}
      </div>
    );
  }

}
