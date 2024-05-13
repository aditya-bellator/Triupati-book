import { userConstants } from '../_constants';
import { userService } from '../_services';
// import { useHistory } from 'react-router-dom';
import {
    alertActions,
    // dashboardActions
} from './';
export const userActions = {
    logout,
    event_game_SportIdWise,
    list_bt_ssn_mk,
    my_bet_list,
    games_list,
    update_Info,
    logOutAfterPassChange,
    game_lobby,
    game_login,
    game_event_list,
    event_game_list,
    event_detals,
    event_tennis,
    event_footbal,
    event_session,
    getScore,
    save_bet,
    save_ssn_bet,
    single_click_update_amount,
    logout1,
    getUserInfo,
    login,
    getUserDetails,
    updateUserInfo,
    getCoinBalance,










    // saveBTST,
    // transactionSearch,
    // resetUser,
    // uploadImageClearSelfie,
    // uploadImageClear,
    // getKYC,
    // updatePassword,
    // uploadImageSelfie,
    // uploadImage,
    // swapAmount,
    // getPrice,
    // getTx,
    // getUserTxListOverFlow,
    // getUserWalletByUserId,
    // getTxAllMulti,
    // sendCoin,
    // getTicketList,
    // createTicket,
    // createKYC,
    // getDocumentList,
    // loginValidateOtp,
    // registerValidateOtp,
    // forgotPassword,
    // register,
    // forgotUpdatePassword,
    // getBTST,
    // getPackageBTST,
    // getSTAKE,
    // getPackageSTAKE,
    // saveSTAKE,
    // saveUserInfo,
    // getDocumentListObj,
    // saveKycDoc,
    // uploadImagePan,
    // uploadImageClearPan,
    // uploadImagePassport,
    // uploadImageClearPassport,
    // uploadImageAdhaar,
    // uploadImageClearAdhaar,
    // saveKycDocAadhar,
    // saveKycDocPan,
    // saveKycDocPassport,
    // saveKycDocSelfie,
    // uploadImageAdhaarBack,
    // uploadImageClearAdhaarBack,
    // getAllIndex,
    // buyIndex,
    // getIndexOrder,
    // sellIndex,
    // createWallet,
    // getAllCountry,
    // getAllState,
    // getAllCity,
    // validateLoginOtp,
    // updatePasswordValidateOtp,
    // swapCoinAmount,
    // getAllCoinIndexByIndexId,
    // getINRCoinId,
    // createMakePayment,
    // getMakePaymentList,
    // getCountriesList,
    // getCitiesList,
    // getStatesList,
    // getUserWalletByCoinName,
    // getReferalById,
    // getReferralCountAndSumById,
    // saveUserPersonalAddr,
    // saveSocialMedia,
    // sendBalance,
    // getUserNameVerified,
    // getCmcCoinByTickerName,
    // getProfileDataPi,
    // getPackageList,
    // // getUserPackages,
    // getUserByRefCode,
    // getDftWallet,
    // saveDftWalletAddress,
    // claimAddress,
    // withdrawBalance,
    // getUserListByEmail,
    // createNotification,
    // createUserPromoPackage,
    // getUserPromoPackageByUserId,
    // claimPromoPack,
    // getSocialMediaById,
    // getCmcCoinList,
    // getAllLevelWelcome,
    // getAllLevelMining,
    // getLevelByIdUser,
    // getLevelByIdUserTx,
    // getLevelByIdUserPackage,
    // changeEmail

};

