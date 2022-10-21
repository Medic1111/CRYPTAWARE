import classes from "./Options.module.css";

const Options = ({ setTicker, value }) => {
  const resetTicker = () => setTicker(value);

  return (
    <button onClick={resetTicker} className={classes.btn}>
      <span className={classes.span}> {value}</span>
      <div className={classes.line}></div>
      <div className={classes.line2}></div>
      <div className={classes.speak}></div>
      <div className={classes.speak} id="one"></div>
      <div className={classes.speak} id="two"></div>
      <div className={classes.speak} id="three"></div>
    </button>
  );
};

export default Options;
