import React from "react";

//scss
import style from "./LiveEvents.module.scss";
import { Link } from "react-router-dom";

const LiveEvents = (InplayMatches, { navigateMatchDeatils }) => {

  // console.log('!!!!!!!!!!!!!!!navigateMatchDeatils!', navigateMatchDeatils);

  let liveMatch = InplayMatches.InplayMatches;

  // console.log('liveMatch................', liveMatch);


  // const events = [
  //   "Celta Vigo v Granada",
  //   "Augsburg v Dortmund",
  //   "Newcastle v Fulham",
  //   "Bournemouth v Luton",
  //   "Athletic Bilbao v Atletico Madrid",
  // ];



  return (


    // <>
    //   {liveMatch && liveMatch.length > 0 ?
    //     liveMatch.map((element, index) => {
    //       return (

    //         <React.Fragment>
    //           {
    //             element && element.InplayStatus && element.InplayStatus === "CLOSE" ?
    //               <>
    //                 <div className={style.liveEventsList}>
    //                   <div key={index} className={style.list}>
    //                     <Link className="blink_me">
    //                       <span className="me-1">
    //                         <i className="far fa-futbol"></i>
    //                       </span>
    //                       <>
    //                         <div>{element && element.InplayStatus && element.InplayStatus === "CLOSE" ? element.name : null}</div>
    //                       </>
    //                     </Link>
    //                   </div>
    //                 </div>
    //               </> : null
    //           }
    //         </React.Fragment>

    //       );
    //     }) : null}

    // </>

    <div className={style.liveEventsList}>
      {liveMatch && liveMatch.length > 0 ?
        liveMatch.map((element, index) => {



          return (

            <React.Fragment key={index}>
              {
                element && element.InplayStatus && element.InplayStatus === "OPEN" ?
                  <>
                    <div key={index} className={style.list}

                    // onClick={() => navigateMatchDeatils(element)}

                    >

                      <Link className="blink_me"
                      to={`/match-detail/${element.sport_id}/${element.series_id}/${element.match_id}/${element.market_id}`} 
                      >
                        <span className="me-1">
                          <i className="far fa-futbol"></i>
                        </span>
                        <div>{element && element.InplayStatus && element.InplayStatus === "OPEN" ? element.name : null}</div>
                      </Link>


                    </div>
                  </> : null
              }
            </React.Fragment>
          );




        }) : null


      }
    </div>









  );
};

export default LiveEvents;
