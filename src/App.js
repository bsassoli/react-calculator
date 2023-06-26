import "./styles.css";
import { keys } from "./keys";
import Keyboard from "./components/Keyboard";
import { useState } from "react";

function App() {
  const [currentOperand, setCurrentOperand] = useState("firstOperand");
  const [expression, setExpression] = useState({
    firstOperand: "",
    secondOperand: "",
    operator: null,
    display: "0",
  });

  const handleNumber = (val) => {
    const newInput = expression[currentOperand] + val;
    const updatedExpression = {
      ...expression,
      [currentOperand]: newInput,
      display: newInput,
    };
    setExpression(updatedExpression);
  };

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
  };

  const handleEqual = () => {
    const res = evaluate(Number(expression.firstOperand), Number(expression.secondOperand), expression.operator);
    const updatedExpression = {
      ...expression,
      firstOperand: res,
      operator: null,
      display: res,
      secondOperand: "",
    };
    setExpression(updatedExpression);
    console.log(updatedExpression);
    setCurrentOperand("secondOperand");
    console.log(currentOperand);
  };

  const handleOperation = (val) => {
    const updatedExpression = { ...expression, operator: val, display: val };
    setExpression(updatedExpression);
    console.log("From handleOperation:");
    console.log(updatedExpression);
    currentOperand === "firstOperand"
      ? setCurrentOperand("secondOperand")
      : handleEqual();
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

  const resultSetter = (val) => {
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

  return (
    <div>
      <h1>React Calculator</h1>
      <div className="container">
        <div className="result">
          <p>{expression.display}</p>
        </div>
        <Keyboard keys={keys} changeResult={resultSetter} />
      </div>
    </div>
  );
}

export default App;
