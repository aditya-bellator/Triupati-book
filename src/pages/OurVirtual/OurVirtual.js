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
import style from "./OurVirtual.module.scss";
import styleMain from "./Main.module.scss";


//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";
import SplashImg from "../../assets/png/wel-1702816082206.png";


class OurVirtual extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                <li>
                  <Link to="/ourcasino">Our Casino</Link>
                </li>
                <li style={{ background: "#0088cce6" }}>
                  <Link to="#">Our Virtual</Link>
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
                <li className={activeLink === 'TEENPATTI' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('TEENPATTI')}
                  >TeenPatti</Link>
                </li>
                <li className={activeLink === 'DRAGON_TIGER' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('DRAGON_TIGER')}
                  >Dragon Tiger</Link>
                </li>
                <li className={activeLink === 'Lucky_7' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('Lucky_7')}
                  >Lucky 7</Link>
                </li>
                <li className={activeLink === 'BOLLYWOOD' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('BOLLYWOOD')}
                  >Bollywood</Link>
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
                          <Link to={`/lobbyGame/${901028}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/7_A_Lucky.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901036}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/TRIO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901015}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901007}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901011}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Bollywood_Casino.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>


                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901016}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Dragon_Tiger_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${900039}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901003}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to={`/lobbyGame/${901015}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Muflis_Teenpatti.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${900039}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti_1_Day.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                              ,
                            }} />
                          </Link>
                        </div>

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901003}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/Teenpatti%2020-20%202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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
                          <Link to={`/lobbyGame/${901016}/${"RG"}`}>
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

            {/* OTHERS SECTION */}
            <>
              {activeLink === 'OTHERS' ?
                <>
                  <div className={``}>
                    <div className={style.tabsGroup}>

                      <div className="casino-list mt-2">

                        <div className="casino-list-item">
                          <Link to={`/lobbyGame/${901036}/${"RG"}`}>
                            <div className="casino-list-item-banner" style={{
                              backgroundImage: 'url("https://herobook.in/images/TRIO.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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

export default connect(mapStateToProps)(OurVirtual);
// export default OurVirtual;