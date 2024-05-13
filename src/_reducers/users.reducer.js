import {
  userConstants
} from '../_constants';

export function users(state = {}, action) {

  switch (action.type) {

    case userConstants.GET_COIN_BALANCE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_COIN_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        getCoinBalanceData: action.users.getCoinBalance

      };
    case userConstants.GET_COIN_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.UPDATE_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        // isProfileUpdated: true,
        updateUserInfo: action.users.updateUserInfo
      };
    case userConstants.UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        withdrawBalanceSuccess: false,
        sendBalanceSuccess: false,
        otpSentUpdatePass: false,
        isDisabledPersonal: false,
        sendCoinSuccess: false,
        swapCoinSuccess: false,
        sendCoinTXOTPSuccess: false,
        overview: action.users.getUserDetails,
        // settingOverview: action.users.getUserDetails.setting,
        // userOverview: action.users.getUserDetails.user,
        // walletOverview: action.users.getUserDetails.wallet
      };
    case userConstants.USER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        getUserInfo: action.users.userInformation
      };
    case userConstants.GET_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_GAME_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_GAME_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        game_login: action.users.game_login

      };
    case userConstants.GET_GAME_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_GAME_LOBBY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_GAME_LOBBY_SUCCESS:
      return {
        ...state,
        loading: false,
        game_lobby: action.users.game_lobby

      };
    case userConstants.GET_GAME_LOBBY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.UPDATE_INFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.UPDATE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        updatePassSuccess: true,
        update_Info: action.users.update_Info
      };
    case userConstants.UPDATE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_GAMES_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_GAMES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        updatePassSuccess: false,
        games_list: action.users.games_list

      };
    case userConstants.GET_GAMES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_MY_BET_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_MY_BET_LIST_SUCCESS:
      return {
        ...state,
        betListSuccess: true,
        loading: false,
        currentBetsList: action.users.currentBetsList

      };
    case userConstants.GET_MY_BET_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case userConstants.GET_WALLET_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_WALLET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        getBetsListData: action.users.getBetsList,
        betsLength: action.users.MatchAndBetfairLength,
        fancyBetLength: action.users.MatchFancyLength

      };
    case userConstants.GET_WALLET_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.SAVE_BET_REQUEST:
      return {
        ...state,
        loadingBetPlace: true
      };
    case userConstants.SAVE_BET_SUCCESS:
      return {
        ...state,
        loadingBetPlace: false,
      };
    case userConstants.SAVE_BET_FAILURE:
      return {
        ...state,
        loadingBetPlace: false,
        error: action.error
      };
    case userConstants.SAVE_FANCY_BET_REQUEST:
      return {
        ...state,
        loadingBetPlace: true
      };
    case userConstants.SAVE_FANCY_BET_SUCCESS:
      return {
        ...state,
        loadingBetPlace: false,
      };
    case userConstants.SAVE_FANCY_BET_FAILURE:
      return {
        ...state,
        loadingBetPlace: false,
        error: action.error
      };
    case userConstants.GET_SCORE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_SCORE_SUCCESS:
      return {
        ...state,
        loading: false,
        matchScoreDDD: action.users.getScore

      };
    case userConstants.GET_SCORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_EVENT_SESSION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_EVENT_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        matchSession: action.users.event_session,
        overByOver_session: action.users.overByOver_ssn,
        ballByBall_session: action.users.ballByBall_ssn,
        normal_session: action.users.normal_ssn

      };
    case userConstants.GET_EVENT_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_EVENT_FOOTBALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_EVENT_FOOTBALL_SUCCESS:
      return {
        ...state,
        loading: false,
        addUserSuccess: true,
        eventDetals: action.users.event_detals

      };
    case userConstants.GET_EVENT_FOOTBALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_EVENT_TENNIS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_EVENT_TENNIS_SUCCESS:
      return {
        ...state,
        loading: false,
        addUserSuccess: true,
        eventDetals: action.users.event_detals

      };
    case userConstants.GET_EVENT_TENNIS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_EVENT_DETALS_REQUEST:
      return {
        ...state,
        // loading: true
      };
    case userConstants.GET_EVENT_DETALS_SUCCESS:
      return {
        ...state,
        // loading: false,
        addUserSuccess: true,
        eventDetals: action.users.event_detals

      };
    case userConstants.GET_EVENT_DETALS_FAILURE:
      return {
        ...state,
        // loading: false,
        error: action.error
      };
    case userConstants.SINGLE_CLICK_UPDATE_AMOUNT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.SINGLE_CLICK_UPDATE_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        userStack: action.users.single_click_update_amount

      };
    case userConstants.SINGLE_CLICK_UPDATE_AMOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_EVENT_GAME_SPORT_ID_WISE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_EVENT_GAME_SPORT_ID_WISE_SUCCESS:
      return {
        ...state,
        loading: false,
        matchListSportIdWise: action.users.event_game_SportIdWise

      };
    case userConstants.GET_EVENT_GAME_SPORT_ID_WISE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_GAME_EVENT_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_GAME_EVENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        game_event_list: action.users.game_event_list

      };
    case userConstants.GET_GAME_EVENT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case userConstants.GET_EVENT_GAMES_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_EVENT_GAMES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        event_game_list: action.users.event_game_list

      };
    case userConstants.GET_EVENT_GAMES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };



    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





















































































    // case userConstants.CHANGE_EMAIL_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CHANGE_EMAIL_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     changeEmail: action.users.changeEmail.data,
    //     otpSentUpdatePass: true
    //   };
    // case userConstants.CHANGE_EMAIL_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_USER_PROMO_PACKAGE_BY_USER_ID_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_USER_PROMO_PACKAGE_BY_USER_ID_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     userPromoPackage: action.users.getUserPromoPackage,
    //   };
    // case userConstants.GET_USER_PROMO_PACKAGE_BY_USER_ID_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };


    // case userConstants.GET_ALL_LEVEL_MINING_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_ALL_LEVEL_MINING_SUCCESS:
    //   return {
    //     ...state,
    //     getAllLevelMining: action.users.getAllLevelMining,
    //     txTotal: action.users.getAllLevelMining.total,

    //   };
    // case userConstants.GET_ALL_LEVEL_MINING_FAILURE:
    //   return {
    //     ...state,
    //     error: action.error
    //   };

    // case userConstants.GET_LEVEL_BY_ID_USER_TX_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_LEVEL_BY_ID_USER_TX_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getLevelByIdUserTx: action.users.getLevelByIdUserTx.list,
    //     getLevelByIdUserTxTotal: action.users.getLevelByIdUserTx.total,

    //   };
    // case userConstants.GET_LEVEL_BY_ID_USER_TX_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };



    // case userConstants.GET_LEVEL_BY_ID_USER_PACKAGE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_LEVEL_BY_ID_USER_PACKAGE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getLevelByIdUserPackage: action.users.getLevelByIdUserPackage.list,
    //     getLevelByIdUserPackageTotal: action.users.getLevelByIdUserPackage.total,

    //   };
    // case userConstants.GET_LEVEL_BY_ID_USER_PACKAGE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };


    // case userConstants.GET_LEVEL_BY_ID_USER_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_LEVEL_BY_ID_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getLevelByIdUser: action.users.getLevelByIdUser.list,
    //     txTotal: action.users.getLevelByIdUser.total,

    //   };
    // case userConstants.GET_LEVEL_BY_ID_USER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };


    // case userConstants.GET_ALL_LEVEL_WELCOME_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_ALL_LEVEL_WELCOME_SUCCESS:
    //   return {
    //     ...state,
    //     getAllLevelWelcome: action.users.getAllLevelWelcome,
    //     txTotal: action.users.getAllLevelWelcome.total,

    //   };
    // case userConstants.GET_ALL_LEVEL_WELCOME_FAILURE:
    //   return {
    //     ...state,
    //     error: action.error
    //   };



    // case userConstants.CREATE_NOTIFICATION_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CREATE_NOTIFICATION_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    // case userConstants.CREATE_NOTIFICATION_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_COIN_CMC_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_COIN_CMC_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     cmcCoinItem: action.users.cmcCoinData.list,
    //     cmcCoinTotal: action.users.cmcCoinData.total,
    //   };
    // case userConstants.GET_COIN_CMC_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_USER_LIST_BY_EMAIL_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_USER_LIST_BY_EMAIL_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     userListByEmailItems: action.user.getUserListByEmail.data,
    //   };
    // case userConstants.GET_USER_LIST_BY_EMAIL_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.WITHDRAW_BALANCE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.WITHDRAW_BALANCE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     withdrawBalanceSuccess: true,
    //   };
    // case userConstants.WITHDRAW_BALANCE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.CLAIM_ADDRESS_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CLAIM_ADDRESS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     withdrawBalanceSuccess: true,
    //   };
    // case userConstants.CLAIM_ADDRESS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.CREATE_USER_PROMO_PACKAGE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CREATE_USER_PROMO_PACKAGE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     buyPromoPackage: true,
    //   };
    // case userConstants.CREATE_USER_PROMO_PACKAGE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.SAVE_DFT_WALLET_ADDRESS_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_DFT_WALLET_ADDRESS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     withdrawBalanceSuccess: true,
    //     // userPackages: action.users.getUserPackages,
    //   };
    // case userConstants.SAVE_DFT_WALLET_ADDRESS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_DFT_WALLET_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_DFT_WALLET_SUCCESS:
    //   return {
    //     ...state,
    //     isTicketCreated: false,
    //     withdrawBalanceSuccess: false,
    //     addUserSuccess: false,
    //     loading: false,
    //     getDftWalletItems: action.users.getDftWallet,
    //   };
    // case userConstants.GET_DFT_WALLET_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_USER_BY_REFCODE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_USER_BY_REFCODE_SUCCESS:
    //   return {
    //     ...state,
    //     isTicketCreated: false,
    //     addUserSuccess: false,
    //     loading: false,
    //     userByRefCode: action.user.getUserByRefCode,
    //   };
    // case userConstants.GET_USER_BY_REFCODE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_PACKAGE_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_PACKAGE_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     packageList: action.users.getPackageList.list,
    //   };
    // case userConstants.GET_PACKAGE_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.CMC_COIN_BY_TICKER_NAME_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CMC_COIN_BY_TICKER_NAME_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     CoinByTickerName: action.users.getCmcCoinByTickerName,
    //   };
    // case userConstants.CMC_COIN_BY_TICKER_NAME_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.PROFILE_PI_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.PROFILE_PI_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     piItem: action.users.getProfileDataPi,
    //   };
    // case userConstants.PROFILE_PI_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_USER_NAME_VERIFIED_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_USER_NAME_VERIFIED_SUCCESS:
    //   return {
    //     ...state,
    //     // isTicketCreated: false,
    //     // addUserSuccess: false,
    //     loading: false,
    //     isVerifyUserName: true,
    //     getUserNameVerified: action.users.getUserNameVerified,
    //   };
    // case userConstants.GET_USER_NAME_VERIFIED_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.SAVE_SOCIAL_MEDIA_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_SOCIAL_MEDIA_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isDisabledPersonal: true
    //   };
    // case userConstants.SAVE_SOCIAL_MEDIA_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.SAVE_USER_PERSONAL_ADDR_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_USER_PERSONAL_ADDR_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isDisabledPersonal: true,
    //     isDisabledAddress: true
    //   };
    // case userConstants.SAVE_USER_PERSONAL_ADDR_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_REFERAL_BY_ID_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_REFERAL_BY_ID_SUCCESS:
    //   return {
    //     ...state,
    //     // isTicketCreated: false,
    //     // addUserSuccess: false,
    //     loading: false,
    //     referalItems: action.users.getReferalById,
    //   };
    // case userConstants.GET_REFERAL_BY_ID_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_REFERAL_COUNT_AND_SUM_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_REFERAL_COUNT_AND_SUM_SUCCESS:
    //   return {
    //     ...state,
    //     // isTicketCreated: false,
    //     // addUserSuccess: false,
    //     loading: false,
    //     referalCountSum: action.users.getReferralCountAndSumById,
    //   };
    // case userConstants.GET_REFERAL_COUNT_AND_SUM_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_MAKE_PAYMENT_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_MAKE_PAYMENT_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     isTicketCreated: false,
    //     addUserSuccess: false,
    //     loading: false,
    //     paymentList: action.users.getMakePaymentList.list,
    //     total: action.users.getMakePaymentList.total,
    //   };
    // case userConstants.GET_MAKE_PAYMENT_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.CREATE_MAKE_PAYMENT_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CREATE_MAKE_PAYMENT_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: true,
    //     loading: false,
    //     createMakePayment: action.users.createMakePayment

    //   };
    // case userConstants.CREATE_MAKE_PAYMENT_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_INR_COIN_ID_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_INR_COIN_ID_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: false,
    //     loading: false,
    //     getINRCoinId: action.users.getINRCoinId

    //   };
    // case userConstants.GET_INR_COIN_ID_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_ALL_COIN_INDEX_BY_INDEX_ID_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_ALL_COIN_INDEX_BY_INDEX_ID_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: false,
    //     loading: false,
    //     allCoinIndexByIndexId: action.users.getAllCoinIndexByIndexIdData

    //   };
    // case userConstants.GET_ALL_COIN_INDEX_BY_INDEX_ID_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_ALL_CITY_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_ALL_CITY_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: false,
    //     loading: false,
    //     getAllCity: action.users.getAllCity

    //   };
    // case userConstants.GET_ALL_CITY_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_ALL_STATE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_ALL_STATE_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: false,
    //     loading: false,
    //     getAllState: action.users.getAllState

    //   };
    // case userConstants.GET_ALL_STATE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_ALL_COUNTRY_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_ALL_COUNTRY_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: false,
    //     loading: false,
    //     getAllCountry: action.users.getAllCountry

    //   };
    // case userConstants.GET_ALL_COUNTRY_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.CREATE_WALLET_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CREATE_WALLET_SUCCESS:
    //   return {
    //     ...state,
    //     addUserSuccess: false,
    //     loading: false,
    //   };
    // case userConstants.CREATE_WALLET_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SELL_INDEX_REQUEST:
    //   return {
    //     ...state,
    //     // loading: true
    //   };
    // case userConstants.SELL_INDEX_SUCCESS:
    //   return {
    //     ...state,
    //     // loading: false,
    //     sendCoinSuccess: true,
    //     sellIndexData: action.user.sellIndex

    //   };
    // case userConstants.SELL_INDEX_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.GET_INDEX_ORDER_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_INDEX_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getIndexOrderData: action.users.getIndexOrder

    //   };
    // case userConstants.GET_INDEX_ORDER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.BUY_INDEX_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.BUY_INDEX_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     sendCoinSuccess: true,
    //     // getAllIndexData: action.users.getAllIndex

    //   };
    // case userConstants.BUY_INDEX_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.GET_ALL_INDEX_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     sendCoinSuccess: false
    //   };
    // case userConstants.GET_ALL_INDEX_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getAllIndexData: action.users.getAllIndex

    //   };
    // case userConstants.GET_ALL_INDEX_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };



    // case userConstants.SAVE_KYC_DOC_SELFIE_REQUEST:
    //   return {
    //     ...state,
    //     saveKycDocSelfieSuccess: false,
    //     loading: true
    //   };
    // case userConstants.SAVE_KYC_DOC_SELFIE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocSelfieSuccess: true,
    //     saveKycDocSelfieData: action.users.saveKycDocSelfieData

    //   };
    // case userConstants.SAVE_KYC_DOC_SELFIE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocSelfieSuccess: false,
    //     error: action.error
    //   };

    // case userConstants.SAVE_KYC_DOC_PASSPORT_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_KYC_DOC_PASSPORT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocPassportData: action.users.saveKycDocPassportData

    //   };
    // case userConstants.SAVE_KYC_DOC_PASSPORT_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SAVE_KYC_DOC_PAN_REQUEST:
    //   return {
    //     ...state,
    //     saveKycDocPanSuccess: false,
    //     loading: true
    //   };
    // case userConstants.SAVE_KYC_DOC_PAN_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocPanSuccess: true,
    //     saveKycDocPanData: action.users.saveKycDocPanData

    //   };
    // case userConstants.SAVE_KYC_DOC_PAN_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocPanSuccess: false,
    //     error: action.error
    //   };

    // case userConstants.SAVE_KYC_DOC_AADHAR_REQUEST:
    //   return {
    //     ...state,
    //     saveKycDocAadharSuccess: false,
    //     loading: true
    //   };
    // case userConstants.SAVE_KYC_DOC_AADHAR_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocAadharSuccess: true,
    //     saveKycDocAadharData: action.users.saveKycDocAadharData

    //   };
    // case userConstants.SAVE_KYC_DOC_AADHAR_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocAadharSuccess: false,
    //     error: action.error
    //   };

    // case userConstants.SAVE_KYC_DOC_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_KYC_DOC_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     saveKycDocData: action.users.saveKycDocData

    //   };
    // case userConstants.SAVE_KYC_DOC_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.GET_DOCUMENT_LIST_OBJ_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_DOCUMENT_LIST_OBJ_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getDocumentListObjData: action.users.getDocumentListObjData

    //   };
    // case userConstants.GET_DOCUMENT_LIST_OBJ_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SAVE_USER_INFO_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_USER_INFO_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isProfileUpdated: true,
    //     isDisabledPersonal: true,
    //     saveUserInfoData: action.users.saveUserInfoData

    //   };
    // case userConstants.SAVE_USER_INFO_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SAVE_STAKE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_STAKE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isStakeCreated: true,

    //   };
    // case userConstants.SAVE_STAKE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.SAVE_BTST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SAVE_BTST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isTicketCreated: true,

    //   };
    // case userConstants.SAVE_BTST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.USER_TICKET_CREATE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.USER_TICKET_CREATE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isTicketCreated: true
    //   };
    // case userConstants.USER_TICKET_CREATE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };





    // case userConstants.UPDATE_PASSWORD_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.UPDATE_PASSWORD_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     // isPasswordUpdate: true,
    //     upadatePassDetails: action.users.userinfo.data,
    //     otpSentUpdatePass: true
    //   };
    // case userConstants.UPDATE_PASSWORD_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

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
    //     otpSent: false
    //   };
    // case userConstants.UPDATE_PASSWORD_VALIDATE_OTP_FAILURE:
    //   return { ...state };


    // case userConstants.GETALL_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GETALL_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     items: action.users.listOfRestaurant.list,
    //     total: action.users.listOfRestaurant.total
    //   };
    // case userConstants.GETALL_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };


    // case userConstants.TOKEN_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.TOKEN_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     userinfotoken: action.users.userinfotoken
    //   };
    // case userConstants.TOKEN_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };


    // case userConstants.USER_TICKET_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.USER_TICKET_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     isTicketCreated: false,
    //     addUserSuccess: false,
    //     loading: false,
    //     ticketList: action.users.ticketlistData.list,
    //     ticketTotal: action.users.ticketlistData.total,
    //   };
    // case userConstants.USER_TICKET_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.TX_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     withdrawBalanceSuccess: false
    //   };
    // case userConstants.TX_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     withdrawBalanceSuccess: false,
    //     addUserSuccess: false,
    //     sendBalanceSuccess: false,
    //     txList: action.users.txlistData.list,
    //     txTotal: action.users.txlistData.total,
    //     getUserNameVerified: {}

    //   };
    // case userConstants.TX_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.TX_LIST_OVERFLOW_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     withdrawBalanceSuccess: false
    //   };
    // case userConstants.TX_LIST_OVERFLOW_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     withdrawBalanceSuccess: false,
    //     addUserSuccess: false,
    //     sendBalanceSuccess: false,
    //     overflowTxList: action.users.getUserTxListOverFlow.list,
    //     overflowTxTotal: action.users.getUserTxListOverFlow.total,
    //     // getUserNameVerified: {}

    //   };
    // case userConstants.TX_LIST_OVERFLOW_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.GET_USER_WALLET_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     withdrawBalanceSuccess: false
    //   };
    // case userConstants.GET_USER_WALLET_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     userWalletData: action.users.getUserWalletByUserId,
    //   };
    // case userConstants.GET_USER_WALLET_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.TX_LIST_BY_DATE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.TX_LIST_BY_DATE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     txList: action.users.txlistDataByDate.list,
    //     txTotal: action.users.txlistDataByDate.total,
    //   };
    // case userConstants.TX_LIST_BY_DATE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_BTST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_BTST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     getbtstList: action.users.getbtstlistData.data.list,
    //     getbtstTotal: action.users.getbtstlistData.data.total,
    //   };
    // case userConstants.GET_BTST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_STAKE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_STAKE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     isStakeCreated: false,
    //     getstaketList: action.users.getSTAKElistData.data.list,
    //     getstakeTotal: action.users.getSTAKElistData.data.total,
    //   };
    // case userConstants.GET_STAKE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_PACKAGE_BTST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_PACKAGE_BTST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     getPackagebtstList: action.users.getPackageBTST.data,

    //   };
    // case userConstants.GET_PACKAGE_BTST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.GET_PACKAGE_STAKE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GET_PACKAGE_STAKE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     addUserSuccess: false,
    //     getPackageSTAKEList: action.users.getPackageSTAKE.data,

    //   };
    // case userConstants.GET_PACKAGE_STAKE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SEND_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SEND_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     sendCoinSuccess: true,
    //   };
    // case userConstants.SEND_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SEND_OTP_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SEND_OTP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     sendCoinTXOTPSuccess: true,
    //   };
    // case userConstants.SEND_OTP_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };



    // case userConstants.SOCIAL_DETAILS_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SOCIAL_DETAILS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     // isDisabledSocialMedia: false,
    //     // isDisabledPersonal: true,
    //     getSocialMediaById: action.users.getSocialMediaById
    //   };
    // case userConstants.SOCIAL_DETAILS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.PRICE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.PRICE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     priceDeta: action.users.getPrice
    //   };
    // case userConstants.PRICE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SWAP_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SWAP_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     swapCoinSuccess: true,
    //   };
    // case userConstants.SWAP_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SEND_BALANCE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SEND_BALANCE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     sendBalanceSuccess: true,
    //   };
    // case userConstants.SEND_BALANCE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.SEND_COIN_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SEND_COIN_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     sendCoinSuccess: true,
    //   };
    // case userConstants.SEND_COIN_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.FILE_UPLOAD_STATUS_PASSPORT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     passportFilesDetails: action.users.passportFilesDetails
    //   };
    // case userConstants.FILE_UPLOAD_CLEAR_PASSPORT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     passportFilesDetails: null
    //   };
    // case userConstants.FILE_UPLOAD_STATUS_PASSPORT_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   };

    // case userConstants.FILE_UPLOAD_STATUS_PAN_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     panFilesDetails: action.users.panFilesDetails
    //   };
    // case userConstants.FILE_UPLOAD_CLEAR_PAN_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     panFilesDetails: null
    //   };
    // case userConstants.FILE_UPLOAD_STATUS_PAN_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   };

    // case userConstants.FILE_UPLOAD_STATUS_ADHAAR_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     adhaarFilesDetails: action.users.adhaarFilesDetails
    //   };
    // case userConstants.FILE_UPLOAD_CLEAR_ADHAAR_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     adhaarFilesDetails: null
    //   };
    // case userConstants.FILE_UPLOAD_STATUS_ADHAAR_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   };

    // case userConstants.FILE_UPLOAD_STATUS_ADHAAR_BACK_REQUEST:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    // case userConstants.FILE_UPLOAD_STATUS_ADHAAR_BACK_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     adhaarFilesDetailsBack: action.users.filesDetails
    //   };
    // case userConstants.FILE_UPLOAD_STATUS_ADHAAR_BACK_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   };
    // case userConstants.FILE_UPLOAD_CLEAR_ADHAAR_BACK_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     adhaarFilesDetailsBack: null
    //   };

    // case userConstants.FILE_UPLOAD_STATUS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     filesDetails: action.users.filesDetails
    //   };
    // case userConstants.FILE_UPLOAD_CLEAR_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     filesDetails: null
    //   };
    // case userConstants.FILE_UPLOAD_STATUS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   };

    // case userConstants.FILE_UPLOAD_SELFIE_STATUS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     filesDetailsSelfie: action.users.filesDetails,
    //     isKYCCreated: true,
    //   };
    // case userConstants.FILE_UPLOAD_SELFIE_CLEAR_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     filesDetailsSelfie: null
    //   };
    // case userConstants.FILE_UPLOAD_SELFIE_STATUS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   };


    // case userConstants.USER_DOC_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.USER_DOC_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     docList: action.users.getDocDetails
    //   };
    // case userConstants.USER_DOC_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.GET_KYC_REQUEST:
    //   return {
    //     ...state,
    //     isKYCCreated: false,
    //     loading: true
    //   };
    // case userConstants.GET_KYC_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     kycData: action.users.getKYC
    //   };
    // case userConstants.GET_KYC_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.USER_KYC_CREATE_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.USER_KYC_CREATE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isKYCCreated: true,
    //   };
    // case userConstants.USER_KYC_CREATE_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };




    // case userConstants.GETALL_USER_NOTIFY_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.GETALL_USER_NOTIFY_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     listOfNotification: action.users.listOfNotification.list,
    //     listOfNotificationtotal: action.users.listOfNotification.total
    //   };
    // case userConstants.GETALL_USER_NOTIFY_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.UPDATE_USER_NOTIFY_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.UPDATE_USER_NOTIFY_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false
    //   };
    // case userConstants.UPDATE_USER_NOTIFY_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };

    // case userConstants.STATS_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.STATS_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     statics: action.users.statics
    //   };
    // case userConstants.STATS_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.RESET_USER_REDUX:
    //   return {
    //   };






    // case userConstants.SWAP_COIN_AMOUNT_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.SWAP_COIN_AMOUNT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     swapCoinAmountSuccess: true
    //   };
    // case userConstants.SWAP_COIN_AMOUNT_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };





    // case userConstants.GET_USER_WALLET_BY_COIN_NAME_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     swapCoinAmountSuccess: false
    //   };
    // case userConstants.GET_USER_WALLET_BY_COIN_NAME_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     getUserWalletByCoinNameSuccess: true,
    //     getUserWalletByCoinNameData: action.users.getUserWalletByCoinNameData

    //   };
    // case userConstants.GET_USER_WALLET_BY_COIN_NAME_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.COUNTRY_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.COUNTRY_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     countryList: action.users.getCountriesList.list
    //   };
    // case userConstants.COUNTRY_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.CITY_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.CITY_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     cityList: action.users.getCityDetails
    //   };
    // case userConstants.CITY_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };
    // case userConstants.STATES_LIST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case userConstants.STATES_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     stateList: action.users.getStateDetails
    //   };
    // case userConstants.STATES_LIST_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error
    //   };



    default:
      return state
  }
}