function login(data, navigate) {

    console.log('sssssssssssssss', navigate);

    return dispatch => {
        dispatch(request({ data }));
        userService.login(data)
            .then(
                user => {
                    dispatch(success(user));
                    // dispatch(alertActions.success(user.userinfo.message));
                    // navigate(`lottery`)

                    console.log('llllllllllllllllllllyyyyyy');
                    navigate(`/home`);
                    window.location.reload();
                    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvv');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_FIRST_REQUEST } }
    function success(user) { return { type: userConstants.LOGIN_FIRST_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FIRST_FAILURE, error } }
}
function event_game_SportIdWise(data) {

    return dispatch => {
        dispatch(request());
        userService.event_game_SportIdWise(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_EVENT_GAME_SPORT_ID_WISE_REQUEST } }
    function success(users) { return { type: userConstants.GET_EVENT_GAME_SPORT_ID_WISE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_EVENT_GAME_SPORT_ID_WISE_FAILURE, error } }
}
function update_Info(data, props) {
    console.log('propspropsprops', props);
    let sportReq = { "limit": 10, "pageno": 1 }
    return dispatch => {
        dispatch(request());
        userService.update_Info(data)
            .then(
                users => {
                    dispatch(success(users));
                    let message = users && users.update_Info && users.update_Info.message ? users.update_Info.message : "";
                    // console.log('messagemessage', message);
                    dispatch(alertActions.success(message));
                    // dispatch(this.games_list(sportReq));
                    // dispatch(this.logOutAfterPassChange());
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.UPDATE_INFO_REQUEST } }
    function success(users) { return { type: userConstants.UPDATE_INFO_SUCCESS, users } }
    function failure(error) { return { type: userConstants.UPDATE_INFO_FAILURE, error } }
}
function games_list(data) {

    return dispatch => {
        dispatch(request());
        userService.games_list(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_GAMES_LIST_REQUEST } }
    function success(users) { return { type: userConstants.GET_GAMES_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_GAMES_LIST_FAILURE, error } }
}
function game_event_list(data) {

    return dispatch => {
        dispatch(request());
        userService.game_event_list(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_GAME_EVENT_LIST_REQUEST } }
    function success(users) { return { type: userConstants.GET_GAME_EVENT_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_GAME_EVENT_LIST_FAILURE, error } }
}
function logout() {
    return dispatch => {
        dispatch(this.resetUser());
        dispatch(this.logout1());
    };
}
function logout1() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function list_bt_ssn_mk(data) {

    return dispatch => {
        dispatch(request());
        userService.list_bt_ssn_mk(data)
            .then(
                users => {
                    console.log('ACTION___list_bt_ssn_mk?', users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_WALLET_LIST_REQUEST } }
    function success(users) { return { type: userConstants.GET_WALLET_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_WALLET_LIST_FAILURE, error } }
}
function my_bet_list(data) {

    return dispatch => {
        dispatch(request());
        userService.my_bet_list(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_MY_BET_LIST_REQUEST } }
    function success(users) { return { type: userConstants.GET_MY_BET_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_MY_BET_LIST_FAILURE, error } }
}
function game_lobby(data) {

    return dispatch => {
        dispatch(request());
        userService.game_lobby(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_GAME_LOBBY_REQUEST } }
    function success(users) { return { type: userConstants.GET_GAME_LOBBY_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_GAME_LOBBY_FAILURE, error } }
}
function game_login(data) {

    return dispatch => {
        dispatch(request());
        userService.game_login(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_GAME_LOGIN_REQUEST } }
    function success(users) { return { type: userConstants.GET_GAME_LOGIN_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_GAME_LOGIN_FAILURE, error } }
}
function event_game_list(data) {

    return dispatch => {
        dispatch(request());
        userService.event_game_list(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_EVENT_GAMES_LIST_REQUEST } }
    function success(users) { return { type: userConstants.GET_EVENT_GAMES_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_EVENT_GAMES_LIST_FAILURE, error } }
}
function event_detals(data) {

    return dispatch => {
        dispatch(request());
        userService.event_detals(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_EVENT_DETALS_REQUEST } }
    function success(users) { return { type: userConstants.GET_EVENT_DETALS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_EVENT_DETALS_FAILURE, error } }
}
function event_tennis(data) {

    return dispatch => {
        dispatch(request());
        userService.event_tennis(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_EVENT_TENNIS_REQUEST } }
    function success(users) { return { type: userConstants.GET_EVENT_TENNIS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_EVENT_TENNIS_FAILURE, error } }
}
function event_footbal(data) {

    return dispatch => {
        dispatch(request());
        userService.event_footbal(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_EVENT_FOOTBALL_REQUEST } }
    function success(users) { return { type: userConstants.GET_EVENT_FOOTBALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_EVENT_FOOTBALL_FAILURE, error } }
}
function event_session(data) {

    return dispatch => {
        dispatch(request());
        userService.event_session(data)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_EVENT_SESSION_REQUEST } }
    function success(users) { return { type: userConstants.GET_EVENT_SESSION_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_EVENT_SESSION_FAILURE, error } }
}
function getScore(match_id) {

    return dispatch => {
        dispatch(request());
        userService.getScore(match_id)
            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_SCORE_REQUEST } }
    function success(users) { return { type: userConstants.GET_SCORE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_SCORE_FAILURE, error } }
}
function save_bet(data, betListReq, setBackBetModal, setCurrentRunner, setStack) {

    return dispatch => {
        dispatch(request());
        userService.save_bet(data)
            .then(
                users => {
                    console.log('users_save_bet_ACTION:::', users);
                    dispatch(success(users));
                    let message = users && users.save_bet && users.save_bet.message ? users.save_bet.message : "";
                    console.log('messagemessage', message);
                    dispatch(alertActions.success(message));
                    setBackBetModal(false);
                    setCurrentRunner([]);
                    setStack(null);
                    dispatch(this.list_bt_ssn_mk(betListReq));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.SAVE_BET_REQUEST } }
    function success(users) { return { type: userConstants.SAVE_BET_SUCCESS, users } }
    function failure(error) { return { type: userConstants.SAVE_BET_FAILURE, error } }
}
function save_ssn_bet(data, betListReq, setBackBetFancyModal, setStack) {

    return dispatch => {
        dispatch(request());
        userService.save_ssn_bet(data)
            .then(
                users => {
                    console.log('users_save_bet_ACTION:::', users);
                    dispatch(success(users));
                    let message = users && users.save_ssn_bet && users.save_ssn_bet.message ? users.save_ssn_bet.message : "";
                    console.log('messagemessage', message);
                    dispatch(alertActions.success(message));
                    setBackBetFancyModal(false)
                    setStack(null)
                    dispatch(this.list_bt_ssn_mk(betListReq));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.SAVE_FANCY_BET_REQUEST } }
    function success(users) { return { type: userConstants.SAVE_FANCY_BET_SUCCESS, users } }
    function failure(error) { return { type: userConstants.SAVE_FANCY_BET_FAILURE, error } }
}
function single_click_update_amount(data, eventDetalApiReq, setValuesModal) {

    return dispatch => {
        dispatch(request());
        userService.single_click_update_amount(data)
            .then(
                users => {
                    dispatch(success(users));
                    setValuesModal(false);
                    dispatch(this.event_detals(eventDetalApiReq));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.SINGLE_CLICK_UPDATE_AMOUNT_REQUEST } }
    function success(users) { return { type: userConstants.SINGLE_CLICK_UPDATE_AMOUNT_SUCCESS, users } }
    function failure(error) { return { type: userConstants.SINGLE_CLICK_UPDATE_AMOUNT_FAILURE, error } }
}
function getUserInfo(data, props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.getUserInfo(data)
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(this.getUserDetails());
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: userConstants.GET_USER_INFO_REQUEST } }
    function success(users) { return { type: userConstants.GET_USER_INFO_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_USER_INFO_FAILURE, error } }
}
function getUserDetails() {

    return dispatch => {
        dispatch(request());
        userService.getUserDetails()
            .then(
                users => {
                    // console.log("ACTION__getUserDetails___getUserDetails::", users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.USER_DETAILS_REQUEST } }
    function success(users) { return { type: userConstants.USER_DETAILS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.USER_DETAILS_FAILURE, error } }
}
function updateUserInfo(data) {

    return dispatch => {
        dispatch(request());
        userService.updateUserInfo(data)
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(alertActions.success(users.updateUserInfo.message));
                    dispatch(this.getUserDetails());
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.UPDATE_USER_DETAILS_REQUEST } }
    function success(users) { return { type: userConstants.UPDATE_USER_DETAILS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.UPDATE_USER_DETAILS_FAILURE, error } }
}

function getCoinBalance() {

    return dispatch => {
        dispatch(request());
        userService.getCoinBalance()

            .then(
                users => {
                    dispatch(success(users));
                },
                error => {
                    // dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GET_COIN_BALANCE_REQUEST } }
    function success(users) { return { type: userConstants.GET_COIN_BALANCE_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_COIN_BALANCE_FAILURE, error } }
}


function logOutAfterPassChange() {
    // const history = useHistory();
    return dispatch => {
        localStorage.clear();
        // history.push('/');
        // navigate('/')
        window.location.reload();
    };
}

// ////////////////////////////////////////////////////////////////////


// function getSocialMediaById() {

//     return dispatch => {
//         dispatch(request());
//         userService.getSocialMediaById()
//             .then(
//                 users => {
//                     // console.log("ACTION__getUserDetails___getUserDetails::", users);
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SOCIAL_DETAILS_REQUEST } }
//     function success(users) { return { type: userConstants.SOCIAL_DETAILS_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SOCIAL_DETAILS_FAILURE, error } }
// }
// function getProfileDataPi() {

//     return dispatch => {
//         dispatch(request());
//         userService.getProfileDataPi()
//             .then(
//                 users => {
//                     // console.log("ACTION__getProfileDataPi___getProfileDataPi::", users);
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.PROFILE_PI_REQUEST } }
//     function success(users) { return { type: userConstants.PROFILE_PI_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.PROFILE_PI_FAILURE, error } }
// }
// function getCmcCoinByTickerName() {

//     return dispatch => {
//         dispatch(request());
//         userService.getCmcCoinByTickerName()
//             .then(
//                 users => {
//                     // console.log("ACTION__getCmcCoinByTickerName___getCmcCoinByTickerName::", users);
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.CMC_COIN_BY_TICKER_NAME_REQUEST } }
//     function success(users) { return { type: userConstants.CMC_COIN_BY_TICKER_NAME_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.CMC_COIN_BY_TICKER_NAME_FAILURE, error } }
// }
// function getPrice(priceData) {

//     return dispatch => {
//         dispatch(request());
//         userService.getPrice(priceData)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.PRICE_REQUEST } }
//     function success(users) { return { type: userConstants.PRICE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.PRICE_FAILURE, error } }
// }
// function swapAmount(priceData) {
//     let temp = {
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10
//     }
//     return dispatch => {
//         dispatch(request());
//         userService.swapAmount(priceData)
//             .then(
//                 users => {
//                     let message = users.swapAmount && users.swapAmount.message ? users.swapAmount.message : "NA";
//                     dispatch(success(users));
//                     dispatch(this.getUserDetails());
//                     dispatch(this.getTx(temp));
//                     dispatch(alertActions.success(message));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SWAP_REQUEST } }
//     function success(users) { return { type: userConstants.SWAP_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SWAP_FAILURE, error } }
// }
// function getDocumentList() {

//     return dispatch => {
//         dispatch(request());
//         userService.getDocumentList()
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.USER_DOC_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.USER_DOC_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.USER_DOC_LIST_FAILURE, error } }
// }
// function getCountriesList() {

//     return dispatch => {
//         dispatch(request());
//         userService.getCountriesList()
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.COUNTRY_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.COUNTRY_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.COUNTRY_LIST_FAILURE, error } }
// }
// function getCitiesList(req) {

