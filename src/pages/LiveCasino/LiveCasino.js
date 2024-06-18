import React, { Component } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import axios from 'axios';
import { history } from '../../_helpers';
import { userActions } from '../../_actions';
// Icons
import { MdOutlineCasino } from "react-icons/md";
import { RiFootballFill } from "react-icons/ri";
import { MdSportsCricket } from "react-icons/md";
import { PiTennisBallLight } from "react-icons/pi";
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

import Sidebar from "../../components/Sidebar/Sidebar";
import { authHeader } from '../../_helpers';

//scss
import style from "./LiveCasino.module.scss";
import styleMain from "./Main.module.scss";
import "./index.css";


//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";
import SplashImg from "../../assets/png/wel-1702816082206.png";


class LiveCasino extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // outerSportData: {},
      sportList: {},
      matchList: {},
      matchListSportIdWise: {},
      loginPopUp: true,
      sport_id: 4,
      activeLinkParentTab: 'LIVE_CASINO',
      activeLink: 'EVOLUTION',
      game_id: '200215',
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
    let sportIdWiseReqData = { "limit": 50, "pageno": 1, "sport_id": this.state.sport_id, "series_id": 0, "type": "home" }
    this.props.dispatch(userActions.event_game_SportIdWise(sportIdWiseReqData))






    this.props.dispatch(userActions.game_lobby({ "gameId": this.state.game_id }))


  }


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


  handleItemClick(link, providerId) {
    this.setState({ activeLink: link, game_id: providerId }, () => {
      this.props.dispatch(userActions.game_lobby({ "gameId": providerId }))
    });
  }

  handleItemClickParentTab(link) {
    this.setState({ activeLinkParentTab: link });
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
    let { matchListSportIdWise, game_lobby } = users;
    let { url, token } = game_lobby ? game_lobby : {};

    const { activeLink, activeLinkParentTab } = this.state;
    const events = [
      "Celta Vigo v Granada",
      "Augsburg v Dortmund",
      "Newcastle v Fulham",
      "Bournemouth v Luton",
      "Athletic Bilbao v Atletico Madrid",
    ];


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


            <div className={`${styleMain.customLinksTwo} customLinksTwo d-xl-none`}>
              <ul>
                <li className={activeLink === 'EVOLUTION' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('EVOLUTION', '200215')}
                  >Evolution</Link>
                </li>
                <li className={activeLink === 'EZUGI' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('EZUGI', '100000')}
                  >Ezugi</Link>
                </li>
                <li className={activeLink === 'ROYAL_GAMING' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('ROYAL_GAMING', '900000')}
                  >Royal Gaming</Link>
                </li>
                <li className={activeLink === 'A_E_SEXY' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('A_E_SEXY', '400000')}
                  >A E Sexy</Link>
                </li>
                <li className={activeLink === 'VIRTUAL_SPORTS_BETTING' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('VIRTUAL_SPORTS_BETTING', '800001')}
                  >Virtual Sports Betting</Link>
                </li>
                <li className={activeLink === 'JILI' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('JILI', '600000')}
                  >Jili</Link>
                </li>
                <li className={activeLink === 'LUDO_GAMING' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('LUDO_GAMING', '600113')}
                  >Ludo Gaming</Link>
                </li>
                <li className={activeLink === 'AVIATOR' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('AVIATOR', '201206')}
                  >Aviator</Link>
                </li>
                <li className={activeLink === 'SUPERNOVA7' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('SUPERNOVA7', '500001')}
                  >Supernova 7</Link>
                </li>
                <li className={activeLink === 'FORTUNE_IS_IN_YOUR_HAND' ? 'active' : ''}>
                  <Link to="#"
                    onClick={() => this.handleItemClick('FORTUNE_IS_IN_YOUR_HAND', '201153')}
                  >Fortune Is In Your Hand</Link>
                </li>
              </ul>
            </div>

        
            <div>
              <div className="center-main-container ball-by-ball detail-page">
                <div className="center-container w-100 h-100">
                  <div className="detail-page-container">


                    <div className="iframe-container">
                      <iframe
                        width="560"
                        height="660"
                        src={url}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>

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

export default connect(mapStateToProps)(LiveCasino);
