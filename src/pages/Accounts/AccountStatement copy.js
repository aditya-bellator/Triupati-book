import React, { useEffect } from "react";

//scss
import "./Accounts.scss";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const AccountStatement = () => {
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
              <h4 className="card-title">Account Statement</h4>
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
                    <div className="react-datepicker-wrapper">
                      <div className="react-datepicker__input-container">
                        <div className="mb-2 custom-datepicker">
                          <Input
                            type="date"
                            className="form-control"
                            disabled=""
                            defaultValue="19/12/2023"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div className="mb-2 input-group position-relative">
                      <select
                        className="form-select"
                        name="type"
                        fdprocessedid="j02hq7"
                      >
                        <option value="" disabled="">
                          Select Report Type
                        </option>
                        <option value={1}>All Reports</option>
                        <option value={2}>Deposite/Withdraw Reports</option>
                        <option value={3}>Game Reports</option>
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
                      <select className="form-select" fdprocessedid="6ywpyg">
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
                          className="report-date"
                        >
                          Date
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-sr text-end"
                        >
                          Sr no
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          Credit
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          Debit
                        </th>
                        <th
                          colSpan={1}
                          role="columnheader"
                          className="report-amount text-end"
                        >
                          Pts
                        </th>
                        <th colSpan={1} role="columnheader">
                          Remark
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row">
                        <td role="cell" className="report-date">
                          12/12/2023 11:10:00
                        </td>
                        <td role="cell" className="report-sr text-end">
                          1
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="">
                            0
                          </span>
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="" />
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="">
                            0
                          </span>
                        </td>
                        <td role="cell">Opening Pts</td>
                      </tr>
                      <tr role="row">
                        <td role="cell" className="report-date">
                          18/12/2023 17:53:39
                        </td>
                        <td role="cell" className="report-sr text-end">
                          2
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="text-success">
                            1,500
                          </span>
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="" />
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="text-success">
                            1,500
                          </span>
                        </td>
                        <td role="cell">User creation</td>
                      </tr>
                      <tr role="row">
                        <td role="cell" className="report-date">
                          19/12/2023 12:14:46
                        </td>
                        <td role="cell" className="report-sr text-end">
                          3
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="">
                            0
                          </span>
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="" />
                        </td>
                        <td role="cell" className="report-amount text-end">
                          <span role="cell" className="text-success">
                            1,500
                          </span>
                        </td>
                        <td role="cell">Live Casino</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="custom-pagination mt-2">
                  <div disabled="">First</div>
                  <div disabled="">Previous</div>
                  <div disabled="">Next</div>
                  <div disabled="">Last</div>
                  <div>
                    <span className="me-2">
                      Page <b>1 of 1</b>
                    </span>
                    <span className="me-2">| Go to Page</span>
                    <input
                      className="form-control"
                      type="number"
                      defaultValue={1}
                      fdprocessedid="hzkjzh"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatement;
