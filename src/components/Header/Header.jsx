import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import classes from "./Header.module.css";

const Header = ({ setTicker, setShowModal }) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>CRYPTAWARE</h1>
      <SearchForm setTicker={setTicker} />
      <button
        className={classes.iconBtn}
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <span class="material-symbols-outlined">search</span>
      </button>
    </header>
  );
};

export default Header;
