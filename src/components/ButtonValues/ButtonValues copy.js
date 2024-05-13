import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "../Button/Button";

//scss
import './ButtonValues.scss'

const ButtonValues = ({ onclick }) => {
  return (
    <div className="tabsGroup">
      <Tabs
        defaultActiveKey="game-buttons"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="game-buttons" title="Game Buttons">
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
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[0].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="1k"
                  fdprocessedid="2am9dj"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[0].bval"
                  type="text"
                  className="form-control"
                  defaultValue={1000}
                  fdprocessedid="uiyep7"
                />
              </div>
              <input
                name="buttons[0].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368013}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[1].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="2k"
                  fdprocessedid="oi17q6"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[1].bval"
                  type="text"
                  className="form-control"
                  defaultValue={2000}
                  fdprocessedid="a92sao"
                />
              </div>
              <input
                name="buttons[1].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368014}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[2].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="5k"
                  fdprocessedid="y1ucw"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[2].bval"
                  type="text"
                  className="form-control"
                  defaultValue={5000}
                  fdprocessedid="1z6we8"
                />
              </div>
              <input
                name="buttons[2].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368015}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[3].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="10k"
                  fdprocessedid="a539aa"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[3].bval"
                  type="text"
                  className="form-control"
                  defaultValue={10000}
                  fdprocessedid="ib1fti"
                />
              </div>
              <input
                name="buttons[3].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368016}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[4].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="20k"
                  fdprocessedid="q8eo"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[4].bval"
                  type="text"
                  className="form-control"
                  defaultValue={20000}
                  fdprocessedid="qdwf6t"
                />
              </div>
              <input
                name="buttons[4].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368017}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[5].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="25k"
                  fdprocessedid="r1lm2j"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[5].bval"
                  type="text"
                  className="form-control"
                  defaultValue={25000}
                  fdprocessedid="zlxafb"
                />
              </div>
              <input
                name="buttons[5].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368018}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[6].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="50k"
                  fdprocessedid="7ith2u"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[6].bval"
                  type="text"
                  className="form-control"
                  defaultValue={50000}
                  fdprocessedid="1bk6o"
                />
              </div>
              <input
                name="buttons[6].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368019}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[7].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="75k"
                  fdprocessedid="506ty8"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[7].bval"
                  type="text"
                  className="form-control"
                  defaultValue={75000}
                  fdprocessedid="i2i8om"
                />
              </div>
              <input
                name="buttons[7].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368020}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[8].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="90k"
                  fdprocessedid="2rse3"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[8].bval"
                  type="text"
                  className="form-control"
                  defaultValue={90000}
                  fdprocessedid="i7n20c"
                />
              </div>
              <input
                name="buttons[8].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368021}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[9].btxt"
                  type="text"
                  className="form-control"
                  defaultValue="95k"
                  fdprocessedid="w06aq"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[9].bval"
                  type="text"
                  className="form-control"
                  defaultValue={95000}
                  fdprocessedid="mqpqkf"
                />
              </div>
              <input
                name="buttons[9].bid"
                type="hidden"
                className="form-control"
                defaultValue={87368022}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-md-6">
                <Button type="button" color="primary-btn" onClick={onclick}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </Tab>
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
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[0].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={25}
                  fdprocessedid="tzugc9"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
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
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[1].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={50}
                  fdprocessedid="59umps"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
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
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[2].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={100}
                  fdprocessedid="iezd2s"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
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
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[3].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={200}
                  fdprocessedid="drbh7"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[3].bval"
                  type="text"
                  className="form-control"
                  defaultValue={200}
                  fdprocessedid="6so3y"
                />
              </div>
              <input
                name="buttons[3].bid"
                type="hidden"
                className="form-control"
                defaultValue={52421176}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[4].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={500}
                  fdprocessedid="68rvl"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[4].bval"
                  type="text"
                  className="form-control"
                  defaultValue={500}
                  fdprocessedid="hlmaqt"
                />
              </div>
              <input
                name="buttons[4].bid"
                type="hidden"
                className="form-control"
                defaultValue={52421177}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[5].btxt"
                  type="text"
                  className="form-control"
                  defaultValue={1000}
                  fdprocessedid="pe8y41"
                />
              </div>
              <div className="mb-3 col-6 position-relative">
                <input
                  name="buttons[5].bval"
                  type="text"
                  className="form-control"
                  defaultValue={1000}
                  fdprocessedid="qs8hsc"
                />
              </div>
              <input
                name="buttons[5].bid"
                type="hidden"
                className="form-control"
                defaultValue={52421178}
              />
            </div>
            <div className="row row10">
              <div className="mb-3 col-md-6 ">
                <Button
                  type="button"
                  color="primary-btn"
                  onClick={onclick}
                >
                  Update
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
