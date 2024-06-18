import React, { useState, useEffect } from 'react';
import { authHeader } from '../../_helpers';

const YourComponent = () => {
  const [dataItems, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);

  useEffect(() => {

    let reqBody = { "match_id": "32977799", "sport_id": "4" }

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });

    const betListRes = fetch("https://triupatiexch.com/api/v5/event-detals", {
      method: "POST",
      headers: header,
      body: JSON.stringify(reqBody)
    }).then(response => response.json()).then(data => {

      let newData = data && data.data && data.data.MatchDetails ? data.data.MatchDetails : [];
      // Compare previous and current data
      if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
        // Update the state with the new data
        setData(newData);
        setPrevData(dataItems);

      }
    })



  }, []);



  return (
    <>

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
              dataItems && dataItems.runner_json && dataItems.runner_json.length > 0 ?
                dataItems.runner_json.map((element, index) => (
                  <React.Fragment key={index}>

                    <>
                      {
                        element && element.GameStatus && element.GameStatus === "SUSPENDED" ?
                          <>
                            <div className="market-row suspended-row" data-title="SUSPENDED">
                              <div className="market-nation-detail">
                                <span className="market-nation-name">{element && element.selectionName ? element.selectionName : "-"}</span>

                                {/* <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                    {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                  </h6> */}

                                {/* {profit && sectionType && sectionType === "ODDS" ?
                                    <>
                                      <h6
                                        className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                      >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                    </> : null
                                  } */}

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
                              // onClick={() =>
                              //   handleBackOpen({
                              //     odds: element.ex.availableToBack[0].price,
                              //     type: "BACK",
                              //     sectionType: "ODDS",
                              //     element: element,
                              //     selectionId: element.selectionId,
                              //     isBack: true
                              //   })
                              // }

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
                              // onClick={() =>
                              //   handleBackOpen({
                              //     odds: element.ex.availableToLay[0].price,
                              //     type: "LAY",
                              //     sectionType: "ODDS",
                              //     element: element,
                              //     selectionId: element.selectionId,
                              //     isBack: false
                              //   })
                              // }

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

                                {/* {
                                    JSON.stringify(oddsLocalStoreData && oddsLocalStoreData[index] && oddsLocalStoreData[index].ex && oddsLocalStoreData[index].ex.availableToBack && oddsLocalStoreData[index].ex.availableToBack[0] && oddsLocalStoreData[index].ex.availableToBack[0].price ? oddsLocalStoreData[index].ex.availableToBack[0].price : "")
                                  } */}

                                {/* {
                                    JSON.stringify(oddsLocalStoreData && oddsLocalStoreData[index] && oddsLocalStoreData[index].ex && oddsLocalStoreData[index].ex.availableToBack && oddsLocalStoreData[index].ex.availableToBack[0] && oddsLocalStoreData[index].ex.availableToBack[0].price == element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? "Yellow......." : "Blue.......")
                                  } */}

                                {/* {
                                    JSON.stringify(oddsLocalStoreData && oddsLocalStoreData[index] && oddsLocalStoreData[index].ex && oddsLocalStoreData[index].ex.availableToBack && oddsLocalStoreData[index].ex.availableToBack[0] && oddsLocalStoreData[index].ex.availableToBack[0].price ? oddsLocalStoreData[index].ex.availableToBack[0].price : "kkkkkkkk")
                                  }
                                  &nbsp; &nbsp;&nbsp;
                                  {
                                    JSON.stringify(element && element.ex && element.ex.availableToBack && element.ex.availableToBack[0] && element.ex.availableToBack[0].price ? element.ex.availableToBack[0].price : "NUll")
                                  } */}



                                <h6 className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}   >
                                  {element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}
                                </h6>

                                {/* {profit && sectionType && sectionType === "ODDS" ?
                                    <>
                                      <h6
                                        className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}

                                      >{currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}</h6>
                                    </> : null
                                  } */}
                                <div className="market-nation-book" />
                              </div>

                              {/* Apply Here color Status */}


                              <div className="market-odd-box back2" >
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
                              // onClick={() =>
                              //   handleBackOpen({
                              //     odds: element.ex.availableToBack[0].price,
                              //     type: "BACK",
                              //     sectionType: "ODDS",
                              //     element: element,
                              //     selectionId: element.selectionId,
                              //     isBack: true
                              //   })
                              // }
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

                              // onClick={() =>
                              //   handleBackOpen({
                              //     odds: element.ex.availableToLay[0].price,
                              //     type: "LAY",
                              //     sectionType: "ODDS",
                              //     element: element,
                              //     selectionId: element.selectionId,
                              //     isBack: false
                              //   })
                              // }

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

    </>
  );
};

export default YourComponent;