//     return dispatch => {
//         dispatch(request());
//         userService.getCitiesList(req)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.CITY_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.CITY_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.CITY_LIST_FAILURE, error } }
// }
// function getStatesList(req) {

//     return dispatch => {
//         dispatch(request());
//         userService.getStatesList(req)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.STATES_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.STATES_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.STATES_LIST_FAILURE, error } }
// }
// function getAllCountry() {

//     return dispatch => {
//         dispatch(request());
//         userService.getAllCountry()
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_COUNTRY_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_COUNTRY_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_COUNTRY_FAILURE, error } }
// }
// function getAllState() {

//     return dispatch => {
//         dispatch(request());
//         userService.getAllState()
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_STATE_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_STATE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_STATE_FAILURE, error } }
// }
// function getAllCity() {

//     return dispatch => {
//         dispatch(request());
//         userService.getAllCity()
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_CITY_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_CITY_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_CITY_FAILURE, error } }
// }
// function getKYC() {
//     return dispatch => {
//         dispatch(request());
//         userService.getKYC()
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_KYC_REQUEST } }
//     function success(users) { return { type: userConstants.GET_KYC_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_KYC_FAILURE, error } }
// }
// function saveUserInfo(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveUserInfo(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                     dispatch(this.getUserInfo());

//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_USER_INFO_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_USER_INFO_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_USER_INFO_FAILURE, error } }
// }
// function saveUserPersonalAddr(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveUserPersonalAddr(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                     dispatch(this.getUserInfo());
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_USER_PERSONAL_ADDR_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_USER_PERSONAL_ADDR_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_USER_PERSONAL_ADDR_FAILURE, error } }
// }
// function saveSocialMedia(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveSocialMedia(data)
//             .then(
//                 users => {
//                     // dispatch(this.getKYC());
//                     // dispatch(this.uploadImageClear());
//                     // dispatch(this.uploadImageClearSelfie());
//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                     dispatch(this.getSocialMediaById());
//                     dispatch(this.getUserInfo());

