
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const betService = {
    login,
    logout,
    // verifyEmail,
    // loginToThisAccount,
    getAllBet,
    createBet,
    updateBet,
    getBetList,
    deleteBet,
    disableBet,
    getBetById,
    betDepositWithdraw,
    currentBets,
    betHistory,
    unSatteledBet
};
function logout() {
    // localStorage.removeItem('spuser');
    // // window.location.href = "#/login";
    // history.push(`#/login`);
    // window.location.reload();


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
                userinfo: user.data
            }
            if (user.data) {
                localStorage.setItem('spuser', JSON.stringify(user.data));
            }

            return userObj;
        });
}

function getBetList(data) {
    // console.log("data m kya aa rha h::service:::", data);
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getBetList`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                getBetList: data.data
            }
            console.log("i am in service getBetList", userObj);

            return userObj;
        });
}

function currentBets(data) {
    // console.log("data m kya aa rha h::service:::", data);
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/report/current-bets`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                currentBets: data.data
            }
            console.log("i am in service currentBets", userObj);

            return userObj;
        });
}

function betHistory(data) {
    // console.log("data m kya aa rha h::service:::", data);
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/statement`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                betHistory: data.data
            }
            console.log("i am in service betHistory", userObj);

            return userObj;
        });
}

function unSatteledBet(data) {
    // console.log("data m kya aa rha h::service:::", data);
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/my-bet-list`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                unsatteledBet: data.data
            }
            console.log("i am in service unsatteledBet", userObj);

            return userObj;
        });
}

function betDepositWithdraw(data) {
    // console.log("data m kya aa rha h::service:::", data);
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/dwc/bet-deposit-withdraw`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                betDepositWithdraw: data.data
            }
            console.log("i am in service betDepositWithdraw", userObj);

            return userObj;
        });
}
function getAllBet(data) {
    // console.log("data m kya aa rha h::service:::", data);
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getAllBet`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                getAllBet: data.data
            }
            console.log("i am in service getAllBet", userObj);

            return userObj;
        });
}

// function verifyEmail(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/validateOtpAdmin`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 verifyEmail: data.data
//             }
//             console.log("i am in service''...>> verifyEmail ::", userObj);

//             return userObj;
//         });
// }

