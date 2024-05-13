import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
//scss
import "./Cricket.scss";
import styleMain from "./Main.module.scss";
import "./index.css";
//components
import BallByBallData from "../Sports/Cricket/BallByBallData";

const BallByBall = () => {
  const { game_id, providerName } = useParams();
  const dispatch = useDispatch();
  let casinoData = useSelector(state => state.users.game_login);
  let game_lobby_Data = useSelector(state => state.users.game_lobby);
  let { url, token } = game_lobby_Data ? game_lobby_Data : {};

  useEffect(() => {
    dispatch(userActions.game_lobby({ "gameId": game_id }))
  }, []);

  return (
    <div>
      <div className="center-main-container ball-by-ball detail-page">
        <div className="center-container w-100 h-100">
          <div className="detail-page-container">

            <div className="iframe-container">
              <iframe
                width="560"
                height="660"
                src={url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>

          </div>

        </div>


      </div>
    </div>
  );
};

export default BallByBall;
