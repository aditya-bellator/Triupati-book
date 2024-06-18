import React, { useEffect, useState } from "react";
import {
  // Outlet,
  NavLink, Link,
  // useNavigate,
  useHistory
} from "react-router-dom";
import { Modal } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';


//components
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

//scss
import style from "./Main.module.scss";
import Footer from "../../components/Footer/Footer";
import LiveEvents from "../../components/LiveEvents/LiveEvents";

//images
import SplashImg from "../../assets/png/wel-1702816082206.png";

export default function Main() {
  const [show, setShow] = useState(true);
  const [sportList, setSport] = useState(true);
  const [matchList, setMatch] = useState(true);


  // const history = useNavigate();

  const closeModalHandler = () => {
    localStorage.setItem("seenPopUp", true);
    setShow(false);
  };

  useEffect(() => {
    const returningUser = localStorage.getItem("seenPopUp");
    setShow(!returningUser);

    let data = { "limit": 50, "pageno": 1 }
    const responseData = fetch("https://triupatiexch.com/api/v5/getSportOuterList", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {

      setSport(data.data);
      // this.setState({
      //   sportList: data.data,
      // });
    })



    let matchListReqData = { "limit": 20, "pageno": 1, "sport_id": 0, "series_id": 0 }

    const matchListResponse = fetch("https://triupatiexch.com/api/v5/getseiresMatchsList", {
      method: "POST",
      body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatch(data.data);
    })


  }, []);




  const handleClick = (data) => {
    // Use history.push to navigate to a different route
    // history.push(`/allSports/${data.sport_id}`);
  };


  const navigateMatchDeatils = (data) => {

    console.log('data////', data);

    // Use history.push to navigate to a different route
    // history.push(`/allSports/${data.sport_id}`);
  };


  // console.log('sportListsportListsportList.........', sportList);
  // console.log('matchListmatchListmatchList.........', matchList);
  let { InplayMatches, UpCommingMatches } = matchList ? matchList : {};

  // console.log('000000000000000_______', InplayMatches);

  return (
    <div>
      <Header />
      {show && (
        <Modal size="lg" show={show} onHide={closeModalHandler} scrollable>
          <Modal.Header closeButton>
            <Modal.Title>
              Beware Of Phishing Websites Before Login. Enable Security Auth To
              Secure Your ID.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <img src={SplashImg} alt="Welcome" />
          </Modal.Body>
        </Modal>
      )}
      <div className={`${style.menuWrapper} d-none d-xl-block`}>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/lottery"
              >
                Lottery
              </NavLink>
            </li> */}

            <>
              {
                sportList && sportList.length > 0 ?
                  sportList.map((element, index) => (
                    <React.Fragment key={index}>
                      {/* <li>
                        <span onClick={() => handleClick(element)} >
                          {element && element.name ? element.name : null}
                        </span>
                      </li> */}

                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? `${style.active}` : ""
                          }
                          to={`/allSports/${element.sport_id}`}
                        >
                          {element && element.name ? element.name : null}
                        </NavLink>
                      </li>

                    </React.Fragment>
                  )) : null
              }
            </>


            {/* <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/cricket"
              >
                Cricket
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/tennis"
              >
                Tennis
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/football"
              >
                Football
              </NavLink>
            </li> */}



            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/tabletennis"
              >
                Table Tennis
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/baccart"
              >
                Baccart
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/cards32"
              >
                32 Cards
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/teenpatti"
              >
                Teenpatti
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/poker"
              >
                Poker
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${style.active}` : ""
                }
                to="/lucky7"
              >
                Lucky 7
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.main}>
        <div className={style.sideBar}>
          <Sidebar />
        </div>
        <div className={`${style.liveEvents} liveEvents d-xl-none`}>
          <LiveEvents navigateMatchDeatils={navigateMatchDeatils} />
        </div>

        <div className={`${style.customLinks} customLinks d-xl-none`}>
          <ul>
            <li>
              <Link to="#">Lotterys</Link>
            </li>
            <li>
              <Link to="#">Sports</Link>
            </li>
            <li>
              <Link to="#">Our Casino</Link>
            </li>
            <li>
              <Link to="#">Live Casino</Link>
            </li>
            <li>
              <Link to="#">Slots</Link>
            </li>
            <li>
              <Link to="#">Fantasy</Link>
            </li>
          </ul>
        </div>
        <div className={`${style.content} content`}>
          {/* <Outlet /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
