import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import moment from "moment";

const CurrentBet = () => {
  const dispatch = useDispatch();

  // my-bet-list



  useEffect(() => {
    let myBetReq = { "from_date": 1704738600, "to_date": 1704824999, "limit": 15, "sport_id": "0", "betType": "P", "pageno": 1, "market_id": "0", "match_id": 0 }

    // let myBetReq =
    // {
    //   "from_date": moment(this.state.startDate).startOf('day').unix(),
    //   "to_date": moment(this.state.endDate).endOf('day').unix(),
    //   "limit": 10,
    //   "pageno": 1,
    //   "betType": "P",
    //   "market_id": "0",
    //   "match_id": 0,
    //   "sport_id": 0,
    // }

    dispatch(userActions.my_bet_list(myBetReq));

  }, []);


  useEffect(() => {
    document.body.classList.add("account-page");
    return () => {
      document.body.classList.remove("account-page");
    };
  }, []);


  return (
    <div>
      <div className="center-main-container report-page">
        <div className="center-container">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Current Bets</h4>
            </div>
            <div className="card-body">
              <div className="report-form">
                <form className="row row10">
                  <div className="col-lg-2 col-md-3">
                    <div className="mb-4 input-group position-relative">
                      <select
                        className="form-select"
                        name="gtype"
                        fdprocessedid="rls18f"
                      >
                        <option value="" disabled="">
                          Select Report Type
                        </option>
                        <option value={1}>Sports</option>
                        <option value={2}>Casino</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 d-grid">
                    <Button type="button" color="primary-btn">
                      Submit
                    </Button>
                  </div>
                </form>
                <div className="row row10 mt-2 justify-content-between align-items-center">
                  <div className="col-lg-2 col-6">
                    <div className="mb-2 input-group position-relative">
                      <span className="me-2">Show</span>
                      <select className="form-select" fdprocessedid="ochjb">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                      </select>
                      <span className="ms-2">Entries</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 text-center">
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="all"
                        name="filter"
                        defaultValue="all"
                        defaultChecked="checked"
                      />
                      All
                      <label className="form-check-label" htmlFor="all" />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="back"
                        name="filter"
                        defaultValue="all"
                      />
                      Back
                      <label className="form-check-label" htmlFor="back" />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="lay"
                        name="filter"
                        defaultValue="all"
                      />
                      Lay
                      <label className="form-check-label" htmlFor="lay" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 text-center">
                    <div>
                      Total Bets: <span className="me-2">0</span> Total Amount:{" "}
                      <span className="me-2">0</span>
                    </div>
                  </div>
                  <div className="col-lg-2 col-6">
                    <div className="mb-2 input-group position-relative">
                      <span className="me-2">Search:</span>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="0 records..."
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>











                <div className="mt-2 table-responsive">
                  <table
                    role="table"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr role="row">
                        <th colSpan={1} role="columnheader">
                          Event Name
                        </th>
                        <th colSpan={1} role="columnheader">
                          Nation
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          User Rate
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          Amount
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-date"
                        >
                          Place Date
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-action"
                        >
                          <div className="text-end">
                            <div className="form-check form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                title="Toggle All Current Page Rows Selected"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody />
                  </table>
                </div>






                {/* old table with diamond with thead */}

                {/* <div className="mt-2 table-responsive">
                  <table
                    role="table"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr role="row">
                        <th colSpan={1} role="columnheader">
                          Event Name
                        </th>
                        <th colSpan={1} role="columnheader">
                          Nation
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          User Rate
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          Amount
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-date"
                        >
                          Place Date
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-action"
                        >
                          <div className="text-end">
                            <div className="form-check form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                title="Toggle All Current Page Rows Selected"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody />
                  </table>
                </div> */}



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBet;
