import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from 'react-redux';
//scss
import style from "./Header.module.scss";
import styleMain from "../../Main.module.scss";
import unclelogo from "../../assets/png/Hero_Book_Exchanges_Logo.png";
//components
import { authHeader } from '../../_helpers';
import Input from "../Input/Input";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Rules from "../Rules/Rules";
import ButtonValues from "../ButtonValues/ButtonValues";
import { userActions } from '../../_actions';
import { useSelector } from 'react-redux';


const Header = () => {
  const [searchInput, setSearchInput] = useState();
  const [show, setShow] = useState(false);
  const [valuesModal, setValuesModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [finalMatchStack, setFinalMatchStack] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temp, setTemp] = useState(0);
  const [sportList, setSport] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isBalance, setBalance] = useState(true);
  const [isExposer, setExposer] = useState(true);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  let eventDetalsData = useSelector(state => state.users.eventDetals);
  let { UserSportSettings } = eventDetalsData ? eventDetalsData : {};
  let finalMatchStackData = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];

  let localData = JSON.parse(localStorage.getItem('userMeta'));

  useEffect(() => {
    let matchListReqData = { "match_id": "0", "sport_id": "4" }
    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });

    const betListRes = fetch("https://bigbetexchange.com/api/v5/event-detals", {
      method: "POST",
      headers: header,
      body: JSON.stringify(matchListReqData)
    }).then(response => response.json()).then(data => {
      let UserSportSettings = data && data.data && data.data.UserSportSettings && data.data.UserSportSettings[0] && data.data.UserSportSettings[0].match_stack ? data.data.UserSportSettings[0].match_stack.split(",") : [];
      setFinalMatchStack(UserSportSettings)

    })

    dispatch(userActions.getCoinBalance());

    let data = { "limit": 50, "pageno": 1 }
    const sportListResponse = fetch("https://bigbetexchange.com/api/v5/getSportOuterList", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setSport(data.data)
    })

    // Set up an interval to call fetchData every 5000 milliseconds (5 seconds)
    const intervalId = setInterval(fetchData, 2000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [])



  const fetchData = async () => {
    dispatch(userActions.getCoinBalance());
  };

  const handleBalanceHideShow = () => {
    setBalance(!isBalance)
  }

  const handleExposerHideShow = () => {
    setExposer(!isExposer)
  }

  //  Edit Stack Function Start Here
  const handleStakeInput = (e) => {
    e.preventDefault();
    let { value } = e.target;
    console.log("value  ", value);
    setFinalMatchStack((prevDataArray) => {
      const newDataArray = [...prevDataArray]; // Create a copy of the array
      newDataArray[currentIndex] = value; // Update value at the specified index
      return newDataArray; // Return the updated array
    });
  };

  const handleCurrentIndex = (index) => {
    setCurrentIndex(index);
  };

  const handlesSaveUserStack = () => {
    let finalString = finalMatchStack.join(',');
    let data = {
      match_stack: finalString,
      one_click_stack: "0",
      sport_id: "4",
    }

    let eventDetalApiReq = { "match_id": "0", "sport_id": "4" }
    dispatch(userActions.single_click_update_amount(data, eventDetalApiReq, setValuesModal))
  }



  const handleNavigate = (data) => {
    if (data.sport_id === 4) {
      navigate(`/allSports/${data.sport_id}`);
    }
    if (data.sport_id === 1) {
      navigate(`/allSportsSoccer/${data.sport_id}`);
    }
    if (data.sport_id === 2) {
      navigate(`/allSportsTennis/${data.sport_id}`);
    }
    if (data.sport_id === 111) {
      navigate(`/ourcasino`);
    }

  };


  const showModal = () => {
    setShow(!show);
  };

  const showValuesModalhander = () => {

    let matchListReqData = { "match_id": "0", "sport_id": "4" }
    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });
    const betListRes = fetch("https://bigbetexchange.com/api/v5/event-detals", {
      method: "POST",
      headers: header,
      body: JSON.stringify(matchListReqData)
    }).then(response => response.json()).then(data => {
      let UserSportSettings = data && data.data && data.data.UserSportSettings && data.data.UserSportSettings[0] && data.data.UserSportSettings[0].match_stack ? data.data.UserSportSettings[0].match_stack.split(",") : [];
      setFinalMatchStack(UserSportSettings)
    });

    setValuesModal(!valuesModal);
  };

  const showSearch = () => {
    setSearchInput(!searchInput);
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/')
    window.location.reload();
  };

  const userButton = (
    <div>
      {localData && localData.user_name ? localData.user_name : ""}<i className="fas fa-chevron-down ms-1"></i>
    </div>
  );


  const getTitle = (tabKey) => {
    console.log('tabKey......', tabKey);
    let result = "";
    result = tabKey && tabKey.sport_id && tabKey.sport_id === 1 ? "Football" : tabKey.name;
    return result;

  };
  const myData = useSelector(state => state.users.getCoinBalanceData);


  return (
    <>
      <div className={style.header}>
        <div className={style.logo}>
          <Link className="d-xl-none" to="/home">
            <i className="fas fa-home me-1" />
          </Link>
          <Link to="/home">
            <img src={unclelogo} alt="UNCLE_EXCHANGE" />
          </Link>
        </div>
        <div className={style.userDetails}>
          <div className={`${style.searchBoxContainer} d-none d-xl-block`}>
            <div className={style.searchBox}>
              <div className={searchInput ? `${style.active}` : null}>
                <Input type="text" placeholder="Search Here" />
              </div>
              <span onClick={showSearch}>
                <i className="fas fa-search-plus"></i>
              </span>
            </div>
          </div>
          <div className={`${style.rules} ms-3`}>
            <strong onClick={showModal}>Rules</strong>
          </div>
          <Modal size="xl" show={show} onHide={showModal} scrollable>
            <Modal.Header closeButton>
              <Modal.Title>Rules</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Rules />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={showModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div className={`${style.userBalance} ms-1 ms-xl-3`}>


            {isBalance ?
              <>
                <div className="">
                  <span>Balance:</span>
                  <b>
                    {myData && myData.balance ? myData.balance : 0}
                  </b>
                </div>
              </> : null
            }


            <div className="ms-xl-0 ms-1">

              {isExposer ?
                <>
                  <span>Exp: </span>
                  <b className={style.pointer}>{myData && myData.liability ? myData.liability : 0}</b>
                </> : null
              }


              <div
                className={`${style.userDropdown} ms-2 ms-xl-3 d-inline-block d-xl-none dropdown-toggle`}
              >
                <DropdownButton align="end" title={userButton} id="demo-id">
                  <Link to="/account/ball-by-ball" className="dropdown-item">
                    Account Statement
                  </Link>
                  <Link to="/account/current-bet" className="dropdown-item">
                    Current Bet
                  </Link>
                  <Link to="/changePassword" className="dropdown-item"
                  >
                    Change Password
                  </Link>
                  <Link
                    onClick={showValuesModalhander}
                    className="dropdown-item"
                  >
                    Set Button Values
                  </Link>
                  <Link
                    onClick={showModal}
                    className="dropdown-item"
                  >
                    Rules
                  </Link>

                  <div class="d-flex">
                    <Link
                      className="dropdown-item"
                    >
                      Balance
                    </Link>
                    <input class="form-check-input mx-3" type="checkbox" value="" id="flexCheckDefault" onChange={handleBalanceHideShow} checked={isBalance ? true : false} />
                  </div>
                  <div class="d-flex">
                    <Link
                      className="dropdown-item"
                    >
                      Exposer
                    </Link>
                    <input class="form-check-input mx-3" type="checkbox" value="" id="flexCheckDefault" onChange={handleExposerHideShow} checked={isExposer ? true : false} />
                  </div>

                  <Modal show={valuesModal} onHide={showValuesModalhander} scrollable>
                    <Modal.Header closeButton>
                      <Modal.Title>Set Button Value</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ButtonValues
                        onclick={showValuesModalhander}
                        finalMatchStack={finalMatchStack}
                        handleStakeInput={handleStakeInput}
                        handleCurrentIndex={handleCurrentIndex}
                        handlesSaveUserStack={handlesSaveUserStack}
                      />
                    </Modal.Body>
                  </Modal>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="5" onClick={logOut}>
                    SignOut
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </div>


          <div className={`${style.userDropdown} ms-3 d-none d-xl-block`}>
            <DropdownButton align="end" title={userButton} id="demo-id">
              <Link to="/account/ball-by-ball" className="dropdown-item">
                Account Statement
              </Link>
              <Link to="/account/current-bet" className="dropdown-item">
                Current Bet
              </Link>
              <Link to="/changePassword" className="dropdown-item">
                Change Password
              </Link>
              <Link
                onClick={showValuesModalhander}
                className="dropdown-item"
              >
                Set Button Values
              </Link>
              <Modal show={valuesModal} onHide={showValuesModalhander} scrollable>
                <Modal.Header closeButton>
                  <Modal.Title>Set Button Value</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ButtonValues
                    onclick={showValuesModalhander}
                    finalMatchStack={finalMatchStack}
                    handleStakeInput={handleStakeInput}
                    handleCurrentIndex={handleCurrentIndex}
                    handlesSaveUserStack={handlesSaveUserStack}
                  />
                </Modal.Body>
              </Modal>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="5" onClick={logOut}>
                SignOut
              </Dropdown.Item>
            </DropdownButton>
          </div>

        </div>
        <div className={`${style.searchBoxContainer} d-xl-none`}>
          <div className={style.searchBox}>
            <div className={searchInput ? `${style.active}` : null}>
              <Input type="text" placeholder="Search Here" />
            </div>
            <span onClick={showSearch}>
              <i className="fas fa-search-plus"></i>
            </span>
          </div>
        </div>
        <div className={style.news}>
          <div className="moving-text">
            {/* Experience the Excitement of Live Sports, Live Casinos, Virtual
            Casinos and Fantasy Games On Our Exchange. Play Now To Win Unlimited. */}
            {myData && myData.site_message ? myData.site_message : null}
          </div>
        </div>

      </div>



      <div className={`${styleMain.menuWrapper} d-none d-xl-block`}>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to="/home"
              >
                Home
              </NavLink>
            </li>

            <>
              {
                sportList && sportList.length > 0 ?
                  sportList.map((element, index) => (
                    <React.Fragment key={index}>

                      <li className="fw-bold"
                        onClick={() => handleNavigate(element)}
                      >
                        {getTitle(element)}
                      </li>

                    </React.Fragment>
                  )) : null
              }
            </>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to={`/providerlobbygame/${201206}`}
              >
                Aviator
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to="/baccart"
              >
                Baccart
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to="/cards32"
              >
                32 Cards
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to="/teenpatti"
              >
                Teenpatti
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to="/poker"
              >
                Poker
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styleMain.active}` : ""
                }
                to="/lucky7"
              >
                Lucky 7
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>


  );
};

export default Header;
