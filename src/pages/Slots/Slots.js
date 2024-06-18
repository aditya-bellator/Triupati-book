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

import Sidebar from "../../components/Sidebar/Sidebar";
import { authHeader } from '../../_helpers';

//scss
import style from "./Slots.module.scss";
import styleMain from "./Main.module.scss";
import "./index.css"


//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";
import SplashImg from "../../assets/png/wel-1702816082206.png";


class Slots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportList: {},
      matchList: {},
      matchListSportIdWise: {},
      loginPopUp: true,
      sport_id: 4,
      activeLink: 'SLOTS',
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

  
  handleItemClick(link) {
    this.setState({ activeLink: link });
  }


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
    // console.log('param??///', param); <i class="fa-solid fa-heart"></i>
    switch (param) {
      case 1:
        return "fa-solid fa-baseball"
      case 2:
        return "fa-solid fa-table-tennis-paddle-ball"
      case 4:
        return "fa-solid fa-heart"
      case 111:
        return "fa fa-circle-c"
      default:
        return null
    }
  }

  render() {
    let { users } = this.props;
    let { matchListSportIdWise } = users;
    const { activeLink } = this.state;
    console.log('this.state.sport_id............', this.state.sport_id);

    return (
      <>
        <div className="center-main-container report-page">
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
              <div className={style.tabsGroup}>

                <div className="casino-list mt-2">

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901001}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Race_to_17_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901002}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/3_card_judgement_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>
                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901003}/${"RG"}`}>

                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/7up&down_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />

                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901004}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/32_Cards_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901005}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Amar_Akbar_Anthony_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901006}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Andar_bahar_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901007}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Baccarat_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901008}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Center_Card_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901009}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/dragon_tiger_lobby_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901010}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/HI_LO_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901011}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Race_T20_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901013}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/roulette_lobby_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901014}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Super_Over_one_day_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901015}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Super_Over_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901016}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti2_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>
                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901017}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teen_patti_one_day_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901018}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teen_Patti_one_day_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901019}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Teenpatti_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901020}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Worli_matka_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901021}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Bollywood_Casino_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901022}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Casino_Meter_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901023}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Cricket_War_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901024}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Dus_Ka_Dum_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901025}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Foot_Ball_Studio_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901026}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/High_Card_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901027}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Movie_Casino_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901028}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Muflis_One_day_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901029}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/muflis_teenpatti_lobby_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901030}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Queen_Race_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901031}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Roulette_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901032}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Side_Bet_City_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901033}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/The_Trap_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                        ,
                      }} />
                    </Link>
                  </div>

                  <div className="casino-list-item">
                    <Link to={`/lobbyGame/${901034}/${"RG"}`}>
                      <div className="casino-list-item-banner" style={{
                        backgroundImage: 'url("https://herobook.in/images/Trio_slot.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
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

export default connect(mapStateToProps)(Slots);