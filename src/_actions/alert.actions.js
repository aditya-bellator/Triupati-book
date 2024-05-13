import { alertConstants } from '../_constants';//Raman
import {  toast } from 'react-toastify';


export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    let messagetest = message.toString();
    toast.success(messagetest,{
        className: 'black-background',
        position: toast.POSITION.TOP_CENTER,
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
      })
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    let messagetest = message.toString();
    toast.error(messagetest)
    return { type: alertConstants.ERROR, message: messagetest };
}

function clear() {
    return { type: alertConstants.CLEAR };
}