import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Modal } from "react-bootstrap";
//scss
import "./Cricket.scss";
//components
import BallByBallData from "./BallByBallData";

const BallByBall = () => {
  const [scroll, setScroll] = useState(false);
  const [show, setShow] = useState(false);

  const openModalHandler = () => {
    setShow(!show);
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

  return (
    <div>
      <div className="center-main-container ball-by-ball detail-page">
        <div className="center-container">
          <div className="detail-page-container">
            <div className="game-header">
              <span>
                Ball By Ball <span onClick={openModalHandler}>Rules</span>
              </span>

              {show && (
                <Modal
                  size="lg"
                  show={show}
                  onHide={openModalHandler}
                  scrollable
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Ball By Ball Rules</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="">
                    <div className="rules-section">
                      <h6 className="rules-highlight">Run Section : </h6>
                      <ul className="pl-4 pr-4 list-style">
                        <li>
                          In 1, 2, 3, 4, 6, and boundary (4 or 6) events, only
                          bat runs will be considered.
                        </li>
                        <li>In 0 runs, only dot balls will be considered.</li>
                        <li>
                          <b>Note:</b> Wickets or extras with runs will not be
                          considered in the above-mentioned events.
                        </li>
                      </ul>
                    </div>
                  </Modal.Body>
                </Modal>
              )}
              <span className="float-right round-id">
                Round ID: 6245429954513
              </span>
            </div>
            <div className="d-xl-none w-100">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className=""
              >
                <Tab
                  eventKey="home"
                  title="
                  Odds"
                >
                  <BallByBallData />
                </Tab>
                <Tab eventKey="profile" title="Matched Bet (0)">
                  <Accordion defaultActiveKey={["1"]} alwaysOpen>
                    <Accordion.Item eventKey="1">
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
                </Tab>
              </Tabs>
            </div>
            <div className="d-none d-xl-flex flex-wrap">
              <BallByBallData />
            </div>
          </div>
        </div>
        <div className={`${scroll && "active"} sidebar right-sidebar`}>
          <a className="bet-nation-game-name" href="/casino/ballbyball">
            <i className="fas fa-info-circle" />
            <span>Ball by Ball</span>
          </a>

          <Accordion defaultActiveKey={["1"]} alwaysOpen>
            <Accordion.Item eventKey="1">
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
  );
};

export default BallByBall;
