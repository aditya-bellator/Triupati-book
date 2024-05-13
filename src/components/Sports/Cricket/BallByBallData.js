import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const BallByBallData = () => {
  const [show, setShow] = useState(false);

  const openModalHandler = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="iframe-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/986hztrfaSQ?si=9Ifm-mP10CkteDGg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="casino-detail detail-page-container position-relative">
        <div className="game-market market-6">
          <div className="market-title">Runs</div>
          <div className="market-header row">
            <div className="col-12 col-md-4 d-none d-md-block">
              <div className="market-row">
                <div className="market-nation-detail" />
                <div className="market-odd-box back">
                  <b>Back</b>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 d-none d-md-block">
              <div className="market-row">
                <div className="market-nation-detail" />
                <div className="market-odd-box back">
                  <b>Back</b>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="market-row">
                <div className="market-nation-detail" />
                <div className="market-odd-box back">
                  <b>Back</b>
                </div>
              </div>
            </div>
            <div className="fancy-min-max-box" />
          </div>
          <div className="market-body row">
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">0 Runs</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.87</span>
                      <span className="market-volume">25000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">1 Runs</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">1.78</span>
                      <span className="market-volume">25000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">2 Runs</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">6.56</span>
                      <span className="market-volume">20000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">3 Runs</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">16</span>
                      <span className="market-volume">20000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">4 Runs</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">6.62</span>
                      <span className="market-volume">15000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">6 Runs</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">11.75</span>
                      <span className="market-volume">10000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">Boundary</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">4.23</span>
                      <span className="market-volume">30000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">Wicket</span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">3.2</span>
                      <span className="market-volume">25000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="fancy-market" data-title="OPEN">
                <div className="market-row">
                  <div className="market-nation-detail">
                    <span className="market-nation-name pointer">
                      Extra Runs
                    </span>
                  </div>
                  <div className=" blb-box ">
                    <div className="market-odd-box back ">
                      <span className="market-odd">3.12</span>
                      <span className="market-volume">25000</span>
                    </div>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 50</span>
                      <span className="w-100 d-block">Max: 10K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="casino-remark mt-1">
          <div className="remark-icon">
            <img
              src="https://g1ver.sprintstaticdata.com/v12/static/front/img/icons/remark.png"
              alt="sprint"
            />
          </div>
          <div className="moving-text-wrap">
            <div className="moving-text">
              Results are based on stream only. Score board may be different or
              updated later.
            </div>
          </div>
        </div>
        <div className="casino-last-result-title">
          <span>Last Result</span>
          <span>
            <a href="/casino-results/ballbyball">View All</a>
          </span>
        </div>
        <div className="casino-last-results">
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
          <span className="result result-b" onClick={openModalHandler}>
            R
          </span>
        </div>
      </div>
      {show && (
        <Modal size="xl" show={show} onHide={openModalHandler} scrollable>
          <Modal.Header closeButton>
            <Modal.Title>Ball By Ball Results</Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <div className="casino-result-modal">
              <div className="casino-result-round-id">
                <span>
                  <b>Round Id: </b> 5533536498601
                </span>
                <span>
                  <b>Match Time: </b>19/12/2023 11:00:52
                </span>
              </div>
              <div className="row mt-2">
                <div className="text-center">
                  <div className="cricket20ballpopup cricket20ballresult">
                    <img
                      src="https://g1ver.sprintstaticdata.com/v12/static/front/img/balls/ball-blank.png"
                      alt="Ball"
                    />
                    <span>0 Run</span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default BallByBallData;