//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_SOCIAL_MEDIA_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_SOCIAL_MEDIA_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_SOCIAL_MEDIA_FAILURE, error } }
// }
// function saveKycDocAadhar(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveKycDocAadhar(data)
//             .then(
//                 users => {
//                     // dispatch(this.uploadImageClearAdhaar());

//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_KYC_DOC_AADHAR_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_KYC_DOC_AADHAR_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_KYC_DOC_AADHAR_FAILURE, error } }
// }
// function saveKycDocPassport(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveKycDocPassport(data)
//             .then(
//                 users => {
//                     // dispatch(this.uploadImageClearPassport());

//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_KYC_DOC_PASSPORT_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_KYC_DOC_PASSPORT_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_KYC_DOC_PASSPORT_FAILURE, error } }
// }
// function saveKycDocSelfie(data) {
//     // console.log("Action____saveKycDocSelfie____data::", data);

//     return dispatch => {
//         dispatch(request());
//         userService.saveKycDocSelfie(data)
//             .then(
//                 users => {
//                     // dispatch(this.uploadImageClearSelfie());

//                     dispatch(success(users));
//                     dispatch(this.createKYC());
//                     // dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_KYC_DOC_SELFIE_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_KYC_DOC_SELFIE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_KYC_DOC_SELFIE_FAILURE, error } }
// }
// function saveKycDocPan(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveKycDocPan(data)
//             .then(
//                 users => {
//                     // dispatch(this.uploadImageClearPan());

//                     dispatch(success(users));
//                     // dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_KYC_DOC_PAN_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_KYC_DOC_PAN_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_KYC_DOC_PAN_FAILURE, error } }
// }
// function saveKycDoc(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveKycDoc(data)
//             .then(
//                 users => {
//                     // dispatch(this.getKYC());
//                     // dispatch(this.uploadImageClear());
//                     // dispatch(this.uploadImageClearSelfie());
//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_KYC_DOC_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_KYC_DOC_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_KYC_DOC_FAILURE, error } }
// }
// function createKYC(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.createKYC(data)
//             .then(
//                 users => {
//                     dispatch(this.getKYC());
//                     dispatch(this.uploadImageClear());
//                     dispatch(this.uploadImageClearSelfie());
//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.USER_KYC_CREATE_REQUEST } }
//     function success(users) { return { type: userConstants.USER_KYC_CREATE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.USER_KYC_CREATE_FAILURE, error } }
// }
// function uploadImagePassport(data) {
//     return dispatch => {
//         userService.uploadImagePassport(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(alertActions.error("File size should not more than 1 mb"));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function success(users) { return { type: userConstants.FILE_UPLOAD_STATUS_PASSPORT_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_PASSPORT_FAILURE, error } }
// }
// function uploadImagePan(data) {
//     return dispatch => {
//         userService.uploadImagePan(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     // dispatch(alertActions.error(error));
//                     dispatch(alertActions.error("File size should not more than 1 mb"));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function success(users) { return { type: userConstants.FILE_UPLOAD_STATUS_PAN_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_PAN_FAILURE, error } }
// }
// function uploadImageAdhaarBack(data) {
//     return dispatch => {
//         userService.uploadImage(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error("File size should not more than 1 mb"));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function success(users) { return { type: userConstants.FILE_UPLOAD_STATUS_ADHAAR_BACK_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_ADHAAR_BACK_FAILURE, error } }
// }
// function uploadImageAdhaar(data) {
//     return dispatch => {
//         userService.uploadImageAdhaar(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     // dispatch(alertActions.error(error));
//                     dispatch(alertActions.error("File size should not more than 1 mb"));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function success(users) { return { type: userConstants.FILE_UPLOAD_STATUS_ADHAAR_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_ADHAAR_FAILURE, error } }
// }
// function uploadImage(data) {
//     return dispatch => {
//         userService.uploadImage(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     // dispatch(alertActions.error(error));
//                     dispatch(alertActions.error("File size should not more than 1 mb"));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function success(users) { return { type: userConstants.FILE_UPLOAD_STATUS_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_FAILURE, error } }
// }
// function uploadImageSelfie(data) {
//     return dispatch => {
//         userService.uploadImage(data)
//             .then(
//                 users => {
//                     // console.log("Action1312 uploadImageSelfie:", users);

