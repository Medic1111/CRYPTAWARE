import Portal from "../Portal/Portal";
import classes from "./Modal.module.css";
import { useState } from "react";
const Modal = ({ setTicker, setShowModal }) => {
  const [userInput, setUserInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setTicker(userInput);
    setShowModal((prev) => !prev);
  };

  return (
    <Portal>
      <section className={classes.section}>
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
        <div className={classes.btnBox}>
          <button
            className={classes.btn}
            onClick={() => setShowModal((prev) => !prev)}
          >
            Cancel
          </button>
          <button onClick={submitHandler} className={classes.btn}>
            Search
          </button>
        </div>
      </section>
    </Portal>
  );
};
export default Modal;
