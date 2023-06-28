import "./styles.css";
import { keys } from "./keys";
import Keyboard from "./components/Keyboard";
import Display from "./components/Display";
import { useState } from "react";

function App() {
  function evaluate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "/":
        return firstOperand / secondOperand;
      case "*":
        return firstOperand * secondOperand;
      default:
        console.log("oops");
    }
  }

  const [currentOperand, setCurrentOperand] = useState("firstOperand");
  const [expression, setExpression] = useState({
    firstOperand: "",
    secondOperand: "",
    operator: null,
    display: "0",
  });

  const dispatcher = (val) => {
    if (val === "AC") {
      handleEraseAll();
    } else if (val === "MC") {
      handleEraseCurrent();
    } else if (val === "+/-") {
      handleSign();
    } else if (val === "=") {
      handleEqual();
    } else if (["+", "/", "*", "-"].includes(val)) {
      handleOperation(val);
    } else {
      handleNumber(val);
    }
  };

  const handleEraseAll = () => {
    const updatedExpression = {
      operator: null,
      firstOperand: "",
      secondOperand: "",
      display: "0",
    };
    setExpression(updatedExpression);
  };

  const handleEraseCurrent = () => {
    const updatedExpression = {
      ...expression,
      [currentOperand]: "",
      display: "0",
    };
    setExpression(updatedExpression);
  };

  const handleSign = () => {
    const invertedOperand = expression[currentOperand] * -1;
    const updatedExpression = {
      ...expression,
      [currentOperand]: invertedOperand,
      display: invertedOperand
    };
    setExpression(updatedExpression);
  };

  const handleNumber = (val) => {
    const newInput = expression[currentOperand] + val;
    const updatedExpression = {
      ...expression,
      [currentOperand]: newInput,
      display: newInput,
    };
    setExpression(updatedExpression);
  };

  const handleEqual = () => {
    const res = evaluate(
      Number(expression.firstOperand),
      Number(expression.secondOperand),
      expression.operator
    );
    const updatedExpression = {
      ...expression,
      firstOperand: res,
      display: res,
      secondOperand: "",
      operator: expression.operator,
    };
    setExpression(updatedExpression);
    setCurrentOperand("firstOperand");
    console.log(currentOperand);
  };

  const handleOperation = (val) => {
    let updatedExpression = expression;
    if (currentOperand === "firstOperand") {
      updatedExpression = {
        ...expression,
        display: val,
        operator: val,
      };
    } else {
      const res = evaluate(
        Number(expression.firstOperand),
        Number(expression.secondOperand),
        expression.operator
      );
      updatedExpression = {
        ...expression,
        firstOperand: res,
        display: res,
        operator: val,
        secondOperand: "",
      };
    }
    setCurrentOperand("secondOperand");
    setExpression(updatedExpression);
  };

  return (
    <div>
      <h1>React Calculator</h1>
      <div className="container">
        <Display display={expression.display} />
        <Keyboard keys={keys} changeResult={dispatcher} />
      </div>
    </div>
  );
}

export default App;
