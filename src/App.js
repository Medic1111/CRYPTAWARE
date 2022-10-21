import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart/Chart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Selection from "./components/Selection/Selection";
import Wrapper from "./components/Wrapper/Wrapper";
import Modal from "./components/Modal/Modal";
import OptionsBox from "./components/OptionsBox/OptionsBox";

function App() {
  const optionsArr = ["BTC", "ETH", "BNB", "SOL", "ADA", "DOGE"];
  let [showModal, setShowModal] = useState(false);
  let [ticker, setTicker] = useState("BTC");
  let [dataArr, setDataArr] = useState([{ date: "any", value: "any" }]);
  let [trendOnly, setTrendOnly] = useState(false);
  let [diffOnly, setDiffOnly] = useState(false);
  let [invalid, setInvalid] = useState(false);
  const fetchApi = async () => {
    await axios
      .get(
        `https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=15min&apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((serverRes) => {
        if (serverRes.data["Error Message"]) {
          setDataArr("");
          return setInvalid(true);
        } else {
          setInvalid(false);
          let data = serverRes.data["Time Series Crypto (15min)"];
          let structured = [];

          Object.keys(data).forEach((key, index) => {
            structured.push(data[key]);
          });
          setDataArr(structured);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApi();
  }, [ticker]);

  return (
    <React.Fragment>
      {showModal && <Modal setTicker={setTicker} setShowModal={setShowModal} />}
      <Header setTicker={setTicker} setShowModal={setShowModal} />
      <Wrapper>
        <OptionsBox optionsArr={optionsArr} setTicker={setTicker} />
        <Selection
          setDiffOnly={setDiffOnly}
          setTrendOnly={setTrendOnly}
          ticker={ticker}
          invalid={invalid}
        />
        <Chart data={dataArr} diffOnly={diffOnly} trendOnly={trendOnly} />
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
}

export default App;