//                     dispatch(success(users));
//                 },
//                 error => {
//                     // dispatch(alertActions.error(error));
//                     dispatch(alertActions.error("File size should not more than 1 mb"));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function success(users) { return { type: userConstants.FILE_UPLOAD_SELFIE_STATUS_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.FILE_UPLOAD_SELFIE_STATUS_FAILURE, error } }
// }
// function createTicket(data) {

//     let tempdata = {
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10
//     }

//     return dispatch => {
//         dispatch(request());
//         userService.createTicket(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(this.getTicketList(tempdata));
//                     dispatch(alertActions.success("Success"));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.USER_TICKET_CREATE_REQUEST } }
//     function success(users) { return { type: userConstants.USER_TICKET_CREATE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.USER_TICKET_CREATE_FAILURE, error } }
// }
// function getMakePaymentList(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getMakePaymentList(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_MAKE_PAYMENT_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.GET_MAKE_PAYMENT_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_MAKE_PAYMENT_LIST_FAILURE, error } }
// }
// function getTicketList(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getTicketList(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.USER_TICKET_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.USER_TICKET_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.USER_TICKET_LIST_FAILURE, error } }
// }
// function getINRCoinId(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getINRCoinId(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_INR_COIN_ID_REQUEST } }
//     function success(users) { return { type: userConstants.GET_INR_COIN_ID_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_INR_COIN_ID_FAILURE, error } }
// }
// function getTx(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getTx(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.TX_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.TX_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.TX_LIST_FAILURE, error } }
// }
// function getUserTxListOverFlow(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getUserTxListOverFlow(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.TX_LIST_OVERFLOW_REQUEST } }
//     function success(users) { return { type: userConstants.TX_LIST_OVERFLOW_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.TX_LIST_OVERFLOW_FAILURE, error } }
// }
// function getUserWalletByUserId(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getUserWalletByUserId(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_USER_WALLET_REQUEST } }
//     function success(users) { return { type: userConstants.GET_USER_WALLET_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_USER_WALLET_FAILURE, error } }
// }
// function getTxAllMulti(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getTxAllMulti(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.TX_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.TX_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.TX_LIST_FAILURE, error } }
// }
// function claimPromoPack() {

//     return dispatch => {
//         dispatch(request());
//         userService.claimPromoPack()

//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(this.getUserPromoPackageByUserId());
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.TX_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.TX_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.TX_LIST_FAILURE, error } }
// }
// function getPackageList(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getPackageList(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_PACKAGE_LIST_REQUEST } }
//     function success(users) { return { type: userConstants.GET_PACKAGE_LIST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_PACKAGE_LIST_FAILURE, error } }
// }
// function withdrawBalance(data) {
//     let reqData = {
//         "txType": ['WITHDRAW', 'DEPOSIT'],
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10
//     }
//     return dispatch => {
//         dispatch(request());
//         userService.withdrawBalance(data)

//             .then(
//                 users => {
//                     let message = users.withdrawBalance && users.withdrawBalance.message ? users.withdrawBalance.message : "NA";
//                     dispatch(success(users));
//                     dispatch(alertActions.success(message));
//                     dispatch(this.getTxAllMulti(reqData));
//                     dispatch(this.getDftWallet());
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.WITHDRAW_BALANCE_REQUEST } }
//     function success(users) { return { type: userConstants.WITHDRAW_BALANCE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.WITHDRAW_BALANCE_FAILURE, error } }
// }
// function saveDftWalletAddress(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.saveDftWalletAddress(data)

//             .then(
//                 users => {
//                     let message = users.saveDftWalletAddress && users.saveDftWalletAddress.message ? users.saveDftWalletAddress.message : "NA";
//                     dispatch(success(users));
//                     dispatch(alertActions.success(message));
//                     dispatch(this.getDftWallet());
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_DFT_WALLET_ADDRESS_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_DFT_WALLET_ADDRESS_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_DFT_WALLET_ADDRESS_FAILURE, error } }
// }
// function createUserPromoPackage(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.createUserPromoPackage(data)
//             .then(
//                 users => {
//                     let message = users.createUserPromoPackage && users.createUserPromoPackage.message ? users.createUserPromoPackage.message : "NA";
//                     dispatch(success(users));
//                     dispatch(alertActions.success(message));
//                     // dispatch(this.getDftWallet());
//                     dispatch(this.getUserPromoPackageByUserId());
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.CREATE_USER_PROMO_PACKAGE_REQUEST } }
//     function success(users) { return { type: userConstants.CREATE_USER_PROMO_PACKAGE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.CREATE_USER_PROMO_PACKAGE_FAILURE, error } }
// }
// function getDftWallet() {

//     return dispatch => {
//         dispatch(request());
//         userService.getDftWallet()

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_DFT_WALLET_REQUEST } }
//     function success(users) { return { type: userConstants.GET_DFT_WALLET_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_DFT_WALLET_FAILURE, error } }
// }
// function getUserPromoPackageByUserId() {

//     return dispatch => {
//         dispatch(request());
//         userService.getUserPromoPackageByUserId()

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_USER_PROMO_PACKAGE_BY_USER_ID_REQUEST } }
//     function success(users) { return { type: userConstants.GET_USER_PROMO_PACKAGE_BY_USER_ID_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_USER_PROMO_PACKAGE_BY_USER_ID_FAILURE, error } }
// }
// function transactionSearch(data) {
//     // console.log("11111111111111111111111111111111", data)

