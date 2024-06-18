import React, { Component } from 'react';
import axios from 'axios';


class MatchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchDetailsData: {},
      matchSession: {},
      matchScore: {},
    }
  }



  componentDidMount() {
    const { sport_id, series_id, match_id, market_id } = this.props;

    console.log('lllllllllllllkkkkk......', sport_id, series_id, match_id, market_id);

    // https://triupatiexch.com/api/v5/get-cricket-detail
    // {"match_id":"32902230","sport_id":"4"}

    // https://triupatiexch.com/api/v5/get-match-session?match_id=32902230
    // https://score.jeoad.com/api/v1/getScore?matchId=32902230


    let matchListReqData = { "match_id": match_id, "sport_id": sport_id }

    const matchDetailsRes = fetch("https://triupatiexch.com/api/v5/get-cricket-detail", {
      method: "POST",
      body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        matchDetailsData: data.data,
      });
    })


    const matchSessionRes = fetch(`https://triupatiexch.com/api/v5/get-match-session?match_id=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        matchSession: data.data,
      });
    })

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


    // this.interval = setInterval(() => this.loadData(), 1000);
    // this.interval1 = setInterval(() => this.loadData1(), 1500);

  }


  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval1);
  }

  loadData = () => {

    const { sport_id, series_id, match_id, market_id } = this.props;
    // console.log('lllllllllllllkkkkk......', sport_id, series_id, match_id, market_id);
    let matchListReqData = { "match_id": match_id, "sport_id": sport_id }

    const matchDetailsRes = fetch("https://triupatiexch.com/api/v5/get-cricket-detail", {
      method: "POST",
      body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        matchDetailsData: data.data,
      });
    })

    const matchSessionRes = fetch(`https://triupatiexch.com/api/v5/get-match-session?match_id=${match_id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      this.setState({
        matchSession: data.data,
      });
    })


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


  render() {

    // matchDetailsData: {},
    // matchSession: {},
    // matchScore: {},   
    // console.log('this.state.matchDetailsData.....###', this.state.matchDetailsData);
    // console.log('this.state.matchSession.......####', this.state.matchSession);
    // console.log('this.state.matchScore........####', this.state.matchScore);

    let { odds, bm } = this.state.matchDetailsData ? this.state.matchDetailsData : {};

    // console.log('bm????', bm);
    console.log('RENDER___this.state.matchScore::::', this.state.matchScore);

    return (
      <>
        <div className="scorecard">
          <div className="game-header">
            <span>South Africa v India</span>
            <span className="float-right">17/12/2023 13:30:00</span>
          </div>
          <div className="row">

            <div className="col-12 col-md-6">
              <p className="team-1 row">
                <span className="team-name col-3"> {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].team1 ? this.state.matchScore[2].team1
                  : "0"}</span>
                <span className="score col-4 text-end">{this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].score ? this.state.matchScore[2].score
                  : "0"}

                  {/* (27.3) */}
                </span>
                <span className="team-name col-5" />
              </p>
              <p className="team-1 row mt-2">
                <span className="team-name col-3">{this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].team2 ? this.state.matchScore[2].team2
                  : "0"}</span>
                <span className="score col-4 text-end">

                  {this.state.matchScore && this.state.matchScore[2] && this.state.matchScore[2].score2 ? this.state.matchScore[2].score2
                    : "0"}

                  {/* (5.0) */}
                </span>
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

                  {/* {
                    this.state.matchScore && this.state.matchScore[0] && this.state.matchScore[0].recentBalls && this.state.matchScore[0].recentBalls.length > 0 ? this.state.matchScore[0].recentBalls.map((element, index) => (
                      <React.Fragment key={index}>
                        <span className="ball-runs">0</span>
                      </React.Fragment>
                    )) : null

                  } */}


                  {/* <span>
                    <div className="flex justify-start items-center space-x-2 py-1">
                      {this.state.matchScore &&
                        this.state.matchScore[0] &&
                        this.state.matchScore[0].recentBalls &&
                        this.state.matchScore[0].recentBalls[0] &&
                        this.state.matchScore[0].recentBalls[0].length > 0
                        ? this.state.matchScore[0].recentBalls[0].map(
                          (elementtemp, index) => (
                            <div className="
                                
                                bg-black/30 w-6 h-6 flex justify-center items-center rounded-full text-white font-medium text-[13px]">
                              {elementtemp}
                            </div>
                          ),
                        )
                        : "NA"}
                    </div>
                  </span> */}

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
                              // <div className="

                              //   bg-black/30 w-6 h-6 flex justify-center items-center rounded-full text-white font-medium text-[13px]">
                              //   {elementtemp}
                              // </div>

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
                odds && odds.runner_json && odds.runner_json.length > 0 ?
                  odds.runner_json.map((element, index) => (
                    <React.Fragment key={index}>
                      <div className="market-row " data-title="ACTIVE">
                        <div className="market-nation-detail">
                          <span className="market-nation-name">
                            {element && element.selectionName ? element.selectionName : "-"}
                          </span>
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
                        <div className="market-odd-box back   ">
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

                        {/* lay */}

                        <div className="market-odd-box lay   ">
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
        </div>
        <div className="game-market market-4 width70">
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
                bm && bm.runner_json && bm.runner_json.length > 0 ?
                  bm.runner_json.map((element, index) => (
                    <React.Fragment key={index}>
                      <div className="market-row " data-title="ACTIVE">
                        <div className="market-nation-detail">
                          <span className="market-nation-name">
                            {element && element.selectionName ? element.selectionName : "-"}
                          </span>
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
                        <div className="market-odd-box back   ">
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

                        {/* lay */}

                        <div className="market-odd-box lay   ">
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


            {/* <div className="market-row suspended-row" data-title="SUSPENDED">
              <div className="market-nation-detail">
                <span className="market-nation-name">South Africa</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box   back2 ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box  back1  ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box  lay1  ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box   lay2 ">
                <span className="market-odd">-</span>
              </div>
            </div>
            
            <div className="market-row " data-title="ACTIVE">
              <div className="market-nation-detail">
                <span className="market-nation-name">India</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box   back2 ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box  back1  ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">1</span>
                <span className="market-volume">2500000</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">1.5</span>
                <span className="market-volume">2500000</span>
              </div>
              <div className="market-odd-box  lay1  ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box   lay2 ">
                <span className="market-odd">-</span>
              </div>
            </div> */}

          </div>


          <div className="market-row">
            <div className="moving-text">
              Play World's Fastest Cricket Game Ball By Ball,Started In Our
              Exchange!!!
            </div>
          </div>
        </div>


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


        {/* HIDE SECTION START  ==>  TIED MATCH   */}
        {/* <div className="game-market market-2 width30">
          <div className="market-title">
            <span>Tied Match</span>
          </div>
          <div className="market-header">
            <div className="market-nation-detail">
              <span className="market-nation-name">Min: 100&nbsp; Max: 1L</span>
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
                <span className="market-nation-name">YES</span>
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
                <span className="market-nation-name">NO</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">1</span>
                <span className="market-volume">100000</span>
              </div>
            </div>
          </div>
          <div className="market-row">
            <div className="moving-text">
              Zimbabwe vs Ireland Match Bets Started In Our Exchange
            </div>
          </div>
        </div> */}
        {/* HIDE SECTION END  ==>  TIED MATCH   */}


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
              <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">10 over run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">56</span>
                      <span className="market-volume">110</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">56</span>
                      <span className="market-volume">90</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 3L</span>
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
                        10 over run IND 2
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">55</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">56</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 10</span>
                        <span className="w-100 d-block">Max: 1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="fancy-market suspended-row"
                  data-title="Ball Running"
                >
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">
                        10 over run bhav IND
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
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 10K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">5.3 over run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">30</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">31</span>
                      <span className="market-volume">100</span>
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
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">6 over run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">33</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">34</span>
                      <span className="market-volume">100</span>
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
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">9 over run IND</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">51</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">52</span>
                      <span className="market-volume">100</span>
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
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">
                        1st 2 wkt runs IND
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">58</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">58</span>
                      <span className="market-volume">80</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 3L</span>
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
                        Fall of 2nd wkt run bhav IND
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">29</span>
                      <span className="market-volume">6</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">29</span>
                      <span className="market-volume">3</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 7L</span>
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
                        S Sudharsan run(SA vs IND)adv
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">44</span>
                      <span className="market-volume">110</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">44</span>
                      <span className="market-volume">90</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 3L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">S Iyer run</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">35</span>
                      <span className="market-volume">110</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">35</span>
                      <span className="market-volume">90</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 3L</span>
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
                        S Sudharsan run bhav
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">17</span>
                      <span className="market-volume">8</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">17</span>
                      <span className="market-volume">5</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 7L</span>
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
                        S Sudharsan run bhav 2
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">25</span>
                      <span className="market-volume">33</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">25</span>
                      <span className="market-volume">28</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 3L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">S Iyer run bhav</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">6</span>
                      <span className="market-volume">6</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">6</span>
                      <span className="market-volume">3</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 7L</span>
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
                        S Iyer run bhav 2
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">30</span>
                      <span className="market-volume">80</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">30</span>
                      <span className="market-volume">65</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 3L</span>
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
                        2nd wkt pship boundaries IND
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">5</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">6</span>
                      <span className="market-volume">100</span>
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
                        S Sudharsan Boundaries(SA vs IND)adv
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">7</span>
                      <span className="market-volume">100</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">8</span>
                      <span className="market-volume">100</span>
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
                        S Iyer boundaries
                      </span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">5</span>
                      <span className="market-volume">115</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">5</span>
                      <span className="market-volume">85</span>
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
            </div>
          </div>
        </div>
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
        </div>
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
        <div className="game-market market-6">
          <div className="market-title">
            <span>fancy</span>
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
                this.state.matchSession && this.state.matchSession.length > 0 ?
                  this.state.matchSession.map((element, index) => (
                    <React.Fragment key={index}>

                      <div className="col-md-6">
                        <div className="fancy-market " data-title="">
                          <div className="market-row">
                            <div className="market-nation-detail">
                              <span className="market-nation-name">
                                {element && element.RunnerName ? element.RunnerName : "-"}
                              </span>
                              <div className="market-nation-book" />
                            </div>
                            <div className="market-odd-box back ">
                              <span className="market-odd">{element && element.BackPrice1 ? element.BackPrice1 : "-"}</span>
                              <span className="market-volume">{element && element.BackSize1 ? element.BackSize1 : "-"}</span>
                            </div>
                            <div className="market-odd-box lay ">
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
                      </div>
                    </React.Fragment>
                  )) : null

              }


              {/* <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">
                        2nd wkt Caught out IND
                      </span>
                      <div className="market-nation-book" />
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.6</span>
                      <span className="market-volume">100000</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">1.9</span>
                      <span className="market-volume">100000</span>
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
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">
                        2nd wkt Nextman out S Sudharsan
                      </span>
                      <div className="market-nation-book" />
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.7</span>
                      <span className="market-volume">100000</span>
                    </div>
                    <div className="market-odd-box lay ">
                      <span className="market-odd">2</span>
                      <span className="market-volume">100000</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 100</span>
                        <span className="w-100 d-block">Max: 25K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

            </div>
          </div>

        </div>

        {/* HIDE SECTION START  ==>  ODDEVEN  */}
        {/* <div className="game-market market-6">
          <div className="market-title">
            <span>oddeven</span>
          </div>
          <div className="market-body " data-title="OPEN">
            <div className="row row10">
              <div className="col-md-6">
                <div className="fancy-market " data-title="">
                  <div className="market-row">
                    <div className="market-nation-detail">
                      <span className="market-nation-name">
                        2nd inn 10 over odd run bhav(SA vs IND)adv
                      </span>
                      <div className="market-nation-book" />
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.98</span>
                      <span className="market-volume">500000</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 10</span>
                        <span className="w-100 d-block">Max: 1L</span>
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
                        2nd inn 10 over even run bhav(SA vs IND)adv
                      </span>
                      <div className="market-nation-book" />
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.98</span>
                      <span className="market-volume">500000</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 10</span>
                        <span className="w-100 d-block">Max: 1L</span>
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
                        2nd inn 15 over odd run bhav(SA vs IND)adv
                      </span>
                      <div className="market-nation-book" />
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.98</span>
                      <span className="market-volume">500000</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 10</span>
                        <span className="w-100 d-block">Max: 1L</span>
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
                        2nd inn 15 over even run bhav(SA vs IND)adv
                      </span>
                      <div className="market-nation-book" />
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">-</span>
                    </div>
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.98</span>
                      <span className="market-volume">500000</span>
                    </div>
                    <div className="fancy-min-max-box">
                      <div className="fancy-min-max">
                        <span className="w-100 d-block">Min: 10</span>
                        <span className="w-100 d-block">Max: 1L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* HIDE SECTION END  ==>  ODDEVEN  */}


        {/* HIDE SECTION START  ==>  2ND INN 10 OVER SA VS IND  */}
        {/* <div className="game-market market-9">
          <div className="market-title">
            <span>2ND INN 10 OVER SA VS IND</span>
          </div>
          <div className="market-header">
            <div className="market-nation-detail">
              <span className="market-nation-name">Min: 100 Max: 25K</span>
            </div>
            <div className="market-odd-box back">
              <b>Back</b>
            </div>
          </div>
          <div className="market-body " data-title="OPEN">
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">0 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">1 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">2 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">3 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">4 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">5 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">6 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">7 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">8 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
            <div className="market-row " data-title="">
              <div className="market-nation-detail">
                <span className="market-nation-name">9 Number</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box back ">
                <span className="market-odd">9.5</span>
                <span className="market-volume">100</span>
              </div>
            </div>
          </div>
        </div> */}
        {/* HIDE SECTION END  ==>  2ND INN 10 OVER SA VS IND  */}


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
          <div className="market-body " data-title="OPEN">
            <div className="market-row " data-title="ACTIVE">
              <div className="market-nation-detail">
                <span className="market-nation-name">Yes</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box   back2 ">
                <span className="market-odd">100</span>
                <span className="market-volume">91.71</span>
              </div>
              <div className="market-odd-box  back1  ">
                <span className="market-odd">120</span>
                <span className="market-volume">35.19</span>
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">230</span>
                <span className="market-volume">2.89</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">1000</span>
                <span className="market-volume">2.15</span>
              </div>
              <div className="market-odd-box  lay1  ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box   lay2 ">
                <span className="market-odd">-</span>
              </div>
            </div>
            <div className="market-row " data-title="ACTIVE">
              <div className="market-nation-detail">
                <span className="market-nation-name">No</span>
                <div className="market-nation-book" />
              </div>
              <div className="market-odd-box   back2 ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box  back1  ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box back   ">
                <span className="market-odd">-</span>
              </div>
              <div className="market-odd-box lay   ">
                <span className="market-odd">1.01</span>
                <span className="market-volume">9079.74</span>
              </div>
              <div className="market-odd-box  lay1  ">
                <span className="market-odd">1.02</span>
                <span className="market-volume">4160.5</span>
              </div>
              <div className="market-odd-box   lay2 ">
                <span className="market-odd">1.03</span>
                <span className="market-volume">6033</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default MatchData;














































// import React from "react";

// const MatchData = ({ showPlaceBetHandler }) => {
//   return (
//     <>
//       <div className="scorecard">
//         <div className="row">
//           <div className="col-12 col-md-6">
//             <p className="team-1 row">
//               <span className="team-name col-3">SA</span>
//               <span className="score col-4 text-end">116-10 (27.3)</span>
//               <span className="team-name col-5" />
//             </p>
//             <p className="team-1 row mt-2">
//               <span className="team-name col-3">IND</span>
//               <span className="score col-4 text-end">28-1 (5.0)</span>
//               <span className="team-name col-5">
//                 <span>CRR 5.60 </span>
//                 <span>RR 1.98</span>
//               </span>
//             </p>
//           </div>
//           <div className="col-12 col-md-6">
//             <div className="row">
//               <div className="col-12">
//                 <div className="text-xl-end">
//                   <span>IND Needed 89 runs from 270 balls</span>
//                 </div>
//                 <div className="row">
//                   <div className="col-12">
//                     <p className="text-xl-end ball-by-ball mt-2">
//                       <span className="ball-runs">0</span>
//                       <span className="ball-runs">0</span>
//                       <span className="ball-runs">0</span>
//                       <span className="ball-runs">0</span>
//                       <span className="ball-runs">0</span>
//                       <span className="ball-runs">0</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-4 ">
//         <div className="market-title">
//           <span>MATCH_ODDS</span>
//         </div>
//         <div className="market-header">
//           <div className="market-nation-detail">
//             <span className="market-nation-name">Max: 1L</span>
//           </div>
//           <div className="market-odd-box no-border d-none d-md-block" />
//           <div className="market-odd-box no-border d-none d-md-block" />
//           <div className="market-odd-box back">
//             <b>Back</b>
//           </div>
//           <div className="market-odd-box lay">
//             <b>Lay</b>
//           </div>
//           <div className="market-odd-box" />
//           <div className="market-odd-box no-border" />
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">South Africa</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back2" onClick={showPlaceBetHandler}>
//               <span className="market-odd">
//                 75
//               </span>
//               <span className="market-volume">49.95</span>
//             </div>
//             <div className="market-odd-box  back1  ">
//               <span className="market-odd">80</span>
//               <span className="market-volume">25.91</span>
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">100</span>
//               <span className="market-volume">55.79</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">110</span>
//               <span className="market-volume">9.52</span>
//             </div>
//             <div className="market-odd-box  lay1  ">
//               <span className="market-odd">120</span>
//               <span className="market-volume">108.96</span>
//             </div>
//             <div className="market-odd-box   lay2 ">
//               <span className="market-odd">150</span>
//               <span className="market-volume">18.21</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">India</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box   back2 ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box  back1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">1.01</span>
//               <span className="market-volume">5523.83</span>
//             </div>
//             <div className="market-odd-box  lay1  ">
//               <span className="market-odd">1.02</span>
//               <span className="market-volume">100431.95</span>
//             </div>
//             <div className="market-odd-box   lay2 ">
//               <span className="market-odd">1.03</span>
//               <span className="market-volume">40742.85</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-4 width70">
//         <div className="market-title">
//           <span>Bookmaker</span>
//         </div>
//         <div className="market-header">
//           <div className="market-nation-detail">
//             <span className="market-nation-name">Min: 100&nbsp; Max: 25L</span>
//           </div>
//           <div className="market-odd-box no-border d-none d-md-block" />
//           <div className="market-odd-box no-border d-none d-md-block" />
//           <div className="market-odd-box back">
//             <b>Back</b>
//           </div>
//           <div className="market-odd-box lay">
//             <b>Lay</b>
//           </div>
//           <div className="market-odd-box" />
//           <div className="market-odd-box no-border" />
//         </div>
//         <div className="market-body " data-title="SUSPENDED">
//           <div className="market-row suspended-row" data-title="SUSPENDED">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">South Africa</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box   back2 ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box  back1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box  lay1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box   lay2 ">
//               <span className="market-odd">-</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">India</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box   back2 ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box  back1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">1</span>
//               <span className="market-volume">2500000</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">1.5</span>
//               <span className="market-volume">2500000</span>
//             </div>
//             <div className="market-odd-box  lay1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box   lay2 ">
//               <span className="market-odd">-</span>
//             </div>
//           </div>
//         </div>
//         <div className="market-row">
//           <div className="moving-text">
//             Play World's Fastest Cricket Game Ball By Ball,Started In Our
//             Exchange!!!
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-2 width30">
//         <div className="market-title">
//           <span>Bookmaker 2</span>
//         </div>
//         <div className="market-header">
//           <div className="market-nation-detail">
//             <span className="market-nation-name">Min: 100&nbsp; Max: 2L</span>
//           </div>
//           <div className="market-odd-box back">
//             <b>Back</b>
//           </div>
//           <div className="market-odd-box lay">
//             <b>Lay</b>
//           </div>
//         </div>
//         <div className="market-body " data-title="SUSPENDED">
//           <div className="market-row suspended-row" data-title="SUSPENDED">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">South Africa.</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">-</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">India.</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">1</span>
//               <span className="market-volume">200000</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">1.5</span>
//               <span className="market-volume">200000</span>
//             </div>
//           </div>
//         </div>
//         <div className="market-row">
//           <div className="moving-text">
//             Virtual Cricket Bookmaker Bets Started In Our Exchange
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-2 width30">
//         <div className="market-title">
//           <span>Tied Match</span>
//         </div>
//         <div className="market-header">
//           <div className="market-nation-detail">
//             <span className="market-nation-name">Min: 100&nbsp; Max: 1L</span>
//           </div>
//           <div className="market-odd-box back">
//             <b>Back</b>
//           </div>
//           <div className="market-odd-box lay">
//             <b>Lay</b>
//           </div>
//         </div>
//         <div className="market-body " data-title="SUSPENDED">
//           <div className="market-row suspended-row" data-title="SUSPENDED">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">YES</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">-</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">NO</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">1</span>
//               <span className="market-volume">100000</span>
//             </div>
//           </div>
//         </div>
//         <div className="market-row">
//           <div className="moving-text">
//             Zimbabwe vs Ireland Match Bets Started In Our Exchange
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-6">
//         <div className="market-title">
//           <span>Normal</span>
//         </div>
//         <div className="row row10">
//           <div className="col-md-6">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box lay">
//                 <b>No</b>
//               </div>
//               <div className="market-odd-box back">
//                 <b>Yes</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//           <div className="col-md-6 d-none d-xl-block">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box lay">
//                 <b>No</b>
//               </div>
//               <div className="market-odd-box back">
//                 <b>Yes</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="row row10">
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">10 over run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">56</span>
//                     <span className="market-volume">110</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">56</span>
//                     <span className="market-volume">90</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 3L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       10 over run IND 2
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">55</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">56</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 10</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="fancy-market suspended-row"
//                 data-title="Ball Running"
//               >
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       10 over run bhav IND
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 10K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.3 over run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">30</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">31</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">6 over run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">33</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">34</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">9 over run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">51</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">52</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       1st 2 wkt runs IND
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">58</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">58</span>
//                     <span className="market-volume">80</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 3L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       Fall of 2nd wkt run bhav IND
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">29</span>
//                     <span className="market-volume">6</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">29</span>
//                     <span className="market-volume">3</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 7L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       S Sudharsan run(SA vs IND)adv
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">44</span>
//                     <span className="market-volume">110</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">44</span>
//                     <span className="market-volume">90</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 3L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">S Iyer run</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">35</span>
//                     <span className="market-volume">110</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">35</span>
//                     <span className="market-volume">90</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 3L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       S Sudharsan run bhav
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">17</span>
//                     <span className="market-volume">8</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">17</span>
//                     <span className="market-volume">5</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 7L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       S Sudharsan run bhav 2
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">25</span>
//                     <span className="market-volume">33</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">25</span>
//                     <span className="market-volume">28</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 3L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">S Iyer run bhav</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">6</span>
//                     <span className="market-volume">6</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">6</span>
//                     <span className="market-volume">3</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 7L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       S Iyer run bhav 2
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">30</span>
//                     <span className="market-volume">80</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">30</span>
//                     <span className="market-volume">65</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 3L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd wkt pship boundaries IND
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">5</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">6</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 50K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       S Sudharsan Boundaries(SA vs IND)adv
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">7</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">8</span>
//                     <span className="market-volume">100</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 50K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       S Iyer boundaries
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">5</span>
//                     <span className="market-volume">115</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">5</span>
//                     <span className="market-volume">85</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 50K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-6">
//         <div className="market-title">
//           <span>Ball By Ball</span>
//         </div>
//         <div className="row row10">
//           <div className="col-md-6">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box lay">
//                 <b>No</b>
//               </div>
//               <div className="market-odd-box back">
//                 <b>Yes</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//           <div className="col-md-6 d-none d-xl-block">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box lay">
//                 <b>No</b>
//               </div>
//               <div className="market-odd-box back">
//                 <b>Yes</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="row row10">
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.1 ball run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">29</span>
//                     <span className="market-volume">170</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">29</span>
//                     <span className="market-volume">120</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="fancy-market suspended-row"
//                 data-title="SUSPENDED"
//               >
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.2 ball run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="fancy-market suspended-row"
//                 data-title="SUSPENDED"
//               >
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.3 ball run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="fancy-market suspended-row"
//                 data-title="SUSPENDED"
//               >
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.4 ball run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="fancy-market suspended-row"
//                 data-title="SUSPENDED"
//               >
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.5 ball run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 className="fancy-market suspended-row"
//                 data-title="SUSPENDED"
//               >
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">5.6 ball run IND</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-6">
//         <div className="market-title">
//           <span>Over By Over</span>
//         </div>
//         <div className="row row10">
//           <div className="col-md-6">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box lay">
//                 <b>No</b>
//               </div>
//               <div className="market-odd-box back">
//                 <b>Yes</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//           <div className="col-md-6 d-none d-xl-block">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box lay">
//                 <b>No</b>
//               </div>
//               <div className="market-odd-box back">
//                 <b>Yes</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="row row10">
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       Only 7 over run IND
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">6</span>
//                     <span className="market-volume">110</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">6</span>
//                     <span className="market-volume">90</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 50K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       5.1 to 5.3 ball No Boundaries IND
//                     </span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">4</span>
//                     <span className="market-volume">80</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">4</span>
//                     <span className="market-volume">60</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 2L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-6">
//         <div className="market-title">
//           <span>fancy1</span>
//         </div>
//         <div className="row row10">
//           <div className="col-md-6">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box back">
//                 <b>Back</b>
//               </div>
//               <div className="market-odd-box lay">
//                 <b>Lay</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//           <div className="col-md-6 d-none d-xl-block">
//             <div className="market-header">
//               <div className="market-nation-detail" />
//               <div className="market-odd-box back">
//                 <b>Back</b>
//               </div>
//               <div className="market-odd-box lay">
//                 <b>Lay</b>
//               </div>
//               <div className="fancy-min-max-box" />
//             </div>
//           </div>
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="row row10">
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd wkt Caught out IND
//                     </span>
//                     <div className="market-nation-book" />
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">1.6</span>
//                     <span className="market-volume">100000</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">1.9</span>
//                     <span className="market-volume">100000</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd wkt Nextman out S Sudharsan
//                     </span>
//                     <div className="market-nation-book" />
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">1.7</span>
//                     <span className="market-volume">100000</span>
//                   </div>
//                   <div className="market-odd-box lay ">
//                     <span className="market-odd">2</span>
//                     <span className="market-volume">100000</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 100</span>
//                       <span className="w-100 d-block">Max: 25K</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-6">
//         <div className="market-title">
//           <span>oddeven</span>
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="row row10">
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd inn 10 over odd run bhav(SA vs IND)adv
//                     </span>
//                     <div className="market-nation-book" />
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">1.98</span>
//                     <span className="market-volume">500000</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 10</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd inn 10 over even run bhav(SA vs IND)adv
//                     </span>
//                     <div className="market-nation-book" />
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">1.98</span>
//                     <span className="market-volume">500000</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 10</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd inn 15 over odd run bhav(SA vs IND)adv
//                     </span>
//                     <div className="market-nation-book" />
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">1.98</span>
//                     <span className="market-volume">500000</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 10</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="fancy-market " data-title="">
//                 <div className="market-row">
//                   <div className="market-nation-detail">
//                     <span className="market-nation-name">
//                       2nd inn 15 over even run bhav(SA vs IND)adv
//                     </span>
//                     <div className="market-nation-book" />
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">-</span>
//                   </div>
//                   <div className="market-odd-box back ">
//                     <span className="market-odd">1.98</span>
//                     <span className="market-volume">500000</span>
//                   </div>
//                   <div className="fancy-min-max-box">
//                     <div className="fancy-min-max">
//                       <span className="w-100 d-block">Min: 10</span>
//                       <span className="w-100 d-block">Max: 1L</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-9">
//         <div className="market-title">
//           <span>2ND INN 10 OVER SA VS IND</span>
//         </div>
//         <div className="market-header">
//           <div className="market-nation-detail">
//             <span className="market-nation-name">Min: 100 Max: 25K</span>
//           </div>
//           <div className="market-odd-box back">
//             <b>Back</b>
//           </div>
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">0 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">1 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">2 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">3 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">4 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">5 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">6 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">7 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">8 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">9 Number</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box back ">
//               <span className="market-odd">9.5</span>
//               <span className="market-volume">100</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="game-market market-4 ">
//         <div className="market-title">
//           <span>TIED_MATCH</span>
//         </div>
//         <div className="market-header">
//           <div className="market-nation-detail">
//             <span className="market-nation-name">Max: 1</span>
//           </div>
//           <div className="market-odd-box no-border d-none d-md-block" />
//           <div className="market-odd-box no-border d-none d-md-block" />
//           <div className="market-odd-box back">
//             <b>Back</b>
//           </div>
//           <div className="market-odd-box lay">
//             <b>Lay</b>
//           </div>
//           <div className="market-odd-box" />
//           <div className="market-odd-box no-border" />
//         </div>
//         <div className="market-body " data-title="OPEN">
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">Yes</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box   back2 ">
//               <span className="market-odd">100</span>
//               <span className="market-volume">91.71</span>
//             </div>
//             <div className="market-odd-box  back1  ">
//               <span className="market-odd">120</span>
//               <span className="market-volume">35.19</span>
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">230</span>
//               <span className="market-volume">2.89</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">1000</span>
//               <span className="market-volume">2.15</span>
//             </div>
//             <div className="market-odd-box  lay1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box   lay2 ">
//               <span className="market-odd">-</span>
//             </div>
//           </div>
//           <div className="market-row " data-title="ACTIVE">
//             <div className="market-nation-detail">
//               <span className="market-nation-name">No</span>
//               <div className="market-nation-book" />
//             </div>
//             <div className="market-odd-box   back2 ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box  back1  ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box back   ">
//               <span className="market-odd">-</span>
//             </div>
//             <div className="market-odd-box lay   ">
//               <span className="market-odd">1.01</span>
//               <span className="market-volume">9079.74</span>
//             </div>
//             <div className="market-odd-box  lay1  ">
//               <span className="market-odd">1.02</span>
//               <span className="market-volume">4160.5</span>
//             </div>
//             <div className="market-odd-box   lay2 ">
//               <span className="market-odd">1.03</span>
//               <span className="market-volume">6033</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MatchData;
