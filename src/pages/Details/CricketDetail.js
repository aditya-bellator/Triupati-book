import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { userActions } from '../../_actions';
//scss
import "./Cricket.scss";
//images
import liveTv from "../../assets/lock.jpg";
import MatchData from "./MatchData";
import PlaceBet from "./PlaceBet";
import FancyPlaceBet from "./FancyPlaceBet";
import BookmakerPlaceBetSportWise from "./BookmakerPlaceBetSportWise";
import TiedMatchPlaceBet from "./TiedMatchPlaceBet";
import ToWinTheTossBet from "./ToWinTheTossBet";
import CompleteMatchBet from "./CompleteMatchBet";
import OtherMarketPlaceBet from "./OtherMarketPlaceBet";

import BetPlaceMobileView from '../../components/BetPlaceMobileView/BetPlaceMobileView';
import OtherMrktBetMobileView from '../../components/OtherMrktBetMobileView/OtherMrktBetMobileView';
import FancyBetPlaceMobileView from '../../components/FancyBetPlaceMobileView/FancyBetPlaceMobileView';
import TiedBetPlaceMobileView from '../../components/TiedBetPlaceMobileView/TiedBetPlaceMobileView';
import ToWinTheTossBetPlaceMobileView from '../../components/ToWinTheTossBetPlaceMobileView/ToWinTheTossBetPlaceMobileView';
import CompleteMatchBetPlaceMobileView from '../../components/CompleteMatchBetPlaceMobileView/CompleteMatchBetPlaceMobileView';
import UseMediaQuery from '../../components/mobileDevice/mobileDevice';

