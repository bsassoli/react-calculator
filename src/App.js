import "./styles.css";
import { keys } from "./keys";
import Keyboard from "./components/Keyboard";
import { useState } from "react";

function App() {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState("");
  const [currentOperand, setCurrentOperand] = useState("firstOperand");
  const [expression, setExpression] = useState({
    firstOperand: null,
    secondOperand: null,
    operator: null,
    result: 0
  });

  const handleExpression = (val) => {
    const updatedExpression = {...expression, [currentOperand]: val}
    setExpression(updatedExpression);
  };

  const handleNumber = (val) => {
    const newInput = input + val;
    setInput(newInput);
    setResult(newInput);
    handleExpression(newInput);
  };

  const handleEqual = () => {
    let res = null;
    switch (expression.operator) {
        case "+":
          res = Number(expression.firstOperand) + Number(expression.secondOperand);
          break;
        case "-":
          res = Number(expression.firstOperand) - Number(expression.secondOperand);
          break;
        case "/":
          res = Number(expression.firstOperand) / Number(expression.secondOperand);
          break;
        case "*":
          res = Number(expression.firstOperand) * Number(expression.secondOperand);
          break;
        default:
          console.log("oops");
    }
    setResult(res);
    console.log(result);
    setInput("");
    setCurrentOperand("firstOperand");
    handleExpression(res);
  };

  const handleOperation = (val) => {
    console.log(`Operation ${val} pressed`);
    setResult(val);
    setInput("");
    setExpression({...expression, operator: val});
    currentOperand==="firstOperand" ? setCurrentOperand("secondOperand") : setCurrentOperand("firstOperand");
  };

  const handleErase = () => {
    setResult(0);
    setInput("");
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
          <p>{result}</p>
        </div>
        <Keyboard keys={keys} changeResult={resultSetter} />
      </div>
    </div>
  );
}

export default App;
