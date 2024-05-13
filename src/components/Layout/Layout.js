import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

//components
// import Auth from "../../pages/Auth/Auth";
import Main from "../../pages/Main/Main";
import Home from "../../pages/Home/Home";
import Lottery from "../../pages/Lottery/Lottery";
import AllSports from "../../pages/AllSports/AllSports";
import Tennis from "../../pages/Tennis/Tennis";
import Football from "../../pages/Football/Football";
import TableTennis from "../../pages/TableTennis/TableTennis";
import Baccart from "../../pages/Baccart/Baccart";
import Cards32 from "../../pages/Cards32/Cards32";
import TeenPatti from "../../pages/TeenPatti/TeenPatti";
import Poker from "../../pages/Poker/Poker";
import Lucky7 from "../../pages/Lucky7/Lucky7";
import CricketDetail from "../../pages/Details/CricketDetail";
import BallByBall from "../../components/Sports/Cricket/BallByBall";
import AccountStatement from "../../pages/Accounts/AccountStatement";
import CurrentBet from "../../pages/Accounts/CurrentBet";
import CasinoResults from "../../pages/Accounts/CasinoResults";


function Layout(props) {
  return (
    <>
      <Switch>
        {/* <Route path="/home" component={withRouter(Main)} > */}
        {/* <Route path="/" component={withRouter(Main)} > */}
          {/* <Route index component={withRouter(Home)} /> */}
          {/* <Route path="/home" component={withRouter(Home)} /> */}
          <Route path="/lottery" component={withRouter(Home)} />
          <Route path="allSports/:sport_id" component={withRouter(AllSports)} />
          <Route path="tennis" component={withRouter(Tennis)} />
          <Route path="football" component={withRouter(Football)} />
          <Route path="tabletennis" component={withRouter(TableTennis)} />
          <Route path="baccart" component={withRouter(Baccart)} />
          <Route path="cards32" component={withRouter(Cards32)} />
          <Route path="teenpatti" component={withRouter(TeenPatti)} />
          <Route path="poker" component={withRouter(Poker)} />
          <Route path="lucky7" component={withRouter(Lucky7)} />
          {/* <Route path="match-detail"  component={withRouter()} element={<CricketDetail />} /> */}
          <Route path="match-detail/:sport_id?/:series_id?/:match_id?/:market_id?" component={withRouter(CricketDetail)} />
          <Route path="ball-by-ball" component={withRouter(BallByBall)} />
          <Route path="account-statement" component={withRouter(AccountStatement)} />
          <Route path="account/current-bet" component={withRouter(CurrentBet)} />
          <Route path="account/casino-results" component={withRouter(CasinoResults)} />
        {/* </Route> */}
      </Switch>
    </>

  );
}

export default withRouter(Layout);
