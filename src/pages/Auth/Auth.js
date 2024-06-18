import React from "react";
import Login from "./Login/Login";
import {
  Link
} from "react-router-dom";
//scss
import style from "./Auth.module.scss";
import queryString from 'query-string';

const Auth = (
) => {

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
    <div className={style.authWrapper}>
      <Login />
      <div className={style.supportBar}>
        <div className="row">
          <div className="col-lg-4 p-1">
            {/* <h6 className={style.h6}>
              +91 7299444466 / +91 7299444488
            </h6> */}
          </div>
          <div className="col-lg-4 p-1">
            <h2>24X7 Support</h2>
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
            
              <div 
              // onClick={handleWhatsAppClick} 
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
    </div >
  );
};

export default Auth;
