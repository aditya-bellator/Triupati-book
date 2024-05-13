import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { betActions } from '../../_actions';

//scss
import "./Accounts.scss";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";



class AccountStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment().format('YYYY-MM-DD'),
      startDate: moment().subtract(6, 'days').format('YYYY-MM-DD'),
    }
  }

  componentDidMount() {
    let reqData = {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": 15,
      "pageno": 1
    }
    this.props.dispatch(betActions.betHistory(reqData));
  }

  inputChangeStartDate = (e) => {
    this.setState({ startDate: e.target.value });
  }

  inputChangeEndDate = (e) => {
    this.setState({ endDate: e.target.value });
  }

  getStementSubmit = () => {
    let data =
    {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": "15",
      "pageno": "1",
    }
    this.props.dispatch(betActions.betHistory(data));
  }



  handlePageFirst = () => {
    let reqData = {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": "15",
      "pageno": "1",
    }

    this.props.dispatch(betActions.betHistory(reqData));
  }

  render() {
    let { bet } = this.props;
    let { betHistoryItems } = bet;
    return (
      <>
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
                            {/* start date */}
                            <div className="mb-2 custom-datepicker">
                              <Input
                                type="date"
                                className="form-control"
                                disabled=""
                                value={this.state.startDate}
                                onChange={this.inputChangeStartDate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3">
                        <div className="react-datepicker-wrapper">
                          <div className="react-datepicker__input-container">
                            {/* end date */}
                            <div className="mb-2 custom-datepicker">
                              <Input
                                type="date"
                                className="form-control"
                                disabled=""
                                value={this.state.endDate}
                                onChange={this.inputChangeEndDate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-2 d-grid" onClick={() => this.getStementSubmit()}>
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
                          <>
                            {
                              betHistoryItems && betHistoryItems.length > 0 ?
                                betHistoryItems.map((element, index) => (
                                  <React.Fragment key={index}>

                                    <tr role="row">
                                      <td role="cell" className="report-date">
                                        {/* 12/12/2023 11:10:00 */}
                                        {
                                          moment(
                                            parseInt(
                                              element && element.created_at ? element.created_at : null,
                                            ) * 1000,
                                          )
                                            .utcOffset("+05:30")
                                            .format("DD/MM/YYYY HH:mm:a")}
                                      </td>
                                      <td role="cell" className="report-sr text-end">
                                        {index + 1}
                                      </td>
                                      <td role="cell" className="report-amount text-end">
                                        <span role="cell" className="">
                                          {element && element.amount && element.amount > 0 ? element.amount : "-"}
                                        </span>
                                      </td>
                                      <td role="cell" className="report-amount text-end">
                                        <span role="cell" className="" >
                                          {element && element.amount && element.amount < 0 ? element.amount : "-"}
                                        </span>
                                      </td>
                                      <td role="cell" className="report-amount text-end">
                                        <span role="cell" className="">
                                          {element && element.available_balance ? element.available_balance : "-"}
                                        </span>
                                      </td>
                                      <td role="cell">{element && element.description ? element.description : "-"} </td>
                                    </tr>
                                  </React.Fragment>
                                )) : null
                            }
                          </>

                        </tbody>
                      </table>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { bet } = state;
  return {
    bet
  };
}

export default connect(mapStateToProps)(AccountStatement);
// export default AccountStatement;