import { Component, h, State, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'my-calculator',
  styleUrl: 'my-calculator.css'
})

export class MyCalculator {
  @State()
  displayedText = "0";
  myDataset= {
      firstValue: '',
      operator: '',
      modValue: '',
      previousKeyType: '',
      expString: ''
    }

  @Event({ eventName: "newHistoryEntry" }) newHistoryEntry: EventEmitter;

  @Listen('buttonClicked')
  buttonClickedHandler(event: CustomEvent) {
    console.log(event.detail);
    const btn = event.detail;
    if (btn.dataset.action == undefined)
      btn.dataset.action = "number";
    console.log(this.displayedText);

    const result = this.createResultString(btn, this.displayedText);
    this.updateState(btn, result, this.displayedText);
    if (result != this.displayedText)
      this.displayedText = result;
  }

  @Listen('entryClicked')
  entryClickedHandler(event: CustomEvent) {
    console.log(event.detail.target);
    const entryElement = event.detail.target;
    this.displayedText = entryElement.dataset.value;
    this.myDataset.firstValue = '';
    this.myDataset.modValue = '';
    this.myDataset.operator = '';
    this.myDataset.previousKeyType = '';
  }

  private getBtnType = (btn) => {
    const { action } = btn.dataset;
    if (action == "add" || action == "subtract" || action == "multiply" || action == "divide")
      return "operator";
    return action;
  }
  private calculate = (n1, n2, op) => {
    console.log("[calculate op] " + n1 + " " + n2 + " " + op);
    const a = parseFloat(n1), b = parseFloat(n2);
    if (op == "add") return a + b;
    if (op == "subtract") return a - b;
    if (op == "multiply") return a * b;
    if (op == "divide") return a / b;
  }

  private createResultString = (btn, displayedNum) => {
    const action = this.getBtnType(btn);
    let {firstValue, operator, modValue, previousKeyType} = this.myDataset;

    let actionTypes = {
      "number": () => {
        const btnContent = btn.textContent;
        console.log("number " + btnContent + " key!");
        return displayedNum == "0" || previousKeyType == "operator" || previousKeyType == "calculate"
          ? btnContent
          : displayedNum + btnContent;
      },
      "decimal": () => {
        console.log("decimal key! ");
        if (previousKeyType == "calculate" || previousKeyType == "operator")
          return "0.";
        if (displayedNum.includes(".") == false)
          return displayedNum + ".";
        return displayedNum;
      },
      "operator": () => {
        console.log(action + " key!");
        if (firstValue && operator && previousKeyType != "operator" && previousKeyType != "calculate") {
          const res = this.calculate(firstValue, displayedNum, operator);
          this.updateHistory(firstValue, displayedNum, operator, res);
          return res;
        }
        return displayedNum;
      },
      "calculate": () => {
        if (firstValue != '') {
          if (previousKeyType == 'calculate') {
            const res = this.calculate(displayedNum, modValue, operator);
            this.updateHistory(displayedNum, modValue, operator, res);
            return res;
          }
          const res = this.calculate(firstValue, displayedNum, operator);
          this.updateHistory(firstValue, displayedNum, operator, res);
          return res;
        }
        return displayedNum;
      },
      "clear": () => {
        this.myDataset.expString = '';
        return 0;
      }
    }
    return actionTypes[action]();
  }

  private updateState = (btn, calculatedValue, displayedNum) => {
    const action = this.getBtnType(btn);
    let { firstValue, operator, modValue, previousKeyType } = this.myDataset;
    this.myDataset.previousKeyType = action;

    let actionTypes = {
      "number": () => {
        if (previousKeyType == "calculate") {
          actionTypes["clear"]();
        }
      },
      "decimal": () => {
        if (previousKeyType == "calculate") {
          actionTypes["clear"]();
        }
      },
      "operator": () => {
        this.myDataset.operator = btn.dataset.action;
        console.log("wanna update between " + calculatedValue + " " + displayedNum)
        if (firstValue && operator && previousKeyType != "operator" && previousKeyType != "calculate") {
          this.myDataset.firstValue = calculatedValue;
        }
        else {
          this.myDataset.firstValue = displayedNum;
        }

        console.log(this.myDataset.firstValue);
      },
      "calculate": () => {
        this.myDataset.modValue = firstValue && previousKeyType == "calculate"
          ? modValue
          : displayedNum
      },
      "clear": () => {
        this.myDataset.firstValue = '';
        this.myDataset.modValue = '';
        this.myDataset.operator = '';
        this.myDataset.previousKeyType = '';
      }
    }
    actionTypes[action]();
  }

  private updateHistory = (first, second, op, res) => {
    let entry = { first, second, op, res };
    this.newHistoryEntry.emit(entry);
  }

  render() {
    return (
      <div class="calculator-wrapper">
        <my-screen class="item" content={this.displayedText}>
        </my-screen>
        <my-board class="item">
        </my-board>
        <my-history class="item">
        </my-history>
      </div>
      );
  }
}
