import { userConstants, betConstants } from '../_constants';
import { userService, betService } from '../_services';
import { alertActions } from './';
// import { toast } from 'react-toastify';
export const betActions = {

    login,
    logout,
    disableBet,
    getAllBet,
    createBet,
    updateBet,
    getBetList,
    deleteBet,
    uploadImageClear,
    getBetById,
    currentBets,
    betHistory,
    unSatteledBet
};
function login(data, props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.login(data)
            .then(
                user => {
                    dispatch(success(user));
                    props.history.push({ pathname: 'app/dashboard' });
                },
                error => {
                    console.log("errorerror ", error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function logout() {
    // userService.logout();
    return { type: userConstants.LOGOUT };
}

function uploadImageClear() {
    return dispatch => {
        dispatch(success());
    };
    function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_CLEAR_SUCCESS, uploadImage } }
}

function createBet(data, selectedFile) {

    return dispatch => {
        dispatch(request());
        betService.createBet(data, selectedFile)
            .then(

                users => {
                    dispatch(alertActions.success("Bet Add Successfully."));
                    dispatch(success(users));
                    // dispatch(this.uploadImageClear());


                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.ADD_BET_REQUEST } }
    function success(users) { return { type: betConstants.ADD_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.ADD_BET_FAILURE, error } }
}
function updateBet(data, paginationData, props) {

    return dispatch => {
        dispatch(request());
        betService.updateBet(data)
            .then(

                users => {
                    dispatch(alertActions.success("Bet Update Successfully."));
                    dispatch(success(users));
                    // dispatch(this.getBetList(paginationData));
                    dispatch(this.uploadImageClear());
                    props.history.push({ pathname: '/app/bet' });


                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.UPDATE_BET_REQUEST } }
    function success(users) { return { type: betConstants.UPDATE_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.UPDATE_BET_FAILURE, error } }
}
function getAllBet(data) {
    // console.log("data m kya aa rha h::action:::", data);
    return dispatch => {
        dispatch(request());
        betService.getAllBet(data)
            .then(
                users => {
                    console.log("getAllBet $$$$ action:", users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.GETALL_BET_REQUEST } }
    function success(users) { return { type: betConstants.GETALL_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.GETALL_BET_FAILURE, error } }
}

function getBetList(data) {
    // console.log("data m kya aa rha h::action:::", data);
    return dispatch => {
        dispatch(request());
        betService.getBetList(data)
            .then(
                users => {
                    console.log("getBetList $$$$ action:", users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.GET_LIST_BET_REQUEST } }
    function success(users) { return { type: betConstants.GET_LIST_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.GET_LIST_BET_FAILURE, error } }
}

function currentBets(data) {
    return dispatch => {
        dispatch(request());
        betService.currentBets(data)
            .then(
                users => {
                    console.log("getBetList $$$$ action:", users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.CURRENT_BETS_REQUEST } }
    function success(users) { return { type: betConstants.CURRENT_BETS_SUCCESS, users } }
    function failure(error) { return { type: betConstants.CURRENT_BETS_FAILURE, error } }
}

function betHistory(data) {
    return dispatch => {
        dispatch(request());
        betService.betHistory(data)
            .then(
                users => {
                    console.log("getBetList $$$$ action:", users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.BET_HISTORY_REQUEST } }
    function success(users) { return { type: betConstants.BET_HISTORY_SUCCESS, users } }
    function failure(error) { return { type: betConstants.BET_HISTORY_FAILURE, error } }
}

function unSatteledBet(data) {
    return dispatch => {
        dispatch(request());
        betService.unSatteledBet(data)
            .then(
                users => {
                    console.log("unSatteledBet $$$$ action:", users);
                    dispatch(success(users));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.UNSATTLED_BET_REQUEST } }
    function success(users) { return { type: betConstants.UNSATTLED_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.UNSATTLED_BET_FAILURE, error } }
}

function deleteBet(data, paginationData) {
    // let reqData = {
    //     "keyWord": "",
    //     "pageNo": 1,
    //     "size": 10
    // }
    return dispatch => {
        dispatch(request());
        betService.deleteBet(data)
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(this.getBetList(paginationData));

                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.DELETE_BET_REQUEST } }
    function success(users) { return { type: betConstants.DELETE_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.DELETE_BET_FAILURE, error } }
}

function getBetById(data) {

    return dispatch => {
        dispatch(request());
        betService.getBetById(data)
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
    function request() { return { type: betConstants.GET_BET_BY_ID_REQUEST } }
    function success(users) { return { type: betConstants.GET_BET_BY_ID_SUCCESS, users } }
    function failure(error) { return { type: betConstants.GET_BET_BY_ID_FAILURE, error } }
}
function disableBet(data, paginationData) {

    return dispatch => {
        dispatch(request());
        betService.disableBet(data)
            .then(
                users => {
                    dispatch(success(users));
                    dispatch(this.getBetList(paginationData));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: betConstants.DISABLE_BET_REQUEST } }
    function success(users) { return { type: betConstants.DISABLE_BET_SUCCESS, users } }
    function failure(error) { return { type: betConstants.DISABLE_BET_FAILURE, error } }
}