//     return dispatch => {
//         dispatch(request());
//         userService.transactionSearch(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                     // // console.log("9999999999999999999999",this.props)
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.TX_LIST_BY_DATE_REQUEST } }
//     function success(users) { return { type: userConstants.TX_LIST_BY_DATE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.TX_LIST_BY_DATE_FAILURE, error } }
// }
// function getBTST(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getBTST(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_BTST_REQUEST } }
//     function success(users) { return { type: userConstants.GET_BTST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_BTST_FAILURE, error } }
// }
// function getSTAKE(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getSTAKE(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     // console.log("i am in action getSTAKE ", users);
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_STAKE_REQUEST } }
//     function success(users) { return { type: userConstants.GET_STAKE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_STAKE_FAILURE, error } }
// }
// function getPackageBTST(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getPackageBTST(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_PACKAGE_BTST_REQUEST } }
//     function success(users) { return { type: userConstants.GET_PACKAGE_BTST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_PACKAGE_BTST_FAILURE, error } }
// }
// function getPackageSTAKE(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getPackageSTAKE(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_PACKAGE_STAKE_REQUEST } }
//     function success(users) { return { type: userConstants.GET_PACKAGE_STAKE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_PACKAGE_STAKE_FAILURE, error } }
// }
// function uploadImageClear() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_CLEAR_SUCCESS, uploadImage } }
// }
// function uploadImageClearPassport() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_CLEAR_PASSPORT_SUCCESS, uploadImage } }
// }
// function uploadImageClearAdhaar() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_CLEAR_ADHAAR_SUCCESS, uploadImage } }
// }
// function uploadImageClearAdhaarBack() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_CLEAR_ADHAAR_BACK_SUCCESS, uploadImage } }
// }
// function uploadImageClearPan() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_CLEAR_PAN_SUCCESS, uploadImage } }
// }
// function uploadImageClearSelfie() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_SELFIE_CLEAR_SUCCESS, uploadImage } }
// }
// function resetUser() {
//     return dispatch => {
//         dispatch(success());
//     };
//     function success() { return { type: userConstants.RESET_USER_REDUX } }
// }
// function swapCoinAmount(data, data1, data2) {
//     return dispatch => {
//         dispatch(request());
//         userService.swapCoinAmount(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(this.getUserWalletByCoinName(data1));
//                     dispatch(this.getPrice(data2));

//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SWAP_COIN_AMOUNT_REQUEST } }
//     function success(users) { return { type: userConstants.SWAP_COIN_AMOUNT_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SWAP_COIN_AMOUNT_FAILURE, error } }
// }
// function getLevelByIdUserTx(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getLevelByIdUserTx(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     // dispatch(userActions.getUserDetails());

//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));

//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_LEVEL_BY_ID_USER_TX_REQUEST } }
//     function success(users) { return { type: userConstants.GET_LEVEL_BY_ID_USER_TX_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_LEVEL_BY_ID_USER_TX_FAILURE, error } }
// }
// function getLevelByIdUserPackage(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getLevelByIdUserPackage(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     // dispatch(userActions.getUserDetails());

//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));

//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_LEVEL_BY_ID_USER_PACKAGE_REQUEST } }
//     function success(users) { return { type: userConstants.GET_LEVEL_BY_ID_USER_PACKAGE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_LEVEL_BY_ID_USER_PACKAGE_FAILURE, error } }
// }
// function getLevelByIdUser(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getLevelByIdUser(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     // dispatch(userActions.getUserDetails());

//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));

//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_LEVEL_BY_ID_USER_REQUEST } }
//     function success(users) { return { type: userConstants.GET_LEVEL_BY_ID_USER_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_LEVEL_BY_ID_USER_FAILURE, error } }
// }
// function getAllLevelMining(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getAllLevelMining(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(userActions.getUserDetails());

//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));

//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_LEVEL_MINING_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_LEVEL_MINING_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_LEVEL_MINING_FAILURE, error } }
// }
// function getAllLevelWelcome(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getAllLevelWelcome(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(userActions.getUserDetails());

//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));

//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_LEVEL_WELCOME_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_LEVEL_WELCOME_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_LEVEL_WELCOME_FAILURE, error } }
// }
// function getCmcCoinList(data) {
//     return dispatch => {
//         dispatch(request());
//         userService.getCmcCoinList(data)
//             .then(
//                 users => {
//                     // console.log("userssssssssssssssss_____", users)
//                     dispatch(success(users))

//                 },
//                 error => {
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_COIN_CMC_REQUEST } }
//     function success(users) { return { type: userConstants.GET_COIN_CMC_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_COIN_CMC_FAILURE, error } }
// }
// function claimAddress(data) {
//     let reqData = {
//         "txType": "WITHDRAW",
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10
//     }
//     return dispatch => {
//         dispatch(request());
//         userService.claimAddress(data)

