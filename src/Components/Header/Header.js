import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image"; // For optimized image loading
import HeaderImg from "../../assets/content.png"; // Make sure this path is correct in Next.js' /public folder
import FrameImg from "../../assets/Frame.png";
import CartImg from "../../assets/Buy.png";
import ProfileImg from "../../assets/Ellipse.png";
import SearchSvg from "../../assets/Search.svg";
import { Menu, X } from "lucide-react";
import Link from "next/link"; // Using Next.js' Link component
import Navbar from "./Navbar";
import { Tooltip } from "react-tooltip";
import PlaceOrderModal from "../PlaceOrder";
import '../../app/globals.css'
import Head from 'next/head';

const Header = ({ scrollToWYCO }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => {
    setModalVisible(true);  // Show modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide modal
    // window.location.reload()
  };

  useEffect(() => {
    setToken(localStorage.getItem('BHARAT_TOKEN'));
  }, []);

  return (
    <>
    <header className={styles.header}>
      <div className={styles.container}>
        <Navbar token={token} />
      </div>
      <div className={`${styles.header_content} header-down-part`}>
        <div className={`${styles.header_info} header-info`}>
          <div className={styles.header_main}>
            <h1>
              Shop Products from <span style={{fontWeight: 'bold'}}>INDIA</span>
            </h1>
          </div>
          <div className={styles.header_paragraph}>
            <p>
              Bringing You the Best Selection of Authentic Indian Goods and Products, Delivered Right to Your Doorstep
            </p>
          </div>
          <div className={styles.header_main_input}>
            <div className={styles.header_input}>
              <button className={styles.place_order_btn} onClick={handleOpenModal}>
                <span>PLACE ORDER</span>
              </button>
              <button className={styles.explore_btn} onClick={scrollToWYCO}>
                <span>EXPLORE</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.header_img}>
          <Image src={HeaderImg} alt="header image" />
        </div>
      </div>
      <PlaceOrderModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </header>
    </>
  );
};

export default Header;
