import React, { Component } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import axios from 'axios';
import { history } from '../../_helpers';
import { userActions } from '../../_actions';
import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";
//components
import LiveEvents from "../../components/LiveEvents/LiveEvents";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Modal } from "react-bootstrap";

// Icons
import { MdOutlineCasino } from "react-icons/md";
import { RiFootballFill } from "react-icons/ri";
import { MdSportsCricket } from "react-icons/md";
import { PiTennisBallLight } from "react-icons/pi";

import Sidebar from "../../components/Sidebar/Sidebar";
import { authHeader } from '../../_helpers';

//scss
import style from "./OurCasino.module.scss";
import styleMain from "./Main.module.scss";

//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";
import SplashImg from "../../assets/png/wel-1702816082206.png";


class OurCasino extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // outerSportData: {},
      sportList: {},
      matchList: {},
      matchListSportIdWise: {},
      loginPopUp: true,
      sport_id: 4,
      activeLinkParentTab: 'OUR_CASINO',
      activeLink: 'ALL_CASINO',
    }
  }


  componentDidMount() {

    const returningUser = localStorage.getItem("seenPopUp");
    this.setState({ loginPopUp: !returningUser })
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

    let sportIdWiseReqData = { "limit": 50, "pageno": 1, "sport_id": this.state.sport_id, "series_id": 0, "type": "home" }
    this.props.dispatch(userActions.event_game_SportIdWise(sportIdWiseReqData))

  }


  closeModalHandler = () => {
    localStorage.setItem("seenPopUp", true);
    this.setState({ loginPopUp: false })
  }


  navigateMatchDeatils = (data) => {

    // console.log('data////', data);
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

  handleItemClickParentTab(link) {
    this.setState({ activeLinkParentTab: link });
  }

  handleItemClick(link) {
    this.setState({ activeLink: link });
  }


  render() {
    let { users } = this.props;
    let { matchListSportIdWise } = users;
    const { activeLink, activeLinkParentTab } = this.state;

    return (
      <>
        <div className="center-main-container report-page">

          <div className="center-container">
            <div className={`${styleMain.customLinks} customLinks d-xl-none`}>
              <ul>
                <li>
                  <Link to={`/providerlobbygame/${201206}`} >Aviator</Link>
                </li>
                <li className={activeLinkParentTab === 'SPORTS' ? 'active' : ''}>
                  <Link to="/home" onClick={() => this.handleItemClickParentTab('SPORTS')}>Sports</Link>
                </li>
                <li className={activeLinkParentTab === 'OUR_CASINO' ? 'active' : ''}>
                  <Link to="/ourcasino" onClick={() => this.handleItemClickParentTab('OUR_CASINO')}>Our Casino</Link>
                </li>
                <li className={activeLinkParentTab === 'LIVE_CASINO' ? 'active' : ''}>
                  <Link to="/livecasino" onClick={() => this.handleItemClickParentTab('LIVE_CASINO')}>Live Casino</Link>
                </li>
                <li className={activeLinkParentTab === 'SLOTS' ? 'active' : ''}>
                  <Link to="/slots" onClick={() => this.handleItemClickParentTab('SLOTS')}>Slots</Link>
                </li>
                <li className={activeLinkParentTab === 'FANTASY' ? 'active' : ''}>
                  <Link to="/fantasy" onClick={() => this.handleItemClickParentTab('FANTASY')}>Fantasy</Link>
                </li>
              </ul>
            </div>

            <div className={`${styleMain.casinoStrip} casinoStrip d-xl-none`} style={{ background: "#2c3e50" }}>
              <ul>
                <li style={{ background: "#0088cce6" }}>
                  <Link to="#">Our Casino</Link>
                </li>
                <li>
                  <Link to="/ourvirtual">Our Virtual</Link>
                </li>
              </ul>
            </div>

            <div className={`${styleMain.customLinksTwo} customLinksTwo d-xl-none`}>
              <ul>
                <li className={activeLink === 'ALL_CASINO' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('ALL_CASINO')}
                  >All Casino</Link>
                </li>
                <li className={activeLink === 'ROULETTE' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('ROULETTE')}
                  >Roulette</Link>
                </li>
                <li className={activeLink === 'TEENPATTI' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('TEENPATTI')}
                  >TeenPatti</Link>
                </li>
                <li className={activeLink === 'POKER' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('POKER')}
                  >Poker</Link>
                </li>
                <li className={activeLink === 'BACCARAT' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('BACCARAT')}
                  >Baccarat</Link>
                </li>
                <li className={activeLink === 'DRAGON_TIGER' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('DRAGON_TIGER')}
                  >Dragon Tiger</Link>
                </li>
                <li className={activeLink === '32_CARD' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('32_CARD')}
                  >32 card</Link>
                </li>
                <li className={activeLink === 'ANDAR_BAHAR' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('ANDAR_BAHAR')}
                  >Andar Bahar</Link>
                </li>
                <li className={activeLink === 'Lucky_7' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('Lucky_7')}
                  >Lucky 7</Link>
                </li>
                <li className={activeLink === '3_CARD_JUDGEMENT' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('3_CARD_JUDGEMENT')}
                  >3 Card Judgement</Link>
                </li>
                <li className={activeLink === 'CASINO_WAR' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('CASINO_WAR')}
                  >Casino War</Link>
                </li>
                <li className={activeLink === 'WORLI' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('WORLI')}
                  >Worli</Link>
                </li>
                <li className={activeLink === 'SPORTS' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('SPORTS')}
                  >Sports</Link>
                </li>
                <li className={activeLink === 'BOLLYWOOD' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('BOLLYWOOD')}
                  >Bollywood</Link>
                </li>
                <li className={activeLink === 'LOTTERY' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('LOTTERY')}
                  >Lottery</Link>
                </li>
                <li className={activeLink === 'QUEEN' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('QUEEN')}
                  >Queen</Link>
                </li>
                <li className={activeLink === 'RACE' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('RACE')}
                  >Race</Link>
                </li>
                <li className={activeLink === 'OTHERS' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('OTHERS')}
                  >Others</Link>
                </li>
              </ul>
            </div>


            {/* ALL_CASINO SECTION */}
            <>
              {activeLink === 'ALL_CASINO' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Worli_Matka.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Bollywood_Casino.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/QUEEN.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Race_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/super_Over_RSA_ENG.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100049}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/TRAP.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Race_to_17.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/TRIO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Note_Number.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Kaun_Banega_Crorepati.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/1_card_20_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
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
                          <Link to={`/lobbyGame/${100064}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_2_0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Race_to_2nd.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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


                        <div className="casino-list-item">
                          <Link to="#">
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
                </>
                :
                null}
            </>

            {/* ROULETTE SECTION */}
            <>
              {activeLink === 'ROULETTE' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>
                      <div className="casino-list mt-2">
                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100029}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Roulette_BL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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

                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* TEENPATTI SECTION */}
            <>
              {activeLink === 'TEENPATTI' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">


                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100046}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Instant_TeenPatti_3.0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to={`/lobbyGame/${100048}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Test.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/2_Cards_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/20_20_teenpatti_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%20Open.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* POKER SECTION */}
            <>
              {activeLink === 'POKER' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>
                      <div className="casino-list mt-2">
                        <div className="casino-list-item">
                          <Link to="#">
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/6_player_Poker.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* BACCARAT SECTION */}
            <>
              {activeLink === 'BACCARAT' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100069}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://nd.sprintstaticdata.com/casino-icons/lc/teensin.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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

                      </div>



                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* DRAGON_TIGER SECTION */}
            <>
              {activeLink === 'DRAGON_TIGER' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
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
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Casino_20_20_DTL.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/20_20_Dragon_Tiger_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>



                      </div>

                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* 32_CARD SECTION */}
            <>
              {activeLink === '32_CARD' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100067}/${"EZUGI"}`}>                            <div className="casino-list-item-banner" style={{
                            backgroundImage: 'url("https://herobook.in/images/32_Cards_A.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                            ,
                          }} />
                          </Link>
                        </div>
                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/32_Cards_B.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                      </div>

                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* ANDAR_BAHAR SECTION */}
            <>
              {activeLink === 'ANDAR_BAHAR' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Andar_Bahar_50_Cards.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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

                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* Lucky_7 SECTION */}
            <>
              {activeLink === 'Lucky_7' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100066}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/7_A_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/7_B_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Casino%20Lucky%207-C.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* 3_CARD_JUDGEMENT SECTION */}
            <>
              {activeLink === '3_CARD_JUDGEMENT' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/3_Cards_Judgement.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>


            {/* CASINO_WAR SECTION */}
            <>
              {activeLink === 'CASINO_WAR' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/casinoWar.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* WORLI SECTION */}
            <>
              {activeLink === 'WORLI' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Worli_Matka.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Instant%20Worli.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>



                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* SPORTS SECTION */}
            <>
              {activeLink === 'SPORTS' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${100062}/${"EZUGI"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/5_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item" >
                          <Link
                            to={`/lobbyGame/${800001}/${"DC"}`}
                          >
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/1_Card_Meter.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/20_20_Cricket_Match.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Casino%20Meter.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/super_Over_RSA_ENG.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* BOLLYWOOD SECTION */}
            <>
              {activeLink === 'BOLLYWOOD' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_2_0.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${900007}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_Anthony_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Bollywood_Casino.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* LOTTERY SECTION */}
            <>
              {activeLink === 'LOTTERY' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Lottery_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* QUEEN SECTION */}
            <>
              {activeLink === 'QUEEN' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/QUEEN.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* RACE SECTION */}
            <>
              {activeLink === 'RACE' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Race_to_2nd.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Race_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Race_to_17.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                      </div>
                    </div>
                  </div>
                </>
                :
                null}
            </>

            {/* OTHERS SECTION */}
            <>
              {activeLink === 'OTHERS' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

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
                          <Link to={`/lobbyGame/${100068}/${"EZUGI"}`}>

                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/SICBO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />

                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/DUS_KA_DUM.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/One_Card_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/1_card_20_20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Kaun_Banega_Crorepati.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Note_Number.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to="#">
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/TRIO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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

                      </div>
                    </div>
                  </div>

                </>
                :
                null}
            </>

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

export default connect(mapStateToProps)(OurCasino);