//             .then(
//                 users => {
//                     let message = users.claimAddress && users.claimAddress.message ? users.claimAddress.message : "NA";
//                     dispatch(success(users));
//                     dispatch(alertActions.success(message));
//                     dispatch(this.getTx(reqData));
//                     dispatch(this.getDftWallet());
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.CLAIM_ADDRESS_REQUEST } }
//     function success(users) { return { type: userConstants.CLAIM_ADDRESS_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.CLAIM_ADDRESS_FAILURE, error } }
// }
// function getUserByRefCode(data) {
//     // console.log("127.0.0.1::", data);
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.getUserByRefCode(data)
//             .then(
//                 user => {
//                     // console.log("ACTION__________getUserByRefCode_______::", user);
//                     dispatch(success(user));

//                     dispatch(alertActions.success(user.getUserByRefCode.message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.GET_USER_BY_REFCODE_REQUEST, user } }
//     function success(user) { return { type: userConstants.GET_USER_BY_REFCODE_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.GET_USER_BY_REFCODE_FAILURE, error } }
// }
// function createMakePayment(data) {
//     let temp = {
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10,
//         "paymentType": ""
//     }
//     return dispatch => {
//         dispatch(request());
//         userService.createMakePayment(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(alertActions.success("Success"));
//                     dispatch(this.uploadImageClear());
//                     dispatch(this.getMakePaymentList(temp));
//                     window.location.reload();
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.CREATE_MAKE_PAYMENT_REQUEST } }
//     function success(users) { return { type: userConstants.CREATE_MAKE_PAYMENT_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.CREATE_MAKE_PAYMENT_FAILURE, error } }
// }
// function getAllCoinIndexByIndexId(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getAllCoinIndexByIndexId(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_COIN_INDEX_BY_INDEX_ID_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_COIN_INDEX_BY_INDEX_ID_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_COIN_INDEX_BY_INDEX_ID_FAILURE, error } }
// }
// function getUserWalletByCoinName(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getUserWalletByCoinName(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_USER_WALLET_BY_COIN_NAME_REQUEST } }
//     function success(users) { return { type: userConstants.GET_USER_WALLET_BY_COIN_NAME_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_USER_WALLET_BY_COIN_NAME_FAILURE, error } }
// }
// function getReferalById(data) {
//     // console.log("Action in getReferalById :", data);
//     return dispatch => {
//         dispatch(request());
//         userService.getReferalById(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_REFERAL_BY_ID_REQUEST } }
//     function success(users) { return { type: userConstants.GET_REFERAL_BY_ID_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_REFERAL_BY_ID_FAILURE, error } }
// }
// function getReferralCountAndSumById(data) {
//     // console.log("Action in getReferralCountAndSumById :", data);
//     return dispatch => {
//         dispatch(request());
//         userService.getReferralCountAndSumById(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                     console.log('action___________', users);
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_REFERAL_COUNT_AND_SUM_REQUEST } }
//     function success(users) { return { type: userConstants.GET_REFERAL_COUNT_AND_SUM_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_REFERAL_COUNT_AND_SUM_FAILURE, error } }
// }
// function getDocumentListObj(data) {

//     return dispatch => {
//         dispatch(request());
//         userService.getDocumentListObj(data)

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_DOCUMENT_LIST_OBJ_REQUEST } }
//     function success(users) { return { type: userConstants.GET_DOCUMENT_LIST_OBJ_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_DOCUMENT_LIST_OBJ_FAILURE, error } }
// }
// function getIndexOrder() {

//     return dispatch => {
//         dispatch(request());
//         userService.getIndexOrder()

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_INDEX_ORDER_REQUEST } }
//     function success(users) { return { type: userConstants.GET_INDEX_ORDER_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_INDEX_ORDER_FAILURE, error } }
// }

// function getAllIndex() {

//     return dispatch => {
//         dispatch(request());
//         userService.getAllIndex()

