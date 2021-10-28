import { Component, h, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'my-board',
  styleUrl: 'my-board.css'
})
export class MyBoard {
  
  @Event() buttonClicked: EventEmitter;

  onButtonClicked(ev) {
    if (ev.target.matches("button")) {
      const btn = ev.target;
      this.buttonClicked.emit(btn);
    }
  };

  @Listen('keydown', { target: 'body' })
  handleKeyDown(ev: KeyboardEvent){
    console.log(ev.key);
    // if key is a numpad digit
    if(ev.which >= 96 && ev.which <= 105) {
      const numbers = document.querySelectorAll("button:not([data-action]), button[data-action='number']");
      for (let i = 0; i < numbers.length; ++i) {
        if (ev.which - 96 == parseInt(numbers[i].textContent)) {
          this.buttonClicked.emit(numbers[i]);
          return;
        }
      }
    }
    // if key is a numpad operator
    let keyType = {
	    "110": "button[data-action='decimal']",
	    "107": "button[data-action='add']",
	    "109": "button[data-action='subtract']",
	    "106": "button[data-action='multiply']",
	    "111": "button[data-action='divide']",
	    "13": "button[data-action='calculate']"
    }
    if (ev.which.toString() in keyType) {
      let key = document.querySelector(keyType[ev.which.toString()]);
      this.buttonClicked.emit(key);
    }
  }

  render() {
    return (
      <div class="board-wrapper" onClick={ev => this.onButtonClicked(ev)}>
        <div class="grid grid-3x3-wrapper">
          <button data-action="add">+</button>
          <button data-action = "subtract">-</button>
          <button data-action = "multiply">*</button>
        
          <button>7</button><button>8</button><button>9</button>
          <button>4</button><button>5</button><button>6</button>
          <button>1</button><button>2</button><button>3</button>
          <button>0</button>
          <button data-action = "decimal">.</button>
          <button id = "key_clear" data-action = "clear">C</button>
        </div>
        <div class = "grid grid-1x2-wrapper">
          <button data-action = "divide">/</button>
          <button id = "key_equal" data-action = "calculate">=</button>
        </div>
      </div>      
    );
  }

}
