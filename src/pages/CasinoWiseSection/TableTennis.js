import React, { Component } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import axios from 'axios';
import { history } from '../../_helpers';
import { userActions } from '../../_actions';




// import React from "react";
import {
  Link,
  NavLink,
  useNavigate
  // , withRouter 
} from "react-router-dom";

//components
import LiveEvents from "../../components/LiveEvents/LiveEvents";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Modal } from "react-bootstrap";

// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import { authHeader } from '../../_helpers';

//scss
import style from "./CasinoWiseSection.module.scss";
import styleMain from "./Main.module.scss";


//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";
import SplashImg from "../../assets/png/wel-1702816082206.png";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // outerSportData: {},
      sportList: {},
      matchList: {},
      matchListSportIdWise: {},
      loginPopUp: true,
      sport_id: 4,
    }
  }


  componentDidMount() {

    const returningUser = localStorage.getItem("seenPopUp");
    this.setState({ loginPopUp: !returningUser })
    // setShow(!returningUser);

    let data = { "limit": 50, "pageno": 1 }
    const sportListResponse = fetch("https://triupatiexch.com/api/v5/getSportOuterList", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        sportList: data.data,
      });
    })


    let matchListReqData = { "limit": 10, "pageno": 1, "sport_id": 0 }

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });

    const betListRes = fetch("https://triupatiexch.com/api/v5/inplay-event", {
      method: "POST",
      headers: header,
      body: JSON.stringify(matchListReqData)
    }).then(response => response.json()).then(data => {
      this.setState({
        matchList: data.data,
      });
    })


    // MatchList SportIdWise
    // let sportIdWiseReqData = { "limit": 20, "pageno": 1, "sport_id": 4, "series_id": 0, "type": "home" }

    let sportIdWiseReqData = { "limit": 50, "pageno": 1, "sport_id": this.state.sport_id, "series_id": 0, "type": "home" }
    this.props.dispatch(userActions.event_game_SportIdWise(sportIdWiseReqData))


  }


  closeModalHandler = () => {
    localStorage.setItem("seenPopUp", true);
    this.setState({ loginPopUp: false })
  }


  navigateMatchDeatils = (data) => {

    console.log('data////', data);

    // Use history.push to navigate to a different route
    // history.push(`/allSports/${data.sport_id}`);
  };

  handleNavigateCasino = () => {
    const navigate = useNavigate();
    navigate('/lobbyGame')
  }

  handleTabSelect = (event) => {
    console.log('event...........?', event);
  }

  handleClick = (tabKey) => () => {
    // Do something with the tabKey
    console.log(`Tab with key ${tabKey} was clicked`);
    this.handleTabSelect(tabKey);
  };

  // handleTabClick = (selectedKey) => {
  //   // Perform any actions or pass the selectedKey to another function
  //   console.log(`Tab clicked: ${selectedKey}`);

  //   this.setState({ sport_id: selectedKey })

  //   // MatchList SportIdWise

  //   let sportIdWiseReqData = { "limit": 50, "pageno": 1, "sport_id": selectedKey, "series_id": 0, "type": "home" }
  //   this.props.dispatch(userActions.event_game_SportIdWise(sportIdWiseReqData))

  // };

  handleNavigate = (data) => {
    if (this.props.history) {
      this.props.history.push(`/app/match-detail/${data.sport_id}/${data.series_id}/${data.match_id}/${data.market_id}`);
    }
  };

  getTitle = (tabKey) => {
    let result = "";
    result = tabKey && tabKey.sport_id && tabKey.sport_id === 1 ? "Football" : tabKey.name;
    return result;

  };

  // getTitleIcon = (tabKey) => {

  //   let param = tabKey.sport_id;
  //   switch (param) {
  //     case 1: "far fa-futbol"
  //       return
  //     case 2:
  //       return "fa-solid fa-tennis-ball"
  //     case 4:
  //       return "fa-solid fa-cricket-bat-ball"
  //     case 111:
  //       return "fa-solid fa-circle-c"
  //     default:
  //       return null
  //   }

  // };

  renderSwitch(tabKey) {
    let param = tabKey.sport_id;
    // console.log('param??///', param); <i class="fa-solid fa-heart"></i>
    switch (param) {
      case 1:
        return "fa-solid fa-baseball"
      // break;
      case 2:
        return "fa-solid fa-table-tennis-paddle-ball"
      //<i class="fa-solid fa-cricket-bat-ball"></i>
      // break;
      case 4:
        return "fa-solid fa-heart"
      // break;
      case 111:
        return "fa fa-circle-c"
      // break;
      default:
        return null
    }
  }

  render() {
    let { users } = this.props;
    let { matchListSportIdWise } = users;
    console.log('this.state.sport_id............', this.state.sport_id);

    return (
      <>
        <div className="center-main-container report-page">

          {/* <div className={`d-xl-none d-block ${style.liveEventWrapper}`}>
            <LiveEvents
              renderSwitch={this.renderSwitch}
              InplayMatches={this.state.matchList}
            />
          </div> */}


          <div className="center-container">
            <div className={`${styleMain.customLinks} customLinks d-xl-none`}>
              <ul>
                <li>
                  <Link to={`/providerlobbygame/${201206}`} >Aviator</Link>
                </li>
                <li>
                  <Link to="/home">Sports</Link>
                </li>
                <li>
                  <Link to="/ourcasino">Our Casino</Link>
                </li>
                <li>
                  <Link to="/livecasino">Live Casino</Link>
                </li>
                {/* <li>
                  <Link to="/slots">Slots</Link>
                </li> */}
                <li>
                  <Link to="/fantasy">Fantasy</Link>
                </li>
              </ul>
            </div>

            {/* <div className={`${styleMain.casinoStrip} casinoStrip d-xl-none`} style={{ background: "red" }}>
              <ul>
                <li style={{ background: "blue" }}>
                  <Link to="#">Our Casino</Link>
                </li>
                <li>
                  <Link to="#">Our Virtual</Link>
                </li>
              </ul>
            </div> */}

            <div className={``}>
              <div className={style.tabsGroup}>

                <div className="casino-list mt-2">

                  <div className="casino-list-item">
                    <Link to="/casino/dt20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Ball_By_Ball.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Instant_TeenPatti_3.0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>
                  {/* 100068 */}
                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100068}/${"EZUGI"}`}>

                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/SICBO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />

                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teen_Patti_2.0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100029}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Roulette_BL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/race20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/patti2">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/superover">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/lottcard">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Poker_1_day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100045}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Poker_20_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/teen8">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/6_player_Poker.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100049}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/The_TRAP.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100055}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/baccarat_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/ab20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Dragon%20Tiger%2020-20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>
                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100061}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Dragon_Tiger_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/card32">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/card32">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/20_20_Dragon_Tiger_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>                            <div className="casino-list-item-banner" style={{
                      backgroundImage: 'url("https://herobook.in/images/32_Cards_A.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                      ,
                    }} />
                    </Link>
                  </div>
                  <div className="casino-list-item">
                    <Link to="/casino/teen">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/32_Cards_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100063}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_3.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100075}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/7_A_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/poker">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/7_B_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/teen20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/3_Cards_Judgement.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/lucky7eu2">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/race17">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Worli_Matka.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/lucky7">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Instant%20Worli.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${900007}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dt6">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Bollywood_Casino.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/worli">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Lottery_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100062}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/5_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/sicbo">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dt202">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Casino%20Meter.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti_2.0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dt202">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/QUEEN.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dt202">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Race_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dtl20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dtl20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/super_Over_RSA_ENG.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/dtl20">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/TRAP.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/teen32">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/2_Cards_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100069}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://nd.sprintstaticdata.com/casino-icons/lc/teensin.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/worli2">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/worli2">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Race_to_17.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/worli2">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/teen6">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/TRIO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/aaa">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Note_Number.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/aaa">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Kaun_Banega_Crorepati.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/aaa">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/1_card_20_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>


                  <div className="casino-list-item">
                    <Link to="/casino/btable">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/One_Card_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${100028}/${"EZUGI"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Roulette.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/baccarat2">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to="/casino/poker6">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_2_0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>


                  <div className="casino-list-item">
                    <Link to="/casino/cricketv3">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Race_to_2nd.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>


                  <div className="casino-list-item">
                    <Link to="/casino/trap">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>


                  <div className="casino-list-item">
                    <Link to="/casino/card32eu">
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/DUS_KA_DUM.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item"
                  >
                    <Link
                      to={`/lobbyGame/${800001}/${"DC"}`}
                    >
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/1_Card_Meter.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                </div>
              </div>
            </div>

          </div>


        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

export default connect(mapStateToProps)(Home);
// export default Home;