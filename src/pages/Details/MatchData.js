import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from "moment";
import { isMobile } from "react-device-detect";
import { userActions } from '../../_actions';
import BetPlaceMobileView from '../../components/BetPlaceMobileView/BetPlaceMobileView';
// import FancyPlaceBetMobileView from '../../components/FancyPlaceBetMobileView/FancyPlaceBetMobileView';


class MatchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetailsData: {},
      // matchSession: {},
      matchScore: {},
      MatchDetailsState: null,
      // matchInfo: {},
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (true) {
      return {
        ...nextProps,
      }
    } else {
      return {
        ...nextProps
      }
    }
  }


  componentDidMount() {
    const { sport_id, series_id, match_id, market_id } = this.props;

    console.log('lllllllllllllkkkkk......', sport_id, series_id, match_id, market_id);

    let matchListReqData = { "match_id": match_id, "sport_id": sport_id }

    if (sport_id === "4") {
      this.props.dispatch(userActions.event_detals(matchListReqData));
    }

    if (sport_id === "2") {
      this.props.dispatch(userActions.event_tennis(matchListReqData));
    }

    if (sport_id === "1") {
      this.props.dispatch(userActions.event_footbal(matchListReqData));
    }




    let sessionReq = { "match_id": match_id }
    this.props.dispatch(userActions.event_session(sessionReq));



    // getScore Api this

    const matchScoreRes = fetch(`https://score.jeoad.com/api/v1/getScore?matchId=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      let result = data.data;

      if (result === null || result == undefined) {
        return {}
      }
      else {
        this.setState({
          matchScore: result
        });
      }

    })


    this.interval = setInterval(() => this.loadData(), 1000);
    this.interval1 = setInterval(() => this.loadData1(), 1500);

  }


  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval1);
  }

  loadData = () => {
    const { sport_id, series_id, match_id, market_id } = this.props;
    let matchListReqData = { "match_id": match_id, "sport_id": sport_id }

    if (sport_id === "4") {
      this.props.dispatch(userActions.event_detals(matchListReqData));
    }


    if (sport_id === "2") {
      this.props.dispatch(userActions.event_tennis(matchListReqData));
    }

    if (sport_id === "1") {
      this.props.dispatch(userActions.event_footbal(matchListReqData));
    }


    let sessionReq = { "match_id": match_id }
    this.props.dispatch(userActions.event_session(sessionReq));

  }

  loadData1 = () => {

    const { sport_id, series_id, match_id, market_id } = this.props;
    const matchScoreRes = fetch(`https://score.jeoad.com/api/v1/getScore?matchId=${match_id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      let result = data.data;

      if (result === null || result == undefined) {
        return {}
      }
      else {
        this.setState({
          matchScore: result
        });
      }

    })

  }

  // isBigEnough = (value) => {
  //   console.log('value___isBigEnough????', value);
  //   // return value >= 10;
  // }

  calculateOvers = (balls) => {
    // Calculate the number of overs
    var overs = Math.floor(balls / 6) + ((balls % 6) / 10);
    return overs;
  }


  calculateCurrentRunRate = (runs, balls) => {
    console.log('runs____balls???', runs, balls);
    // Calculate the current run rate
    var overs = this.calculateOvers(balls); // Assuming you have a function for calculating overs
    var currentRunRate = runs / overs;
    console.log('currentRunRate111111111', currentRunRate);
    return currentRunRate.toFixed(2); // Keep the result rounded to two decimal places
  }

  getcolorblink = (prevPrice, nextPrice, defaultColor) => {
    console.log('prevPrice, nextPrice, defaultColor', prevPrice, nextPrice, defaultColor);
    let color = defaultColor;
    if (prevPrice !== nextPrice) {
      color = "#ffff00";
    }
    setTimeout(() => {
      color = defaultColor;
    }, 2000);

    return color
  }

  render() {

    let sessionLocalStoreDataa = JSON.parse(localStorage.getItem(`SESSION_${this.props.match_id}`));
    let oddsLocalStoreData = JSON.parse(localStorage.getItem(`ODDS_MARKET_2_33083272`));
    let { users, handleBackOpen, handleBackToWinTheToss, handleBackCompleteMatch, handleFancyBetModalOpen, handleBookmakerBetModalOpenSportWise, handleBackOpenTiedMatch, currentRunner, profit, sectionType, handleBackOpenOtherMarketSportIDWise } = this.props;
    let { eventDetals, matchSession, matchScoreDDD, overByOver_session, ballByBall_session, normal_session } = users;
    let { MatchDetails, BookerMakerMarket, OtherMarketList, bm } = eventDetals ? eventDetals : {};

    return (
      <>
        <div className="scorecard">
          <div className="game-header">
            <span>{MatchDetails && MatchDetails.name ? MatchDetails.name : "-"} </span>
            <span className="float-right">{moment(
              parseInt(
                MatchDetails && MatchDetails.start_date ? MatchDetails.start_date : null,
              ) * 1000,
            )
              .utcOffset("+05:30")
              .format("DD/MM/YYYY, HH:mm:ss ")}</span>
          </div>

          {this.state.matchScore != null ?
            <>
              <div className="row">

                <div className="col-12 col-md-6">
                  <p className="team-1 row">
                    <span className="team-name col-3"> {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].team1 ? this.state.matchScore[2].team1
                      : "0"}</span>
                    <span className="score col-4 text-end">
                      {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].score ? this.state.matchScore[2].score
                        : "0"}-
                      {
                        this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].wicket ? this.state.matchScore[2].wicket
                          : null
                      }

                      ({this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].ballsdone ? (this.calculateOvers(this.state.matchScore[2].ballsdone))
                        : "0"})
                    </span>
                  </p>
                  <p className="team-1 row mt-2">
                    <span className="team-name col-3">{this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].team2 ? this.state.matchScore[2].team2
                      : "0"}</span>
                    <span className="score col-4 text-end">

                      {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].score2 ? this.state.matchScore[2].score2
                        : "0"}-

                      {
                        this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].wicket2 ? this.state.matchScore[2].wicket2
                          : null
                      }

                      ({this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].ballsdone2 ? (this.calculateOvers(this.state.matchScore[2].ballsdone2))
                        : "0.0"})
                    </span>
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-xl-end">
                        <span>{this.state.matchScore && this.state.matchScore[0] && this.state.matchScore[0].cb ? this.state.matchScore[0].cb : "-"}</span>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <p className="text-xl-end ball-by-ball mt-2">

                            {this.state.matchScore &&
                              this.state.matchScore[0] &&
                              this.state.matchScore[0].recentBalls &&
                              this.state.matchScore[0].recentBalls[0] &&
                              this.state.matchScore[0].recentBalls[0].length > 0
                              ? this.state.matchScore[0].recentBalls[0].map(
                                (elementtemp, index) => (


                                  <span className="ball-runs">{elementtemp}</span>

                                ),
                              )
                              : "NA"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </> : null
          }

        </div>


        {/* ODDS SECTION */}
        <div className="game-market market-4 df ">
          <div className="market-title">
            <span>MATCH_ODDS

            </span>
          </div>
          <div className="market-header">
            <div className="market-nation-detail">
              <span className="market-nation-name">Max: 1L</span>
            </div>
            <div className="market-odd-box no-border d-none d-md-block" />
            <div className="market-odd-box no-border d-none d-md-block" />
            <div className="market-odd-box back">
              <b>Back</b>

            </div>
            <div className="market-odd-box lay">
              <b>Lay</b>
            </div>
            <div className="market-odd-box" />
            <div className="market-odd-box no-border" />
          </div>

          <div className="market-body " data-title="OPEN">
            <>
              {
                MatchDetails && MatchDetails.runner_json && MatchDetails.runner_json.length > 0 ?
                  MatchDetails.runner_json.map((element, index) => (
                    <React.Fragment key={index}>

                      <>
                        {
                          element && element.GameStatus && element.GameStatus === "SUSPENDED" ?
                            <>
                              <div className="market-row suspended-row" data-title="SUSPENDED">
                                <div className="market-nation-detail">
                                  <span className="market-nation-name">{element && element.selectionName ? element.selectionName : "-"}</span>

                                  <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                    {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                  </h6>

                                  {profit && sectionType && sectionType === "ODDS" ?
                                    <>
                                      <h6
                                        className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                      >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                    </> : null
                                  }

                                  <div className="market-nation-book" />
                                </div>


                                <div className="market-odd-box   back2 ">
                                  <span className="market-odd">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box  back1  ">
                                  <span className="market-odd"
                                  >
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box back   "
                                  onClick={() =>
                                    handleBackOpen({
                                      odds: element.ex.availableToBack[0].price,
                                      type: "BACK",
                                      sectionType: "ODDS",
                                      element: element,
                                      selectionId: element.selectionId,
                                      isBack: true
                                    })
                                  }

                                >
                                  <span className="market-odd" >
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                    }
                                  </span>
                                </div>

                                <div className="market-odd-box lay   "
                                  onClick={() =>
                                    handleBackOpen({
                                      odds: element.ex.availableToLay[0].price,
                                      type: "LAY",
                                      sectionType: "ODDS",
                                      element: element,
                                      selectionId: element.selectionId,
                                      isBack: false
                                    })
                                  }

                                >
                                  <span className="market-odd"  >
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                    }
                                  </span>

                                </div>
                                <div className="market-odd-box  lay1  ">
                                  {/* <span className="market-odd">-</span> */}
                                  <span className="market-odd">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box   lay2 ">
                                  {/* <span className="market-odd">-</span> */}
                                  <span className="market-odd">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                    }
                                  </span>
                                </div>


                              </div>
                            </> :
                            <>
                              <div className="market-row " data-title="ACTIVE">

                                <div className="market-nation-detail">
                                  <span className="market-nation-name">
                                    {element && element.selectionName ? element.selectionName : "-"}
                                  </span>

                                
                                  <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                    {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                  </h6>

                                  {profit && sectionType && sectionType === "ODDS" ?
                                    <>
                                      <h6
                                        className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                      >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                    </> : null
                                  }
                                  <div className="market-nation-book" />
                                </div>

                                {/* Apply Here color Status */}


                                <div className="market-odd-box back2"

                                // style={{ background: this.getcolorblink(0, 0, "#f5f5f5") }}
                                // style={{
                                //   background: this.getcolorblink(
                                //     oddsLocalStoreData && oddsLocalStoreData[index] && oddsLocalStoreData[index].ex && oddsLocalStoreData[index].ex.availableToBack && oddsLocalStoreData[index].ex.availableToBack[2] && oddsLocalStoreData[index].ex.availableToBack[2].price,

                                //     element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price

                                //     , "#f5f5f5")
                                // }}

                                >
                                  {/* <div
                                  className={`${oddsLocalStoreData && oddsLocalStoreData[index] && oddsLocalStoreData[index].ex && oddsLocalStoreData[index].ex.availableToBack && oddsLocalStoreData[index].ex.availableToBack[2] && oddsLocalStoreData[index].ex.availableToBack[2].price
                                    !=
                                    element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? "market-odd-box back2" : "market-odd-box lay"

                                    }`}
                                > */}
                                  <span className="market-odd">

                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                    }

                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box  back1  ">
                                  <span className="market-odd"
                                  >
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box back"
                                  onClick={() =>
                                    handleBackOpen({
                                      odds: element.ex.availableToBack[0].price,
                                      type: "BACK",
                                      sectionType: "ODDS",
                                      element: element,
                                      selectionId: element.selectionId,
                                      isBack: true
                                    })
                                  }
                                >
                                  <span className="market-odd" >
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                    }
                                  </span>
                                </div>


                                <div className="market-odd-box lay"

                                  onClick={() =>
                                    handleBackOpen({
                                      odds: element.ex.availableToLay[0].price,
                                      type: "LAY",
                                      sectionType: "ODDS",
                                      element: element,
                                      selectionId: element.selectionId,
                                      isBack: false
                                    })
                                  }

                                >
                                  <span className="market-odd"  >
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box  lay1  ">
                                  <span className="market-odd">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                    }
                                  </span>
                                </div>
                                <div className="market-odd-box   lay2 ">
                                  <span className="market-odd">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                    }
                                  </span>
                                  <span className="market-volume">
                                    {
                                      element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                    }
                                  </span>
                                </div>

                              </div>
                            </>
                        }
                      </>

                    </React.Fragment>
                  )) : null
              }
            </>

          </div>
        </div >

        {/* BOOKMAKER NEW SECTION SPORT ID 1 OR 2 */}
        <>
          {(bm && bm.runner_json && bm.runner_json.length > 0 && this.props.sport_id === "1") ||
            (this.props.sport_id === "2" && bm && bm.runner_json && bm.runner_json.length > 0) ?

            //  bm && bm.runner_json && bm.runner_json.length > 0 && this.props.sport_id === "1" || this.props.sport_id === "2" && bm && bm.runner_json && bm.runner_json.length > 0 ?

            <>
              <div className="game-market market-4 ">
                <div className="market-title">
                  <span>Bookmaker

                  </span>
                </div>
                <div className="market-header">
                  <div className="market-nation-detail">
                    <span className="market-nation-name">Min: 100&nbsp; Max: 25L</span>
                  </div>
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box back">
                    <b>Back</b>
                  </div>
                  <div className="market-odd-box lay">
                    <b>Lay</b>
                  </div>
                  <div className="market-odd-box" />
                  <div className="market-odd-box no-border" />
                </div>
                <div className="market-body " data-title="OPEN">


                  <>
                    {
                      bm && bm.runner_json && bm.runner_json.length > 0 ?
                        bm.runner_json.map((element, index) => (
                          <React.Fragment key={index}>

                            <>
                              {
                                element && element.GameStatus && element.GameStatus === "SUSPENDED" ?
                                  <>
                                    <div className="market-row suspended-row" data-title="SUSPENDED">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">{element && element.selectionName ? element.selectionName : "-"}</span>
                                        <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                          {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                        </h6>
                                        {profit && sectionType === "BOOKMAKER" ?
                                          <>
                                            <h6
                                              className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                            >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                          </> : null
                                        }
                                        <div className="market-nation-book" />
                                      </div>


                                      <div className="market-odd-box   back2 ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  back1  ">
                                        <span className="market-odd"
                                        >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box back   "
                                        onClick={() =>
                                          handleBookmakerBetModalOpenSportWise({
                                            odds: element.ex.availableToBack[0].price,
                                            type: "BACK",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: true
                                          })
                                        }

                                      >
                                        <span className="market-odd" >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                          }
                                        </span>
                                      </div>

                                      <div className="market-odd-box lay   "
                                        onClick={() =>
                                          handleBookmakerBetModalOpenSportWise({
                                            odds: element.ex.availableToLay[0].price,
                                            type: "LAY",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: false
                                          })
                                        }

                                      >
                                        <span className="market-odd"  >
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                          }
                                        </span>

                                      </div>
                                      <div className="market-odd-box  lay1  ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box   lay2 ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                          }
                                        </span>
                                      </div>


                                    </div>
                                  </> :
                                  <>
                                    <div className="market-row " data-title="ACTIVE">

                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.selectionName ? element.selectionName : "-"}
                                        </span>
                                        <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                          {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                        </h6>

                                        {profit && sectionType === "BOOKMAKER" ?
                                          <>
                                            <h6
                                              className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                            >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                          </> : null
                                        }
                                        <div className="market-nation-book" />
                                      </div>

                                      <div className="market-odd-box back2" >
                                        <span className="market-odd">

                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                          }

                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  back1  ">
                                        <span className="market-odd"
                                        >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box back"
                                        onClick={() =>
                                          handleBackOpen({
                                            odds: element.ex.availableToBack[0].price,
                                            type: "BACK",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd" >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                          }
                                        </span>
                                      </div>


                                      <div className="market-odd-box lay"

                                        onClick={() =>
                                          handleBackOpen({
                                            odds: element.ex.availableToLay[0].price,
                                            type: "LAY",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: false
                                          })
                                        }

                                      >
                                        <span className="market-odd"  >
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  lay1  ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box   lay2 ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                          }
                                        </span>
                                      </div>

                                    </div>
                                  </>
                              }
                            </>

                          </React.Fragment>
                        )) : null
                    }
                  </>

                </div>
              </div>
            </> : null

          }
        </>


        {/* BOOKMAKER NEW SECTION SPORT ID 4  */}
        <>
          {this.props.sport_id === "4" && BookerMakerMarket && BookerMakerMarket.runner_json && BookerMakerMarket.runner_json.length > 0 ?
            <>
              <div className="game-market market-4 ">
                <div className="market-title">
                  <span>Bookmaker

                  </span>
                </div>
                <div className="market-header">
                  <div className="market-nation-detail">
                    <span className="market-nation-name">Min: 100&nbsp; Max: 25L</span>
                  </div>
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box back">
                    <b>Back</b>
                  </div>
                  <div className="market-odd-box lay">
                    <b>Lay</b>
                  </div>
                  <div className="market-odd-box" />
                  <div className="market-odd-box no-border" />
                </div>
                <div className="market-body " data-title="OPEN">


                  <>
                    {
                      BookerMakerMarket && BookerMakerMarket.runner_json && BookerMakerMarket.runner_json.length > 0 ?
                        BookerMakerMarket.runner_json.map((element, index) => (
                          <React.Fragment key={index}>

                            <>
                              {
                                element && element.GameStatus && element.GameStatus === "SUSPENDED" ?
                                  <>
                                    <div className="market-row suspended-row" data-title="SUSPENDED">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">{element && element.selectionName ? element.selectionName : "-"}</span>
                                        <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                          {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                        </h6>
                                        {profit && sectionType === "BOOKMAKER" ?
                                          <>
                                            <h6
                                              className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                            >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                          </> : null
                                        }
                                        <div className="market-nation-book" />
                                      </div>


                                      <div className="market-odd-box   back2 ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  back1  ">
                                        <span className="market-odd"
                                        >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box back   "
                                        onClick={() =>
                                          handleBackOpen({
                                            odds: element.ex.availableToBack[0].price,
                                            type: "BACK",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: true
                                          })
                                        }

                                      >
                                        <span className="market-odd" >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                          }
                                        </span>
                                      </div>

                                      <div className="market-odd-box lay   "
                                        onClick={() =>
                                          handleBackOpen({
                                            odds: element.ex.availableToLay[0].price,
                                            type: "LAY",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: false
                                          })
                                        }

                                      >
                                        <span className="market-odd"  >
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                          }
                                        </span>

                                      </div>
                                      <div className="market-odd-box  lay1  ">
                                        {/* <span className="market-odd">-</span> */}
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box   lay2 ">
                                        {/* <span className="market-odd">-</span> */}
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                          }
                                        </span>
                                      </div>


                                    </div>
                                  </> :
                                  <>
                                    <div className="market-row " data-title="ACTIVE">

                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.selectionName ? element.selectionName : "-"}
                                        </span>
                                        <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                          {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                        </h6>

                                        {profit && sectionType === "BOOKMAKER" ?
                                          <>
                                            <h6
                                              className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                            >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                          </> : null
                                        }
                                        <div className="market-nation-book" />
                                      </div>

                                      <div className="market-odd-box back2" >
                                        <span className="market-odd">

                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                          }

                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  back1  ">
                                        <span className="market-odd"
                                        >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box back"
                                        onClick={() =>
                                          handleBackOpen({
                                            odds: element.ex.availableToBack[0].price,
                                            type: "BACK",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd" >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                          }
                                        </span>
                                      </div>


                                      <div className="market-odd-box lay"

                                        onClick={() =>
                                          handleBackOpen({
                                            odds: element.ex.availableToLay[0].price,
                                            type: "LAY",
                                            sectionType: "BOOKMAKER",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: false
                                          })
                                        }

                                      >
                                        <span className="market-odd"  >
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  lay1  ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box   lay2 ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                          }
                                        </span>
                                      </div>

                                    </div>
                                  </>
                              }
                            </>

                          </React.Fragment>
                        )) : null
                    }
                  </>

                </div>
              </div>
            </> : null
          }
        </>


        {/* BOOKMAKER 2 SECTION */}
        <div className="game-market market-2 width30">
          {/* <div className="market-title">
            <span>Bookmaker 2</span>
          </div>
          <div className="market-header">
            <div className="market-nation-detail">
              <span className="market-nation-name">Min: 100&nbsp; Max: 2L</span>
            </div>
            <div className="market-odd-box back">
              <b>Back</b>
            </div>
            <div className="market-odd-box lay">
              <b>Lay</b>
            </div>
          </div>
          <div className="market-body " data-title="SUSPENDED">
            <div className="market-row suspended-row" data-title="SUSPENDED">
              <div className="market-nation-detail">
                <span className="market-nation-name">South Africa.</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">-</span>
              </div>
            </div>
            <div className="market-row " data-title="ACTIVE">
              <div className="market-nation-detail">
                <span className="market-nation-name">India.</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">1</span>
                <span className="market-volume">200000</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">1.5</span>
                <span className="market-volume">200000</span>
              </div>
            </div>
          </div>
          <div className="market-row">
            <div className="moving-text">
              Virtual Cricket Bookmaker Bets Started In Our Exchange
            </div>
          </div> */}
        </div>

        {/* FANCY  To NORMAL SECTION */}
        {/* <>
          {matchSession && matchSession.length > 0 ?
            <>
              <div className="game-market market-6">
                <div className="market-title">
                  <span>Normal</span>
                </div>
                <div className="row row10">
                  <div className="col-md-6">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box back">
                        <b>Back</b>
                      </div>
                      <div className="market-odd-box lay">
                        <b>Lay</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                  <div className="col-md-6 d-none d-xl-block">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box back">
                        <b>Back</b>
                      </div>
                      <div className="market-odd-box lay">
                        <b>Lay</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                </div>

                <div className="market-body " data-title="OPEN">
                  <div className="row row10">

                    {
                      matchSession && matchSession.length > 0 ?
                        matchSession.map((element, index) => (
                          <React.Fragment key={index}>
                            {element && element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" || element.inplayStatus === "Ball Running" ?
                              <>
                                <div className="col-md-6">
                                  <div
                                    className="fancy-market suspended-row"
                                    data-title={`${element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" ? 'SUSPENDED' : element.inplayStatus}`}
                                  >
                                    <div className="market-row">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                      </div>
                                      <div className="market-odd-box lay ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="market-odd-box back ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min: {element && element.minStack ? element.minStack : 0} </span>
                                          <span className="w-100 d-block">Max: {element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </> :
                              <>
                                <div className="col-md-6">
                                  <div className="fancy-market " data-title="">
                                    <div className="market-row">

                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                        <div className="market-nation-book" />
                                      </div>

                                      <div className="market-odd-box back "
                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.BackPrice1,
                                            size: element.BackSize1,
                                            type: "YES",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                                      </div>
                                      <div className="market-odd-box lay"
                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.LayPrice1,
                                            size: element.LaySize1,
                                            type: "NO",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                                      </div>

                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : 0}</span>
                                          <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </>
                            }

                          </React.Fragment>
                        )) : null
                    }
                  </div>
                </div>

              </div>
            </> : null
          }
        </> */}

        {/* FANCY  To NEW NORMAL SECTION */}
        <>
          {normal_session && normal_session.length > 0 ?
            <>
              <div className="game-market market-6">
                <div className="market-title">
                  <span>Normal</span>
                </div>
                <div className="row row10">
                  <div className="col-md-6">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                  <div className="col-md-6 d-none d-xl-block">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                </div>

                <div className="market-body " data-title="OPEN">
                  <div className="row row10">

                    {
                      normal_session && normal_session.length > 0 ?
                        normal_session.map((element, index) => (
                          <React.Fragment key={index}>



                            {element && element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" || element.inplayStatus === "Ball Running" ?
                              <>

                                <div className="col-md-6">
                                  <div
                                    className="fancy-market suspended-row"
                                    // data-title="Ball Running"
                                    data-title={`${element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" ? 'SUSPENDED' : element.inplayStatus}`}
                                  >
                                    <div className="market-row">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                      </div>
                                      <div className="market-odd-box back ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="market-odd-box lay ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min: {element && element.minStack ? element.minStack : 0} </span>
                                          <span className="w-100 d-block">Max: {element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </> :
                              <>
                                <div className="col-md-6">
                                  <div className="fancy-market " data-title="">
                                    <div className="market-row">

                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                        <div className="market-nation-book" />
                                      </div>

                                      <div className="market-odd-box lay"
                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.LayPrice1,
                                            size: element.LaySize1,
                                            type: "NO",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                                      </div>

                                      <div className="market-odd-box back "

                                        // fancy blink in yellow color

                                        // <div className={`${sessionLocalStoreDataa && sessionLocalStoreDataa[index] && sessionLocalStoreDataa[index].BackPrice1 != element.BackPrice1 ? "text-success" : "text-danger"}`}

                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.BackPrice1,
                                            size: element.BackSize1,
                                            type: "YES",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                                      </div>


                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : 0}</span>
                                          <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </>
                            }








                            {/* <div className="col-md-6">
                        <div className="fancy-market " data-title="">
                          <div className="market-row">

                            <div className="market-nation-detail">
                              <span className="market-nation-name">
                                {element && element.RunnerName ? element.RunnerName : "-"}
                              </span>
                              <div className="market-nation-book" />
                            </div>

                            <div className="market-odd-box back "
                              onClick={() =>
                                handleFancyBetModalOpen({
                                  odds: element.BackPrice1,
                                  size: element.BackSize1,
                                  type: "YES",
                                  element: element,
                                  selectionId: element.SelectionId,
                                  fancyStatus: element.fancyStatus,
                                  isBack: true
                                })
                              }
                            >
                              <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                            </div>
                            <div className="market-odd-box lay"
                              onClick={() =>
                                handleFancyBetModalOpen({
                                  odds: element.LayPrice1,
                                  size: element.LaySize1,
                                  type: "NO",
                                  element: element,
                                  selectionId: element.SelectionId,
                                  fancyStatus: element.fancyStatus,
                                  isBack: true
                                })
                              }
                            >
                              <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                            </div>

                            <div className="fancy-min-max-box">
                              <div className="fancy-min-max">
                                <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : "-"}</span>
                                <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : "-"}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div> */}

                          </React.Fragment>
                        )) : null

                    }

                  </div>
                </div>

              </div>
            </> : null
          }
        </>

        {/* FANCY  To OVER_BY_OVER SECTION */}
        <>
          {overByOver_session && overByOver_session.length > 0 ?
            <>
              <div className="game-market market-6">
                <div className="market-title">
                  <span>Over By Over</span>
                </div>
                <div className="row row10">
                  <div className="col-md-6">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                  <div className="col-md-6 d-none d-xl-block">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                </div>

                <div className="market-body " data-title="OPEN">
                  <div className="row row10">

                    {
                      overByOver_session && overByOver_session.length > 0 ?
                        overByOver_session.map((element, index) => (
                          <React.Fragment key={index}>



                            {element && element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" || element.inplayStatus === "Ball Running" ?
                              <>

                                <div className="col-md-6">
                                  <div
                                    className="fancy-market suspended-row"
                                    // data-title="Ball Running"
                                    data-title={`${element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" ? 'SUSPENDED' : element.inplayStatus}`}
                                  >
                                    <div className="market-row">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                      </div>
                                      <div className="market-odd-box back ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="market-odd-box lay ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min: {element && element.minStack ? element.minStack : 0} </span>
                                          <span className="w-100 d-block">Max: {element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </> :
                              <>
                                <div className="col-md-6">
                                  <div className="fancy-market " data-title="">
                                    <div className="market-row">

                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                        <div className="market-nation-book" />
                                      </div>

                                      <div className="market-odd-box lay"
                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.LayPrice1,
                                            size: element.LaySize1,
                                            type: "NO",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                                      </div>

                                      <div className="market-odd-box back "

                                        // fancy blink in yellow color

                                        // <div className={`${sessionLocalStoreDataa && sessionLocalStoreDataa[index] && sessionLocalStoreDataa[index].BackPrice1 != element.BackPrice1 ? "text-success" : "text-danger"}`}

                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.BackPrice1,
                                            size: element.BackSize1,
                                            type: "YES",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                                      </div>

                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : 0}</span>
                                          <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </>
                            }








                            {/* <div className="col-md-6">
                        <div className="fancy-market " data-title="">
                          <div className="market-row">

                            <div className="market-nation-detail">
                              <span className="market-nation-name">
                                {element && element.RunnerName ? element.RunnerName : "-"}
                              </span>
                              <div className="market-nation-book" />
                            </div>

                            <div className="market-odd-box back "
                              onClick={() =>
                                handleFancyBetModalOpen({
                                  odds: element.BackPrice1,
                                  size: element.BackSize1,
                                  type: "YES",
                                  element: element,
                                  selectionId: element.SelectionId,
                                  fancyStatus: element.fancyStatus,
                                  isBack: true
                                })
                              }
                            >
                              <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                            </div>
                            <div className="market-odd-box lay"
                              onClick={() =>
                                handleFancyBetModalOpen({
                                  odds: element.LayPrice1,
                                  size: element.LaySize1,
                                  type: "NO",
                                  element: element,
                                  selectionId: element.SelectionId,
                                  fancyStatus: element.fancyStatus,
                                  isBack: true
                                })
                              }
                            >
                              <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                            </div>

                            <div className="fancy-min-max-box">
                              <div className="fancy-min-max">
                                <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : "-"}</span>
                                <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : "-"}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div> */}

                          </React.Fragment>
                        )) : null

                    }

                  </div>
                </div>

              </div>
            </> : null
          }
        </>

        {/* FANCY  To Ball_By_Ball SECTION */}
        <>
          {ballByBall_session && ballByBall_session.length > 0 ?
            <>
              <div className="game-market market-6">
                <div className="market-title">
                  <span>Ball By Ball</span>
                </div>
                <div className="row row10">
                  <div className="col-md-6">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                  <div className="col-md-6 d-none d-xl-block">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                </div>

                <div className="market-body " data-title="OPEN">
                  <div className="row row10">

                    {
                      ballByBall_session && ballByBall_session.length > 0 ?
                        ballByBall_session.map((element, index) => (
                          <React.Fragment key={index}>



                            {element && element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" || element.inplayStatus === "Ball Running" ?
                              <>

                                <div className="col-md-6">
                                  <div
                                    className="fancy-market suspended-row"
                                    // data-title="Ball Running"
                                    data-title={`${element.inplayStatus === "SUSPENDED" || element.inplayStatus === "CLOSE" ? 'SUSPENDED' : element.inplayStatus}`}
                                  >
                                    <div className="market-row">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                      </div>
                                      <div className="market-odd-box back ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="market-odd-box lay ">
                                        <span className="market-odd">-</span>
                                      </div>
                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min: {element && element.minStack ? element.minStack : 0} </span>
                                          <span className="w-100 d-block">Max: {element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </> :
                              <>
                                <div className="col-md-6">
                                  <div className="fancy-market " data-title="">
                                    <div className="market-row">

                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.RunnerName ? element.RunnerName : "-"}
                                        </span>
                                        <div className="market-nation-book" />
                                      </div>

                                      <div className="market-odd-box lay"
                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.LayPrice1,
                                            size: element.LaySize1,
                                            type: "NO",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                                      </div>

                                      <div className="market-odd-box back "

                                        // fancy blink in yellow color

                                        // <div className={`${sessionLocalStoreDataa && sessionLocalStoreDataa[index] && sessionLocalStoreDataa[index].BackPrice1 != element.BackPrice1 ? "text-success" : "text-danger"}`}

                                        onClick={() =>
                                          handleFancyBetModalOpen({
                                            odds: element.BackPrice1,
                                            size: element.BackSize1,
                                            type: "YES",
                                            element: element,
                                            selectionId: element.SelectionId,
                                            fancyStatus: element.fancyStatus,
                                            isBack: true
                                          })
                                        }
                                      >
                                        <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                                        <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                                      </div>


                                      <div className="fancy-min-max-box">
                                        <div className="fancy-min-max">
                                          <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : 0}</span>
                                          <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : 0}</span>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </>
                            }








                            {/* <div className="col-md-6">
                        <div className="fancy-market " data-title="">
                          <div className="market-row">

                            <div className="market-nation-detail">
                              <span className="market-nation-name">
                                {element && element.RunnerName ? element.RunnerName : "-"}
                              </span>
                              <div className="market-nation-book" />
                            </div>

                            <div className="market-odd-box back "
                              onClick={() =>
                                handleFancyBetModalOpen({
                                  odds: element.BackPrice1,
                                  size: element.BackSize1,
                                  type: "YES",
                                  element: element,
                                  selectionId: element.SelectionId,
                                  fancyStatus: element.fancyStatus,
                                  isBack: true
                                })
                              }
                            >
                              <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                            </div>
                            <div className="market-odd-box lay"
                              onClick={() =>
                                handleFancyBetModalOpen({
                                  odds: element.LayPrice1,
                                  size: element.LaySize1,
                                  type: "NO",
                                  element: element,
                                  selectionId: element.SelectionId,
                                  fancyStatus: element.fancyStatus,
                                  isBack: true
                                })
                              }
                            >
                              <span className="market-odd">{element && element.LayPrice1 ? element.LayPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.LaySize1 ? element.LaySize1 : "-"}</span>
                            </div>

                            <div className="fancy-min-max-box">
                              <div className="fancy-min-max">
                                <span className="w-100 d-block">Min:{element && element.minStack ? element.minStack : "-"}</span>
                                <span className="w-100 d-block">Max:{element && element.maxStack ? element.maxStack : "-"}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div> */}

                          </React.Fragment>
                        )) : null

                    }

                  </div>
                </div>

              </div>
            </> : null
          }
        </>


        {/* OVER BY OVER SECTION */}
        {/* {
          this.props.sport_id === "4" ?
            <>
              <div className="game-market market-6">
                <div className="market-title">
                  <span>Over By Over</span>
                </div>
                <div className="row row10">
                  <div className="col-md-6">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                  <div className="col-md-6 d-none d-xl-block">
                    <div className="market-header">
                      <div className="market-nation-detail" />
                      <div className="market-odd-box lay">
                        <b>No</b>
                      </div>
                      <div className="market-odd-box back">
                        <b>Yes</b>
                      </div>
                      <div className="fancy-min-max-box" />
                    </div>
                  </div>
                </div>
                <div className="market-body " data-title="OPEN">
                  <div className="row row10">
                    <div className="col-md-6">
                      <div className="fancy-market " data-title="">
                        <div className="market-row">
                          <div className="market-nation-detail">
                            <span className="market-nation-name">
                              Only 7 over run IND
                            </span>
                          </div>
                          <div className="market-odd-box lay ">
                            <span className="market-odd">6</span>
                            <span className="market-volume">110</span>
                          </div>
                          <div className="market-odd-box back ">
                            <span className="market-odd">6</span>
                            <span className="market-volume">90</span>
                          </div>
                          <div className="fancy-min-max-box">
                            <div className="fancy-min-max">
                              <span className="w-100 d-block">Min: 100</span>
                              <span className="w-100 d-block">Max: 50K</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="fancy-market " data-title="">
                        <div className="market-row">
                          <div className="market-nation-detail">
                            <span className="market-nation-name">
                              5.1 to 5.3 ball No Boundaries IND
                            </span>
                          </div>
                          <div className="market-odd-box lay ">
                            <span className="market-odd">4</span>
                            <span className="market-volume">80</span>
                          </div>
                          <div className="market-odd-box back ">
                            <span className="market-odd">4</span>
                            <span className="market-volume">60</span>
                          </div>
                          <div className="fancy-min-max-box">
                            <div className="fancy-min-max">
                              <span className="w-100 d-block">Min: 100</span>
                              <span className="w-100 d-block">Max: 2L</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </> : null
        } */}


        {/* TO_WIN_THE_TOSS SPORT_ID 4 */}
        {
          this.props.sport_id === "4" && OtherMarketList && OtherMarketList.length > 0 ?
            <>
              <div className="game-market market-4 ">
                <div className="market-title">
                  <span>TO WIN THE TOSS</span>
                </div>
                <div className="market-header">
                  <div className="market-nation-detail">
                    <span className="market-nation-name">Max: 1</span>
                  </div>
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box back">
                    <b>Back</b>
                  </div>
                  <div className="market-odd-box lay">
                    <b>Lay</b>
                  </div>
                  <div className="market-odd-box" />
                  <div className="market-odd-box no-border" />
                </div>

                {
                  OtherMarketList && OtherMarketList.length > 0 ?
                    OtherMarketList.map((mainElement, index) => (
                      <>
                        {mainElement && mainElement.marketName && mainElement.marketName == "To Win the Toss" ?
                          <>
                            {
                              mainElement && mainElement.runner_json && mainElement.runner_json.length > 0 ?
                                mainElement.runner_json.map((element, index) => (
                                  <React.Fragment key={index}>
                                    <>
                                      {
                                        element && element.GameStatus && element.GameStatus === "SUSPENDED" ?
                                          <>
                                            <div className="market-row suspended-row" data-title="SUSPENDED">
                                              <div className="market-nation-detail">
                                                <span className="market-nation-name">{element && element.selectionName ?
                                                  element.selectionName : "-"}</span>

                                                <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss <
                                                  0 ? "text-danger" : "text-success"}`}>
                                                  {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                                </h6>
                                                {/* {
                                                  JSON.stringify(profit && sectionType && sectionType === "TO_WIN_THE_TOSS" ? "TRUEEEE" : "FASLEeee")
                                                } */}
                                                {profit && sectionType && sectionType === "TO_WIN_THE_TOSS" ?
                                                  <>
                                                    <h6 className={`px-4 fs ${currentRunner && currentRunner[index] &&
                                                      currentRunner[index].winLoss && currentRunner[index].winLoss < 0
                                                      ? "text-danger" : " text-success"}`}>{currentRunner && currentRunner[index]
                                                        && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) :
                                                        null}</h6>
                                                  </> : null
                                                }

                                                <div className="market-nation-book" />
                                              </div>


                                              <div className="market-odd-box   back2 ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].price ?
                                                      element.ex.availableToBack[2].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].size ?
                                                      element.ex.availableToBack[2].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box  back1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].price ?
                                                      element.ex.availableToBack[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].size ?
                                                      element.ex.availableToBack[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box back   " onClick={() =>
                                                handleBackToWinTheToss({
                                                  odds: element.ex.availableToBack[0].price,
                                                  type: "BACK",
                                                  sectionType: "TO_WIN_THE_TOSS",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: true
                                                })
                                              }

                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].price ?
                                                      element.ex.availableToBack[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].size ?
                                                      element.ex.availableToBack[0].size : "--"
                                                  }
                                                </span>
                                              </div>

                                              <div className="market-odd-box lay   " onClick={() =>
                                                handleBackToWinTheToss({
                                                  odds: element.ex.availableToLay[0].price,
                                                  type: "LAY",
                                                  sectionType: "TO_WIN_THE_TOSS",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: false
                                                })
                                              }

                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].price ?
                                                      element.ex.availableToLay[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].size ?
                                                      element.ex.availableToLay[0].size : "--"
                                                  }
                                                </span>

                                              </div>
                                              <div className="market-odd-box  lay1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].price ?
                                                      element.ex.availableToLay[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].size ?
                                                      element.ex.availableToLay[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box   lay2 ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].price ?
                                                      element.ex.availableToLay[2].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].size ?
                                                      element.ex.availableToLay[2].size : "--"
                                                  }
                                                </span>
                                              </div>


                                            </div>
                                          </> :
                                          <>
                                            <div className="market-row " data-title="ACTIVE">

                                              <div className="market-nation-detail">
                                                <span className="market-nation-name">
                                                  {element && element.selectionName ? element.selectionName : "-"}
                                                </span>
                                                <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss <
                                                  0 ? "text-danger" : "text-success"}`}>
                                                  {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                                </h6>

                                                {profit && sectionType && sectionType === "TO_WIN_THE_TOSS" ?
                                                  <>
                                                    <h6 className={`px-4 fs ${currentRunner && currentRunner[index] &&
                                                      currentRunner[index].winLoss && currentRunner[index].winLoss < 0
                                                      ? "text-danger" : " text-success"}`}>{currentRunner && currentRunner[index]
                                                        && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) :
                                                        null}</h6>
                                                  </> : null
                                                }
                                                <div className="market-nation-book" />
                                              </div>
                                              {/* Apply Here color Status */}

                                              <div className="market-odd-box back2"
                                              // style={{ background: this.getcolorblink(0, 0, "#f5f5f5") }}
                                              >
                                                <span className="market-odd">

                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].price ?
                                                      element.ex.availableToBack[2].price : "--"
                                                  }

                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].size ?
                                                      element.ex.availableToBack[2].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box  back1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].price ?
                                                      element.ex.availableToBack[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].size ?
                                                      element.ex.availableToBack[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box back" onClick={() =>
                                                handleBackToWinTheToss({
                                                  odds: element.ex.availableToBack[0].price,
                                                  type: "BACK",
                                                  sectionType: "TO_WIN_THE_TOSS",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: true
                                                })
                                              }
                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].price ?
                                                      element.ex.availableToBack[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].size ?
                                                      element.ex.availableToBack[0].size : "--"
                                                  }
                                                </span>
                                              </div>


                                              <div className="market-odd-box lay" onClick={() =>
                                                handleBackToWinTheToss({
                                                  odds: element.ex.availableToLay[0].price,
                                                  type: "LAY",
                                                  sectionType: "TO_WIN_THE_TOSS",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: false
                                                })
                                              }

                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].price ?
                                                      element.ex.availableToLay[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].size ?
                                                      element.ex.availableToLay[0].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box  lay1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].price ?
                                                      element.ex.availableToLay[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].size ?
                                                      element.ex.availableToLay[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box   lay2 ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].price ?
                                                      element.ex.availableToLay[2].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].size ?
                                                      element.ex.availableToLay[2].size : "--"
                                                  }
                                                </span>
                                              </div>

                                            </div>
                                          </>
                                      }
                                    </>
                                  </React.Fragment>
                                )) : null
                            }
                          </>
                          : null
                        }
                      </>
                    )) : null
                }

              </div>
            </> : null
        }

        {/* COMPLETE_MATCH SPORT_ID 4 */}
        {
          this.props.sport_id === "4" && OtherMarketList && OtherMarketList.length > 0 ?
            <>
              <div className="game-market market-4 ">
                <div className="market-title">
                  <span>COMPLETE MATCH</span>
                </div>
                <div className="market-header">
                  <div className="market-nation-detail">
                    <span className="market-nation-name">Max: 1</span>
                  </div>
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box no-border d-none d-md-block" />
                  <div className="market-odd-box back">
                    <b>Back</b>
                  </div>
                  <div className="market-odd-box lay">
                    <b>Lay</b>
                  </div>
                  <div className="market-odd-box" />
                  <div className="market-odd-box no-border" />
                </div>

                {
                  OtherMarketList && OtherMarketList.length > 0 ?
                    OtherMarketList.map((mainElement, index) => (
                      <>
                        {mainElement && mainElement.marketName && mainElement.marketName == "Completed Match" ?
                          <>
                            {
                              mainElement && mainElement.runner_json && mainElement.runner_json.length > 0 ?
                                mainElement.runner_json.map((element, index) => (
                                  <React.Fragment key={index}>
                                    <>
                                      {
                                        element && element.GameStatus && element.GameStatus === "SUSPENDED" ?
                                          <>
                                            <div className="market-row suspended-row" data-title="SUSPENDED">
                                              <div className="market-nation-detail">
                                                <span className="market-nation-name">{element && element.selectionName ?
                                                  element.selectionName : "-"}</span>

                                                <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss <
                                                  0 ? "text-danger" : "text-success"}`}>
                                                  {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                                </h6>

                                                {profit && sectionType && sectionType === "COMPLETE_MATCH" ?
                                                  <>
                                                    <h6 className={`px-4 fs ${currentRunner && currentRunner[index] &&
                                                      currentRunner[index].winLoss && currentRunner[index].winLoss < 0
                                                      ? "text-danger" : " text-success"}`}>{currentRunner && currentRunner[index]
                                                        && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) :
                                                        null}</h6>
                                                  </> : null
                                                }

                                                <div className="market-nation-book" />
                                              </div>


                                              <div className="market-odd-box   back2 ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].price ?
                                                      element.ex.availableToBack[2].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].size ?
                                                      element.ex.availableToBack[2].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box  back1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].price ?
                                                      element.ex.availableToBack[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].size ?
                                                      element.ex.availableToBack[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box back   " onClick={() =>
                                                handleBackCompleteMatch({
                                                  odds: element.ex.availableToBack[0].price,
                                                  type: "BACK",
                                                  sectionType: "COMPLETE_MATCH",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: true
                                                })
                                              }

                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].price ?
                                                      element.ex.availableToBack[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].size ?
                                                      element.ex.availableToBack[0].size : "--"
                                                  }
                                                </span>
                                              </div>

                                              <div className="market-odd-box lay   " onClick={() =>
                                                handleBackCompleteMatch({
                                                  odds: element.ex.availableToLay[0].price,
                                                  type: "LAY",
                                                  sectionType: "COMPLETE_MATCH",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: false
                                                })
                                              }

                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].price ?
                                                      element.ex.availableToLay[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].size ?
                                                      element.ex.availableToLay[0].size : "--"
                                                  }
                                                </span>

                                              </div>
                                              <div className="market-odd-box  lay1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].price ?
                                                      element.ex.availableToLay[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].size ?
                                                      element.ex.availableToLay[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box   lay2 ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].price ?
                                                      element.ex.availableToLay[2].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].size ?
                                                      element.ex.availableToLay[2].size : "--"
                                                  }
                                                </span>
                                              </div>


                                            </div>
                                          </> :
                                          <>
                                            <div className="market-row " data-title="ACTIVE">

                                              <div className="market-nation-detail">
                                                <span className="market-nation-name">
                                                  {element && element.selectionName ? element.selectionName : "-"}
                                                </span>
                                                <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss <
                                                  0 ? "text-danger" : "text-success"}`}>
                                                  {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                                </h6>

                                                {profit && sectionType && sectionType === "COMPLETE_MATCH" ?
                                                  <>
                                                    <h6 className={`px-4 fs ${currentRunner && currentRunner[index] &&
                                                      currentRunner[index].winLoss && currentRunner[index].winLoss < 0
                                                      ? "text-danger" : " text-success"}`}>{currentRunner && currentRunner[index]
                                                        && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) :
                                                        null}</h6>
                                                  </> : null
                                                }
                                                <div className="market-nation-book" />
                                              </div>
                                              {/* Apply Here color Status */}

                                              <div className="market-odd-box back2"
                                              // style={{ background: this.getcolorblink(0, 0, "#f5f5f5") }}
                                              >
                                                <span className="market-odd">

                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].price ?
                                                      element.ex.availableToBack[2].price : "--"
                                                  }

                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[2] && element.ex.availableToBack[2].size ?
                                                      element.ex.availableToBack[2].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box  back1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].price ?
                                                      element.ex.availableToBack[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[1] && element.ex.availableToBack[1].size ?
                                                      element.ex.availableToBack[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box back" onClick={() =>
                                                handleBackCompleteMatch({
                                                  odds: element.ex.availableToBack[0].price,
                                                  type: "BACK",
                                                  sectionType: "COMPLETE_MATCH",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: true
                                                })
                                              }
                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].price ?
                                                      element.ex.availableToBack[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToBack &&
                                                      element.ex.availableToBack[0] && element.ex.availableToBack[0].size ?
                                                      element.ex.availableToBack[0].size : "--"
                                                  }
                                                </span>
                                              </div>


                                              <div className="market-odd-box lay" onClick={() =>
                                                handleBackCompleteMatch({
                                                  odds: element.ex.availableToLay[0].price,
                                                  type: "LAY",
                                                  sectionType: "COMPLETE_MATCH",
                                                  element: element,
                                                  selectionId: element.selectionId,
                                                  isBack: false
                                                })
                                              }

                                              >
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].price ?
                                                      element.ex.availableToLay[0].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[0] && element.ex.availableToLay[0].size ?
                                                      element.ex.availableToLay[0].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box  lay1  ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].price ?
                                                      element.ex.availableToLay[1].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[1] && element.ex.availableToLay[1].size ?
                                                      element.ex.availableToLay[1].size : "--"
                                                  }
                                                </span>
                                              </div>
                                              <div className="market-odd-box   lay2 ">
                                                <span className="market-odd">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].price ?
                                                      element.ex.availableToLay[2].price : "--"
                                                  }
                                                </span>
                                                <span className="market-volume">
                                                  {
                                                    element && element.ex && element.ex.availableToLay &&
                                                      element.ex.availableToLay[2] && element.ex.availableToLay[2].size ?
                                                      element.ex.availableToLay[2].size : "--"
                                                  }
                                                </span>
                                              </div>

                                            </div>
                                          </>
                                      }
                                    </>
                                  </React.Fragment>
                                )) : null
                            }
                          </>
                          : null
                        }
                      </>
                    )) : null
                }

              </div>
            </> : null
        }

        {/* TIED SECTION SPORT ID 4 */}
        {this.props.sport_id === "4" && OtherMarketList && OtherMarketList.length > 0 ?
          <>
            <div className="game-market market-4 ">
              <div className="market-title">
                <span>TIED_MATCH</span>
              </div>
              <div className="market-header">
                <div className="market-nation-detail">
                  <span className="market-nation-name">Max: 1</span>
                </div>
                <div className="market-odd-box no-border d-none d-md-block" />
                <div className="market-odd-box no-border d-none d-md-block" />
                <div className="market-odd-box back">
                  <b>Back</b>
                </div>
                <div className="market-odd-box lay">
                  <b>Lay</b>
                </div>
                <div className="market-odd-box" />
                <div className="market-odd-box no-border" />
              </div>

              {
                OtherMarketList && OtherMarketList.length > 0 ?
                  OtherMarketList.map((mainElement, index) => (
                    <>
                      {mainElement && mainElement.marketName && mainElement.marketName == "Tied Match" ?
                        <>
                          {
                            mainElement && mainElement.runner_json && mainElement.runner_json.length > 0 ?
                              mainElement.runner_json.map((element, index) => (
                                <React.Fragment key={index}>
                                  <>
                                    <div className="market-row " data-title="ACTIVE">
                                      <div className="market-nation-detail">
                                        <span className="market-nation-name">
                                          {element && element.selectionName ? element.selectionName : "-"}
                                        </span>


                                        <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                          {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                        </h6>

                                        {profit && sectionType && sectionType === "TIED_MATCH" ?
                                          <>
                                            <h6
                                              className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                            >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                          </> : null
                                        }


                                        <div className="market-nation-book" />
                                      </div>
                                      <div className="market-odd-box back2"
                                      >
                                        <span className="market-odd">

                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].price ? element.ex.availableToBack[2].price : "--"
                                          }

                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[2] && element.ex.availableToBack[2].size ? element.ex.availableToBack[2].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  back1  ">
                                        <span className="market-odd"
                                        >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].price ? element.ex.availableToBack[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[1] && element.ex.availableToBack[1].size ? element.ex.availableToBack[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box back"

                                        onClick={() =>
                                          handleBackOpenTiedMatch({
                                            odds: element.ex.availableToBack[0].price,
                                            type: "BACK",
                                            sectionType: "TIED_MATCH",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: true
                                          })
                                        }

                                      >
                                        <span className="market-odd" >
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].size ? element.ex.availableToBack[0].size : "--"
                                          }
                                        </span>
                                      </div>


                                      <div className="market-odd-box lay"

                                        onClick={() =>
                                          handleBackOpenTiedMatch({
                                            odds: element.ex.availableToLay[0].price,
                                            type: "LAY",
                                            sectionType: "TIED_MATCH",
                                            element: element,
                                            selectionId: element.selectionId,
                                            isBack: false
                                          })
                                        }

                                      >
                                        <span className="market-odd"  >
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].price ? element.ex.availableToLay[0].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[0] && element.ex.availableToLay[0].size ? element.ex.availableToLay[0].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box  lay1  ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].price ? element.ex.availableToLay[1].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[1] && element.ex.availableToLay[1].size ? element.ex.availableToLay[1].size : "--"
                                          }
                                        </span>
                                      </div>
                                      <div className="market-odd-box   lay2 ">
                                        <span className="market-odd">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].price ? element.ex.availableToLay[2].price : "--"
                                          }
                                        </span>
                                        <span className="market-volume">
                                          {
                                            element && element.ex && element.ex.availableToLay && element.ex.availableToLay[2] && element.ex.availableToLay[2].size ? element.ex.availableToLay[2].size : "--"
                                          }
                                        </span>
                                      </div>
                                    </div>

                                  </>
                                </React.Fragment>
                              )) : null
                          }
                        </>
                        : null
                      }
                    </>
                  )) : null
              }

            </div>
          </> : null
        }

        {/* OTHERS SECTION SPORT ID 1 OR 2 */}
        <>
          {OtherMarketList && OtherMarketList.length > 0 && this.props.sport_id === "1" || this.props.sport_id === "2" && OtherMarketList && OtherMarketList.length > 0 ?
            OtherMarketList.map((otherMarketElement, index) => (
              <>
                <div className="game-market market-4 ">
                  <div className="market-title">
                    <span>{otherMarketElement && otherMarketElement.marketName ? otherMarketElement.marketName : null}</span>
                  </div>
                  <div className="market-header">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">Max: 1L</span>
                    </div>
                    <div className="market-odd-box no-border d-none d-md-block" />
                    <div className="market-odd-box no-border d-none d-md-block" />
                    <div className="market-odd-box back">
                      <b>Back</b>
                    </div>
                    <div className="market-odd-box lay">
                      <b>Lay</b>
                    </div>
                    <div className="market-odd-box" />
                    <div className="market-odd-box no-border" />
                  </div>


                  <div className="market-body " data-title="OPEN">

                    <>
                      {
                        otherMarketElement && otherMarketElement.runner_json && otherMarketElement.runner_json.length > 0 ?
                          otherMarketElement.runner_json.map((elementOtrMkt, index) => (
                            <React.Fragment key={index}>

                              <>
                                {
                                  elementOtrMkt && elementOtrMkt.GameStatus && elementOtrMkt.GameStatus === "SUSPENDED" ?
                                    <>
                                      <div className="market-row suspended-row" data-title="SUSPENDED">
                                        <div className="market-nation-detail">
                                          <span className="market-nation-name">{elementOtrMkt && elementOtrMkt.selectionName ? elementOtrMkt.selectionName : "-"}</span>
                                          <h6 className={`px-4 fw-bold ${elementOtrMkt && elementOtrMkt.WinAndLoss && elementOtrMkt.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                            {elementOtrMkt && elementOtrMkt.WinAndLoss ? elementOtrMkt.WinAndLoss.toFixed(2) : null}
                                          </h6>

                                          <div className="market-nation-book" />
                                        </div>


                                        <div className="market-odd-box   back2 ">
                                          <span className="market-odd">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[2] && elementOtrMkt.ex.availableToBack[2].price ? elementOtrMkt.ex.availableToBack[2].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[2] && elementOtrMkt.ex.availableToBack[2].size ? elementOtrMkt.ex.availableToBack[2].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box  back1  ">
                                          <span className="market-odd"
                                          >
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[1] && elementOtrMkt.ex.availableToBack[1].price ? elementOtrMkt.ex.availableToBack[1].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[1] && elementOtrMkt.ex.availableToBack[1].size ? elementOtrMkt.ex.availableToBack[1].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box back   "

                                        >
                                          <span className="market-odd" >
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[0] && elementOtrMkt.ex.availableToBack[0].price ? elementOtrMkt.ex.availableToBack[0].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[0] && elementOtrMkt.ex.availableToBack[0].size ? elementOtrMkt.ex.availableToBack[0].size : "--"
                                            }
                                          </span>
                                        </div>

                                        <div className="market-odd-box lay   "

                                        >
                                          <span className="market-odd"  >
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[0] && elementOtrMkt.ex.availableToLay[0].price ? elementOtrMkt.ex.availableToLay[0].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[0] && elementOtrMkt.ex.availableToLay[0].size ? elementOtrMkt.ex.availableToLay[0].size : "--"
                                            }
                                          </span>

                                        </div>
                                        <div className="market-odd-box  lay1  ">
                                          <span className="market-odd">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[1] && elementOtrMkt.ex.availableToLay[1].price ? elementOtrMkt.ex.availableToLay[1].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[1] && elementOtrMkt.ex.availableToLay[1].size ? elementOtrMkt.ex.availableToLay[1].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box   lay2 ">
                                          <span className="market-odd">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[2] && elementOtrMkt.ex.availableToLay[2].price ? elementOtrMkt.ex.availableToLay[2].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[2] && elementOtrMkt.ex.availableToLay[2].size ? elementOtrMkt.ex.availableToLay[2].size : "--"
                                            }
                                          </span>
                                        </div>


                                      </div>
                                    </> :
                                    <>
                                      <div className="market-row " data-title="ACTIVE">

                                        <div className="market-nation-detail">
                                          <span className="market-nation-name">
                                            {elementOtrMkt && elementOtrMkt.selectionName ? elementOtrMkt.selectionName : "-"}
                                          </span>
                                          <h6 className={`px-4 fw-bold ${elementOtrMkt && elementOtrMkt.WinAndLoss && elementOtrMkt.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                            {elementOtrMkt && elementOtrMkt.WinAndLoss ? elementOtrMkt.WinAndLoss.toFixed(2) : null}
                                          </h6>

                                          {profit && sectionType === otherMarketElement.marketName ?
                                            <>
                                              <h6
                                                className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                              >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                            </> : null
                                          }
                                          <div className="market-nation-book" />
                                        </div>

                                        <div className="market-odd-box back2" >
                                          <span className="market-odd">

                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[2] && elementOtrMkt.ex.availableToBack[2].price ? elementOtrMkt.ex.availableToBack[2].price : "--"
                                            }

                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[2] && elementOtrMkt.ex.availableToBack[2].size ? elementOtrMkt.ex.availableToBack[2].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box  back1  ">
                                          <span className="market-odd"
                                          >
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[1] && elementOtrMkt.ex.availableToBack[1].price ? elementOtrMkt.ex.availableToBack[1].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[1] && elementOtrMkt.ex.availableToBack[1].size ? elementOtrMkt.ex.availableToBack[1].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box back"
                                          onClick={() =>
                                            handleBackOpenOtherMarketSportIDWise({
                                              odds: elementOtrMkt.ex.availableToBack[0].price,
                                              type: "BACK",
                                              sectionType: otherMarketElement.marketName,
                                              otherMrktCurrentItem: otherMarketElement,
                                              element: elementOtrMkt,
                                              selectionId: elementOtrMkt.selectionId,
                                              isBack: true
                                            })
                                          }
                                        >
                                          <span className="market-odd" >
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[0] && elementOtrMkt.ex.availableToBack[0].price ? elementOtrMkt.ex.availableToBack[0].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToBack && elementOtrMkt.ex.availableToBack[0] && elementOtrMkt.ex.availableToBack[0].size ? elementOtrMkt.ex.availableToBack[0].size : "--"
                                            }
                                          </span>
                                        </div>


                                        <div className="market-odd-box lay"

                                          onClick={() =>
                                            handleBackOpenOtherMarketSportIDWise({
                                              odds: elementOtrMkt.ex.availableToLay[0].price,
                                              type: "LAY",
                                              sectionType: otherMarketElement.marketName,
                                              otherMrktCurrentItem: otherMarketElement,
                                              element: elementOtrMkt,
                                              selectionId: elementOtrMkt.selectionId,
                                              isBack: false
                                            })
                                          }

                                        >
                                          <span className="market-odd"  >
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[0] && elementOtrMkt.ex.availableToLay[0].price ? elementOtrMkt.ex.availableToLay[0].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[0] && elementOtrMkt.ex.availableToLay[0].size ? elementOtrMkt.ex.availableToLay[0].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box  lay1  ">
                                          <span className="market-odd">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[1] && elementOtrMkt.ex.availableToLay[1].price ? elementOtrMkt.ex.availableToLay[1].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[1] && elementOtrMkt.ex.availableToLay[1].size ? elementOtrMkt.ex.availableToLay[1].size : "--"
                                            }
                                          </span>
                                        </div>
                                        <div className="market-odd-box   lay2 ">
                                          <span className="market-odd">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[2] && elementOtrMkt.ex.availableToLay[2].price ? elementOtrMkt.ex.availableToLay[2].price : "--"
                                            }
                                          </span>
                                          <span className="market-volume">
                                            {
                                              elementOtrMkt && elementOtrMkt.ex && elementOtrMkt.ex.availableToLay && elementOtrMkt.ex.availableToLay[2] && elementOtrMkt.ex.availableToLay[2].size ? elementOtrMkt.ex.availableToLay[2].size : "--"
                                            }
                                          </span>
                                        </div>

                                      </div>
                                    </>
                                }
                              </>

                            </React.Fragment>
                          )) : null
                      }
                    </>

                  </div>


                </div>

              </>
            )) : null

          }
        </>

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

export default connect(mapStateToProps)(MatchData);













































