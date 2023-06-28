import "./styles.css";
import { keys } from "./keys";
import Keyboard from "./components/Keyboard";
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
    currentOperand: "first",
  });

  const dispatcher = (val) => {
    if (val === "AC" || val === "MC") {
      handleErase();
    } else if (val === "=") {
      handleEqual();
    } else if (["+", "/", "*", "-"].includes(val)) {
      handleOperation(val);
    } else {
      handleNumber(val);
    }
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
      setCurrentOperand("secondOperand");
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
        operator: "",
        secondOperand: "",
      };
      setCurrentOperand("firstOperand");
    }

    setExpression(updatedExpression);
  };

  const handleErase = () => {
    const updatedExpression = {
      operator: null,
      firstOperand: "",
      secondOperand: "",
      display: "0",
    };
    setExpression(updatedExpression);
  };

  return (
    <div>
      <h1>React Calculator</h1>
      <div className="container">
        <div className="result">
          <p>{expression.display}</p>
        </div>
        <Keyboard keys={keys} changeResult={dispatcher} />
      </div>
    </div>
  );
}

export default App;