const CricketDetail = (props) => {
  const screenSize = UseMediaQuery();
  const dispatch = useDispatch();
  let eventDetalsData = useSelector(state => state.users.eventDetals);
  let { UserSportSettings, MatchDetails, BookerMakerMarket, OtherMarketList, bm } = eventDetalsData ? eventDetalsData : {}
  const myData = useSelector(state => state.users.getBetsListData);
  let { MatchAndBetfair, MatchFancy } = myData ? myData : {};
  const allbetsLength = useSelector(state => state.users);
  let { betsLength, fancyBetLength, loadingBetPlace } = allbetsLength ? allbetsLength : {};
  let localData = JSON.parse(localStorage.getItem('userMeta'));
  const { sport_id, series_id, match_id, market_id } = useParams();
  const [scroll, setScroll] = useState(false);
  const [placeBet, setPlaceBet] = useState(false);

  // bet state use hare: 
  const [isBack, setIsBack] = useState(false);
  const [backBetModal, setBackBetModal] = useState(false);
  const [otherMktBetModal, setOtherMktBetModal] = useState(false);
  const [backBetFancyModal, setBackBetFancyModal] = useState(false);
  const [backBetBookmakerModal, setBackBetBookmakerModal] = useState(false);
  const [backBetTiedMatchModal, setBackBetTiedMatchModal] = useState(false);
  const [backBetToWinTheTossModal, setBackBetToWinTheTossModal] = useState(false);
  const [backBetComplateMatchModal, setBackBetComplateMatchModal] = useState(false);
  const [stakeopen, setStakeOpen] = useState(false);
  const [finalMatchStack, setFinalMatchStack] = useState([]);
  const [tiedMatchfilteredData, setTiedMatchfilteredData] = useState();
  const [toWinTheTossfilteredData, setToWinTheTossfilteredData] = useState();
  const [completeMatchfilteredData, setCompleteMatchfilteredData] = useState();
  const [betSlipData, setBetSlipData] = useState("");
  let [stack, setStack] = useState(null);
  let [sectionType, setSectionType] = useState(null);
  const [count, setCount] = useState(0);

  const [valuesModal, setValuesModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRunner, setCurrentRunner] = useState([]);
  const [profit, setProfit] = useState('');
  let [otherMrktCurrentItem, setOtherMrktCurrentItem] = useState(null);
  let [totalBets, setTotalBets] = useState(0);

  const [betListData, setBetListData] = useState({});
  const [matchDetailsData, setMatchDetailsData] = useState({});
  const [matchSession, setMatchSession] = useState({});
  const [matchScore, setMatchScore] = useState({});

  const showValuesModalhander = () => {
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];
    setFinalMatchStack(finalMatchStack);
    setValuesModal(!valuesModal);
  };


  const handleStakeInput = (e) => {
    e.preventDefault();
    let { value } = e.target;
    console.log("value  ", value);
    setFinalMatchStack((prevDataArray) => {
      const newDataArray = [...prevDataArray]; // Create a copy of the array
      newDataArray[currentIndex] = value; // Update value at the specified index
      return newDataArray; // Return the updated array
    });
  };

  const handleCurrentIndex = (index) => {
    setCurrentIndex(index)
  };

  const handlesSaveUserStack = () => {
    let finalString = finalMatchStack.join(',');

    let data = {
      match_stack: finalString,
      one_click_stack: "0",
      sport_id: sport_id,
    }

    console.log('handlesSaveUserStack??', data);
    let eventDetalApiReq = { "match_id": match_id, "sport_id": sport_id }
    dispatch(userActions.single_click_update_amount(data, eventDetalApiReq, setValuesModal))
  }

  //  Bet Place Function Start Here
  const showPlaceBetHandler = (data) => {
    setBackBetModal(false);
  };

  const handleBackOpen = (data) => {
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];
    setSectionType(data.sectionType);
    setStakeOpen(true);
    setOtherMktBetModal(false);
    setFinalMatchStack(finalMatchStack);
    setBackBetFancyModal(false);
    setBackBetTiedMatchModal(false);
    setBackBetBookmakerModal(false);
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(false);
    setBackBetModal(true);
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    setStakeOpen(false);
    setIsBack(data.isBack);
    setProfit('');
    setCurrentRunner([]);

  };

  const handleBackOpenTiedMatch = (data) => {
    // console.log('popopopopopopopopopoo', data);
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];


    // Define a filter condition (e.g., only show names that start with 'J')
    const filterCondition = (item) => item.marketName == "Tied Match";

    // Use the filter function to create a new array based on the condition
    const resultData = OtherMarketList.filter(filterCondition);
    console.log('resultData??????????', resultData);

    setSectionType(data.sectionType);
    setTiedMatchfilteredData(resultData)
    setFinalMatchStack(finalMatchStack);
    setBackBetFancyModal(false);
    setBackBetModal(false);
    setOtherMktBetModal(false);
    setBackBetBookmakerModal(false);
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(false);
    setBackBetTiedMatchModal(true)
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    setIsBack(data.isBack);
    setProfit('');
    setCurrentRunner([]);

  };

  const handleBackToWinTheToss = (data) => {
    console.log('wwwwwwwwwwwwwwwwwwwwww', data);
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];


    // Define a filter condition (e.g., only show names that start with 'J')
    const filterCondition = (item) => item.marketName == "To Win the Toss";

    // Use the filter function to create a new array based on the condition
    const resultData = OtherMarketList.filter(filterCondition);
    console.log('resultData??????????', resultData);

    setSectionType(data.sectionType);
    setToWinTheTossfilteredData(resultData)
    setFinalMatchStack(finalMatchStack);
    setBackBetFancyModal(false);
    setBackBetModal(false);
    setOtherMktBetModal(false);
    setBackBetBookmakerModal(false);
    setBackBetTiedMatchModal(false)
    setBackBetToWinTheTossModal(true)
    setBackBetComplateMatchModal(false)
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    setIsBack(data.isBack);
    setProfit('');
    setCurrentRunner([]);

  };

  const handleBackCompleteMatch = (data) => {
    // console.log('wwwwwwwwwwwwwwwwwwwwww', data);
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];


    // Define a filter condition (e.g., only show names that start with 'J')
    const filterCondition = (item) => item.marketName == "Completed Match";

    // Use the filter function to create a new array based on the condition
    const resultData = OtherMarketList.filter(filterCondition);
    console.log('resultData??????????', resultData);

    setSectionType(data.sectionType);
    // setStack(null);

    // setStakeOpen(true);
    setCompleteMatchfilteredData(resultData)
    setFinalMatchStack(finalMatchStack);
    setBackBetFancyModal(false);
    setBackBetModal(false);
    setOtherMktBetModal(false);
    setBackBetBookmakerModal(false);
    setBackBetTiedMatchModal(false)
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(true);
    // setBackBetModalMobileView(true);
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    // setStakeOpen(false);
    setIsBack(data.isBack);
    setProfit('');
    setCurrentRunner([]);

  };

  const handleBookmakerBetModalOpenSportWise = (data) => {
    // console.log('popopopopopopopopopoo', data);
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];

    setSectionType(data.sectionType);
    // setStack(null);

    setStakeOpen(true);
    setFinalMatchStack(finalMatchStack);
    setOtherMktBetModal(false);
    setBackBetFancyModal(false);
    setBackBetModal(false);
    setBackBetTiedMatchModal(false);
    setBackBetBookmakerModal(true);
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(false);
    // setBackBetModalMobileView(true);
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    setStakeOpen(false);
    setIsBack(data.isBack);
    setProfit('');
    setCurrentRunner([]);

  };

  const handleFancyBetModalOpen = (data) => {
    console.log('popopopopopopopopopoo', data);
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];

    setSectionType(data.sectionType);
    // setStack(null);

    setFinalMatchStack(finalMatchStack);
    setOtherMktBetModal(false);
    setBackBetModal(false);
    setBackBetTiedMatchModal(false);
    setBackBetBookmakerModal(false);
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(false);
    setBackBetFancyModal(true);
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    setProfit('');
    setCurrentRunner([]);
  };

  const handleBackOpenOtherMarketSportIDWise = (data) => {
    console.log('popopopopopopopopopoo', data);
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];

    setOtherMrktCurrentItem(data.otherMrktCurrentItem);
    setSectionType(data.sectionType);
    // setStack(null);

    setFinalMatchStack(finalMatchStack);
    setBackBetFancyModal(false);
    setBackBetTiedMatchModal(false);
    setBackBetBookmakerModal(false);
    setBackBetModal(false);
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(false);
    setOtherMktBetModal(true);
    setBetSlipData({ ...data, stake: "0" });
    setCount(data.odds);
    setIsBack(data.isBack);
    setProfit('');
    setCurrentRunner([]);
  };

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  }

  const decreaseCount = () => {
    setCount((prevCount) => prevCount - 1);
  }

  const increaseStackNew = () => {
    setStack((prevCount) => {

      let stack = prevCount + 1

      let cltProfit = ((count - 1) * Number(stack)).toFixed(2);
      let marketDataDetails = sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket : MatchDetails;
      let currentArray = []

      if (isBack !== null && isBack === true) {
        for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
          const element = marketDataDetails.runner_json[index];
          if (element.selectionId === betSlipData.selectionId) {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: Number(element.WinAndLoss) + Number(cltProfit),
            }

            console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
            currentArray.push(tempObj)
          } else {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: Number(element.WinAndLoss) - Number(stack),
            }
            console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
            currentArray.push(tempObj)
          }

        }
      }

      if (isBack !== null && isBack === false) {
        for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
          const element = marketDataDetails.runner_json[index];


          if (element.selectionId === betSlipData.selectionId) {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
            }
            console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
            currentArray.push(tempObj)
          } else {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: (Number(element.WinAndLoss) + Number(stack)),
            }
            console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
            currentArray.push(tempObj)
          }

        }
      }

      setProfit(cltProfit);
      setCurrentRunner(currentArray);



      return prevCount + 1

    });
  }

  const increaseStack = () => {
    setStack((prevCount) => prevCount + 1);
  }

  const decreaseStack = () => {
    setStack((prevCount) => prevCount - 1);
  }
  const decreaseStackNew = () => {
    setStack((prevCount) => {

      let stack = prevCount - 1

      let cltProfit = ((count - 1) * Number(stack)).toFixed(2);
      let marketDataDetails = sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket : MatchDetails;
      let currentArray = []

      if (isBack !== null && isBack === true) {
        for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
          const element = marketDataDetails.runner_json[index];
          if (element.selectionId === betSlipData.selectionId) {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: Number(element.WinAndLoss) + Number(cltProfit),
            }

            console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
            currentArray.push(tempObj)
          } else {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: Number(element.WinAndLoss) - Number(stack),
            }
            console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
            currentArray.push(tempObj)
          }

        }
      }

      if (isBack !== null && isBack === false) {
        for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
          const element = marketDataDetails.runner_json[index];


          if (element.selectionId === betSlipData.selectionId) {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
            }
            console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
            currentArray.push(tempObj)
          } else {
            let tempObj = {
              selectionId: element.selectionId,
              winLoss: (Number(element.WinAndLoss) + Number(stack)),
            }
            console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
            currentArray.push(tempObj)
          }

        }
      }

      setProfit(cltProfit);
      setCurrentRunner(currentArray);


      return prevCount - 1
    });
  }


  const handlestakeOpenWeb = () => {
    let finalMatchStack = UserSportSettings && UserSportSettings.length > 0 && UserSportSettings[0].match_stack ? UserSportSettings[0].match_stack.split(",") : [];

    setFinalMatchStack(finalMatchStack);
    setStakeOpen(true)
  }

  const handleReset = () => {
    setBackBetModal(false);
    setBackBetFancyModal(false);
    setBackBetTiedMatchModal(false);
    setBackBetToWinTheTossModal(false);
    setBackBetComplateMatchModal(false);
    setBackBetBookmakerModal(false);
    setOtherMktBetModal(false);

    setStack(null);
    setCount(0);
    setBetSlipData("");
    setFinalMatchStack([]);
    setProfit('');
    setCurrentRunner([]);
  };

  const handlePlaceBet = () => {
    // const { sport_id, series_id, match_id, market_id } = useParams();
    // console.log('stack123456::', typeof stack);
    let data2 = {
      fancy_id: "0 ",
      limit: 10,
      market_id: "0",
      match_id: match_id,
      pageno: 1,
    };
    let data = {
      // market_id: market_id, 
      market_id: sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket.market_id : market_id,
      match_id: parseInt(match_id),
      selection_id: parseInt(betSlipData.selectionId),
      stack: stack,
      // stack: stack + "",
      odds: count + "",
      is_back: betSlipData && betSlipData.type && betSlipData.type == "BACK" ? "1" : "0",
    };
    console.log('handlePlaceBet____data____req???????123//', data);
    dispatch(userActions.save_bet(data, data2, setBackBetModal, setCurrentRunner, setStack));

  }

  const handlePlaceBetOtherMrkt = () => {
    // const { sport_id, series_id, match_id, market_id } = useParams();
    let data2 = {
      fancy_id: "0 ",
      limit: 10,
      market_id: "0",
      match_id: match_id,
      pageno: 1,
    };
    let data = {
      // market_id: market_id, 
      market_id: otherMrktCurrentItem && otherMrktCurrentItem.market_id ? otherMrktCurrentItem.market_id : null,
      match_id: parseInt(match_id),
      selection_id: parseInt(betSlipData.selectionId),
      stack: stack,
      // stack: stack + "",
      odds: count + "",
      is_back: betSlipData && betSlipData.type && betSlipData.type == "BACK" ? "1" : "0",
    };

    console.log('BetOtherMrkt____data____req???????123//', data);
    dispatch(userActions.save_bet(data, data2, setOtherMktBetModal, setCurrentRunner));

  }

  const handlePlaceBetTiedMatch = () => {
    let marketDataDetails = tiedMatchfilteredData[0];

    let data2 = {
      fancy_id: "0 ",
      limit: 10,
      market_id: "0",
      match_id: match_id,
      pageno: 1,
    };
    let data = {
      market_id: marketDataDetails && marketDataDetails.market_id ? marketDataDetails.market_id : null,
      // market_id: sectionType && sectionType === "TIED_MATCH" ? BookerMakerMarket.market_id : market_id,
      match_id: parseInt(match_id),
      selection_id: parseInt(betSlipData.selectionId),
      stack: stack,
      // stack: stack + "",
      odds: count + "",
      is_back: betSlipData && betSlipData.type && betSlipData.type == "BACK" ? "1" : "0",
    };

    console.log('handlePlaceBetTiedMatch____data____req???????123//', data);
    dispatch(userActions.save_bet(data, data2, setBackBetTiedMatchModal, setCurrentRunner,setStack));

  }

  const handlePlaceBetToWinTheToss = () => {
    let marketDataDetails = toWinTheTossfilteredData[0];

    let data2 = {
      fancy_id: "0 ",
      limit: 10,
      market_id: "0",
      match_id: match_id,
      pageno: 1,
    };
    let data = {
      market_id: marketDataDetails && marketDataDetails.market_id ? marketDataDetails.market_id : null,
      // market_id: sectionType && sectionType === "TIED_MATCH" ? BookerMakerMarket.market_id : market_id,
      match_id: parseInt(match_id),
      selection_id: parseInt(betSlipData.selectionId),
      stack: stack,
      // stack: stack + "",
      odds: count + "",
      is_back: betSlipData && betSlipData.type && betSlipData.type == "BACK" ? "1" : "0",
    };

    console.log('handlePlaceBetTiedMatch____data____req???????123//', data);
    dispatch(userActions.save_bet(data, data2, setBackBetToWinTheTossModal, setCurrentRunner, setStack));

  }

  const handlePlaceBetCompleteMatch = () => {
    let marketDataDetails = completeMatchfilteredData[0];

    let data2 = {
      fancy_id: "0 ",
      limit: 10,
      market_id: "0",
      match_id: match_id,
      pageno: 1,
    };
    let data = {
      market_id: marketDataDetails && marketDataDetails.market_id ? marketDataDetails.market_id : null,
      // market_id: sectionType && sectionType === "TIED_MATCH" ? BookerMakerMarket.market_id : market_id,
      match_id: parseInt(match_id),
      selection_id: parseInt(betSlipData.selectionId),
      stack: stack,
      // stack: stack + "",
      odds: count + "",
      is_back: betSlipData && betSlipData.type && betSlipData.type == "BACK" ? "1" : "0",
    };

    console.log('handlePlaceBetTiedMatch____data____req???????123//', data);
    dispatch(userActions.save_bet(data, data2, setBackBetComplateMatchModal, setCurrentRunner, setStack));

  }


  const inputChangeDisable = () => {

  }

  const inputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    console.log("name, value  ", name, value);
    // betSlipData.stake = value;
    stack = Number(value);
    setStack(stack);
  }


  const updateStackOnclic = (num) => {
    setStack(num)
  }

  const selectStackNew = (value) => {
    // e.preventDefault();
    // let { name, value } = e.target;
    // console.log("name, value  ", name, value);
    // betSlipData.stake = value;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    // console.log('cltProfit::', cltProfit);
    let marketDataDetails = sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket : MatchDetails;
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        // console.log('element.winLoss?', element.WinAndLoss);

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
            // winLoss: element.WinAndLoss + cltProfit,
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
            // winLoss: element.WinAndLoss - value,
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
            // winLoss: element.WinAndLoss - cltProfit,
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
            // winLoss: (Number(element.WinAndLoss) + value),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);


    // const [currentRunner, setCurrentRunner] = useState([]);
    // const [profit, setProfit] = useState('');
    // this.setState({
    //   profit: cltProfit,
    //   currentRunner: currentArray
    // });

  }

  const handleInputStack = (e) => {
    e.preventDefault();
    let { value } = e.target;
    // console.log("name, value  ", name, value);
    // betSlipData.stake = value;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    // console.log('cltProfit::', cltProfit);
    let marketDataDetails = sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket : MatchDetails;
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        // console.log('element.winLoss?', element.WinAndLoss);

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
            // winLoss: element.WinAndLoss + cltProfit,
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
            // winLoss: element.WinAndLoss - value,
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
            // winLoss: element.WinAndLoss - cltProfit,
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
            // winLoss: (Number(element.WinAndLoss) + value),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);


    // const [currentRunner, setCurrentRunner] = useState([]);
    // const [profit, setProfit] = useState('');
    // this.setState({
    //   profit: cltProfit,
    //   currentRunner: currentArray
    // });

  }

  const handleInputStackBookMakerSportWise = (e) => {
    e.preventDefault();
    let { value } = e.target;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    // let marketDataDetails = sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket : MatchDetails;
    let marketDataDetails = bm;
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }


  const selectStackNewBookmakerSportWise = (value) => {
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    // let marketDataDetails = sectionType && sectionType === "BOOKMAKER" ? BookerMakerMarket : MatchDetails;
    let marketDataDetails = bm;
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }


  const selectStackNewTiedMatch = (value) => {
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    let marketDataDetails = tiedMatchfilteredData[0];
    let currentArray = []
    // console.log('TIED______2222_', marketDataDetails.runner_json.length);

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }

  const selectStackNewToWinTheToss = (value) => {
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    let marketDataDetails = toWinTheTossfilteredData[0];
    let currentArray = []
    // console.log('TIED______2222_', marketDataDetails.runner_json.length);

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    console.log('cltProfit111111111', cltProfit);
    console.log('currentArray2222222222', currentArray);

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }

  const selectStackNewComplateMatch = (value) => {
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    let marketDataDetails = completeMatchfilteredData[0];
    let currentArray = []
    // console.log('TIED______2222_', marketDataDetails.runner_json.length);

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    console.log('cltProfit111111111', cltProfit);
    console.log('currentArray2222222222', currentArray);

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }

  const handleInputStackTiedMatch = (e) => {
    e.preventDefault();
    let { value } = e.target;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    let marketDataDetails = tiedMatchfilteredData[0];
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }

  const handleInputStackToWinTheToss = (e) => {
    e.preventDefault();
    let { value } = e.target;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    let marketDataDetails = toWinTheTossfilteredData[0];
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }

  const handleInputStackCompletematch = (e) => {
    e.preventDefault();
    let { value } = e.target;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    let marketDataDetails = completeMatchfilteredData[0];
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }

  const fancyPlaceBet = () => {
    // let { users } = this.props;
    // let { eventdetalsItems } = users;
    let betListReq = {
      "fancy_id": "0",
      "limit": 10,
      "market_id": "0",
      "match_id": match_id,
      "pageno": 1
    }

    // {
    //   fancyStatus: "A"
    //   fancy_id: "11"
    //   is_back: "0"
    //   match_id: "32855092"
    //   run: "35"
    //   size: 120
    //   sport_id: "4"
    //   stack: 100
    // }

    // {"match_id":"32855089","size":100,"fancy_id":"537","run":"107","stack":100,"is_back":"0","fancyStatus":"A","sport_id":"4"}

    let data = {
      fancy_id: betSlipData.selectionId,
      // fancy_id: betSlipData.selectionId + "",
      is_back: betSlipData && betSlipData.type && betSlipData.type === "YES" ? "1" : "0",
      // match_id: match_id + "",
      match_id: parseInt(match_id),
      run: parseInt(betSlipData.odds),
      size: betSlipData.size,
      sport_id: parseInt(sport_id),
      stack: parseInt(stack),
      fancyStatus: betSlipData.fancyStatus,
    }

    console.log('FancyBet,,,,', data);

    dispatch(userActions.save_ssn_bet(data, betListReq, setBackBetFancyModal, setStack))
  }




  // selectStackNew = (data) => {

  //   this.setState({
  //     currentStackItem: data,
  //   }, function () {
  //     let cltProfit = ((this.state.currentOdds - 1) * this.state.currentStackItem);

  //     let { users } = this.props;
  //     let { matchByMatchIdV2Items } = users;



  //     let { betSlipData } = this.state;
  //     let currentArray = []

  //     if (this.state.isBack !== null && this.state.isBack === true) {
  //       for (let index = 0; index < matchByMatchIdV2Items.runner_json.length; index++) {
  //         const element = matchByMatchIdV2Items.runner_json[index];


  //         if (element.selectionId === betSlipData.selectionId) {
  //           let tempObj = {
  //             selectionId: element.selectionId,
  //             winLoss: element.winLoss + cltProfit,
  //           }
  //           currentArray.push(tempObj)
  //         } else {
  //           let tempObj = {
  //             selectionId: element.selectionId,
  //             winLoss: element.winLoss - this.state.currentStackItem,
  //           }
  //           currentArray.push(tempObj)
  //         }

  //       }
  //     }



  //     if (this.state.isBack !== null && this.state.isBack === false) {
  //       for (let index = 0; index < matchByMatchIdV2Items.runner_json.length; index++) {
  //         const element = matchByMatchIdV2Items.runner_json[index];


  //         if (element.selectionId === betSlipData.selectionId) {
  //           let tempObj = {
  //             selectionId: element.selectionId,
  //             winLoss: (element.winLoss - cltProfit),
  //           }
  //           currentArray.push(tempObj)
  //         } else {
  //           let tempObj = {
  //             selectionId: element.selectionId,
  //             winLoss: (Number(element.winLoss) + Number(this.state.currentStackItem)),
  //           }
  //           currentArray.push(tempObj)
  //         }

  //       }
  //     }

  //     this.setState({
  //       profit: cltProfit,
  //       currentRunner: currentArray
  //     });
  //   });
  // }



  //  Bet Place Function End Here

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 120);
    });
  }, []);
  useEffect(() => {
    document.body.classList.add("details-page");
    return () => {
      document.body.classList.remove("details-page");
    };
  }, []);

  // console.log('stackOnchange???__________finalMatchStack:::', finalMatchStack);

  useEffect(() => {

    let matchListReqData = { "match_id": match_id, "sport_id": sport_id }

    const matchDetailsRes = fetch("https://triupatiexch.com/api/v5/get-cricket-detail", {
      method: "POST",
      body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatchDetailsData(data.data)
      // this.setState({
      //   matchDetailsData: data.data,
      // });
    })


    const matchSessionRes = fetch(`https://triupatiexch.com/api/v5/get-match-session?match_id=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatchSession(data.data)
      // this.setState({
      //   matchSession: data.data,
      // });
    })

    const matchScoreRes = fetch(`https://score.jeoad.com/api/v1/getScore?matchId=${match_id}`, {
      method: "GET",
      // body: JSON.stringify(matchListReqData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json()).then(data => {
      setMatchScore(data.data)
      // this.setState({
      //   matchScore: data.data,
      // });
    })



    let betListReq = { "limit": 10, "match_id": match_id, "market_id": "0", "fancy_id": 0, "pageno": 1 }
    dispatch(userActions.list_bt_ssn_mk(betListReq));

    // const { sport_id, series_id, match_id, market_id } = this.props;
    let eventDetalReqData = { "match_id": match_id, "sport_id": sport_id }
    // dispatch(userActions.event_detals(eventDetalReqData));

    if (sport_id === "4") {
      dispatch(userActions.event_detals(eventDetalReqData));
    }


    if (sport_id === "2") {
      dispatch(userActions.event_tennis(eventDetalReqData));
    }

    if (sport_id === "1") {
      dispatch(userActions.event_footbal(eventDetalReqData));
    }



  }, []);

  const getTitle = () => {

    // const BetLength = useSelector(state => state.users.getBetsListData);
    // let { MatchAndBetfair } = BetLength ? BetLength : {};

    // let result = MatchAndBetfair.length;
    // return result

  };






  const handleInputStackOtherMrkt = (e) => {
    e.preventDefault();
    let { value } = e.target;
    // console.log("name, value  ", name, value);
    // betSlipData.stake = value;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    // console.log('cltProfit::', cltProfit);
    let marketDataDetails = otherMrktCurrentItem;
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        // console.log('element.winLoss?', element.WinAndLoss);

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
            // winLoss: element.WinAndLoss + cltProfit,
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
            // winLoss: element.WinAndLoss - value,
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
            // winLoss: element.WinAndLoss - cltProfit,
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
            // winLoss: (Number(element.WinAndLoss) + value),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);


    // const [currentRunner, setCurrentRunner] = useState([]);
    // const [profit, setProfit] = useState('');
    // this.setState({
    //   profit: cltProfit,
    //   currentRunner: currentArray
    // });

  }



  const selectStackOtherMrkt = (value) => {
    // e.preventDefault();
    // let { name, value } = e.target;
    // console.log("name, value  ", name, value);
    // betSlipData.stake = value;
    stack = Number(value);
    setStack(stack);

    let cltProfit = ((count - 1) * Number(value)).toFixed(2);
    // console.log('cltProfit::', cltProfit);
    let marketDataDetails = otherMrktCurrentItem;
    let currentArray = []

    if (isBack !== null && isBack === true) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];

        // console.log('element.winLoss?', element.WinAndLoss);

        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) + Number(cltProfit),
            // winLoss: element.WinAndLoss + cltProfit,
          }

          console.log('tempObj:&& ===selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: Number(element.WinAndLoss) - Number(value),
            // winLoss: element.WinAndLoss - value,
          }
          console.log('tempObj:&& ! selectionId && isBack === true::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }


    if (isBack !== null && isBack === false) {
      for (let index = 0; index < marketDataDetails.runner_json.length; index++) {
        const element = marketDataDetails.runner_json[index];


        if (element.selectionId === betSlipData.selectionId) {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) - Number(cltProfit)),
            // winLoss: element.WinAndLoss - cltProfit,
          }
          console.log('tempObj:&& ===selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        } else {
          let tempObj = {
            selectionId: element.selectionId,
            winLoss: (Number(element.WinAndLoss) + Number(value)),
            // winLoss: (Number(element.WinAndLoss) + value),
          }
          console.log('tempObj:&& ! selectionId && isBack === false::', tempObj);
          currentArray.push(tempObj)
        }

      }
    }

    setProfit(cltProfit);
    setCurrentRunner(currentArray);

  }


  return (

    <div>

      {/* <div>
        <LoadingOverlay
          active={loadingBetPlace}
          className="demo"
          spinner
          text='Please wait...' />
      </div> */}

      <div className="center-main-container detail-page">
        <div className="center-container">
          <div className="detail-page-container">

            <div className="d-xl-none w-100">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className=""
              >
                <Tab
                  eventKey="home"
                  title="
                  Odds"
                >
                  <div className=" d-xl-none d-flex flex-wrap w-100">

                    <MatchData
                      sport_id={sport_id}
                      series_id={series_id}
                      match_id={match_id}
                      market_id={market_id}
                      profit={profit}
                      currentRunner={currentRunner}
                      sectionType={sectionType}
                      handleBackOpen={handleBackOpen}
                      handleFancyBetModalOpen={handleFancyBetModalOpen}
                      handleBookmakerBetModalOpenSportWise={handleBookmakerBetModalOpenSportWise}
                      handleBackOpenTiedMatch={handleBackOpenTiedMatch}
                      handleBackToWinTheToss={handleBackToWinTheToss}
                      handleBackCompleteMatch={handleBackCompleteMatch}
                      handleBackOpenOtherMarketSportIDWise={handleBackOpenOtherMarketSportIDWise}
                    />

                  </div>
                </Tab>

                <Tab eventKey="profile"
                  title={`Matched Bet ${Number(betsLength) + Number(fancyBetLength)}`}
                >
                  <Accordion defaultActiveKey={["1", "2"]} alwaysOpen>

                    <>
                      {MatchAndBetfair && MatchAndBetfair.length > 0 ?
                        <>
                          <Accordion.Item eventKey="2">
                            <Accordion.Body>
                              <div className="my-bets">
                                <div className="table-responsive w-100">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Matched Bet Odds</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Odds</th>
                                        <th className="text-center">Stake</th>
                                        <th className="text-center">P/L</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <>
                                        {MatchAndBetfair && MatchAndBetfair.length > 0 ?
                                          MatchAndBetfair.map((element, index) => (
                                            <React.Fragment key={index}>
                                              <tr>
                                                <td className="text-left">{element && element.selectionName ? element.selectionName : "-"}
                                                </td>
                                                <td className="text-center">{element && element.is_back === "1" ? "Back" : "Lay"}</td>
                                                <td className="text-center">{element && element.odds ? element.odds : 0}</td>
                                                <td className="text-center">{element && element.stack ? element.stack : 0}</td>
                                                <td className="text-center">{element && element.p_l ? element.p_l : 0}</td>
                                              </tr>
                                            </React.Fragment>
                                          )) : null

                                        }
                                      </>

                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </> : null
                      }
                    </>


                    <>
                      {MatchFancy && MatchFancy.length > 0 ?
                        <>
                          <Accordion.Item eventKey="2">
                            <Accordion.Body>
                              <div className="my-bets">
                                <div className="table-responsive w-100">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Matched Bet Fancy</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Run</th>
                                        <th className="text-center">Stake</th>
                                        <th className="text-center">P/L</th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                      <>
                                        {MatchFancy && MatchFancy.length > 0 ?
                                          MatchFancy.map((element, index) => (
                                            <React.Fragment key={index}>
                                              <tr>
                                                <td className="text-left">{element && element.fancy_name ? element.fancy_name : "-"}
                                                  {/* &nbsp; ({" Fancy "}) */}
                                                </td>
                                                <td className="text-center">{element && element.is_back === "1" ? "Yes" : "No"}</td>
                                                <td className="text-center">{element && element.run ? element.run : 0}</td>
                                                <td className="text-center">{element && element.stack ? element.stack : 0}</td>
                                                <td className="text-center">{element && element.profit ? element.profit : 0}</td>
                                              </tr>
                                            </React.Fragment>
                                          )) : null

                                        }
                                      </>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </> : null
                      }
                    </>




                  </Accordion>

                </Tab>

                <Tab
                  eventKey="contact"
                  title={<i className="fas fa-tv" />}
                // disabled
                >

                  <Accordion.Item >
                    <Accordion.Body>
                      <div className="">
                        <div className="table-responsive w-100">
                          <div className="iframe-body">

                            {localData && localData.user_name && localData.user_name != "Demo007" ?
                              <>
                                <iframe
                                  scrolling="no"
                                  height="250"
                                  width="100%"
                                  src={`https://stream.1ex99.in/tv2?EventId=${match_id}`}>
                                </iframe>
                              </> :
                              <>
                                <img src={liveTv} alt="Not Available" />
                              </>
                            }

                          </div>
                        </div>



                        <div className=" d-xl-none d-flex flex-wrap w-100">

                          <MatchData
                            sport_id={sport_id}
                            series_id={series_id}
                            match_id={match_id}
                            market_id={market_id}
                            profit={profit}
                            currentRunner={currentRunner}
                            sectionType={sectionType}
                            handleBackOpen={handleBackOpen}
                            handleFancyBetModalOpen={handleFancyBetModalOpen}
                            handleBookmakerBetModalOpenSportWise={handleBookmakerBetModalOpenSportWise}
                            handleBackOpenTiedMatch={handleBackOpenTiedMatch}
                            handleBackToWinTheToss={handleBackToWinTheToss}
                            handleBackCompleteMatch={handleBackCompleteMatch}
                            handleBackOpenOtherMarketSportIDWise={handleBackOpenOtherMarketSportIDWise}
                          />

                        </div>




                      </div>
                    </Accordion.Body>
                  </Accordion.Item>

                  {/* Tab content for Contact */}
                </Tab>

              </Tabs>
            </div>


            <div className=" d-xl-flex d-none flex-wrap w-100">

              <MatchData
                sport_id={sport_id}
                series_id={series_id}
                match_id={match_id}
                market_id={market_id}
                profit={profit}
                currentRunner={currentRunner}
                sectionType={sectionType}
                handleBackOpen={handleBackOpen}
                handleFancyBetModalOpen={handleFancyBetModalOpen}
                handleBookmakerBetModalOpenSportWise={handleBookmakerBetModalOpenSportWise}
                handleBackOpenTiedMatch={handleBackOpenTiedMatch}
                handleBackToWinTheToss={handleBackToWinTheToss}
                handleBackCompleteMatch={handleBackCompleteMatch}
                handleBackOpenOtherMarketSportIDWise={handleBackOpenOtherMarketSportIDWise}
              />

            </div>
          </div>
        </div>

        <div className={`${scroll && "active"} sidebar right-sidebar`}>
          <a className="bet-nation-game-name"
            href={`/providerlobbygame/${201206}`}
          >
            <i className="fas fa-info-circle" />
            <span>Aviator</span>
          </a>

          <Accordion defaultActiveKey={["1", "2"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Live Match
                {/* _____desktop */}
              </Accordion.Header>
              <Accordion.Body>
                <div className="iframe-body">
                  {
                    localData && localData.user_name && localData.user_name != "Demo007" ?
                      <>
                        <iframe
                          scrolling="no"
                          width="400"
                          height="210"
                          src={`https://stream.1ex99.in/tv2?EventId=${match_id}`}>
                        </iframe>
                      </> :
                      <>
                        <img src={liveTv} alt="Not Available" />
                      </>
                  }
                  {/* <img src={liveTv} alt="Not Available" /> */}
                </div>
              </Accordion.Body>
            </Accordion.Item>



            {screenSize.width >= 1199 ?
              <>
                {backBetModal ?
                  <PlaceBet
                    loadingBetPlace={loadingBetPlace}
                    profit={profit}
                    betSlipData={betSlipData}
                    finalMatchStack={finalMatchStack}
                    updateStackOnclic={updateStackOnclic}
                    inputChange={inputChange}
                    selectStackNew={selectStackNew}
                    handleInputStack={handleInputStack}
                    inputChangeDisable={inputChangeDisable}
                    decreaseCount={decreaseCount}
                    increaseCount={increaseCount}
                    handlePlaceBet={handlePlaceBet}
                    onclickHide={showPlaceBetHandler}
                    handlestakeOpenWeb={handlestakeOpenWeb}
                    count={count}
                    stack={stack}
                    increaseStackNew={increaseStackNew}
                    decreaseStackNew={decreaseStackNew}
                    increaseStack={increaseStack}
                    decreaseStack={decreaseStack}
                    handleReset={handleReset}

                    showValuesModalhander={showValuesModalhander}
                    valuesModal={valuesModal}

                    handleCurrentIndex={handleCurrentIndex}
                    handleStakeInput={handleStakeInput}
                    handlesSaveUserStack={handlesSaveUserStack}

                  /> : null
                }

              </>
              :
              <>
                {backBetModal ?
                  <BetPlaceMobileView
                    loadingBetPlace={loadingBetPlace}
                    MatchDetails={MatchDetails}
                    count={count}
                    stack={stack}
                    profit={profit}
                    currentRunner={currentRunner}
                    sectionType={sectionType}
                    backBetModal={backBetModal}
                    finalMatchStack={finalMatchStack}
                    betSlipData={betSlipData}
                    valuesModal={valuesModal}
                    handleInputStack={handleInputStack}
                    handleReset={handleReset}
                    selectStackNew={selectStackNew}
                    handlePlaceBet={handlePlaceBet}

                    showValuesModalhander={showValuesModalhander}
                    handleCurrentIndex={handleCurrentIndex}
                    handleStakeInput={handleStakeInput}
                    handlesSaveUserStack={handlesSaveUserStack}

                  /> : null
                }
              </>
            }

            {screenSize.width >= 1199 ?
              <>
                {otherMktBetModal ?
                  <OtherMarketPlaceBet
                    loadingBetPlace={loadingBetPlace}
                    profit={profit}
                    betSlipData={betSlipData}
                    finalMatchStack={finalMatchStack}
                    updateStackOnclic={updateStackOnclic}
                    handleInputStackOtherMrkt={handleInputStackOtherMrkt}
                    selectStackOtherMrkt={selectStackOtherMrkt}
                    // handleInputStack={handleInputStack}
                    inputChangeDisable={inputChangeDisable}
                    decreaseCount={decreaseCount}
                    increaseCount={increaseCount}
                    handlePlaceBetOtherMrkt={handlePlaceBetOtherMrkt}
                    onclickHide={showPlaceBetHandler}
                    handlestakeOpenWeb={handlestakeOpenWeb}
                    count={count}
                    stack={stack}
                    increaseStack={increaseStack}
                    decreaseStack={decreaseStack}
                    handleReset={handleReset}

                    showValuesModalhander={showValuesModalhander}
                    valuesModal={valuesModal}

                    handleCurrentIndex={handleCurrentIndex}
                    handleStakeInput={handleStakeInput}
                    handlesSaveUserStack={handlesSaveUserStack}

                  /> : null
                }

              </>
              :
              <>
                {otherMktBetModal ?
                  <OtherMrktBetMobileView
                    loadingBetPlace={loadingBetPlace}
                    sectionType={sectionType}
                    otherMktBetModal={otherMktBetModal}
                    profit={profit}
                    betSlipData={betSlipData}
                    otherMrktCurrentItem={otherMrktCurrentItem}
                    finalMatchStack={finalMatchStack}
                    updateStackOnclic={updateStackOnclic}
                    handleInputStackOtherMrkt={handleInputStackOtherMrkt}
                    selectStackOtherMrkt={selectStackOtherMrkt}
                    // handleInputStack={handleInputStack}
                    inputChangeDisable={inputChangeDisable}
                    decreaseCount={decreaseCount}
                    increaseCount={increaseCount}
                    handlePlaceBetOtherMrkt={handlePlaceBetOtherMrkt}
                    onclickHide={showPlaceBetHandler}
                    handlestakeOpenWeb={handlestakeOpenWeb}
                    count={count}
                    stack={stack}
                    increaseStack={increaseStack}
                    decreaseStack={decreaseStack}
                    handleReset={handleReset}
                    currentRunner={currentRunner}


                    showValuesModalhander={showValuesModalhander}
                    valuesModal={valuesModal}

                    handleCurrentIndex={handleCurrentIndex}
                    handleStakeInput={handleStakeInput}
                    handlesSaveUserStack={handlesSaveUserStack}

                  /> : null
                }
              </>
            }

            {backBetBookmakerModal ?
              <BookmakerPlaceBetSportWise
                loadingBetPlace={loadingBetPlace}
                profit={profit}
                betSlipData={betSlipData}
                finalMatchStack={finalMatchStack}
                updateStackOnclic={updateStackOnclic}
                inputChange={inputChange}
                selectStackNewBookmakerSportWise={selectStackNewBookmakerSportWise}
                handleInputStackBookMakerSportWise={handleInputStackBookMakerSportWise}
                inputChangeDisable={inputChangeDisable}
                decreaseCount={decreaseCount}
                increaseCount={increaseCount}
                handlePlaceBet={handlePlaceBet}
                onclickHide={showPlaceBetHandler}
                handlestakeOpenWeb={handlestakeOpenWeb}
                count={count}
                stack={stack}
                increaseStack={increaseStack}
                decreaseStack={decreaseStack}
                handleReset={handleReset}

                showValuesModalhander={showValuesModalhander}
                valuesModal={valuesModal}

                handleCurrentIndex={handleCurrentIndex}
                handleStakeInput={handleStakeInput}
                handlesSaveUserStack={handlesSaveUserStack}

              /> : null
            }

            {
              screenSize.width >= 1199 ?
                <>
                  {backBetTiedMatchModal ?
                    <TiedMatchPlaceBet
                      loadingBetPlace={loadingBetPlace}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      updateStackOnclic={updateStackOnclic}
                      inputChange={inputChange}
                      selectStackNewTiedMatch={selectStackNewTiedMatch}
                      handleInputStackTiedMatch={handleInputStackTiedMatch}
                      inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      // handlePlaceBet={handlePlaceBet}
                      handlePlaceBetTiedMatch={handlePlaceBetTiedMatch}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
                :
                <>
                  {backBetTiedMatchModal ?
                    <TiedBetPlaceMobileView
                      loadingBetPlace={loadingBetPlace}
                      backBetTiedMatchModal={backBetTiedMatchModal}
                      // OtherMarketList={OtherMarketList}
                      tiedMatchfilteredData={tiedMatchfilteredData}
                      currentRunner={currentRunner}
                      sectionType={sectionType}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      updateStackOnclic={updateStackOnclic}
                      inputChange={inputChange}
                      selectStackNewTiedMatch={selectStackNewTiedMatch}
                      handleInputStackTiedMatch={handleInputStackTiedMatch}
                      inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      // handlePlaceBet={handlePlaceBet}
                      handlePlaceBetTiedMatch={handlePlaceBetTiedMatch}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
            }



            {
              screenSize.width >= 1199 ?
                <>
                  {backBetToWinTheTossModal ?
                    <ToWinTheTossBet
                      loadingBetPlace={loadingBetPlace}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      updateStackOnclic={updateStackOnclic}
                      inputChange={inputChange}
                      selectStackNewToWinTheToss={selectStackNewToWinTheToss}
                      // selectStackNewTiedMatch={selectStackNewTiedMatch}
                      // handleInputStackTiedMatch={handleInputStackTiedMatch}
                      handleInputStackToWinTheToss={handleInputStackToWinTheToss}
                      inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      // handlePlaceBet={handlePlaceBet}
                      handlePlaceBetToWinTheToss={handlePlaceBetToWinTheToss}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
                :
                <>
                  {backBetToWinTheTossModal ?
                    <ToWinTheTossBetPlaceMobileView
                      loadingBetPlace={loadingBetPlace}
                      backBetToWinTheTossModal={backBetToWinTheTossModal}
                      // OtherMarketList={OtherMarketList}
                      // tiedMatchfilteredData={tiedMatchfilteredData}
                      toWinTheTossfilteredData={toWinTheTossfilteredData}
                      currentRunner={currentRunner}
                      sectionType={sectionType}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      // updateStackOnclic={updateStackOnclic}
                      // inputChange={inputChange}
                      // selectStackNewTiedMatch={selectStackNewTiedMatch}
                      selectStackNewToWinTheToss={selectStackNewToWinTheToss}
                      // handleInputStackTiedMatch={handleInputStackTiedMatch}
                      handleInputStackToWinTheToss={handleInputStackToWinTheToss}
                      inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      // handlePlaceBet={handlePlaceBet}
                      handlePlaceBetToWinTheToss={handlePlaceBetToWinTheToss}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
            }


            {
              screenSize.width >= 1199 ?
                <>
                  {backBetComplateMatchModal ?
                    <CompleteMatchBet
                      loadingBetPlace={loadingBetPlace}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      updateStackOnclic={updateStackOnclic}
                      inputChange={inputChange}
                      // selectStackNewToWinTheToss={selectStackNewToWinTheToss}
                      selectStackNewComplateMatch={selectStackNewComplateMatch}
                      // selectStackNewTiedMatch={selectStackNewTiedMatch}
                      // handleInputStackTiedMatch={handleInputStackTiedMatch}
                      handleInputStackCompletematch={handleInputStackCompletematch}
                      // handleInputStackToWinTheToss={handleInputStackToWinTheToss}
                      inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      // handlePlaceBet={handlePlaceBet}
                      // handlePlaceBetToWinTheToss={handlePlaceBetToWinTheToss}
                      handlePlaceBetCompleteMatch={handlePlaceBetCompleteMatch}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
                :
                <>
                  {backBetComplateMatchModal ?
                    <CompleteMatchBetPlaceMobileView
                      loadingBetPlace={loadingBetPlace}
                      backBetComplateMatchModal={backBetComplateMatchModal}
                      // OtherMarketList={OtherMarketList}
                      // tiedMatchfilteredData={tiedMatchfilteredData}
                      completeMatchfilteredData={completeMatchfilteredData}
                      currentRunner={currentRunner}
                      sectionType={sectionType}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      // updateStackOnclic={updateStackOnclic}
                      // inputChange={inputChange}
                      // selectStackNewTiedMatch={selectStackNewTiedMatch}
                      selectStackNewComplateMatch={selectStackNewComplateMatch}
                      // handleInputStackTiedMatch={handleInputStackTiedMatch}
                      handleInputStackCompletematch={handleInputStackCompletematch}
                      inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      // handlePlaceBet={handlePlaceBet}
                      handlePlaceBetCompleteMatch={handlePlaceBetCompleteMatch}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
            }

  
            {/* Fancy Place Bet Section*/}
            {
              screenSize.width >= 1199 ?
                <>
                  {backBetFancyModal ?
                    <FancyPlaceBet
                      loadingBetPlace={loadingBetPlace}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      updateStackOnclic={updateStackOnclic}
                      inputChange={inputChange}
                      // selectStackNew={selectStackNew}
                      // handleInputStack={handleInputStack}
                      // inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      fancyPlaceBet={fancyPlaceBet}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}
                      handleReset={handleReset}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    /> : null
                  }
                </>
                :
                <>
                  {backBetFancyModal ?
                    <FancyBetPlaceMobileView
                      backBetFancyModal={backBetFancyModal}
                      handleReset={handleReset}
                      loadingBetPlace={loadingBetPlace}
                      profit={profit}
                      betSlipData={betSlipData}
                      finalMatchStack={finalMatchStack}
                      updateStackOnclic={updateStackOnclic}
                      inputChange={inputChange}
                      // selectStackNew={selectStackNew}
                      // handleInputStack={handleInputStack}
                      // inputChangeDisable={inputChangeDisable}
                      decreaseCount={decreaseCount}
                      increaseCount={increaseCount}
                      fancyPlaceBet={fancyPlaceBet}
                      onclickHide={showPlaceBetHandler}
                      handlestakeOpenWeb={handlestakeOpenWeb}
                      count={count}
                      stack={stack}
                      increaseStack={increaseStack}
                      decreaseStack={decreaseStack}

                      showValuesModalhander={showValuesModalhander}
                      valuesModal={valuesModal}

                      handleCurrentIndex={handleCurrentIndex}
                      handleStakeInput={handleStakeInput}
                      handlesSaveUserStack={handlesSaveUserStack}

                    />
                    : null
                  }
                </>
            }

            <Accordion.Item eventKey="2">
              <Accordion.Header>My Bet</Accordion.Header>
              <Accordion.Body>
                <div className="my-bets">
                  <div className="table-responsive w-100">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Matched Bet</th>
                          <th className="text-center" >Odds</th>
                          <th className="text-center">Stake</th>
                        </tr>
                      </thead>
                      <tbody>

                        <>
                          {MatchAndBetfair && MatchAndBetfair.length > 0 ?
                            MatchAndBetfair.map((element, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <td className="">{element && element.selectionName ? element.selectionName : "-"}({element && element.marketName ? element.marketName : "-"})</td>
                                  <td className="text-center">{element && element.odds ? element.odds : 0}</td>
                                  <td className="text-center">{element && element.stack ? element.stack : 0}</td>
                                </tr>
                              </React.Fragment>
                            )) : null

                          }
                        </>

                        <>
                          {MatchFancy && MatchFancy.length > 0 ?
                            MatchFancy.map((element, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <td className="text-center">{element && element.fancy_name ? element.fancy_name : "-"}

                                    {/* ({element && element.marketName ? element.marketName : "-"}) */}

                                  </td>
                                  <td className="text-center">{element && element.run ? element.run : 0}</td>
                                  <td className="text-center">{element && element.stack ? element.stack : 0}</td>
                                </tr>
                              </React.Fragment>
                            )) : null

                          }
                        </>


                      </tbody>
                    </table>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


        </div>
      </div>
    </div >

  );
};

export default CricketDetail;
