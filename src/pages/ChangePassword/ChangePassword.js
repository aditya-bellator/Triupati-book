import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import { userActions } from '../../_actions';

//scss
import "./changePassword.css";
import "./ChangePassword.scss";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";



class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldsChangePass: {},
      errorsChangePass: {},
      showPassword: false,
      inputNo: null,

    }
  }

  componentDidMount() {

  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.updatePassSuccess) {
      return {
        ...nextProps,
        fieldsChangePass: {},
        errorsChangePass: {},
      }
    } else {
      return {
        ...nextProps,

      }
    }
  }

  togglePasswordVisibility = (value) => {
    console.log('value', value);
    this.setState({ showPassword: !this.state.showPassword, inputNo: value })
  };

  inputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    let fieldsChangePass = this.state.fieldsChangePass;
    let errorsChangePass = this.state.errorsChangePass;
    fieldsChangePass[name] = value;
    errorsChangePass[name] = "";
    this.setState({ fieldsChangePass, errorsChangePass });
  }


  changeSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidationChangePass()) {
      let { oldPassword, confirmNewPassword, newPassword } = this.state.fieldsChangePass;
      this.props.dispatch(userActions.update_Info({ oldPassword: oldPassword, confirmNewPassword: confirmNewPassword, newPassword: newPassword }, this.props));
    }
  }


  handleValidationChangePass = () => {
    let fieldsChangePass = this.state.fieldsChangePass;
    let errorsChangePass = {};
    let formIsValid = true;

    //oldPassword
    if (!fieldsChangePass["oldPassword"] || fieldsChangePass["oldPassword"] === "") {
      formIsValid = false;
      errorsChangePass["oldPassword"] = "Cannot be empty";
    }

    //newPassword
    if (!fieldsChangePass["newPassword"]) {
      formIsValid = false;
      errorsChangePass["newPassword"] = "Please enter newPassword!";
    }

    //confirmNewPassword
    if (!fieldsChangePass["confirmNewPassword"]) {
      formIsValid = false;
      errorsChangePass["confirmNewPassword"] = "Please enter confirmNewPassword!";
    }

    this.setState({ errorsChangePass: errorsChangePass });
    return formIsValid;
  }


  render() {
    return (
      <>
        <div>
          <div className="center-main-container report-page">
            <div className="center-container">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Change Password</h4>
                </div>
                <div className="card-body">
                  <div className="report-form">
                    <form className="change-pass-form">
                      <div className="form-row">
                        <label>Old Password : </label>
                        <div className="hideShowFieldIcon">
                          <Input
                            type={this.state.showPassword && this.state.inputNo === 1 ? "text" : "password"}
                            onChange={this.inputChange}
                            value={this.state.fieldsChangePass && this.state.fieldsChangePass["oldPassword"] ? this.state.fieldsChangePass["oldPassword"] : ""}
                            placeholder="Old Password"
                            name="oldPassword"
                          />

                          <span className="toggle-password icon" onClick={() => this.togglePasswordVisibility(1)}>
                            {this.state.showPassword && this.state.inputNo === 1 ? (
                              <IoMdEye />
                            ) : (
                              <IoMdEyeOff />
                            )}
                          </span>


                        </div>

                      </div>
                      {this.state.errorsChangePass && this.state.errorsChangePass["oldPassword"] ?

                        <span className="text-danger">
                          {this.state.errorsChangePass["oldPassword"]}
                        </span>
                        : null
                      }

                      <div className="form-row">
                        <label>New Password : </label>
                        <div className="hideShowFieldIcon">
                          <Input
                            type={this.state.showPassword && this.state.inputNo === 2 ? "text" : "password"}
                            onChange={this.inputChange}
                            value={this.state.fieldsChangePass && this.state.fieldsChangePass["newPassword"] ? this.state.fieldsChangePass["newPassword"] : ""}
                            placeholder="New Password"
                            name="newPassword"
                          />
                          <span className="toggle-password icon" onClick={() => this.togglePasswordVisibility(2)}>
                            {this.state.showPassword && this.state.inputNo === 2 ? (
                              <IoMdEye />
                            ) : (
                              <IoMdEyeOff />
                            )}
                          </span>
                        </div>

                      </div>
                      {this.state.errorsChangePass && this.state.errorsChangePass["newPassword"] ?

                        <span className="text-danger">
                          {this.state.errorsChangePass["newPassword"]}
                        </span>
                        : null
                      }

                      <div className="form-row">
                        <label>Confirm New Password : </label>
                        <div className="hideShowFieldIcon">
                          <Input
                            type={this.state.showPassword && this.state.inputNo === 3 ? "text" : "password"}
                            onChange={this.inputChange}
                            value={this.state.fieldsChangePass && this.state.fieldsChangePass["confirmNewPassword"] ? this.state.fieldsChangePass["confirmNewPassword"] : ""}
                            placeholder="Confirm New Password"
                            name="confirmNewPassword"
                          />
                          <span className="toggle-password icon" onClick={() => this.togglePasswordVisibility(3)}>
                            {this.state.showPassword && this.state.inputNo === 3 ? (
                              <IoMdEye />
                            ) : (
                              <IoMdEyeOff />
                            )}
                          </span>
                        </div>
                      </div>
                      {this.state.errorsChangePass && this.state.errorsChangePass["confirmNewPassword"] ?

                        <span className="text-danger">
                          {this.state.errorsChangePass["confirmNewPassword"]}
                        </span>
                        : null
                      }

                      <div className="form-row mt-4">
                        <Button
                          type="button"
                          color="primary-btn"
                          onClick={this.changeSubmit}
                        >
                          Change Password
                        </Button>
                      </div>

                    </form>


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

export default connect(mapStateToProps)(ChangePassword);
