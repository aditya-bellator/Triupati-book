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
import style from "./Fantasy.module.scss";
import styleMain from "./Main.module.scss";


//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";
import SplashImg from "../../assets/png/wel-1702816082206.png";


class Fantasy extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // console.log('data////', data);
    // // Use history.push to navigate to a different route
    // // history.push(`/allSports/${data.sport_id}`);
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
    console.log('this.state.sport_id............', this.state.sport_id);

    return (
      <>
        <div className="center-main-container report-page">

          <div className="center-container">
            
            <div className={``}>
              <div className={style.tabsGroup}>

                <Tabs>

                  <Tab eventKey="Scratch" title={[<div className="d-xl-none"></div>, "Scratch"]} >
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
                    </div>
                  </Tab>
                  <Tab eventKey="Aviator" title={[<div className="d-xl-none"></div>, "Aviator"]}>

                    <div className={``}>
                      <div className={style.tabsGroup}>

                        <div className="casino-list mt-2">

                          <div className="casino-list-item2">
                            <Link to={`/providerlobbygame/${201206}`}>
                              <div className="casino-list-item2-banner" style={{
                                backgroundImage: 'url("https://herobook.in/images/aviator.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")'
                                ,
                              }} />
                            </Link>
                          </div>

                        </div>

                      </div>
                    </div>

                  </Tab>
                  <Tab eventKey="Creedroomz" title={[<div className="d-xl-none"></div>, "Creedroomz"]}>
                    Tab content for Contact
                  </Tab>
                  <Tab eventKey="Our" title={[<div className="d-xl-none"></div>, "Our"]}>
                    Tab content for Contact
                  </Tab>
                  <Tab eventKey="Smart" title={[<div className="d-xl-none"></div>, "Smart"]}>
                    Tab content for Contact
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

export default connect(mapStateToProps)(Fantasy);
