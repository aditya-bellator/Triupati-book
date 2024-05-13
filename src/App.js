import "./App.css";
import React, { useEffect, useState } from "react";
import {
  Routes, Route,
} from "react-router-dom";

//components
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Lottery from "./pages/Lottery/Lottery";
import AllSports from "./pages/AllSports/AllSports";
import AllSportsTennis from "./pages/AllSports/AllSportsTennis";
import AllSportsSoccer from "./pages/AllSports/AllSportsSoccer";
import CricketDetail from "./pages/Details/CricketDetail";
import LobbyGame from "./components/LobbyGame/LobbyGame";
import ProviderLobbyGame from "./components/ProviderLobbyGame/ProviderLobbyGame";
import ProviderLobbyGame2 from "./components/ProviderLobbyGame2/ProviderLobbyGame2";
import BallByBall from "./components/Sports/Cricket/BallByBall";
import AccountStatement from "./pages/Accounts/AccountStatement";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import CurrentBet from "./pages/Accounts/CurrentBet";
import CasinoResults from "./pages/Accounts/CasinoResults";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import NetworkDetector from "./components/Hoc/NetworkDetector";
import styleMain from "./Main.module.scss";
import OurCasino from "./pages/OurCasino/OurCasino";
import LiveCasino from "./pages/LiveCasino/LiveCasino";
import Slots from "./pages/Slots/Slots";
import Fantasy from "./pages/Fantasy/Fantasy";
import OurVirtual from "./pages/OurVirtual/OurVirtual";
import TableTennis from "./pages/CasinoWiseSection/TableTennis";
import Baccart from "./pages/CasinoWiseSection/Baccart";
import Cards32 from "./pages/CasinoWiseSection/Cards32";
import TeenPatti from "./pages/CasinoWiseSection/TeenPatti";
import Poker from "./pages/CasinoWiseSection/Poker";
import Lucky7 from "./pages/CasinoWiseSection/Lucky7";



function App() {

  return (
    <div className="App">
      {!localStorage.getItem('userMeta') ? (
        <Auth
        />
      ) : (
        <>
          <Header />
          <div className={styleMain.main}>
            <div className={styleMain.sideBar}>
              <Sidebar />
            </div>
            <div className={`${styleMain.content} content`}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/ourcasino" element={<OurCasino />} />
                <Route path="/ourvirtual" element={<OurVirtual />} />
                <Route path="/livecasino" element={<LiveCasino />} />
                <Route path="/slots" element={<Slots />} />
                <Route path="/fantasy" element={<Fantasy />} />
                <Route path="/lottery" element={<Lottery />} />
                <Route path="/allSports/:sport_id" element={<AllSports />} />
                <Route path="/allSportsTennis/:sport_id" element={<AllSportsTennis />} />
                <Route path="/allSportsSoccer/:sport_id" element={<AllSportsSoccer />} />
                <Route path="/match-detail/:sport_id?/:series_id?/:match_id?/:market_id?" element={<CricketDetail />} />
                <Route path="/lobbyGame/:game_id?/:providerName?" element={<LobbyGame />} />
                <Route path="/providerlobbygame/:game_id" element={<ProviderLobbyGame />} />
                <Route path="/providerlobbygame2/:game_id" element={<ProviderLobbyGame2 />} />
                <Route path="/ball-by-ball" element={<BallByBall />} />
                <Route path="/account/ball-by-ball" element={<AccountStatement />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path="/account/current-bet" element={<CurrentBet />} />
                <Route path="/account/casino-results" element={<CasinoResults />} />
                <Route path="/tabletennis" element={<TableTennis />} />
                <Route path="/baccart" element={<Baccart />} />
                <Route path="/cards32" element={<Cards32 />} />
                <Route path="/teenpatti" element={<TeenPatti />} />
                <Route path="/poker" element={<Poker />} />
                <Route path="/lucky7" element={<Lucky7 />} />
              </Routes>

            </div>
          </div>
          <Footer />
        </>
      )
      }
    </div >

  );
}


export default NetworkDetector(App);


