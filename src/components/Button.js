import "../styles.css";
const Button = ({changeResult, val, cls}) => {

  const onClickHandler = (e) => {
    const inp = e.target.innerHTML;
    changeResult(inp);
  };
  return (
    <div onClick={onClickHandler} className={cls}>
      {val}
    </div>
  );
};

export default Button;
