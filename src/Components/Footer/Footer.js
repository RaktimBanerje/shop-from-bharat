import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image"; // For optimized image loading
import LogoIcon from "../../assets/shopBharat.svg";
import TwitterSvg from "../../assets/twitter.svg";
import Youtube from "../../assets/youtube.jpg";
import InstaSvg from "../../assets/instagram.svg";
import LinkedSvg from "../../assets/linkedin.svg";
import TiktokSvg from "../../assets/tiktok.svg";
import FaceBookSvg from "../../assets/facebook.svg";
import Link from "next/link"; // Using Next.js' Link component

const Footer = ({ scrollToFAQ, scrollToPartners }) => {
  // Handler to scroll to the top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_content}>
          <div className={styles.footer_col}>
            <h3>ShopFromBharat</h3>
            <ul>
              <li>
                <Link href="/about-us" legacyBehavior>
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" legacyBehavior>
                  <a>How it Works ?</a>
                </Link>
              </li>
              {/* <li>
                <Link href="/" onClick={handleScrollToTop} legacyBehavior>
                  <a>Place Order</a>
                </Link>
              </li> */}
              <li>Contact Us</li>
              <li>
                <Link href="/#partners" onClick={scrollToPartners} legacyBehavior>
                  <a>Delivery Partners</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer_col} style={{ width: '-webkit-fill-available' }}>
            <h3>Important Links</h3>
            <ul>
              <li>
                <Link href="/#faq" onClick={scrollToFAQ} legacyBehavior>
                  <a>FAQ</a>
                </Link>
              </li>
              <li style={{ minWidth: "120px" }}>
                <Link href="/privacy-policy" legacyBehavior>
                  <a>Privacy policy</a>
                </Link>
              </li>
              <li style={{ minWidth: "120px" }}>
                <Link href="/refund-policy" legacyBehavior>
                  <a>Refund policy</a>
                </Link>
              </li>
              <li style={{ minWidth: "120px" }}>
                <Link href="/terms-condition" legacyBehavior>
                  <a>Terms And Condition</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer_col}>
            <h3>Headquarters</h3>
            <ul>
              <li>Startup Lane, 381, 1st Main Rd, 7th Block, Koramangala, Bengaluru, Karnataka 560095</li>
              <li>Email - info@shopfrombharat.com</li>
            </ul>
          </div>
          <div className={styles.footer_col}>
            <h3>Contact Us</h3>
            <div className={styles.footer_input}>
              <input className={styles.input} type="text" placeholder="Enter your Email" />
              <button className={styles.button}>Subscribe</button>
            </div>
            {/* <ul className={styles.socials_list}>
              <a href="https://x.com/SHANKY7771" target="_blank" rel="noopener noreferrer">
                <li className={styles.social_media}>
                  <Image src={TwitterSvg} alt="Twitter" width={20} height={20} />
                </li>
              </a>
              <a href="https://youtube.com/@shopfrombharat?si=V61E9K2Z5cw3M3xp" target="_blank" rel="noopener noreferrer">
                <li className={styles.social_media}>
                  <Image src={Youtube} alt="YouTube" width={20} height={20} />
                </li>
              </a>
              <a href="https://www.instagram.com/shopfrombharat.official" target="_blank" rel="noopener noreferrer">
                <li className={styles.social_media}>
                  <Image src={InstaSvg} alt="Instagram" width={20} height={20} />
                </li>
              </a>
              <a href="https://www.facebook.com/shopfrombharatofficial" target="_blank" rel="noopener noreferrer">
                <li className={styles.social_media}>
                  <Image src={FaceBookSvg} alt="Facebook" width={20} height={20} />
                </li>
              </a>
            </ul> */}
          </div>
        </div>
        <div className={styles.footer_copyright}>
          <div className={styles.footer_brand}>
            <Image src={LogoIcon} alt="ShopBharat Logo" width={100} height={30} />
          </div>
          <div className={styles.copyright}>&copy; 2024 All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
