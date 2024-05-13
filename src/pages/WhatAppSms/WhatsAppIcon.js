import React from 'react';
import queryString from 'query-string';

const WhatsAppIcon = ({ phoneNumber, message }) => {
    const handleWhatsAppClick = () => {
        const queryParams = queryString.stringify({
            phone: phoneNumber,
            text: message,
        });
        // const whatsappUrl = `https://wa.me/?${queryParams}`;
        const whatsappUrl = `https://api.whatsapp.com/send?${queryParams}`;
        window.open(whatsappUrl, '_blank');
        console.log('whatsappUrl', whatsappUrl);

    };
    return (
        <div>
            <button onClick={handleWhatsAppClick}>
                <img src="https://herobook.in/images/whatsapp.png" alt="WhatsApp" />
                <h1> hello .....</h1>
            </button>
        </div>
    );
};

export default WhatsAppIcon;
