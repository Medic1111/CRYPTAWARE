import { createContext, useState } from "react";

export const SelectionCtx = createContext({
  trendOnly: false,
  setTrendOnly: () => {},
  diffOnly: false,
  setDiffOnly: () => {},
  select: (which) => {},
});

const SelectionProvider = (props) => {
  const [trendOnly, setTrendOnly] = useState(false);
  const [diffOnly, setDiffOnly] = useState(false);

  const reset = () => {
    setDiffOnly(false);
    setTrendOnly(false);
  };

  const select = (which) => {
    if (which === "compound") {
      return reset();
    }
    reset();
    which === "diff" ? setDiffOnly(true) : setTrendOnly(true);
  };

  return (
    <SelectionCtx.Provider
      value={{
        trendOnly: trendOnly,
        setTrendOnly: setTrendOnly,
        diffOnly: diffOnly,
        setDiffOnly: setDiffOnly,
        select: select,
      }}
    >
      {props.children}
    </SelectionCtx.Provider>
  );
};

export default SelectionProvider;
