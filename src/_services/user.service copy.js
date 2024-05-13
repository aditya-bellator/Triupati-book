
import { authHeader,history } from '../_helpers';
import { CONST } from '../_config';

export const userService = {
    swapAmount,
    sendCoin,
    getPrice,
    getTicketList,
    getTx,
    createTicket,
    createKYC,
    getDocumentList,
    login,
    loginValidateOtp,
    registerValidateOtp,
    forgotPassword,
    sendOtpTX,
    sendFromWithOTP,
    resendVerificationLink,
    register,
    logout,
    sendFrom,
    getUserDetails,
    verifyEmail,
    createNotification,
    validateId,
    forgotUpdatePassword,

    addUser,
    uploadImage,
    statics,
    disableUser,
    updateUser,
    deleteUser,
    
    updatePassword
};
function logout() {
    window.sessionStorage.removeItem('user');
}
function onerrorlogout() {
    window.sessionStorage.removeItem('user');
    history.push(`#/login`);
    window.location.reload();
}
function login(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/login`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                if (user.data) {
                    window.sessionStorage.setItem('user', JSON.stringify(user.data));
                }
                
                return userObj;
            });
}
function loginValidateOtp(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/loginValidateOtp`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                if (user.data) {
                    window.sessionStorage.setItem('user', JSON.stringify(user.data));
                }
                
                return userObj;
            });
}
function registerValidateOtp(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/validateOtp`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                if (user.data) {
                    window.sessionStorage.setItem('user', JSON.stringify(user.data));
                }
                
                return userObj;
            });
}
function verifyEmail(data) {

        const requestOptions = {
            method: "GET",
        }
        return fetch(CONST.BACKEND_URL + `/verifyEmail?id=${data.id}&token=${data.token}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                return userObj;
            });
}
function validateId(data) {
        const requestOptions = {
            method: "GET",
        }
        return fetch(CONST.BACKEND_URL + `/validateId?id=${data.id}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfotoken: user.data
                }
                return userObj;
            });
}

function forgotPassword(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/forgotPassword`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                return userObj;
        });
}


function resendVerificationLink(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/resendVerificationLink`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                return userObj;
        });
}
function createNotification(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/createNotification`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                return userObj;
        });
}
function register(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/register`, requestOptions)
            .then(handleResponse)
            .then(user => {
                // console.log("lllllllllllllllllllllllllllllllllllllUser::::::::;;; ",user);
                let userObj = {
                    userinfo: user
                }
                return userObj;
            });
}

function sendCoin(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/sendCoin`, requestOptions)
            .then(handleResponse)
            .then(user => {
                // console.log("lllllllllllllllllllllllllllllllllllllUser::::::::;;; ",user);
                let userObj = {
                    sendCoin: user
                }
                return userObj;
            });
}
function forgotUpdatePassword(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/forgotUpdatePassword`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                return userObj;
            });
}
function getUserDetails(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getProfile`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                getUserDetails: data.data
            }
            //// console.log();
            return userObj;
        });
}
function getPrice(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getPrice`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                getPrice: data.data
            }
            //// console.log();
            return userObj;
        });
}
function swapAmount(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/swapAmount`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                swapAmount: data
            }
            //// console.log();
            return userObj;
        });
}

function getDocumentList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getDocumentList`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                getDocDetails: data.data
            }
            //// console.log();
            return userObj;
        });
}
function createKYC(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/createKYC`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                kycData: data.data
            }
            //// console.log();
            return userObj;
        });
}
function createTicket(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/createTicket`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                ticketData: data.data
            }
            //// console.log();
            return userObj;
        });
}

function getTicketList(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getTicketList`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                ticketlistData: data.data
            }
            return userObj;
        });
}

function getTx(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getTx`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                txlistData: data.data
            }
            return userObj;
        });
}


function sendFrom(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/sendFrom`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user.data
                }
                return userObj;
            });
}
function sendFromWithOTP(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/sendFromWithOTP`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user.data
                }
                return userObj;
            });
}
function sendOtpTX(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/sendOtpTX`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user
                }
                return userObj;
            });
}

function addUser(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/addUser`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                addUser: data.data
            }
            // console.log();
            
            return userObj;
        });
}
function disableUser(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/disableUser`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                addUser: data.data
            }
            // console.log();
            
            return userObj;
        });
}
function deleteUser(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/deleteUser`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                addUser: data.data
            }
            // console.log();
            
            return userObj;
        });
}
function updatePassword(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/updatepassword`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                addUser: data.data
            }
            // console.log();
            
            return userObj;
        });
}


function updateUser(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/updateUser`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                addUser: data.data
            }
            // console.log();
            
            return userObj;
        });
}
function uploadImage(filedata) {

    let header = new Headers({
        "Authorization": authHeader().Authorization
    });
    var data = new FormData();
    data.append('image', filedata);

    const requestOptions = {
        method: "POST",
        headers: header,
        body: data
    }
    return fetch(CONST.BACKEND_URL + `/uploadFile`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                filesDetails: res.data
            }
            return userObj;
        });
}
function statics() {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header
    }
    return fetch(CONST.BACKEND_URL + `/statics`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                statics: data.data
            }
            return userObj;
        });
}
function handleResponse(response) {
   // // console.log("response22222   ", response);

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (data.error) {
            // console.log("datadatadatadatadata   ", data);
            if (data.code===3) {
                onerrorlogout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}