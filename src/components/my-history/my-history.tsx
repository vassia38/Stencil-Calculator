import { Component, h, State, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-history',
  styleUrl: 'my-history.css'
})
export class MyHistory {

  @State()
  historyList = [];

  @Event() entryClicked: EventEmitter;

  @Listen("newHistoryEntry", { target: 'body' })
  newHistoryEntryHandler(event: CustomEvent) {
    const entry = event.detail;
    console.log(event.detail);
    this.historyList = [...this.historyList, entry];
  }
  private createExprString = (entry) => {
    let { first, second, op, res } = entry;
    if (op == "add") return first + "+" + second + "=" + res;
    if (op == "subtract") return first + "-" + second + "=" + res;
    if (op == "multiply") return first + "*" + second + "=" + res;
    if (op == "divide") return first + "/" + second + "=" + res;
  }

  render() {
    return (
      <div class="history-wrapper" onClick={(event) => {
        this.entryClicked.emit(event);
      }}>
        { this.historyList.map((entry) =>
          <p data-value={entry.res}>{this.createExprString(entry)}</p>
          )
        }
      </div>
    );
  }

}
