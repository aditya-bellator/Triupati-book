import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from "moment";
import { userActions } from '../../_actions';


class MatchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetailsData: {},
      // matchSession: {},
      matchScore: {},
      MatchDetailsState: {},
      // matchInfo: {},
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.addUserSuccess) {
      return {
        ...nextProps,
        MatchDetailsState: nextProps.users && nextProps.users.eventDetals && nextProps.users.eventDetals.MatchDetails ? nextProps.users.eventDetals.MatchDetails : {}

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


    // const matchDetailsRes = fetch("https://triupatiexch.com/api/v5/get-cricket-detail", {
    //   method: "POST",
    //   body: JSON.stringify(matchListReqData),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // }).then(response => response.json()).then(data => {
    //   this.setState({
    //     matchDetailsData: data.data,
    //   });
    // })


    // let reqData = { "from_date": 1704133800, "to_date": 1704738599, "limit": 15, "pageno": 1 }

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

    // this.props.dispatch(userActions.getScore(match_id));











    const matchScoreRes = fetch(`https://score.jeoad.com/api/v1/getScore?matchId=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        matchScore: data.data,
      });
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
      this.setState({
        matchScore: data.data,
      });
    })

  }

  // isBigEnough = (value) => {
  //   console.log('value___isBigEnough????', value);
  //   // return value >= 10;
  // }


  render() {


    let { users, handleBackOpen, handleFancyBetModalOpen, handleBookmakerBetModalOpenSportWise, handleBackOpenTiedMatch, currentRunner, profit, sectionType } = this.props;
    let { eventDetals, matchSession, matchScoreDDD } = users;
    let { MatchDetails, BookerMakerMarket, OtherMarketList, bm } = eventDetals ? eventDetals : {};
    // let { odds, bm } = this.state.matchDetailsData ? this.state.matchDetailsData : {};

    // console.log('RENDER__111__MatchDetails??', MatchDetails);
    // console.log('RENDER__222__BookerMakerMarket??', BookerMakerMarket);
    // console.log('RENDER__333__OtherMarketList??', OtherMarketList);
    // console.log('RENDER__444__bm??', bm);

    // console.log('this.props.sport_id::', this.props.sport_id);

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
          <div className="row">

            <div className="col-12 col-md-6">
              <p className="team-1 row">
                <span className="team-name col-3"> {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].team1 ? this.state.matchScore[2].team1
                  : "0"}</span>
                <span className="score col-4 text-end">{this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].score ? this.state.matchScore[2].score
                  : "0"}
                  ({this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].ballsdone ? ((this.state.matchScore[2].ballsdone) / 6).toFixed(1)
                    : "0"})
                  {/* (27.3) */}
                </span>
                <span className="team-name col-3" > CRR {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].rate ? this.state.matchScore[2].rate
                  : "0"}</span>
                <span className="team-name col-5" />
              </p>
              <p className="team-1 row mt-2">
                <span className="team-name col-3">{this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].team2 ? this.state.matchScore[2].team2
                  : "0"}</span>
                <span className="score col-4 text-end">

                  {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].score2 ? this.state.matchScore[2].score2
                    : "0"}

                  ({this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].ballsdone2 ? ((this.state.matchScore[2].ballsdone2) / 6).toFixed(1)
                    : "0.0"})
                </span>
                <span className="team-name col-3" > CRR {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].rate2 ? this.state.matchScore[2].rate2
                  : "0"}</span>
                {/* <span className="team-name col-5">
                  <span>CRR 5.60 </span>
                  <span>RR 1.98</span>
                </span> */}
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

                        {/* <span className="ball-runs">0</span>
                        <span className="ball-runs">0</span>
                        <span className="ball-runs">0</span>
                        <span className="ball-runs">0</span>
                        <span className="ball-runs">0</span>
                        <span className="ball-runs">0</span> */}


                      </p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ODDS SECTION */}
        <div className="game-market market-4 ">
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
        </div>


        <>
          {this.props.sport_id === "1" || this.props.sport_id === "2" ?
            <>
              {/* BOOKMAKER NEW SECTION */}
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


        <>
          {this.props.sport_id === "4" ?
            <>
              {/* BOOKMAKER NEW SECTION */}
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


        {/* BOOKMAKER OLD SECTION */}
        {/* <div className="game-market market-4 width70">
          <div className="market-title">
            <span>Bookmaker </span>
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
          <div className="market-body " data-title="SUSPENDED">


            <>
              {
                BookerMakerMarket && BookerMakerMarket.runner_json && BookerMakerMarket.runner_json.length > 0 ?
                  BookerMakerMarket.runner_json.map((element, index) => (
                    <React.Fragment key={index}>
                      <div className="market-row " data-title="ACTIVE">
                        <div className="market-nation-detail">
                          <span className="market-nation-name">
                            {element && element.selectionName ? element.selectionName : "-"}
                          </span>
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
                          <span className="market-odd">
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
                              element: element,
                              selectionId: element.selectionId
                            })
                          }
                        >
                          <span className="market-odd">
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


                        <div className="market-odd-box lay "
                          onClick={() =>
                            handleBackOpen({
                              odds: element.ex.availableToLay[0].price,
                              type: "LAY",
                              element: element,
                              selectionId: element.selectionId
                            })
                          }>
                          <span className="market-odd">
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
                    </React.Fragment>
                  )) : null
              }
            </>




          </div>


          <div className="market-row">
            <div className="moving-text">
              Play World's Fastest Cricket Game Ball By Ball,Started In Our
              Exchange!!!
            </div>
          </div>
        </div> */}

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
                              // data-title="Ball Running"
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

        {/* BALL BY BALL SECTION */}
        {/* <div className="game-market market-6">
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
              <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.1 ball run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">29</span>
                      <span className="market-volume">170</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">29</span>
                      <span className="market-volume">120</span>
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
              <div className="col-md-6">
                <div
                  className="fancy-market suspended-row"
                  data-title="SUSPENDED"
                >
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.2 ball run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
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
              <div className="col-md-6">
                <div
                  className="fancy-market suspended-row"
                  data-title="SUSPENDED"
                >
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.3 ball run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
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
              <div className="col-md-6">
                <div
                  className="fancy-market suspended-row"
                  data-title="SUSPENDED"
                >
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.4 ball run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
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
              <div className="col-md-6">
                <div
                  className="fancy-market suspended-row"
                  data-title="SUSPENDED"
                >
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.5 ball run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="fancy-market suspended-row"
                  data-title="SUSPENDED"
                >
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.6 ball run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* OVER BY OVER SECTION */}
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


        {/* TIED SECTION */}
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
                                  //  onClick={showPlaceBetHandler}
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

                                  {/* lay */}

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













































