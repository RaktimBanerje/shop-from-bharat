import React, { useState } from 'react';
import styles from './FloatingIcon.module.css';
import Image from 'next/image'; // For optimized image loading
import FloatingIconImg from '../../assets/floating_icon.png'; 
import WhatsAppSVG from "../../assets/whatsapp.svg";
import PlaceOrderModal from '../PlaceOrder';

const FloatingIcon = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleToggle = () => {
    setShowButtons((prev) => !prev);
  };

  const handleOpenModal = () => {
    setModalVisible(true);  
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    // Optionally reset form or modal state here, avoid reloading the page
  };

  return (
    <div className={styles.floating_div}>

      {showButtons && (
        <div className={styles.button_container}>
            <button 
              type="button"
              className={styles.place_order_btn_popup} 
              onClick={handleOpenModal}>
                <p className={styles.place_order_btn_text}>PLACE ORDER</p>
                <PlaceOrderModal isVisible={isModalVisible} onClose={handleCloseModal} />
            </button>
            <button
              type="button"
              className={styles.directBtn}
              onClick={() => window.open("https://wa.me/9197317 33771 ", "_blank")}
            >
              <Image src={WhatsAppSVG} alt="WhatsApp" width={25} height={25} />
              DIRECT CONTACT
            </button>
        </div>
      )}
      
      <div className={styles.floating_button} onClick={handleToggle}>
        <Image 
          src={FloatingIconImg} 
          alt="Floating Icon" 
          width={60} // Adjust size for better responsiveness
          height={60} 
        />
      </div>

    </div>
  );
};

export default FloatingIcon;
