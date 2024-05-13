import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ButtonValues from "../../components/ButtonValues/ButtonValues";

const PlaceBet = ({ onclickHide }) => {
  const [valuesModal, setValuesModal] = useState(false);

  const showValuesModalhander = () => {
    setValuesModal(!valuesModal);
  };
  return (
    <>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Place Bet</Accordion.Header>
        <Accordion.Body>
          <div className="place-bet-box back">
            <div className="place-bet-box-header">
              <div className="place-bet-for">(Bet for)</div>
              <div className="place-bet-odds">Odds</div>
              <div className="place-bet-stake">Stake</div>
              <div className="place-bet-profit">Profit</div>
            </div>
            <div className="place-bet-box-body">
              <div className="place-bet-for">
                <span>South Africa</span>
              </div>
              <div className="place-bet-odds">
                <input
                  type="text"
                  className="form-control"
                  disabled=""
                  defaultValue={2}
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
                  type="number"
                  className="form-control"
                  defaultValue=""
                  fdprocessedid="6erf4l"
                />
              </div>
              <div className="place-bet-profit">0</div>
            </div>
            <div className="place-bet-buttons">
              <button className="btn btn-place-bet" fdprocessedid="ajrch">
                1k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="zvy4q">
                2k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="zi25a">
                5k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="ldsoc">
                10k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="kv1ii6">
                20k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="322gus">
                25k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="snngeq">
                50k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="o0wsy">
                75k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="z8iyol">
                90k
              </button>
              <button className="btn btn-place-bet" fdprocessedid="vpuh3">
                95k
              </button>
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
                <button className="btn btn-danger me-1" fdprocessedid="xjyupc">
                  Reset
                </button>
                <button
                  className="btn btn-success"
                  fdprocessedid="vkeld"
                  disabled=""
                  onClick={onclickHide}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>

      <Modal show={valuesModal} onHide={showValuesModalhander} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Set Button Value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonValues onclick={showValuesModalhander} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PlaceBet;
