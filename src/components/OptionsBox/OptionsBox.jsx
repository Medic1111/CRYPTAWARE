import classes from "./OptionsBox.module.css";
import Options from "../Options/Options";

const OptionsBox = ({ optionsArr, setTicker }) => {
  return (
    <article className={classes.article}>
      {optionsArr.map((el, index) => {
        return (
          <Options key={`option_${index}`} setTicker={setTicker} value={el} />
        );
      })}
    </article>
  );
};

export default OptionsBox;
