import "../styles.css";
import Button from "./Button";

const Keyboard = (props) => {
  return (
      <div className="keyboard">
        {props.keys.map((btn) => (
          <Button key={btn.val} val={btn.val} cls={btn.cls} changeResult={props.changeResult}/>
        ))}
      </div>
  );
};

export default Keyboard;
