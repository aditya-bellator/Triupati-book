import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import moment from "moment";

//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";


export default function AllSports() {
  const { sport_id } = useParams();
  const [matchSportWise, setSportIdWise] = useState({});

  useEffect(() => {

    let sportIdWiseReqData = { "limit": 20, "pageno": 1, "sport_id": sport_id, "series_id": 0, "type": "home" }

    const sportIdWiseResponse = fetch("https://triupatiexch.com/api/v5/getseiresMatchsList", {
      method: "POST",
      body: JSON.stringify(sportIdWiseReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setSportIdWise(data.data);
    })


  }, []);


  return (
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
            matchSportWise && matchSportWise.InplayMatches && matchSportWise.InplayMatches.length > 0 ?
              matchSportWise.InplayMatches.map((element, index) => (
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
                        <span>{moment(
                          parseInt(
                            element && element.start_date ? element.start_date : null,
                          ) * 1000,
                        )
                          .utcOffset("+05:30")
                          .format("DD/MM/YYYY, HH:mm:ss ")}</span>
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


                    <div className="bet-nation-odd">
                      <div className="back odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex && element.runner_json[0].ex.availableToBack && element.runner_json[0].ex.availableToBack[0] && element.runner_json[0].ex.availableToBack[0].price ? element.runner_json[0].ex.availableToBack[0].price : "--"}</b>
                        </span>
                      </div>
                      <div className="lay odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex && element.runner_json[0].ex.availableToLay && element.runner_json[0].ex.availableToLay[0] && element.runner_json[0].ex.availableToLay[0].price ? element.runner_json[0].ex.availableToLay[0].price : "--"}</b>
                        </span>
                      </div>
                    </div>

                    <div className="bet-nation-odd">
                      <div className="back odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex && element.runner_json[2].ex.availableToBack && element.runner_json[2].ex.availableToBack[0] && element.runner_json[2].ex.availableToBack[0].price ? element.runner_json[2].ex.availableToBack[0].price : "--"}</b>
                        </span>
                      </div>
                      <div className="lay odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex && element.runner_json[2].ex.availableToLay && element.runner_json[2].ex.availableToLay[0] && element.runner_json[2].ex.availableToLay[0].price ? element.runner_json[2].ex.availableToLay[0].price : "--"}</b>
                        </span>
                      </div>
                    </div>
                    <div className="bet-nation-odd">
                      <div className="back odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex && element.runner_json[1].ex.availableToBack && element.runner_json[1].ex.availableToBack[0] && element.runner_json[1].ex.availableToBack[0].price ? element.runner_json[1].ex.availableToBack[0].price : "--"}</b>
                        </span>
                      </div>
                      <div className="lay odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex && element.runner_json[1].ex.availableToLay && element.runner_json[1].ex.availableToLay[0] && element.runner_json[1].ex.availableToLay[0].price ? element.runner_json[1].ex.availableToLay[0].price : "--"}</b>
                        </span>
                      </div>
                    </div>


                  </div>
                </React.Fragment>
              )) : null
          }
        </>

        <>
          {
            matchSportWise && matchSportWise.UpCommingMatches && matchSportWise.UpCommingMatches.length > 0 ?
              matchSportWise.UpCommingMatches.map((element, index) => (
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
                        <div className="game-icon" />
                        <div className="game-icon" />
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

                    <div className="bet-nation-odd">
                      <div className="back odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex && element.runner_json[0].ex.availableToBack && element.runner_json[0].ex.availableToBack[0] && element.runner_json[0].ex.availableToBack[0].price ? element.runner_json[0].ex.availableToBack[0].price : "--"}</b>
                        </span>
                      </div>
                      <div className="lay odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[0] && element.runner_json[0].ex && element.runner_json[0].ex.availableToLay && element.runner_json[0].ex.availableToLay[0] && element.runner_json[0].ex.availableToLay[0].price ? element.runner_json[0].ex.availableToLay[0].price : "--"}</b>
                        </span>
                      </div>
                    </div>

                    <div className="bet-nation-odd">
                      <div className="back odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex && element.runner_json[2].ex.availableToBack && element.runner_json[2].ex.availableToBack[0] && element.runner_json[2].ex.availableToBack[0].price ? element.runner_json[2].ex.availableToBack[0].price : "--"}</b>
                        </span>
                      </div>
                      <div className="lay odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[2] && element.runner_json[2].ex && element.runner_json[2].ex.availableToLay && element.runner_json[2].ex.availableToLay[0] && element.runner_json[2].ex.availableToLay[0].price ? element.runner_json[2].ex.availableToLay[0].price : "--"}</b>
                        </span>
                      </div>
                    </div>
                    <div className="bet-nation-odd">
                      <div className="back odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex && element.runner_json[1].ex.availableToBack && element.runner_json[1].ex.availableToBack[0] && element.runner_json[1].ex.availableToBack[0].price ? element.runner_json[1].ex.availableToBack[0].price : "--"}</b>
                        </span>
                      </div>
                      <div className="lay odd-box">
                        <span className="bet-odd">
                          <b>{element && element.runner_json && element.runner_json[1] && element.runner_json[1].ex && element.runner_json[1].ex.availableToLay && element.runner_json[1].ex.availableToLay[0] && element.runner_json[1].ex.availableToLay[0].price ? element.runner_json[1].ex.availableToLay[0].price : "--"}</b>
                        </span>
                      </div>
                    </div>



                  </div>
                </React.Fragment>
              )) : null
          }
        </>

      </div>
    </div>)
}

