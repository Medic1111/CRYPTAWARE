import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Chart from "./components/Chart/Chart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Selection from "./components/Selection/Selection";
import Wrapper from "./components/Wrapper/Wrapper";
import Modal from "./components/Modal/Modal";
import OptionsBox from "./components/OptionsBox/OptionsBox";
import { TickerCtx } from "./features/ticker-ctx";

function App() {
  const tickerMgr = useContext(TickerCtx);

  // STATE
  let [invalid, setInvalid] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [dataArr, setDataArr] = useState([{ date: "any", value: "any" }]);

  const fetchApi = async () => {
    await axios
      .get(
        `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${tickerMgr.ticker}&market=USD&interval=15min&apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((serverRes) => {
        if (serverRes.data["Error Message"]) {
          setDataArr("");
          return setInvalid(true);
        } else {
          setInvalid(false);
          let data = serverRes.data["Time Series Crypto (15min)"];
          let structured = [];
          Object.keys(data).forEach((key) => {
            structured.push(data[key]);
          });
          setDataArr(structured);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApi();
  }, [tickerMgr.ticker]);

  return (
    <React.Fragment>
      {showModal && <Modal setShowModal={setShowModal} />}
      <Header setShowModal={setShowModal} />
      <Wrapper>
        <OptionsBox />
        <Selection invalid={invalid} />
        <Chart data={dataArr} />
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
}

export default App;
