import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "../Button/Button";

//scss
import './BetMobileView.scss'

// const ButtonValues = ({ onclick }) => {
const ButtonValues = (props) => {

  let { handleReset } = props;


  return (
    <div className="tabsGroup">
      <Tabs
        defaultActiveKey="game-buttons"
        id="uncontrolled-tab-example"
        className="mb-3"
      >

        <Tab eventKey="casino-buttons" title="Casino Buttons">
          <form>
            <div className="row row10">
              <div className="mb-1 col-6">
                <label className="form-label">
                  <b>Price Label:</b>
                </label>
              </div>
              <div className="mb-1 col-6">
                <label className="form-label">
                  <b>Price Value:</b>
                </label>
              </div>
            </div>
            <div className="row row10">
              <div className="mb-3 col-4 position-relative">
                <button className="bet-button form-control" fdprocessedid="ajrch">
                  12
                </button>
                {/* <input
                  name="buttons[0].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={25}
                  fdprocessedid="tzugc9"
                /> */}
              </div>
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[0].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={25}
                  fdprocessedid="tzugc9"
                />
              </div>
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[0].bval"
                  type="text"
                  className="form-control"
                  defaultValue={25}
                  fdprocessedid="r7cvuc"
                />
              </div>
              <input
                name="buttons[0].bid"
                type="hidden"
                className="form-control"
                defaultValue={52421173}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[1].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={50}
                  fdprocessedid="59umps"
                />
              </div>
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[1].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={50}
                  fdprocessedid="59umps"
                />
              </div>
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[1].bval"
                  type="text"
                  className="form-control"
                  defaultValue={50}
                  fdprocessedid="9xu855"
                />
              </div>
              <input
                name="buttons[1].bid"
                type="hidden"
                className="form-control"
                defaultValue={52421174}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[2].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={100}
                  fdprocessedid="iezd2s"
                />
              </div>
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[2].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={100}
                  fdprocessedid="iezd2s"
                />
              </div>
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[2].bval"
                  type="text"
                  className="form-control"
                  defaultValue={100}
                  fdprocessedid="4t36n"
                />
              </div>
              <input
                name="buttons[2].bid"
                type="hidden"
                className="form-control"
                defaultValue={52421175}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-4 position-relative">
                <input
                  name="buttons[2].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={100}
                  fdprocessedid="iezd2s"
                />
              </div>
            </div>

            <div className="row row10">
              <div className="mb-3 col-md-6 ">
                <Button
                  type="button"
                  color="primary-btn"
                  onClick={handleReset}
                >
                  close
                </Button>
              </div>
            </div>
          </form>
        </Tab>



      </Tabs>
    </div>
  );
};

export default ButtonValues;
