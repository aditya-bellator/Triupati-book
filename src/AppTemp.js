import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//components
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import Home from "./pages/Home/Home";
import Lottery from "./pages/Lottery/Lottery";
import Cricket from "./pages/Cricket/Cricket";
import Tennis from "./pages/Tennis/Tennis";
import Football from "./pages/Football/Football";
import TableTennis from "./pages/TableTennis/TableTennis";
import Baccart from "./pages/Baccart/Baccart";
import Cards32 from "./pages/Cards32/Cards32";
import TeenPatti from "./pages/TeenPatti/TeenPatti";
import Poker from "./pages/Poker/Poker";
import Lucky7 from "./pages/Lucky7/Lucky7";
import CricketDetail from "./pages/Details/CricketDetail";
import BallByBall from "./components/Sports/Cricket/BallByBall";
import AccountStatement from "./pages/Accounts/AccountStatement";
import CurrentBet from "./pages/Accounts/CurrentBet";
import CasinoResults from "./pages/Accounts/CasinoResults";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const storedLocalLoginInfo = localStorage.getItem("loggedIn");

    if (storedLocalLoginInfo === "1") {
      setLogin(true);
    }
  }, []);

  const loginHandler = () => {
    setLogin(true);
    localStorage.setItem("loggedIn", "1");
  };

  return (
    <div className="App">
      {!login ? (
        <Auth loginHandler={loginHandler} />
      ) : (
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="lottery" element={<Lottery />} />
            <Route path="cricket" element={<Cricket />} />
            <Route path="tennis" element={<Tennis />} />
            <Route path="football" element={<Football />} />
            <Route path="tabletennis" element={<TableTennis />} />
            <Route path="baccart" element={<Baccart />} />
            <Route path="cards32" element={<Cards32 />} />
            <Route path="teenpatti" element={<TeenPatti />} />
            <Route path="poker" element={<Poker />} />
            <Route path="lucky7" element={<Lucky7 />} />
            <Route path="match-detail" element={<CricketDetail />} />
            <Route path="ball-by-ball" element={<BallByBall />} />
            <Route path="account-statement" element={<AccountStatement />} />
            <Route path="account/current-bet" element={<CurrentBet />} />
            <Route path="account/casino-results" element={<CasinoResults />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
