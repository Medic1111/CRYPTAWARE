import classes from "./Selection.module.css";

const Selection = ({ setDiffOnly, setTrendOnly, ticker, invalid }) => {
  return (
    <section className={classes.section}>
      {invalid ? (
        <h2 className={classes.h2}>INVALID TICKR</h2>
      ) : (
        <h2 className={classes.h2}>
          {ticker} {new Date().toLocaleDateString()}
        </h2>
      )}
      <div className={classes.filterBox}>
        <p
          onClick={() => {
            setTrendOnly(true);
            setDiffOnly(false);
          }}
          className={classes.p}
        >
          Trend
        </p>
        <p
          onClick={() => {
            setTrendOnly(false);
            setDiffOnly(true);
          }}
          className={classes.p}
        >
          Diff
        </p>
        <p
          onClick={() => {
            setTrendOnly(false);
            setDiffOnly(false);
          }}
          className={classes.p}
        >
          Compound
        </p>
      </div>
    </section>
  );
};

export default Selection;
