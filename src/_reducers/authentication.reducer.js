import { userConstants } from '../_constants';

let user = JSON.parse(window.sessionStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    // case userConstants.UPDATE_PASSWORD_VALIDATE_OTP_REQUEST:
    //   return {
    //     ...state,
    //     loggingIn: true,
    //     user: action.user
    //   };
    // case userConstants.UPDATE_PASSWORD_VALIDATE_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     loggedIn: true,
    //     isPasswordUpdate: true,
    //     // upadatePassOtp: action.user.userinfo.data,
    //     // otpSent: true
    //   };
    // case userConstants.UPDATE_PASSWORD_VALIDATE_OTP_FAILURE:
    //   return {...state};

    case userConstants.VALIDATE_LOGIN_OTP_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loading: true,
        user: action.user
      };
    case userConstants.VALIDATE_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        validateOtpUser: action.user.userinfo.data,
        otpSentLogin: false
      };
    case userConstants.VALIDATE_LOGIN_OTP_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loading: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        otpSentRegister: false,
        user: action.user.userinfo.data
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state };

    case userConstants.FORGOT_PASS_UPDATE_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loading: false,
        user: action.user
      };
    case userConstants.FORGOT_PASS_UPDATE_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        otpSentForgotPass: false,
        isForgotSuccess: true,
        user: action.user.userinfo.data
      };
    case userConstants.FORGOT_PASS_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
      };


    case userConstants.LOGIN_FIRST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_FIRST_SUCCESS:
      return {
        ...state,
        addOtpSuccess: true,
        loginData: action.user.userinfo.data,
        otpSentLogin: true,
        loading: false,
      };
    case userConstants.LOGIN_FIRST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.REGISTER_FIRST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.REGISTER_FIRST_SUCCESS:
      return {
        ...state,
        registeruser: action.user.userinfo.data,
        otpSentRegister: true,
        loading: false,
      };
    case userConstants.REGISTER_FIRST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.FORGOT_REQUEST:
      return {
        ...state,
      };
    case userConstants.FORGOT_FIRST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.FORGOT_FIRST_SUCCESS:
      return {
        ...state,
        forgotuser: action.user.userinfo.data,
        otpSentForgotPass: true,
        loading: false,
      };
    case userConstants.FORGOT_FIRST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}