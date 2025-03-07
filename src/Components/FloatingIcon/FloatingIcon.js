import React, { useState } from 'react';
import Image from 'next/image';
import wpIcon from '../../assets/wp-icon.png';
import wpBg from '../../assets/wp-bg.png';

const FloatingIcon = () => {
  return (
    <div className="whatsapp-area-main">
      <a href="https://wa.me/9266767836?text=Hello" target="_blank" rel="noopener noreferrer">
      <div className="bg-area">
          <Image src={wpBg} alt="WhatsApp Background" layout="responsive" unoptimized  />
        </div>
        <div className="whatsapp-area">
          <Image src={wpIcon} alt="WhatsApp Icon" layout="responsive" unoptimized  />
        </div>
      </a>
    </div>
  );
};

// const FloatingIcon = () => {
//   const [showButtons, setShowButtons] = useState(false);
//   const [isModalVisible, setModalVisible] = useState(false);

//   const handleToggle = () => {
//     setShowButtons((prev) => !prev);
//   };

//   const handleOpenModal = () => {
//     setModalVisible(true);  
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false); // Close the modal
//     // Optionally reset form or modal state here, avoid reloading the page
//   };

//   return (
//     <div classNameName={styles.floating_div}>

//       {showButtons && (
//         <div classNameName={styles.button_container}>
//             <button 
//               type="button"
//               classNameName={styles.place_order_btn_popup} 
//               onClick={handleOpenModal}>
//                 <p classNameName={styles.place_order_btn_text}>PLACE ORDER</p>
//                 <PlaceOrderModal isVisible={isModalVisible} onClose={handleCloseModal} />
//             </button>
//             <button
//               type="button"
//               classNameName={styles.directBtn}
//               onClick={() => window.open("https://wa.me/9197317 33771 ", "_blank")}
//             >
//               <Image src={WhatsAppSVG} alt="WhatsApp" width={25} height={25} />
//               DIRECT CONTACT
//             </button>
//         </div>
//       )}
      
//       <div classNameName={styles.floating_button} onClick={handleToggle}>
//         <Image 
//           src={FloatingIconImg} 
//           alt="Floating Icon" 
//           width={60}
//           height={60} 
//         />
//       </div>

//     </div>
//   );
// };

export default FloatingIcon;
