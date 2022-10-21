import classes from "./SearchForm.module.css";
import { useState } from "react";

const SearchForm = ({ setTicker }) => {
  const [userInput, setUserInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setTicker(userInput);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        className={classes.input}
        placeholder="Tickr"
        required
        type="text"
      />
      <span className={classes.inputBorder}></span>
    </form>
  );
};

export default SearchForm;
