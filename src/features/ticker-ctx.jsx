import { createContext, useState } from "react";

export const TickerCtx = createContext({
  ticker: "",
  setTicker: () => {},
});

const TickerProvider = (props) => {
  const [ticker, setTicker] = useState("BTC");

  return (
    <TickerCtx.Provider
      value={{
        ticker: ticker,
        setTicker: setTicker,
      }}
    >
      {props.children}
    </TickerCtx.Provider>
  );
};

export default TickerProvider;
