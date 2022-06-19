import React from "react";

import "./App.css";
import Day from "./components/Day";
import apiCall from "./api";
import translPhrase from "./transl";

import themeImg from "./images/theme.png";
import iconImg from "./images/icon.png";
import sourceImg from "./images/source.png";
import sunnyImg from "./images/sunny.png";
import noneImg from "./images/none.png";

function App() {
  let [weather, setWeather] = React.useState({
    first: {
      date: "ئەمڕۆ",
      status: "نەزانراو",
      temprature: "?",
      image: noneImg,
    },
    second: {
      date: "سبەی",
      status: "نەزانراو",
      temprature: "?",
      image: noneImg,
    },
    third: {
      date: "دووسبەی",
      status: "نەزانراو",
      temprature: "?",
      image: noneImg,
    },
  });

  let changeWeather = async () => {
    let info = await apiCall();

    if (info === false) return;

    setWeather(() => {
      return {
        first: {
          date: "ئەمڕۆ",
          status: translPhrase(
            info["forecast"]["forecastday"][0]["day"].condition.text
          ),
          temprature: info["forecast"]["forecastday"][0]["day"].avgtemp_c,
          image: sunnyImg,
        },
        second: {
          date: "سبەی",
          status: translPhrase(
            info["forecast"]["forecastday"][1]["day"].condition.text
          ),
          temprature: info["forecast"]["forecastday"][1]["day"].avgtemp_c,
          image: sunnyImg,
        },
        third: {
          date: "دووسبەی",
          status: translPhrase(
            info["forecast"]["forecastday"][2]["day"].condition.text
          ),
          temprature: info["forecast"]["forecastday"][2]["day"].avgtemp_c,
          image: sunnyImg,
        },
      };
    });
  };

  return (
    <div className="App">
      <header>
        <div className="clickable">
          <img src={iconImg}></img>
          <h1>هەور</h1>
        </div>
      </header>
      <main>
        <Day
          status={weather.first.status}
          temp={weather.first.temprature}
          date={weather.first.date}
          image={weather.first.image}
        ></Day>
        <Day
          status={weather.second.status}
          temp={weather.second.temprature}
          date={weather.second.date}
          image={weather.first.image}
        ></Day>
        <Day
          status={weather.third.status}
          temp={weather.third.temprature}
          date={weather.third.date}
          image={weather.first.image}
        ></Day>
      </main>
      <footer>
        <h1 onClick={changeWeather} className="clickable">
          شوێن
        </h1>
        <div>
          <img src={sourceImg} className="clickable"></img>
          <img src={themeImg} className="clickable"></img>
        </div>
      </footer>
    </div>
  );
}

export default App;
