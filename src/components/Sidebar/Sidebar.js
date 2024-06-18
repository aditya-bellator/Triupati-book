import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

//components
import Accordion from "react-bootstrap/Accordion";
import { userActions } from '../../_actions';

//scss
import style from "./Sidebar.module.scss";
import Treeview from "./Treeview/Treeview";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sportList, setSport] = useState(true);
  const [seriesOpenSection, setSeriesOpenSection] = useState(false);


  useEffect(() => {
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
    })

    let sportReq = { "limit": 10, "pageno": 1 }
    dispatch(userActions.games_list(sportReq));   // for  sport 
    let matchesReq = { "limit": 20, "pageno": 1, "sport_id": "4", "series_id": "10328858" }
    dispatch(userActions.game_event_list(matchesReq));  // for  matches 

  }, []);


  const handleSeriesList = (data) => {
    let seriesReq = { "limit": 10, "sport_id": data.sport_id, "pageno": 1 }
    dispatch(userActions.event_game_list(seriesReq));  // for  series 
    setSeriesOpenSection(true)
  }

  let users = useSelector(state => state.users);
  let { games_list, event_game_list, game_event_list } = users ? users : {};

  return (
    <div className={style.sidebarWrapper}>
      <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>

        <Accordion.Item eventKey="2">
          <Accordion.Header>All Sports</Accordion.Header>
          <Accordion.Body>
            <Treeview />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Others</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <Link to="/ourcasino"><span className="blink_me">Our Casino</span></Link>
              </li>
              <li>
                <Link to="/ourvirtual"><span className="blink_me">Our Virtual</span></Link>
              </li>
              <li>
                <Link to="/livecasino">Live Casino</Link>
              </li>
              <li>
                <Link to="/slots">Slot Game</Link>
              </li>
              <li>
                <Link to="/fantasy">Fantasy Game</Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="0">
          <Accordion.Header>Racing Sports</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <Link to="#">Horse Racing</Link>
              </li>
              <li>
                <Link to="#">Greyhound Racing</Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>


      </Accordion>
    </div>
  );
};

export default Sidebar;
