// import React from "react";
// import Cricket from "../../components/Sports/Cricket/Cricket";
import { useParams } from 'react-router-dom';


import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//scss
import "./Cricket.scss";

//images
import liveTv from "../../assets/lock.jpg";
// import liveTv from "../../../assets/lock.jpg";
import MatchData from "./MatchData";
import PlaceBet from "./PlaceBet";

const CricketDetail = () => {
  const { sport_id, series_id, match_id, market_id } = useParams();
  // console.log('@@@@@@@@@@@@@@@@@@@......', sport_id, series_id, match_id, market_id);
  const [scroll, setScroll] = useState(false);
  const [placeBet, setPlaceBet] = useState("");


  // matchDetailsData: {},
  // matchSession: {},
  // matchScore: {},

  const [matchDetailsData, setMatchDetailsData] = useState({});
  const [matchSession, setMatchSession] = useState({});
  const [matchScore, setMatchScore] = useState({});

  const showPlaceBetHandler = () => {
    setPlaceBet(!placeBet);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 120);
    });
  }, []);
  useEffect(() => {
    document.body.classList.add("details-page");
    return () => {
      document.body.classList.remove("details-page");
    };
  }, []);



  useEffect(() => {

    let matchListReqData = { "match_id": match_id, "sport_id": sport_id }

    const matchDetailsRes = fetch("https://triupatiexch.com/api/v5/get-cricket-detail", {
      method: "POST",
      body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatchDetailsData(data.data)
      // this.setState({
      //   matchDetailsData: data.data,
      // });
    })


    const matchSessionRes = fetch(`https://triupatiexch.com/api/v5/get-match-session?match_id=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatchSession(data.data)
      // this.setState({
      //   matchSession: data.data,
      // });
    })

    const matchScoreRes = fetch(`https://score.jeoad.com/api/v1/getScore?matchId=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatchScore(data.data)
      // this.setState({
      //   matchScore: data.data,
      // });
    })


  }, []);

  // console.log('1111111', matchDetailsData);
  // console.log('2222222', matchSession);
  // console.log('3333333', matchScore);

  // matchDetailsData: {},
  // matchSession: {},
  // matchScore: {},


  return (

    <div>
      <div className="center-main-container detail-page">
        <div className="center-container">
          <div className="detail-page-container">
            {/* <div className="game-header">
              <span>South Africa v India</span>
              <span className="float-right">17/12/2023 13:30:00</span>
            </div> */}
            <div className="d-xl-none w-100">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className=""
              >
                <Tab
                  eventKey="home"
                  title="
                  Odds"
                >


                  {/* <MatchData
                    // showPlaceBetHandler={showPlaceBetHandler}
                    sport_id={sport_id}
                    series_id={series_id}
                    match_id={match_id}
                    market_id={market_id}
                  /> */}



                </Tab>
                <Tab eventKey="profile" title="Matched Bet (0)">
                  <Accordion defaultActiveKey={["1", "2"]} alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Live Match</Accordion.Header>
                      <Accordion.Body>
                        <div className="iframe-body">
                          <img src={liveTv} alt="Not Available" />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    {placeBet && <PlaceBet onclickHide={showPlaceBetHandler} />}
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Others</Accordion.Header>
                      <Accordion.Body>
                        <div className="my-bets">
                          <div className="table-responsive w-100">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Matched Bet</th>
                                  <th className="text-end">Odds</th>
                                  <th className="text-end">Stake</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </table>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab>
                <Tab
                  eventKey="contact"
                  title={<i className="fas fa-tv" />}
                  disabled
                >
                  Tab content for Contact
                </Tab>
              </Tabs>
            </div>




            <div className="d-none d-xl-flex flex-wrap">

              <MatchData
                //  showPlaceBetHandler={showPlaceBetHandler}

                sport_id={sport_id}
                series_id={series_id}
                match_id={match_id}
                market_id={market_id}

              />

            </div>



            {/* <div className="d-none d-xl-flex flex-wrap">
              <MatchData showPlaceBetHandler={showPlaceBetHandler} />
              <>
                <div className="scorecard">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <p className="team-1 row">
                        <span className="team-name col-3">SA  @@@@@@@@@@@@</span>
                        <span className="score col-4 text-end">116-10 (27.3)</span>
                        <span className="team-name col-5" />
                      </p>
                      <p className="team-1 row mt-2">
                        <span className="team-name col-3">IND</span>
                        <span className="score col-4 text-end">28-1 (5.0)</span>
                        <span className="team-name col-5">
                          <span>CRR 5.60 </span>
                          <span>RR 1.98</span>
                        </span>
                      </p>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="row">
                        <div className="col-12">
                          <div className="text-xl-end">
                            <span>IND Needed 89 runs from 270 balls</span>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <p className="text-xl-end ball-by-ball mt-2">
                                <span className="ball-runs">0</span>
                                <span className="ball-runs">0</span>
                                <span className="ball-runs">0</span>
                                <span className="ball-runs">0</span>
                                <span className="ball-runs">0</span>
                                <span className="ball-runs">0</span>
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
                    <span>MATCH_ODDS .......................</span>
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
                    <div className="market-row " data-title="ACTIVE">
                      <div className="market-nation-detail">
                        <span className="market-nation-name">South Africa</span>
                        <div className="market-nation-book" />
                      </div>
                      <div className="market-odd-box back2"
                      //  onClick={showPlaceBetHandler}
                      >
                        <span className="market-odd">
                          75
                        </span>
                        <span className="market-volume">49.95</span>
                      </div>
                      <div className="market-odd-box  back1  ">
                        <span className="market-odd">80</span>
                        <span className="market-volume">25.91</span>
                      </div>
                      <div className="market-odd-box back   ">
                        <span className="market-odd">100</span>
                        <span className="market-volume">55.79</span>
                      </div>
                      <div className="market-odd-box lay   ">
                        <span className="market-odd">110</span>
                        <span className="market-volume">9.52</span>
                      </div>
                      <div className="market-odd-box  lay1  ">
                        <span className="market-odd">120</span>
                        <span className="market-volume">108.96</span>
                      </div>
                      <div className="market-odd-box   lay2 ">
                        <span className="market-odd">150</span>
                        <span className="market-volume">18.21</span>
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
                        <span className="market-odd">-</span>
                      </div>
                      <div className="market-odd-box lay   ">
                        <span className="market-odd">1.01</span>
                        <span className="market-volume">5523.83</span>
                      </div>
                      <div className="market-odd-box  lay1  ">
                        <span className="market-odd">1.02</span>
                        <span className="market-volume">100431.95</span>
                      </div>
                      <div className="market-odd-box   lay2 ">
                        <span className="market-odd">1.03</span>
                        <span className="market-volume">40742.85</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="game-market market-4 width70">
                  <div className="market-title">
                    <span>Bookmaker</span>
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
                    <div className="market-row suspended-row" data-title="SUSPENDED">
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
                    </div>
                  </div>
                  <div className="market-row">
                    <div className="moving-text">
                      Play World's Fastest Cricket Game Ball By Ball,Started In Our
                      Exchange!!!
                    </div>
                  </div>
                </div>
                <div className="game-market market-2 width30">
                  <div className="market-title">
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
                  </div>
                </div>
                <div className="game-market market-2 width30">
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
                </div>
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
                    <span>fancy1</span>
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
                      <div className="col-md-6">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="game-market market-6">
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
                </div>
                <div className="game-market market-9">
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
                </div>
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
            </div> */}
          </div>
        </div>
        <div className={`${scroll && "active"} sidebar right-sidebar`}>
          <a className="bet-nation-game-name" href="/casino/ballbyball">
            <i className="fas fa-info-circle" />
            <span>Ball by Ball</span>
          </a>

          <Accordion defaultActiveKey={["1", "2"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Live Match</Accordion.Header>
              <Accordion.Body>
                <div className="iframe-body">
                  <img src={liveTv} alt="Not Available" />
                </div>
              </Accordion.Body>
            </Accordion.Item>
            {placeBet && <PlaceBet onclickHide={showPlaceBetHandler} />}
            <Accordion.Item eventKey="2">
              <Accordion.Header>My Bet</Accordion.Header>
              <Accordion.Body>
                <div className="my-bets">
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Matched Bet</th>
                          <th className="text-end">Odds</th>
                          <th className="text-end">Stake</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>


    // <div>
    //   <Cricket
    //     sport_id={sport_id}
    //     series_id={series_id}
    //     match_id={match_id}
    //     market_id={market_id}
    //   />
    // </div>
  );
};

export default CricketDetail;
