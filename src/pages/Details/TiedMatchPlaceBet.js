import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ButtonValues from "../../components/ButtonValues/ButtonValues";
import LoadingOverlay from 'react-loading-overlay';
import './customStyles.css'; // Import your custom CSS file


const TiedMatchPlaceBet = (
  // { onclickHide }
  props
) => {

  let { betSlipData, finalMatchStack, updateStackOnclic, inputChange, inputChangeDisable, selectStackNewTiedMatch, decreaseCount, increaseCount, handlePlaceBetTiedMatch, handlestakeOpenWeb, count, stack, onclickHide, increaseStack, decreaseStack, handleReset, showValuesModalhander, valuesModal, handleCurrentIndex, handleStakeInput, handlesSaveUserStack, profit, handleInputStackTiedMatch, loadingBetPlace } = props;

  console.log('profit____MODALLLLLLLLLLL', profit);
  // console.log('betSlipDatabetSlipDataMODALLLLLLLLLLL', betSlipData);
  // console.log('countcountcountcountcount', count);
  // console.log('stackstackstackstackstack', stack);
  // console.log('finalMatchStackfinalMatchStackfinalMatchStack', finalMatchStack);

  // const [valuesModal, setValuesModal] = useState(false);

  // const showValuesModalhander = () => {
  //   setValuesModal(!valuesModal);
  // };

  const formatNumber = (event) => {
    let num = parseInt(event);
    if (num >= 1000) {
      return (num / 1000) + 'k';
    }
    return num.toString();
  };


  return (
    <>

      {/* <div>
        <LoadingOverlay
          active={loadingBetPlace}
          className="demo"
          spinner
        // text='Please wait...'
        />
      </div> */}

      <div className="accordion-item">
        <h2 className="accordion-header no-arrow">
          <button type="button" className="accordion-button">Place Bet</button>
        </h2>
        <div class="accordion-collapse collapse show">
          <div class="accordion-body">
            <div className={`${betSlipData && betSlipData.type === "BACK" ? "place-bet-box back" : "place-bet-box lay"}`}>
              <div className="place-bet-box-header">
                <div className="place-bet-for">(Bet for)</div>
                <div className="place-bet-odds">Odds</div>
                <div className="place-bet-stake">Stake</div>
                <div className="place-bet-profit">Profit</div>
              </div>
              <div className="place-bet-box-body">
                <div className="place-bet-for">
                  <span>{betSlipData && betSlipData.element && betSlipData.element.selectionName ? betSlipData.element.selectionName : "-"}</span>
                </div>
                <div className="place-bet-odds">
                  <input
                    type="text"
                    className="form-control"
                    disabled=""
                    value={count ? count : 0}
                    fdprocessedid="lfr0y"
                  />
                  <div className="spinner-buttons input-group-btn btn-group-vertical">
                    <button className="btn-default" fdprocessedid="s9aw0a">
                      <i className="fa fa-angle-up" />
                    </button>
                    <button className="btn-default" fdprocessedid="iu5zbu">
                      <i className="fa fa-angle-down" />
                    </button>
                  </div>
                </div>
                <div className="place-bet-stake">

                  <input
                    type="text"
                    className="form-control"
                    fdprocessedid="6erf4l"
                    placeholder="0"
                    value={stack}
                    onChange={handleInputStackTiedMatch}
                  />
                  <div className="spinner-buttons input-group-btn btn-group-vertical">
                    <button className="btn-default" fdprocessedid="s9aw0a" onClick={increaseStack}>
                      <i className="fa fa-angle-up" />
                    </button>
                    <button className="btn-default" fdprocessedid="iu5zbu"
                      onClick={decreaseStack}
                    >
                      <i className="fa fa-angle-down" />
                    </button>
                  </div>
                </div>
                <div className="place-bet-profit">{profit ? profit : 0}</div>
              </div>
              <div className="place-bet-buttons">
                <>
                  {
                    finalMatchStack && finalMatchStack.length > 0 ?
                      finalMatchStack.map((element, index) => (
                        <>
                          <button className="btn btn-place-bet" fdprocessedid="ajrch"
                            onClick={() => selectStackNewTiedMatch(element)}

                          >
                            {/* {element ? element : ""} */}
                            {formatNumber(element)}
                          </button>
                        </>
                      )) : null
                  }
                </>
              </div>
              <div className="place-bet-action-buttons">
                <div>
                  <button
                    className="btn btn-info"
                    onClick={showValuesModalhander}
                    fdprocessedid="0yd2ax"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button className="btn btn-danger me-1" fdprocessedid="xjyupc" onClick={handleReset}>
                    Reset
                  </button>
                  <button
                    className="btn btn-success"
                    fdprocessedid="vkeld"
                    disabled=""
                    onClick={handlePlaceBetTiedMatch}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {
              loadingBetPlace ?
                <>
                  <div className="custom-spinner-wrapper">
                    <div className="custom-spinner"></div>
                  </div>
                </> : null
            }

          </div>
        </div>
      </div>

      {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Place Bet
        </Accordion.Header>
        <Accordion.Body>
          <div className={`${betSlipData && betSlipData.type === "BACK" ? "place-bet-box back" : "place-bet-box lay"}`}>
            <div className="place-bet-box-header">
              <div className="place-bet-for">(Bet for)</div>
              <div className="place-bet-odds">Odds</div>
              <div className="place-bet-stake">Stake</div>
              <div className="place-bet-profit">Profit</div>
            </div>
            <div className="place-bet-box-body">
              <div className="place-bet-for">
                <span>{betSlipData && betSlipData.element && betSlipData.element.selectionName ? betSlipData.element.selectionName : "-"}</span>
              </div>
              <div className="place-bet-odds">
                <input
                  type="text"
                  className="form-control"
                  disabled=""
                  value={count ? count : 0}
                  fdprocessedid="lfr0y"
                />
                <div className="spinner-buttons input-group-btn btn-group-vertical">
                  <button className="btn-default" fdprocessedid="s9aw0a">
                    <i className="fa fa-angle-up" />
                  </button>
                  <button className="btn-default" fdprocessedid="iu5zbu">
                    <i className="fa fa-angle-down" />
                  </button>
                </div>
              </div>
              <div className="place-bet-stake">

                <input
                  type="text"
                  className="form-control"
                  fdprocessedid="6erf4l"
                  placeholder="0"
                  value={stack}
                  onChange={handleInputStackTiedMatch}
                />
                <div className="spinner-buttons input-group-btn btn-group-vertical">
                  <button className="btn-default" fdprocessedid="s9aw0a" onClick={increaseStack}>
                    <i className="fa fa-angle-up" />
                  </button>
                  <button className="btn-default" fdprocessedid="iu5zbu"
                    onClick={decreaseStack}
                  >
                    <i className="fa fa-angle-down" />
                  </button>
                </div>
              </div>
              <div className="place-bet-profit">{profit ? profit : 0}</div>
            </div>
            <div className="place-bet-buttons">
              <>
                {
                  finalMatchStack && finalMatchStack.length > 0 ?
                    finalMatchStack.map((element, index) => (
                      <>
                        <button className="btn btn-place-bet" fdprocessedid="ajrch"
                          onClick={() => selectStackNewTiedMatch(element)}

                        >
                          {element ? element : ""}
                        </button>
                      </>
                    )) : null
                }
              </>
            </div>
            <div className="place-bet-action-buttons">
              <div>
                <button
                  className="btn btn-info"
                  onClick={showValuesModalhander}
                  fdprocessedid="0yd2ax"
                >
                  Edit
                </button>
              </div>
              <div>
                <button className="btn btn-danger me-1" fdprocessedid="xjyupc" onClick={handleReset}>
                  Reset
                </button>
                <button
                  className="btn btn-success"
                  fdprocessedid="vkeld"
                  disabled=""
                  onClick={handlePlaceBetTiedMatch}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item> */}

      <Modal show={valuesModal} onHide={showValuesModalhander} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Set Button Value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonValues
            showValuesModalhander={showValuesModalhander}
            finalMatchStack={finalMatchStack}
            handleCurrentIndex={handleCurrentIndex}
            handleStakeInput={handleStakeInput}
            handlesSaveUserStack={handlesSaveUserStack}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TiedMatchPlaceBet;
