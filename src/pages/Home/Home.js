import React, { Component } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import axios from 'axios';
import { history } from '../../_helpers';
import { userActions } from '../../_actions';

// Icons
import { MdOutlineCasino } from "react-icons/md";
import { FaTableTennisPaddleBall } from "react-icons/fa6";
import { RiFootballFill } from "react-icons/ri";
import { MdSportsCricket } from "react-icons/md";
import { PiTennisBallLight } from "react-icons/pi";
import { FaHorse } from "react-icons/fa";
// import { FaTableTennisPaddleBall } from "react-icons/fa6";
import { MdSportsKabaddi } from "react-icons/md";
import { FaBasketballBall } from "react-icons/fa";
import { IoAmericanFootball } from "react-icons/io5";
import { FaVolleyball } from "react-icons/fa6";

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
import style from "./Home.module.scss";
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
      activeLink: 'SPORTS',
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

    // Set up an interval to call fetchData every 5000 milliseconds (5 seconds)
    // const intervalId = setInterval(this.fetchData, 1000);
    const intervalIdLiveMatch = setInterval(this.fetchDataLiveMatch, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(
      // intervalId,
      intervalIdLiveMatch);

  }



  fetchData = async () => {
    let sportIdWiseReqData = { "limit": 50, "pageno": 1, "sport_id": this.state.sport_id, "series_id": 0, "type": "home" }
    this.props.dispatch(userActions.event_game_SportIdWise(sportIdWiseReqData))

  };

  fetchDataLiveMatch = async () => {

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
      let result = data.data;

      if (result === null || result == undefined) {
        return {}
      }
      else {
        this.setState({
          matchList: result
        });
      }



    })

  };



  closeModalHandler = () => {
    localStorage.setItem("seenPopUp", true);
    this.setState({ loginPopUp: false })
  }


  navigateMatchDeatils = (data) => {

    // console.log('data////', data);

    // Use history.push to navigate to a different route
    // history.push(`/allSports/${data.sport_id}`);
  };

  handleNavigateCasino = () => {
    const navigate = useNavigate();
    navigate('/lobbyGame')
  }

  handleTabSelect = (event) => {
    // console.log('event...........?', event);
  }

  handleClick = (tabKey) => () => {
    // Do something with the tabKey
    // console.log(`Tab with key ${tabKey} was clicked`);
    this.handleTabSelect(tabKey);
  };

  handleTabClick = (selectedKey) => {
    // console.log('selectedKeyselectedKeyselectedKey', typeof (selectedKey));
    // Perform any actions or pass the selectedKey to another function
    // console.log(`Tab clicked: ${selectedKey}`);

    this.setState({ sport_id: selectedKey })

    if (selectedKey == "1" || selectedKey == "2" || selectedKey == "4" || selectedKey == "111") {
      let sportIdWiseReqData = { "limit": 50, "pageno": 1, "sport_id": selectedKey, "series_id": 0, "type": "home" }
      this.props.dispatch(userActions.event_game_SportIdWise(sportIdWiseReqData))
    }


  };

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


  handleItemClick(link) {
    this.setState({ activeLink: link });
  }

  renderSwitch(tabKey) {
    let param = tabKey.sport_id;
    switch (param) {
      case 1:
        return (
          <RiFootballFill style={{ "width": "20px", height: "20px" }} />
        );
      case 2:
        return (
          <PiTennisBallLight style={{ "width": "20px", height: "20px" }} />
        );
      case 4:
        return (
          <MdSportsCricket style={{ "width": "20px", height: "20px" }} />
        );
      case 111:
        return (
          <MdOutlineCasino style={{ "width": "20px", height: "20px" }} />
        );
      default:
        return null
    }
  }

  render() {
    let { users } = this.props;
    let { matchListSportIdWise } = users;
    const { activeLink } = this.state;
    return (
      <>
        <div className="center-main-container report-page">

          <div className={`d-xl-none d-block ${style.liveEventWrapper}`}>
            <LiveEvents
              renderSwitch={this.renderSwitch}
              InplayMatches={this.state.matchList}
            />
          </div>
          <div className="center-container">

            <div className={`${styleMain.customLinks} customLinks d-xl-none`}>
              <ul>
                <li>
                  <Link to={`/providerlobbygame/${201206}`} >Aviator</Link>
                </li>
                <li className={activeLink === 'SPORTS' ? 'active' : ''}>
                  <Link to="/home" onClick={() => this.handleItemClick('SPORTS')}>Sports</Link>
                </li>
                <li className={activeLink === 'OUR_CASINO' ? 'active' : ''}>
                  <Link to="/ourcasino" onClick={() => this.handleItemClick('OUR_CASINO')}>Our Casino</Link>
                </li>
                <li className={activeLink === 'LIVE_CASINO' ? 'active' : ''}>
                  <Link to="/livecasino" onClick={() => this.handleItemClick('LIVE_CASINO')}>Live Casino</Link>
                </li>
                <li className={activeLink === 'SLOTS' ? 'active' : ''}>
                  <Link to="/slots" onClick={() => this.handleItemClick('SLOTS')}>Slots</Link>
                </li>
                <li className={activeLink === 'FANTASY' ? 'active' : ''}>
                  <Link to="/fantasy" onClick={() => this.handleItemClick('FANTASY')}>Fantasy</Link>
                </li>
              </ul>
            </div>


            <div className={``}>
              <div className="d-xl-block d-none">
                <LiveEvents
                  renderSwitch={this.renderSwitch}
                  InplayMatches={this.state.matchList}
                />
              </div>
              <div className={style.tabsGroup}>

                <Tabs
                  defaultActiveKey={this.state.sportList[0]} id="my-tabs"
                  onSelect={(k) => {
                    this.handleTabClick(k);
                  }}
                >
                  {this.state.sportList && this.state.sportList.length > 0 ? this.state.sportList.map(element => (
                    <Tab eventKey={element && element.sport_id ? element.sport_id : "kkk00"}
                      title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>              
                        {this.renderSwitch(element)}
                      </div>, this.getTitle(element)]}
                    >
                      {
                        this.state.sport_id === "111" ?
                          null :
                          <>
                            <div className="bet-table">
                              <div className="bet-table-header">
                                <div className="bet-nation-name">
                                  <b>Game</b>
                                </div>
                                <div className="bet-nation-odd">
                                  <b>1</b>
                                </div>
                                <div className="bet-nation-odd">
                                  <b>X</b>
                                </div>
                                <div className="bet-nation-odd">
                                  <b>2</b>
                                </div>
                              </div>
                              <div className="bet-table-body">

                                <>
                                  {
                                    matchListSportIdWise && matchListSportIdWise.InplayMatches && matchListSportIdWise.InplayMatches.length > 0 ?
                                      matchListSportIdWise.InplayMatches.map((element, index) => (
                                        <React.Fragment key={index}>
                                          <div className="bet-table-row">
                                            <div className="bet-nation-name">
                                              <Link className="bet-nation-game-name"
                                                to={`/match-detail/${element.sport_id}/${element.series_id}/${element.match_id}/${element.market_id}`}
                                              >
                                                <span>{element && element.name ? element.name : null}</span>
                                                <span className="d-none d-md-inline-block">
                                                  &nbsp;/&nbsp;
                                                </span>
                                                <span>
                                                  {moment(
                                                    parseInt(
                                                      element && element.start_date ? element.start_date : null,
                                                    ) * 1000,
                                                  )
                                                    .utcOffset("+05:30")
                                                    .format("DD/MM/YYYY, HH:mm:ss ")}

                                                </span>
                                              </Link>
                                              <div className="game-icons">
                                                <div className="game-icon">
                                                  <span className="active" />
                                                </div>
                                                <div className="game-icon">
                                                  <i className="fas fa-tv icon-tv" />
                                                </div>
                                                <div className="game-icon">
                                                  <img src={facebook} alt="f" />
                                                </div>
                                                <div className="game-icon">
                                                  <img src={Bm} alt="BM" />
                                                </div>
                                                <div className="game-icon" />
                                              </div>
                                            </div>
                                            <div className="bet-nation-odd d-xl-none">
                                              <b>1</b>
                                            </div>
                                            <div className="bet-nation-odd d-xl-none">
                                              <b>X</b>
                                            </div>
                                            <div className="bet-nation-odd d-xl-none">
                                              <b>2</b>
                                            </div>


                                            <>
                                              {element && element.InplayStatus === "CLOSE" ?
                                                <>
                                                  <div className="bet-nation-odd suspended-box">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd suspended-box">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </> :
                                                <>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex &&
                                                          element.runner_json[0].ex.availableToBack && element.runner_json[0].ex.availableToBack[0] &&
                                                          element.runner_json[0].ex.availableToBack[0].price ?
                                                          element.runner_json[0].ex.availableToBack[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex &&
                                                          element.runner_json[0].ex.availableToLay && element.runner_json[0].ex.availableToLay[0] &&
                                                          element.runner_json[0].ex.availableToLay[0].price ?
                                                          element.runner_json[0].ex.availableToLay[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex &&
                                                          element.runner_json[2].ex.availableToBack && element.runner_json[2].ex.availableToBack[0] &&
                                                          element.runner_json[2].ex.availableToBack[0].price ?
                                                          element.runner_json[2].ex.availableToBack[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex &&
                                                          element.runner_json[2].ex.availableToLay && element.runner_json[2].ex.availableToLay[0] &&
                                                          element.runner_json[2].ex.availableToLay[0].price ?
                                                          element.runner_json[2].ex.availableToLay[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex &&
                                                          element.runner_json[1].ex.availableToBack && element.runner_json[1].ex.availableToBack[0] &&
                                                          element.runner_json[1].ex.availableToBack[0].price ?
                                                          element.runner_json[1].ex.availableToBack[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex &&
                                                          element.runner_json[1].ex.availableToLay && element.runner_json[1].ex.availableToLay[0] &&
                                                          element.runner_json[1].ex.availableToLay[0].price ?
                                                          element.runner_json[1].ex.availableToLay[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                  </div>

                                                </>
                                              }
                                            </>

                                          </div>
                                        </React.Fragment>
                                      )) : null
                                  }
                                </>

                                <>
                                  {
                                    matchListSportIdWise && matchListSportIdWise.UpCommingMatches && matchListSportIdWise.UpCommingMatches.length > 0 ?
                                      matchListSportIdWise.UpCommingMatches.map((element, index) => (
                                        <React.Fragment key={index}>
                                          <div className="bet-table-row">
                                            <div className="bet-nation-name">
                                              <Link className="bet-nation-game-name"
                                                to={`/match-detail/${element.sport_id}/${element.series_id}/${element.match_id}/${element.market_id}`}

                                              >
                                                <span>{element && element.name ? element.name : null}</span>
                                                <span className="d-none d-md-inline-block">
                                                  &nbsp;/&nbsp;
                                                </span>
                                                <span> {moment(
                                                  parseInt(
                                                    element && element.start_date ? element.start_date : null,
                                                  ) * 1000,
                                                )
                                                  .utcOffset("+05:30")
                                                  .format("DD/MM/YYYY, HH:mm:ss ")}</span>
                                              </Link>
                                              <div className="game-icons">
                                                <div className="game-icon" />
                                                <div className="game-icon" />

                                                <div className="game-icon">
                                                  <i className="fas fa-tv icon-tv" />
                                                </div>
                                                <div className="game-icon">
                                                  <img src={facebook} alt="f" />
                                                </div>
                                                <div className="game-icon">
                                                  <img src={Bm} alt="BM" />
                                                </div>

                                                <div className="game-icon" />
                                              </div>
                                            </div>
                                            <div className="bet-nation-odd d-xl-none">
                                              <b>1</b>
                                            </div>
                                            <div className="bet-nation-odd d-xl-none">
                                              <b>X</b>
                                            </div>
                                            <div className="bet-nation-odd d-xl-none">
                                              <b>2</b>
                                            </div>


                                            <>
                                              {element && element.InplayStatus === "CLOSE" ?
                                                <>
                                                  <div className="bet-nation-odd suspended-box">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd suspended-box">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>-</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </> :
                                                <>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex && element.runner_json[0].ex.availableToBack && element.runner_json[0].ex.availableToBack[0] && element.runner_json[0].ex.availableToBack[0].price ? element.runner_json[0].ex.availableToBack[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex && element.runner_json[0].ex.availableToLay && element.runner_json[0].ex.availableToLay[0] && element.runner_json[0].ex.availableToLay[0].price ? element.runner_json[0].ex.availableToLay[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex && element.runner_json[2].ex.availableToBack && element.runner_json[2].ex.availableToBack[0] && element.runner_json[2].ex.availableToBack[0].price ? element.runner_json[2].ex.availableToBack[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex && element.runner_json[2].ex.availableToLay && element.runner_json[2].ex.availableToLay[0] && element.runner_json[2].ex.availableToLay[0].price ? element.runner_json[2].ex.availableToLay[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="bet-nation-odd">
                                                    <div className="back odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex && element.runner_json[1].ex.availableToBack && element.runner_json[1].ex.availableToBack[0] && element.runner_json[1].ex.availableToBack[0].price ? element.runner_json[1].ex.availableToBack[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                    <div className="lay odd-box">
                                                      <span className="bet-odd">
                                                        <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex && element.runner_json[1].ex.availableToLay && element.runner_json[1].ex.availableToLay[0] && element.runner_json[1].ex.availableToLay[0].price ? element.runner_json[1].ex.availableToLay[0].price : "-"}</b>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </>
                                              }
                                            </>
                                          </div>
                                        </React.Fragment>
                                      )) : null
                                  }
                                </>
                              </div>
                            </div>
                          </>
                      }

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                          <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                          <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                          <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                          <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                          <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                          <Link to={`/lobbyGame/${201158}/${"DC"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/7_B_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                          <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                          <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                      </div>

                    </Tab>
                  )) : null
                  }

                  <Tab eventKey="horseracing" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <FaHorse style={{ "width": "20px", height: "20px" }} />
                  </div>, "Horse Racing"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                    </div>

                  </Tab>
                  <Tab eventKey="greyhound-racing" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <i class="fa-solid fa-dog"></i></div>, "Greyhound Racing"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                  


                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="table-tennis" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <FaTableTennisPaddleBall style={{ "width": "20px", height: "20px" }} />
                  </div>, "Table Tennis"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
   
                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                    </div>

                  </Tab>
                  <Tab eventKey="kabaddi" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <MdSportsKabaddi style={{ "width": "20px", height: "20px" }} />
                  </div>, "Kabaddi"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="badminton" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <i class="fa-solid fa-table-tennis-paddle-ball"></i>
                  </div>, "Badminton"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/7_B_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to="#">
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/3_Cards_Judgement.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
  
                    </div>
                  </Tab>
                  <Tab eventKey="basketball" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <FaBasketballBall style={{ "width": "20px", height: "20px" }} />
                  </div>, "Basketball"]}>
                    No Record Found

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

                  </Tab>
                  <Tab eventKey="american-football" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <IoAmericanFootball style={{ "width": "20px", height: "20px" }} />
                  </div>, "American Football"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                    </div>

                  </Tab>
                  <Tab eventKey="volleyball" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}>
                    <FaVolleyball style={{ "width": "20px", height: "20px" }} />
                  </div>, "Volleyball"]}>
                    No Record Found

                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                    </div>

                  </Tab>
                  <Tab eventKey="snooker" title={[<div className="d-xl-none" style={{ paddingBottom: "4px" }}><i class="fa-solid fa-table-tennis-paddle-ball"></i></div>, "Snooker"]}>
                    No Record Found
                    <div className="casino-list mt-2">

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200237}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100047}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200229}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200220}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200139}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200206}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200239}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${201158}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${200205}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100050}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200207}/${"DC"}`}>
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
                        <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
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
                        <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>

                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200109}/${"DC"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                        <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                      <div className="casino-list-item">
                        <Link to={`/lobbyGame/${200215}/${"EZUGI"}`}>
                          <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                        </Link>
                      </div>
                    </div>
                  </Tab>
                </Tabs>

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