//             .then(
//                 users => {
//                     dispatch(success(users));
//                 },
//                 error => {
//                     dispatch(alertActions.error(error));
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_ALL_INDEX_REQUEST } }
//     function success(users) { return { type: userConstants.GET_ALL_INDEX_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_ALL_INDEX_FAILURE, error } }
// }
// function saveSTAKE(reqData, temp) {
//     return dispatch => {
//         dispatch(request({ reqData }));
//         userService.saveSTAKE(reqData)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(this.getSTAKE(temp));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_STAKE_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_STAKE_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_STAKE_FAILURE, error } }
// }
// function saveBTST(data, temp) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.saveBTST(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(this.getBTST(temp));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//     function request() { return { type: userConstants.SAVE_BTST_REQUEST } }
//     function success(users) { return { type: userConstants.SAVE_BTST_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.SAVE_BTST_FAILURE, error } }
// }
// function getUserNameVerified(data, temp) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.getUserNameVerified(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     // dispatch(this.getBTST(temp));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//     function request() { return { type: userConstants.GET_USER_NAME_VERIFIED_REQUEST } }
//     function success(users) { return { type: userConstants.GET_USER_NAME_VERIFIED_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GET_USER_NAME_VERIFIED_FAILURE, error } }
// }
// function updatePassword(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.updatePassword(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(alertActions.success(users.userinfo.message));
//                     dispatch(this.getUserDetails());
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request() { return { type: userConstants.UPDATE_PASSWORD_REQUEST } }
//     function success(users) { return { type: userConstants.UPDATE_PASSWORD_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.UPDATE_PASSWORD_FAILURE, error } }
// }
// function changeEmail(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.changeEmail(data)
//             .then(
//                 users => {
//                     dispatch(success(users));
//                     dispatch(alertActions.success(users.changeEmail.message));
//                     dispatch(this.getUserDetails());
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request() { return { type: userConstants.CHANGE_EMAIL_REQUEST } }
//     function success(users) { return { type: userConstants.CHANGE_EMAIL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.CHANGE_EMAIL_FAILURE, error } }
// }
// function updatePasswordValidateOtp(data, props) {
//     // console.log("updatePasswordValidateOtp________ACTION::", data);
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.updatePasswordValidateOtp(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(alertActions.success(user.userinfo.message));
//                     dispatch(this.getUserDetails());
//                     // props.history.push(`/app/dashboard`)
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.UPDATE_PASSWORD_VALIDATE_OTP_REQUEST, user } }
//     function success(user) { return { type: userConstants.UPDATE_PASSWORD_VALIDATE_OTP_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.UPDATE_PASSWORD_VALIDATE_OTP_FAILURE, error } }
// }
// function validateLoginOtp(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.validateLoginOtp(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(alertActions.success(user.userinfo.message));
//                     props.history.push(`/app/dashboard`)
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.VALIDATE_LOGIN_OTP_REQUEST, user } }
//     function success(user) { return { type: userConstants.VALIDATE_LOGIN_OTP_SUCCESS, user } }
//     function failure(user) { return { type: userConstants.VALIDATE_LOGIN_OTP_FAILURE, user } }
// }
// function loginValidateOtp(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.loginValidateOtp(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(alertActions.success(user.userinfo.message));
//                     props.history.push(`/app/dashboard`)
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }
// function getUserListByEmail(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.getUserListByEmail(data)
//             .then(
//                 user => {
//                     // console.log("ACTION____________getUserListByEmail:::", user);
//                     dispatch(success(user));
//                     // dispatch(alertActions.success(user.userinfo.message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.GET_USER_LIST_BY_EMAIL_REQUEST, user } }
//     function success(user) { return { type: userConstants.GET_USER_LIST_BY_EMAIL_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.GET_USER_LIST_BY_EMAIL_FAILURE, error } }
// }
// function createNotification(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.createNotification(data)
//             .then(
//                 user => {
//                     let message = user.userinfo && user.userinfo.message ? user.userinfo.message : "NA";

//                     dispatch(success(user));
//                     dispatch(alertActions.success(message));
//                     window.location.reload();
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.CREATE_NOTIFICATION_REQUEST, user } }
//     function success(user) { return { type: userConstants.CREATE_NOTIFICATION_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.CREATE_NOTIFICATION_FAILURE, error } }
// }
// function forgotPassword(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.forgotPassword(data)
//             .then(
//                 user => {
//                     dispatch(success(user));

//                     dispatch(alertActions.success(user.userinfo.message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.FORGOT_FIRST_REQUEST, user } }
//     function success(user) { return { type: userConstants.FORGOT_FIRST_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.FORGOT_FIRST_FAILURE, error } }
// }
// function register(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.register(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(alertActions.success(user.userinfo.message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.REGISTER_FIRST_REQUEST, user } }
//     function success(user) { return { type: userConstants.REGISTER_FIRST_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.REGISTER_FIRST_FAILURE, error } }
// }
// function sellIndex(data) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.sellIndex(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(this.getAllIndex());
//                     dispatch(this.getCoinBalance());
//                     dispatch(this.getIndexOrder());
//                     dispatch(alertActions.success(user.sellIndex.message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.SELL_INDEX_REQUEST, user } }
//     function success(user) { return { type: userConstants.SELL_INDEX_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.SELL_INDEX_FAILURE, error } }
// }
// function buyIndex(data) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.buyIndex(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(this.getAllIndex());
//                     dispatch(alertActions.success(user.buyIndex.message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.BUY_INDEX_REQUEST, user } }
//     function success(user) { return { type: userConstants.BUY_INDEX_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.BUY_INDEX_FAILURE, error } }
// }
// function sendBalance(data) {
//     let temp = {
//         "txType": ["SEND", "RECEIVED"],
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10
//     }
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.sendBalance(data)
//             .then(
//                 users => {
//                     let message = users.sendBalance && users.sendBalance.message ? users.sendBalance.message : "NA";
//                     dispatch(success(users));
//                     dispatch(this.getUserDetails());
//                     dispatch(this.getTxAllMulti(temp));
//                     dispatch(alertActions.success(message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//     function request(user) { return { type: userConstants.SEND_BALANCE_REQUEST, user } }
//     function success(user) { return { type: userConstants.SEND_BALANCE_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.SEND_BALANCE_FAILURE, error } }
// }
// function sendCoin(data) {
//     let temp = {
//         "keyWord": "",
//         "pageNo": 1,
//         "size": 10
//     }
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.sendCoin(data)
//             .then(
//                 users => {
//                     let message = users.sendCoin && users.sendCoin.message ? users.sendCoin.message : "NA";
//                     dispatch(success(users));
//                     dispatch(this.getUserDetails());
//                     dispatch(this.getTx(temp));
//                     dispatch(alertActions.success(message));
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };
//     function request(user) { return { type: userConstants.SEND_COIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.SEND_COIN_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.SEND_COIN_FAILURE, error } }
// }
// function registerValidateOtp(data, props) {
//     return dispatch => {
//         dispatch(request({ data }));
//         userService.registerValidateOtp(data)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     dispatch(alertActions.success(user.userinfo.message));
//                     props.history.push(`/app/dashboard`)
//                 },
//                 error => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
//     function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
//     function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
// }
