import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart/Chart";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Options from "./components/Options/Options";
import Selection from "./components/Selection/Selection";
import Wrapper from "./components/Wrapper/Wrapper";
import Modal from "./components/Modal/Modal";

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
          console.log(serverRes.data["Error Message"]);
          return setInvalid(true);
        } else {
          setInvalid(false);
          let data = serverRes.data["Time Series Crypto (15min)"];
          let structured = [];

          Object.keys(data).forEach((key, index) => {
            structured.push(data[key]);
          });

          console.log(structured.length);

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
        <article className="article">
          {optionsArr.map((el, index) => {
            return (
              <Options
                key={`option_${index}`}
                setTicker={setTicker}
                value={el}
              />
            );
          })}
        </article>
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
