import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const CasinoResults = () => {
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
              <h4 className="card-title">Casino Results</h4>
            </div>
            <div className="card-body">
              <div className="report-form">
                <form className="row row10">
                  <div className="col-lg-2 col-md-3">
                    <div className="react-datepicker-wrapper">
                      <div className="react-datepicker__input-container">
                        <div className="mb-2 custom-datepicker">
                          <Input
                            type="date"
                            className="form-control"
                            disabled=""
                            defaultValue="12/12/2023"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-3">
                    <div className="mb-2 input-group position-relative">
                      <select
                        className="form-select"
                        name="type"
                        fdprocessedid="v9c4tm"
                      >
                        <option value="" disabled="">
                          Select Casino Type
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2 d-grid">
                    <Button type="button" color="primary-btn">
                      Submit
                    </Button>
                  </div>
                </form>
                <div className="row row10 mt-2 justify-content-between">
                  <div className="col-lg-2 col-6">
                    <div className="mb-2 input-group position-relative">
                      <span className="me-2">Show</span>
                      <select className="form-select" fdprocessedid="0gamps">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                      </select>
                      <span className="ms-2">Entries</span>
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
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="round-id"
                        >
                          Round ID
                        </th>
                        <th colSpan={1} role="columnheader">
                          Winner
                        </th>
                      </tr>
                    </thead>
                    <tbody />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoResults;
