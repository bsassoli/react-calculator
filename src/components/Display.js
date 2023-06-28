import "../styles.css";

const Display = (props) => {
  return (
    <div className="result">
      <p>{props.display}</p>
    </div>
  );
};

export default Display;