function deleteBet(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/deleteBet`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                deleteBet: data.data
            }
            console.log("i am in service''...>> deleteBet ::", userObj);

            return userObj;
        });
}

function getBetById(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getBetById`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                getBetById: data.data
            }
            console.log("i am in service''...>> getBetById ::", userObj);

            return userObj;
        });
}
function disableBet(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/updateBetStatus`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                updateBetStatus: data.data
            }
            console.log("i am in service''...>> updateBetStatus ::", userObj);

            return userObj;
        });
}

function updateBet(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/updateBet`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                updateBet: data.data
            }
            console.log("I am in service updateBet", userObj);

            return userObj;
        });
}
function createBet(data, selectedFile) {

    console.log("selectedFile____selectedFile:::", selectedFile);


    let header = new Headers({
        // 'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });

    var event = new FormData();
    event.append('logo', selectedFile, selectedFile.name);
    event.append('appname', data.appname);
    event.append('appurl', data.appurl);
    event.append('lupassword', data.lupassword);

    console.log("SERVICE__APP__formData:::", event);

    const requestOptions = {
        method: "POST",
        headers: header,
        body: event
    }
    return fetch(CONST.BACKEND_URL + `/admin/create-app-detail`, requestOptions)
        .then(handleResponse)
        .then(data => {
            let userObj = {
                createBet: data.data
            }
            console.log("I am in service createBet", userObj);

            return userObj;
        });
}
// function updateUserPasswordSubmit(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/UpdatePasswordUser`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 UpdatePasswordUser: data.data
//             }
//             console.log("I am in service UpdatePasswordUser", userObj);

//             return userObj;
//         });
// }

// function loginToThisAccount(data) {
//     // console.log("data m kya aa rha h::service:::", data);
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/loginToUserAccount`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 loginToThisAccount: data.data
//             }
//             console.log("i am in service loginToThisAccount {{{{{{{}}}}}}}::", userObj);

//             return userObj;
//         });
// }

// function getProfile(data) {
//     // console.log("data m kya aa rha h::service:::", data);
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/getProfile`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 getProfile: data.data
//             }
//             console.log("i am in service loginToThisAccount {{{{{{{}}}}}}}::", userObj);

//             return userObj;
//         });
// }

// function getRestaurant(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/useroverView`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 restaurantDetails: data.data
//             }
//             console.log();

//             return userObj;
//         });
// }
// function getAllNotification(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/getNotificationList`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 listOfNotification: data.data
//             }
//             console.log();

//             return userObj;
//         });
// }
// function updateNotificationStatus(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/updateNotificationStatus`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 listOfNotification: data.data
//             }
//             console.log();

//             return userObj;
//         });
// }
// function createNewUser(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/createNewUser`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 createNewUser: data.data
//             }
//             console.log();

//             return userObj;
//         });
// }
// function deleteUser(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/deleteUser`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 deleteUser: data.data
//             }
//             console.log();

//             return userObj;
//         });
// }

// function addMenu(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/addMenu`, requestOptions)
//         .then(handleResponse)
//         .then(data => {

//             let userObj = {
//                 addMenu: data.data
//             }
//             console.log();

//             return userObj;
//         });
// }

// function addItem(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/addItem`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 addItem: data.data
//             }
//             return userObj;
//         });
// }

// function updatePasswordUser(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/updatePasswordUser`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 addItem: data.data
//             }
//             return userObj;
//         });
// }
// function sendFrom(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/sendFrom`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 addItem: data.data
//             }
//             return userObj;
//         });
// }

// function uploadImage(filedata) {

//     let header = new Headers({
//         "Authorization": authHeader().Authorization
//     });
//     var data = new FormData();
//     data.append('image', filedata);

//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: data
//     }
//     return fetch(CONST.BACKEND_URL + `/uploadFile`, requestOptions)
//         .then(handleResponse)
//         .then(res => {
//             let userObj = {
//                 filesDetails: res.data
//             }
//             return userObj;
//         });
// }

// function onChangeImageFile(filedata,id) {

//     let header = new Headers({
//         "Authorization": authHeader().Authorization
//     });
//     var data = new FormData();
//     data.append('image', filedata);

//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: data
//     }
//     return fetch(CONST.BACKEND_URL + `/uploadFile`, requestOptions)
//         .then(handleResponse)
//         .then(res => {
//             let userObj={
//                 "id": id,
//                 "isAdd": true,
//                 "imageName": res.data.uploadedImageName
//             }
//             console.log("userObj  ",userObj);

//             return this.addOrRemoveImageInRestaurant(userObj)

//         });
// }
// function onChangeImageFileLogo(filedata,id) {
//     let header = new Headers({
//         "Authorization": authHeader().Authorization
//     });
//     var data = new FormData();
//     data.append('image', filedata);
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: data
//     }
//     return fetch(CONST.BACKEND_URL + `/uploadFile`, requestOptions)
//         .then(handleResponse)
//         .then(res => {
//             let userObj={
//                 "restaurantId": id,
//                 "imageName": res.data.uploadedImageName
//             }
//             console.log("userObj  ",userObj);
//             return this.updateRestaurantLogo(userObj)
//         });
// }
// function addOrRemoveImageInRestaurant(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/addOrRemoveImageInRestaurant`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 addImageRestaurant: data.data
//             }
//             return userObj;
//         });
// }
// function updateRestaurantLogo(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/updateRestaurantLogo`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 addImageRestaurant: data.data
//             }
//             return userObj;
//         });
// }
// function deleteItem(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/deleteItem`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 delItem: data.data
//             }
//             return userObj;
//         });
// }
// function disableItem(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/disableItem`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 disableItem: data.data
//             }
//             return userObj;
//         });
// }

// function deleteRestaurant(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/verifyEmail`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 deleteRestaurant: data.data
//             }
//             return userObj;
//     });
// }

// function disableRestaurant(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/disableUser`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 disableRestaurant: data.data
//             }
//             return userObj;
//     });
// }
// function disableCategory(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/disableMenu`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 disableCategory: data.data
//             }
//             return userObj;
//     });
// }
// function deleteCategory(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/deleteMenu`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 deleteCategory: data.data
//             }
//             return userObj;
//     });
// }

// function updateRestaurant(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/updateRestaurant`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 updateRestaurant: data.data
//             }
//             return userObj;
//     });
// }

// function updateCategory(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/updateMenu`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 updateCategory: data.data
//             }
//             return userObj;
//     });
// }


// function updateItem(data) {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header,
//         body: JSON.stringify(data)
//     }
//     return fetch(CONST.BACKEND_URL + `/updateItem`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 updateItem: data.data
//             }
//             return userObj;
//     });
// }

// function statics() {
//     let header = new Headers({
//         'Content-Type': 'application/json',
//         "Authorization": authHeader().Authorization
//     });
//     const requestOptions = {
//         method: "POST",
//         headers: header
//     }
//     return fetch(CONST.BACKEND_URL + `/adminoverView`, requestOptions)
//         .then(handleResponse)
//         .then(data => {
//             let userObj = {
//                 statics: data.data
//             }
//             return userObj;
//         });
// }

function handleResponse(response) {
    // console.log("response22222   ", response);

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            console.log("datadatadata ", response);

            // const error = (data && data.message) || response.statusText;
            return data;
        }
        //console.log("datadatadatadatadata   ", data.error);
        if (data.error) {
            console.log("datadatadatadatadata   ", data);
            if (data.code === 3) {
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}