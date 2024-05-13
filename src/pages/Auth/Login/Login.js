import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

// import { useHistory } from 'react-router-dom';
import {
  useNavigate
  // , withRouter 
} from 'react-router-dom';
// import { useNavigate } from 'react-router';

//scss
import style from "./Login.module.scss";

//image
// import logo from "../../../assets/png/logo.png";
import unclelogo from "../../../assets/png/Hero_Book_Exchanges_Logo.png";

//components
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { userActions } from '../../../_actions';
// import { withRouter } from "react-router/cjs/react-router.min";




const Login = (props) => {

  // console.log('props?????????????/', props);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [enterEmail, setEnterEmail] = useState("");
  const [enterPass, setEnterPass] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");

  const emailChangeHandler = (event) => {
    setEnterEmail(event.target.value);
    setErrorEmail("");
  };

  const passChangeHandler = (event) => {
    setEnterPass(event.target.value);
    setErrorPass("");
  };

  const loginButtonHandler = () => {

    if (handleValidationLogin()) {


      let reqData = {
        "user_name": enterEmail,
        "password": enterPass
      }

      dispatch(userActions.login(reqData
        , navigate

      ));


    }


  };

  const loginButtonHandlerDemoId = () => {
      let reqData = {
        "user_name":"demo007",
        "password": "123456"
      }

      dispatch(userActions.login(reqData
        , navigate

      ));
  };

  const handleValidationLogin = () => {
    // let errorslogin = {};
    let formIsValid = true;

    //user_name
    if (enterEmail === "") {
      formIsValid = false;
      setErrorEmail("UserName is required !");
    }

    //Password
    if (enterPass === "") {
      formIsValid = false;
      setErrorPass("Password is required !");
    }
    // setErrors(errorslogin);
    return formIsValid;
  }












  // const [formData, setFormData] = useState({
  //   user_name: '',
  //   password: ''
  // });

  // const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   const { name, value } = e.target;

  //   console.log(name, value);

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  //   setErrors({
  //     ...errors,
  //     [name]: "",
  //   });
  // };


  // const handleValidationLogin = () => {
  //   let errorslogin = {};
  //   let formIsValid = true;

  //   //user_name
  //   if (!formData["user_name"] || formData["user_name"] === "") {
  //     formIsValid = false;
  //     errorslogin["user_name"] = "Cannot be empty";
  //   }

  //   //Password
  //   if (!formData["password"]) {
  //     formIsValid = false;
  //     errorslogin["password"] = "Please enter password!";
  //   }
  //   setErrors(errorslogin);
  //   return formIsValid;
  // }


  // console.log('formData:::', formData);
  // console.log('errors:::', errors);

  console.log('errorEmail:::', errorEmail);
  console.log('errorPass:::', errorPass);

  return (
    <div className={style.loginWrapper}>
      <div className={style.logo}>
        {/* <img src={logo} alt="logo" /> */}
        <img src={unclelogo} alt="logo" />
      </div>

      <form>
        <div className={style.formHeading}>
          Login <i className="fas fa-hand-point-down"></i>
        </div>
        <div className={style.formRow}>
          <div className={style.inputGroup}>
            <Input
              type="text"
              placeholder="Username"
              onChange={emailChangeHandler}
              // onChange={handleChange}
              value={enterEmail}
              name="user_name"
            />
            <span className={style.inputGroupText}>
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        {errorEmail != "" ?
          <>
            <span className="text-danger">
              {errorEmail ? errorEmail : null}
            </span>
          </> : null
        }



        <div className={style.formRow}>
          <div className={style.inputGroup}>
            <Input
              type="password"
              placeholder="Password"
              onChange={passChangeHandler}
              // onChange={handleChange}
              value={enterPass}
              name="password"
            />
            <span className={style.inputGroupText}>
              <i className="fas fa-key"></i>
            </span>
          </div>
        </div>


        {errorPass != "" ?
          <>
            <span className="text-danger">
              {errorPass ? errorPass : null}
            </span>
          </> : null
        }

        <div className={style.btnRow}>
          <Button type="button" color="primary-btn" onClick={loginButtonHandler}>
            Login <i className="fas fa-sign-in-alt float-end mt-1"></i>
          </Button>
        </div>
        <div className={style.btnRow}>
          <Button
            type="button"
            color="primary-btn"
            onClick={loginButtonHandlerDemoId}
          >
            Login with demo ID <i className="fas fa-sign-in-alt float-end mt-1"></i>
          </Button>
        </div>
        <div className={style.smallText}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#/">Privacy Policy</a> and <a href="#/">Terms of Service</a>{" "}
          apply.
        </div>
      </form>
    </div>
  );
};

export default Login


// withRouter(Login) 
