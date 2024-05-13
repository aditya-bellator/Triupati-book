import React from "react";
// import { FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "./CompleteMatchBetPlaceMobileView.scss";
import ButtonValues from "../../components/ButtonValues/ButtonValues";
import LoadingOverlay from 'react-loading-overlay';
import '../../pages/Details/customStyles.css'; // Import your custom CSS file


export default function CompleteMatchBetPlaceMobileView(props) {
  //const [modalOpen1, setModalOpen1] = useState(false);
  let { completeMatchfilteredData, handleReset, backBetComplateMatchModal, finalMatchStack, betSlipData, handleInputStackCompletematch, handlePlaceBetCompleteMatch, stack, count, profit, selectStackNewComplateMatch, MatchDetails, sectionType, currentRunner, valuesModal,
    showValuesModalhander, handleCurrentIndex, handleStakeInput, handlesSaveUserStack, toWinTheTossfilteredData, loadingBetPlace
  } = props;

  const [show, setShow] = useState(true);

  let marketDataDetails = completeMatchfilteredData[0]

  // console.log('marketDataDetails[0]...', marketDataDetails);
  // console.log('sectionType[0]...', sectionType);

  const showModal = () => {
    setShow(!show);
  };

  const formatNumber = (event) => {
    let num = parseInt(event);
    if (num >= 1000) {
      return (num / 1000) + 'k';
    }
    return num.toString();
  };


  return (
    <>
      

      <Modal size=""
        show={backBetComplateMatchModal}
        onHide={handleReset} scrollable className="bet-mobile">
        <Modal.Header closeButton className="">
          <Modal.Title>Place Bet</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">

          {/* <div>
            <LoadingOverlay
              active={loadingBetPlace}
              className="demo"
              spinner
            // text='Please wait...'
            />
          </div> */}

          <div className={`${betSlipData && betSlipData.type === "BACK" ? "backgroundBack back1" : "background"}`}>
            <div className="d-flex align-items-end justify-content-between mb-2 px-1">
              <p className="fst-bold m-0"><strong>
                {betSlipData && betSlipData.element && betSlipData.element.selectionName ? betSlipData.element.selectionName : "-"}
                {/* Welligton */}
              </strong></p>
              <div className="d-flex align-items-center">
                <p className="fst-normal fs-1 text-white w-10 m-0 d-flex align-items-center px-2">-</p>
                <input type="text" className="place" style={{ height: "30px", width: "70px", border: "0" }}
                  value={count ? count : 0}
                />
                <p className="fst-normal fs-1 text-white w-10 m-0 d-flex align-items-center px-2">+</p>
              </div>
            </div>
            <div className="d-flex mb-2">
              <div className="col-4 px-1 pe-3">
                <input type="text" className="place" value={stack} onChange={handleInputStackCompletematch} style={{ height: "30px", width: "100%", borderRadius: "3px" }} />
              </div>
              <div className="col-4 px-1" >
                <button className="place bg-blue rounded-1 border-0 btn-prime" onClick={handlePlaceBetCompleteMatch} >Submit</button>
              </div>
              <div className="col-4 px-1">
                <h6 className="place text-center py-1">{profit ? profit : 0}

                  {/* 110 */}
                </h6>
              </div>
            </div>

            <div className="d-flex mb-2 flex-wrap">

              <>
                {
                  finalMatchStack && finalMatchStack.length > 0 ?
                    finalMatchStack.map((element, index) => (
                      <>

                        <div className="col-4 px-1  mb-2" onClick={() => selectStackNewComplateMatch(element)} >
                          <p className="place bg-dark-1 text-light text-center" >
                            {/* {element ? element : ""} */}
                            {formatNumber(element)}
                          </p>
                        </div>
                      </>
                    )) : null
                }
              </>


            </div>




            <div className="px-1 mt-3">
              <button type="button" className="btn btn-edit " onClick={showValuesModalhander}>Edit</button>
            </div>

            <>
              {
                marketDataDetails && marketDataDetails.runner_json && marketDataDetails.runner_json.length > 0 ?
                  marketDataDetails.runner_json.map((element, index) => (
                    <React.Fragment key={index}>

                      <div className="d-flex justify-content-between px-1 mt-2">
                        <div>
                          <p className="fs-6">{element && element.selectionName ? element.selectionName : "-"}</p>
                        </div>
                        <div>
                          <p className={`px-4 fw-bold ${element && element.WinAndLoss && element.WinAndLoss < 0 ? "text-danger" : "text-success"}`}>{element && element.WinAndLoss ? element.WinAndLoss.toFixed(2) : null}</p>
                        </div>

                        {profit && sectionType && sectionType === "COMPLETE_MATCH" ?
                          <>
                            <div>
                              <p
                                className={`px-4 fs ${currentRunner && currentRunner[index] && currentRunner[index].winLoss && currentRunner[index].winLoss < 0 ? "text-danger" : " text-success"}`}
                              // className="fs-6 text-success"
                              >

                                {currentRunner && currentRunner[index] && currentRunner[index].winLoss ? currentRunner[index].winLoss.toFixed(2) : null}

                              </p>
                            </div>
                          </> : null
                        }

                      </div>

                    </React.Fragment>
                  )) : null
              }

            </>


            {
              loadingBetPlace ?
                <>
                  <div className="custom-spinner-wrapper-mobile">
                    <div className="custom-spinner"></div>
                  </div>
                </> : null
            }


          </div>
        </Modal.Body>
      </Modal>



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
  )
}