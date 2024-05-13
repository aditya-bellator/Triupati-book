import React from 'react';
import WhatsAppIcon from './WhatsAppIcon'; // Assuming WhatsAppIcon component is in a separate file

const WhatAppSms = () => {
  return (
    <div>
      <h1>Click the WhatsApp icon to redirect</h1>
      <WhatsAppIcon phoneNumber="919971573938" message="Hello! I'm interested in your services." />
    </div>
  );
};

export default WhatAppSms;
