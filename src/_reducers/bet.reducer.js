import {
  betConstants
} from '../_constants';

export function bet(state = {}, action) {

  switch (action.type) {
    case betConstants.BET_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.BET_HISTORY_SUCCESS:
      return {
        ...state,
        updateUserSuccess: true,
        loading: false,
        betHistoryItems: action.users.betHistory,
      };
    case betConstants.BET_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.UNSATTLED_BET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.UNSATTLED_BET_SUCCESS:
      return {
        ...state,
        updateUserSuccess: true,
        loading: false,
        unsattledBetItems: action.users.unsatteledBet,
      };
    case betConstants.UNSATTLED_BET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.CURRENT_BETS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.CURRENT_BETS_SUCCESS:
      return {
        ...state,
        updateUserSuccess: true,
        loading: false,
        currentBetsItems: action.users.currentBets,
      };
    case betConstants.CURRENT_BETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.BET_DEPOSIT_WITHDRAW_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.BET_DEPOSIT_WITHDRAW_SUCCESS:
      return {
        ...state,
        updateUserSuccess: true,
        loading: false,
        betDeposit: action.users.betDepositWithdraw,
      };
    case betConstants.BET_DEPOSIT_WITHDRAW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.GET_BET_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.GET_BET_BY_ID_SUCCESS:
      return {
        ...state,
        updateUserSuccess: true,
        loading: false,
        betRowData: action.users.getBetById,
      };
    case betConstants.GET_BET_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.ADD_BET_REQUEST:
      return {
        ...state
      };
    case betConstants.ADD_BET_SUCCESS:
      return {
        ...state,
        addUserSuccess: true
      };
    case betConstants.ADD_BET_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case betConstants.GET_LIST_BET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.GET_LIST_BET_SUCCESS:
      return {
        ...state,
        addUserSuccess: false,
        loading: false,
        items: action.users.getBetList.list,
        total: action.users.getBetList.total
      };
    case betConstants.GET_LIST_BET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.GETALL_BET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.GETALL_BET_SUCCESS:
      return {
        ...state,
        addUserSuccess: false,
        loading: false,
        betItems: action.users.getAllBet,
        betTotal: action.users.getAllBet
      };
    case betConstants.GETALL_BET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case betConstants.UPDATE_BET_REQUEST:
      return {
        ...state
      };
    case betConstants.UPDATE_BET_SUCCESS:
      return {
        ...state,
        addUserSuccess: true
      };
    case betConstants.UPDATE_BET_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case betConstants.DELETE_BET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.DELETE_BET_SUCCESS:
      return {
        ...state,
        addUserSuccess: false,
        loading: false,
      };
    case betConstants.DELETE_BET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case betConstants.DISABLE_BET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case betConstants.DISABLE_BET_SUCCESS:
      return {
        ...state,
        addUserSuccess: false,
        loading: false,
      };
    case betConstants.DISABLE_BET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };




    default:
      return state
  }
}