import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import "./Treeview.scss";
import style from "../Sidebar.module.scss";

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../_actions';



const TreeView = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sportId, setSportId] = useState(null);
  const [seriesId, setSeriesId] = useState(null);
  const [seriesModalOpenClose, setSeriesModalOpenClose] = useState(false);
  const [sportModalOpenClose, setSportModalOpenClose] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sportIndex, setSportIndex] = useState(null);
  const [seriesIndex, setSeriesIndex] = useState(null);


  useEffect(() => {

    let sportReq = { "limit": 10, "pageno": 1 }
    dispatch(userActions.games_list(sportReq));   // for  sport 
    // let seriesReq = { "limit": 10, "sport_id": 4, "pageno": 1 }
    // dispatch(userActions.event_game_list(seriesReq));  // for  series 
    let matchesReq = { "limit": 20, "pageno": 1, "sport_id": "4", "series_id": "10328858" }
    dispatch(userActions.game_event_list(matchesReq));  // for  matches 

  }, []);

  const handleSeriesList = (data, index) => {
    setSportIndex(index);
    setIsExpanded(!isExpanded);
    setSportId(data.sport_id);
    // setSportModalOpenClose(!sportModalOpenClose);
    let seriesReq = { "limit": 10, "sport_id": data.sport_id, "pageno": 1 }
    dispatch(userActions.event_game_list(seriesReq));  // for  series 
  }

  const handleMatchList = (data, innerIndex) => {
    // setSeriesIndex(innerIndex);
    setSeriesId(data.series_id);
    // setSeriesModalOpenClose(!seriesModalOpenClose);

    let matchesReq = { "limit": 20, "pageno": 1, "sport_id": data.sport_id, "series_id": data.series_id }
    dispatch(userActions.game_event_list(matchesReq));  // for  matches 
  }

  // const handleNavigate = (data) => {

  // }


  let users = useSelector(state => state.users);
  let { games_list, event_game_list, game_event_list } = users ? users : {};


  // console.log('SSSSSSSSSS......', games_list);
  // console.log('aaaaaaaaaaaa......', event_game_list);
  // console.log('iiiiiiiiiiiii......', game_event_list);


  // console.log('sportIndex::::???', sportIndex);




  return (
    <div>

      {games_list && games_list.length > 0 ?
        games_list.map((element, index) => (

          <div className={style.treeNode}>

            <div className={`${style.nodeToogle} px-2`} onClick={() => handleSeriesList(element, index)}>
              <span
                // className={`${style.active}`}
                className={element.sport_id === sportId && games_list.length > 0 ? `${style.active}` : ""}
              ></span>
              {element && element.name ? element.name : null
              }

              {/* {
                isExpanded && games_list.length > 0 && games_list[sportIndex] ? "True" : "False"
              } */}

            </div>


            <>
              {true && element.sport_id === sportId ?
                <>

                  {event_game_list && event_game_list.length > 0 ?
                    event_game_list.map((innerElement, innerIndex) => (

                      <div>
                        <div className={`${style.nodeToogle} py-1 tree-node `} onClick={() => handleMatchList(innerElement, innerIndex)}>
                          <span
                            // className={`${style.active} `}
                            className={innerElement.series_id === seriesId && event_game_list.length > 0 ? `${style.active}` : ""}
                          ></span>
                          {innerElement && innerElement.name ? innerElement.name : null
                          }

                        </div>

                        <>
                          {true && innerElement.series_id === seriesId ?
                            <>
                              {game_event_list && game_event_list.length > 0 ?
                                game_event_list.map((items, itemsIndex) => (

                                  <div className={`${style.nodeToogle} px-4 tree-node `}

                                    // onClick={() => handleNavigate(items)}

                                    onClick={() => navigate(`/match-detail/${items.sport_id}/${items.series_id}/${items.match_id}/${items.market_id}`)}

                                  >
                                    {items && items.name ? items.name : null}
                                  </div>
                                )) : null

                              }

                            </> : null
                          }
                        </>

                      </div>



                    )) : null

                  }








                </>
                : null
              }
            </>



          </div>

        )) : null

      }



    </div >



    // <section>
    //   <div className="row">
    //     <div className="">
    //       <div className="tree-node text-dark py-2">
    //         <h6><CiSquarePlus style={{ fontSize: "20px" }} />Cricket</h6>
    //       </div>
    //       <div className="py-1 tree-node text-dark">
    //         <h6 className='px-2'><CiSquareMinus style={{ fontSize: "20px" }} />T10 XI</h6>
    //       </div>
    //       <div className="tree-node text-dark py-2">
    //         <h6 className='px-4'>Hyderabad v Chennai</h6>
    //       </div>
    //     </div>
    //   </div>
    // </section>




  );
};
export default TreeView;
