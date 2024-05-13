import React from 'react'
import {
  useNavigate
  // , withRouter 
} from 'react-router-dom';

const Lottery = () => {
  const navigate = useNavigate();

  console.log('lottery.................///////////////////');



  return (

    <>
      <div>Lottery</div>
      <div onClick={() => navigate('/home')} >Lotteryqqqqqqqqqqqq</div>
      <div onClick={() => navigate('/account-statement')} >ddddddddd</div>
      <div onClick={() => navigate('/match-detail/4/10479856/32912552/1.223268948')} >ffffffffffffff</div>
      <div onClick={() => navigate('/home')} >cccccccccccccccc</div>


    </>
  )
}

export default Lottery