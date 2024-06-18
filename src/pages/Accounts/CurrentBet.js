import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { userActions } from '../../_actions';
import { authHeader } from '../../_helpers';


class CurrentBet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: moment().format('YYYY-MM-DD'),
      startDate: moment().format('YYYY-MM-DD'),
      sport_id: "0",
      currentBetsList: {},
      betTypeName: "",
      betTypeStatus: false,
      limit: 10,
    }
  }

  componentDidMount() {

    let myBetReq =
    {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": this.state.limit,
      "pageno": 1,
      "betType": "P",
      "market_id": "0",
      "match_id": 0,
      "sport_id": this.state.sport_id,
    }

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });

    const betListRes = fetch("https://triupatiexch.com/api/v5/my-bet-list", {
      method: "POST",
      headers: header,
      body: JSON.stringify(myBetReq)
    }).then(response => response.json()).then(data => {
      this.setState({
        currentBetsList: data.data,
      });
    })


    this.props.dispatch(userActions.my_bet_list(myBetReq));
  }



  inputChangeStartDate = (e) => {
    this.setState({ startDate: e.target.value });
  }

  inputChangeEndDate = (e) => {
    this.setState({ endDate: e.target.value });
  }


  handleSportSelect = (event) => {
    this.setState({ sport_id: event.target.value });
  };


  getCurrentBetSubmit = () => {
    let data =
    {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": this.state.limit,
      "sport_id": this.state.sport_id,
      "betType": "P",
      "pageno": 1,
      "market_id": "0",
      "match_id": 0
    }
    this.props.dispatch(userActions.my_bet_list(data));

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });

    const betListRes = fetch("https://triupatiexch.com/api/v5/my-bet-list", {
      method: "POST",
      headers: header,
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      this.setState({
        currentBetsList: data.data,
      });
    })


  }

 
  handlePageFirst = () => {
    let data =
    {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": this.state.limit,
      "sport_id": this.state.sport_id,
      "betType": "P",
      "pageno": 1,
      "market_id": "0",
      "match_id": 0
    }
    this.props.dispatch(userActions.my_bet_list(data));
  }

  handleBetTypeFilterBack = (betType) => {
    let { users } = this.props;
    let { currentBetsList } = users;
    const filterCondition = (item) => item.Type == "Back";
    const resultData = currentBetsList.filter(filterCondition);
    this.setState({ currentBetsList: resultData, betTypeName: betType })

  }

  handleBetTypeFilterLay = (betType) => {
    let { users } = this.props;
    let { currentBetsList } = users;
    const filterCondition = (item) => item.Type == "Lay";
    const resultData = currentBetsList.filter(filterCondition);
    this.setState({ currentBetsList: resultData, betTypeName: betType })
  }

  handleShowEntries = (event) => {
    this.setState({ limit: Number(event.target.value) })
    let myBetReq = {
      "from_date": moment(this.state.startDate).startOf('day').unix(),
      "to_date": moment(this.state.endDate).endOf('day').unix(),
      "limit": event.target.value,
      "pageno": 1,
      "betType": "P",
      "market_id": "0",
      "match_id": 0,
      "sport_id": this.state.sport_id,
    }
    this.props.dispatch(userActions.my_bet_list(myBetReq));


    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": authHeader().Authorization
    });

    const betListRes = fetch("https://triupatiexch.com/api/v5/my-bet-list", {
      method: "POST",
      headers: header,
      body: JSON.stringify(myBetReq)
    }).then(response => response.json()).then(data => {
      this.setState({
        currentBetsList: data.data,
      });
    })

  }

  render() {
    let { users } = this.props;
    let { currentBetsList } = users;

    return (
      <>
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
                        <div className="react-datepicker-wrapper">
                          <div className="react-datepicker__input-container">
                            {/* start date */}
                            <div className="mb-2 custom-datepicker">
                              <Input
                                type="date"
                                className="form-control"
                                disabled=""
                                value={this.state.startDate}
                                defaultValue="12/12/2023"
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
                                defaultValue="12/12/2023"
                                onChange={this.inputChangeEndDate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-3">
                        <div className="mb-4 input-group position-relative">
                          <select
                            className="form-select"
                            name="gtype"
                            fdprocessedid="rls18f"
                            onChange={this.handleSportSelect}
                          >
                            <option value={"0"}>All</option>
                            <option value={"4"}>Cricket</option>
                            <option value={"2"}>Tennis</option>
                            <option value={"1"}>Soccer</option>
                            <option value={"111"}>Casino</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 d-grid" onClick={this.getCurrentBetSubmit}>
                        <Button type="button" color="primary-btn">
                          Submit
                        </Button>
                      </div>
                    </form>
                    <div className="row row10 mt-2 justify-content-between align-items-center">
                      <div className="col-lg-2 col-6">
                        <div className="mb-2 input-group position-relative">
                          <span className="me-2">Show</span>
                          <select className="form-select" fdprocessedid="ochjb" onChange={this.handleShowEntries}>
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
                            onClick={() => this.getCurrentBetSubmit()}
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
                            onClick={() => this.handleBetTypeFilterBack("BACK")}
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
                            onClick={() => this.handleBetTypeFilterLay("LAY")}
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
 
                    </div>

                    <div className="mt-2 table-responsive">
                      <table
                        role="table"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr role="row">
                            <th colSpan={1} role="columnheader">
                              DESCRIPTION
                            </th>
                            <th colSpan={1} role="columnheader">
                              MARKET
                            </th>
                            <th
                              colSpan={1}
                              role="columnheader"
                              className="report-amount text-end"
                            >
                              SIDE
                            </th>
                            <th
                              colSpan={1}
                              role="columnheader"
                              className="report-amount text-end"
                            >
                              ODDS
                            </th>
                            <th
                              colSpan={1}
                              role="columnheader"
                              className="report-date"
                            >
                              STACK
                            </th>
                            <th
                              colSpan={1}
                              role="columnheader"
                              className="report-date"
                            >
                              PROFIL/LOSS
                            </th>
                            <th
                              colSpan={1}
                              role="columnheader"
                              className="report-date"
                            >
                              STATUS
                            </th>
                            <th
                              colSpan={1}
                              role="columnheader"
                              className="report-date"
                            >
                              IP ADDRESS
                            </th>
                           
                          </tr>
                        </thead>

                        <tbody >

                          {
                            this.state.currentBetsList && this.state.currentBetsList.length > 0 ?
                              this.state.currentBetsList.map((element, index) => (
                                <React.Fragment key={index}>

                                  <>
                                    <tr>
                                      <td className="text-center">
                                        {element && element.seriesName ? element.seriesName : 0}<br />
                                        {element && element.matchName ? element.matchName : 0}<br />
                                        {
                                          moment(
                                            parseInt(
                                              element && element.Placed ? element.Placed : null,
                                            ) * 1000,
                                          )
                                            .utcOffset("+05:30")
                                            .format("DD/MM/YYYY HH:mm a")}
                                        <br />
                                      </td>
                                      <td className="text-center">{element && element.marketName ? element.marketName : 0} -- {element && element.SelectionName ? element.SelectionName : 0}<br />
                                        Result : {element && element.winResult ? element.winResult : 0}
                                      </td>
                                      <td className="text-center">{element && element.Type ? element.Type : 0}</td>
                                      <td className="text-center">{element && element.Odds ? element.Odds : 0}</td>
                                      <td className="text-center">{element && element.Stack ? element.Stack : 0}</td>
                                      <td className="text-center">{element && element.PotentialProfit ? element.PotentialProfit : 0}</td>
                                      <td className="text-center">{element && element.PotentialProfit && element.PotentialProfit > 0 ? "WON" : "LOSS"}</td>
                                      <td className="text-center">{element && element.ipAddress ? element.ipAddress : 0}</td>
                                    </tr>
                                  </>



                                </React.Fragment>
                              )) : null
                          }
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
  const { users } = state;
  return {
    users
  };
}

export default connect(mapStateToProps)(CurrentBet);
