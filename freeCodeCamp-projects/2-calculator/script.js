import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const buttons = [
  { id: "clear", display: "C", className: "button largerButton" },
  { id: "divide", display: "/", className: "button operator" },
  { id: "multiply", display: "x", className: "button operator" },
  { id: "seven", display: "7", className: "button" },
  { id: "eight", display: "8", className: "button" },
  { id: "nine", display: "9", className: "button" },
  { id: "subtract", display: "-", className: "button operator" },
  { id: "four", display: "4", className: "button" },
  { id: "five", display: "5", className: "button" },
  { id: "six", display: "6", className: "button" },
  { id: "add", display: "+", className: "button operator" },
  { id: "one", display: "1", className: "button" },
  { id: "two", display: "2", className: "button" },
  { id: "three", display: "3", className: "button" },
  { id: "equals", display: "=", className: "button longerButton" },
  { id: "zero", display: "0", className: "button largerButton" },
  { id: "decimal", display: ".", className: "button" },
];

class Pad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        id={this.props.id}
        className={this.props.className}
        onClick={this.props.onClick}
      >
        {this.props.display}
      </button>
    );
  }
}

class MyJSCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      input: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonClicked) {
    const calculation = this.state.currentVal;
    const lastChar = calculation[calculation.length - 1];
    const charBeforeLast = calculation[calculation.length - 2];

    switch (buttonClicked) {
      case "C": {
        this.setState({
          currentVal: "0",
          input: "",
        });
        return;
      }

      case "+":
      case "-":
      case "x":
      case "/": {
        if (calculation === "0") {
          return;
        } else if (
          /[0-9]/.test(lastChar) === true ||
          (/[+x\/]/.test(lastChar) === true && buttonClicked === "-")
        ) {
          this.setState({
            currentVal: calculation + buttonClicked,
            input: "",
          });
          return;
        } else if (
          /[+x\/.]/.test(lastChar) === true ||
          (lastChar === "-" &&
            /[+\-x\/]/.test(buttonClicked) === true &&
            /[0-9]/.test(charBeforeLast) === true)
        ) {
          this.setState({
            currentVal: calculation.slice(0, -1) + buttonClicked,
            input: "",
          });
          return;
        } else {
          this.setState({
            currentVal: calculation.slice(0, -2) + buttonClicked,
            input: "",
          });
          return;
        }
      }

      case ".": {
        if (!this.state.input.includes(".")) {
          this.setState({
            input: this.state.input + ".",
            currentVal:
              /[+\-x\/]/.test(lastChar) === true
                ? calculation + "0."
                : calculation + ".",
          });
        }
        return;
      }

      case "=": {
        if (/[+\-x\/.]/.test(lastChar) === true) {
          this.setState({
            currentVal: (
              Math.round(
                eval(calculation.slice(0, -1).replace(/x/g, "*")) *
                  1000000000000
              ) / 1000000000000
            ).toString(),
          });
          return;
        } else {
          this.setState({
            currentVal: (
              Math.round(eval(calculation.replace(/x/g, "*")) * 1000000000000) /
              1000000000000
            ).toString(),
          });
          return;
        }
      }
    }

    if (this.state.currentVal === "0") {
      this.setState({
        currentVal: buttonClicked,
        input: buttonClicked,
      });
      return;
    }

    if (this.state.input.length > 10) {
      return;
    } else {
      this.setState({
        currentVal: calculation + buttonClicked,
        input: this.state.input + buttonClicked,
      });
      return;
    }
  }

  render() {
    return (
      <div id="container">
        <div id="display">{this.state.currentVal}</div>
        <div>
          {buttons.map((item) => (
            <Pad
              id={item.id}
              display={item.display}
              className={item.className}
              onClick={() => this.handleClick(item.display)}
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyJSCalculator />, document.getElementById("root"));
