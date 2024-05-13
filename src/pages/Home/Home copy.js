import React from "react";
import { Link } from "react-router-dom";

//components
import LiveEvents from "../../components/LiveEvents/LiveEvents";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

//scss
import style from "./Home.module.scss";

//images
import facebook from "../../assets/png/ic_fancy.png";
import Bm from "../../assets/png/ic_bm.png";

const Home = () => {
  return (
    <div>
      <div className="d-none d-xl-block">
        <LiveEvents />
      </div>
      <div className={style.tabsGroup}>
        <Tabs defaultActiveKey="cricket" id="hometopBar">
          <Tab eventKey="cricket" title="Cricket">
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
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" to="/ball-by-ball">
                      <span>Ball by Ball</span>
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
                      <div className="game-icon" />
                      <div className="game-icon" />
                    </div>
                  </div>
                  <div className="bet-nation-odd suspended-box">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd suspended-box">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" to="/match-detail">
                      <span>Dolphins v Lions</span>
                      <span className="d-none d-md-inline-block">
                        &nbsp;/&nbsp;
                      </span>
                      <span>14/12/2023 12:30:00</span>
                    </Link>
                    <div className="game-icons">
                      <div className="game-icon">
                        <span className="active" />
                      </div>
                      <div className="game-icon" />
                      <div className="game-icon">
                        <img src={facebook} alt="f" />
                      </div>
                      <div className="game-icon" />
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
                  <div className="bet-nation-odd suspended-box">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd suspended-box">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" href="#">
                      <span>West Indies v England</span>
                      <span className="d-none d-md-inline-block">
                        &nbsp;/&nbsp;
                      </span>
                      <span>16/12/2023 23:00:00</span>
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
                        <b>1.28</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>1.29</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>4.4</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>4.6</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" href="#">
                      <span>Australia v Pakistan</span>
                      <span className="d-none d-md-inline-block">
                        &nbsp;/&nbsp;
                      </span>
                      <span>14/12/2023 07:50:00</span>
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
                        <b>1.11</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>1.12</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>14</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>14.5</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>32</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>34</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" href="#">
                      <span>New Zealand v Bangladesh</span>
                      <span className="d-none d-md-inline-block">
                        &nbsp;/&nbsp;
                      </span>
                      <span>17/12/2023 03:30:00</span>
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
                        <b>1.26</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>1.27</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>4.7</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>4.9</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" href="#">
                      <span>Zimbabwe v Ireland</span>
                      <span className="d-none d-md-inline-block">
                        &nbsp;/&nbsp;
                      </span>
                      <span>17/12/2023 12:45:00</span>
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
                        <b>2.52</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>2.6</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>1.63</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>1.65</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bet-table-row">
                  <div className="bet-nation-name">
                    <Link className="bet-nation-game-name" href="#">
                      <span>South Africa v India</span>
                      <span className="d-none d-md-inline-block">
                        &nbsp;/&nbsp;
                      </span>
                      <span>17/12/2023 13:30:00</span>
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
                        <b>2.12</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>2.14</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>-</b>
                      </span>
                    </div>
                  </div>
                  <div className="bet-nation-odd">
                    <div className="back odd-box">
                      <span className="bet-odd">
                        <b>1.89</b>
                      </span>
                    </div>
                    <div className="lay odd-box">
                      <span className="bet-odd">
                        <b>1.9</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="casino-list mt-2">
              <div className="casino-list-item">
                <a href="/casino/ballbyball">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/ballbyball.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/sicbo">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/sicbo.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen32">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen32.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino-list/LC/4/31">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/roulette1.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen9">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen9.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen8">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen8.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/poker">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/poker.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/poker20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/poker20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/poker6">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/poker6.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/baccarat">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/baccarat.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/baccarat2">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/baccarat2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/dt20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/dt20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/dt6">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/dt6.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/dtl20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/dtl20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/dt202">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/dt202.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/card32">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/card32.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/card32eu">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/card32eu.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/ab20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/ab20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/abj">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/abj.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/lucky7">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/lucky7.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/lucky7eu">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/lucky7eu.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/3cardj">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/3cardj.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/war">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/war.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/worli">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/worli.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/worli2">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/worli2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/aaa">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/aaa.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/btable">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/btable.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/lottcard">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/lottcard.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/cricketv3">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/cricketv3.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/cmatch20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/cmatch20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/cmeter">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/cmeter.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen6">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen6.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/queen">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/queen.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/race20">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/race20.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/lucky7eu2">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/lucky7eu2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/superover">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/superover.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/trap">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/trap.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/patti2">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/patti2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teensin">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teensin.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teenmuf">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teenmuf.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/race17">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/race17.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen20b">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen20b.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/trio">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/trio.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/notenum">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/notenum.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/kbc">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/kbc.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen120">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen120.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen1">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen1.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino-list/LC/4/31">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/roulette.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/ab3">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/ab3.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/aaa2">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/aaa2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/race2">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/race2.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/teen3">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/teen3.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/dum10">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/dum10.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
              <div className="casino-list-item">
                <a href="/casino/cmeter1">
                  <div
                    className="casino-list-item-banner"
                    style={{
                      backgroundImage:
                        'url("https://nd.sprintstaticdata.com/casino-icons/lc/cmeter1.jpg"), url("https://nd.sprintstaticdata.com/casino-icons/default.jpg")',
                    }}
                  />
                </a>
              </div>
            </div>
          </Tab>
          <Tab eventKey="football" title="Football">
            Tab content for Profile
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab content for Contact
          </Tab>
          <Tab eventKey="contact" title="Horse Racing">
            Tab content for Contact
          </Tab>
          <Tab eventKey="greyhound-racing" title="Greyhound Racing">
            Tab content for Contact
          </Tab>
          <Tab eventKey="table-tennis" title="Table Tennis">
            Tab content for Contact
          </Tab>
          <Tab eventKey="kabaddi" title="Kabaddi">
            Tab content for Contact
          </Tab>
          <Tab eventKey="badminton" title="Badminton">
            Tab content for Contact
          </Tab>
          <Tab eventKey="basketball" title="Basketball">
            Tab content for Contact
          </Tab>
          <Tab eventKey="american-football" title="American Football">
            Tab content for Contact
          </Tab>
          <Tab eventKey="volleyball" title="Volleyball">
            Tab content for Contact
          </Tab>
          <Tab eventKey="snooker" title="Snooker">
            Tab content for Contact
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
