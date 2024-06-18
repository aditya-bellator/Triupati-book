import React from "react";
import {
  Link
} from "react-router-dom";
//scss
import style from "./Footer.module.scss";
import queryString from 'query-string';
//images
import signal from "../../assets/png/signal.png";

const Footer = () => {

  const handleWhatsAppClick = () => {
    const queryParams = queryString.stringify({
      phone: "919971573938",
      text: "Hello! I'm interested in your services.",
    });
    const whatsappUrl = `https://api.whatsapp.com/send?${queryParams}`;
    window.open(whatsappUrl, '_blank');
    console.log('whatsappUrl', whatsappUrl);

  };

  return (
    <div>
      <div className={style.supportBar}>



        <div className="row">
          <div className="col-lg-4 ">
            {/* <h6 className={style.h6}>
              +91 7299444466 / +91 7299444488 
            </h6> */}
          </div>
          <div className="col-lg-4 ">
            <h2 style={{paddingBottom:"5px"}}>24X7 Support</h2>
          </div>
          <div className="col-lg-4 p-1">
            <div className={`${style.bottomIcons} d-inline-block d-flex justify-content-center`}>
              {/* <Link to={'https://www.facebook.com/share/FucFfUvJnNEcLJnP/?mibextid=qi2Omg'} > */}
                <img
                  src="https://herobook.in/images/facebook.png"
                  alt="18Plus"
                />
              {/* </Link> */}
              {/* <Link to={'https://www.instagram.com/herobookofficial?igsh=OGQ5ZDc2ODk2ZA=='} > */}
                <img
                  src="https://herobook.in/images/instagram.png"
                  alt="gamecare"
                />
              {/* </Link> */}
              {/* <Link to={'https://t.me/channel201610k'} > */}
                <img
                  src="https://herobook.in/images/telegram.png"
                  alt="gt"
                />
              {/* </Link> */}

              <div className={style.socialMIcon}
              //  onClick={handleWhatsAppClick} 
               >
                <img
                  src="https://herobook.in/images/whatsapp.png"
                  alt="gt"
                />
              </div>

            </div>
          </div>
        </div>



      </div>



      <div className={style.footerBottom}>

        <br />
        <div className={style.secureLogo}>
          <div>
            <img src="https://wver.sprintstaticdata.com/v3/static/front/img/ssl.png" alt="ssl" />
          </div>
          <div className="ml-2">
            <b>100% SAFE</b>
            <div>Protected connection and encrypted data.</div>
          </div>
        </div>
        <div className={`${style.bottomIcons} d-inline-block`}>
          <a href="#/" rel="noreferrer">
            <img
              src="https://g1ver.sprintstaticdata.com/v12/static/front/img/18plus.png"
              alt="18Plus"
            />
          </a>
          <a
            href="https://www.gamcare.org.uk/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://g1ver.sprintstaticdata.com/v12/static/front/img/gamecare.png"
              alt="gamecare"
            />
          </a>
          <a
            href="https://www.gamblingtherapy.org/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://g1ver.sprintstaticdata.com/v12/static/front/img/gt.png"
              alt="gt"
            />
          </a>
        </div>
      </div>
      <p className="text-center">© Copyright 2024. All Rights Reserved. Powered by TriupatiExch.</p>
    </div>
  );
};

export default Footer;
