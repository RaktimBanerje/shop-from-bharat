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
      <Head>
      {/* Title Tag */}
      <title>Shop From Bharat - Buy Indian Products Online</title>

      {/* Meta Description */}
      <meta
        name="description"
        content="Shop From Bharat is your one-stop platform for buying Indian products online. Shop securely and get your favorite Indian items delivered worldwide."
      />

      {/* Meta Keywords */}
      <meta
        name="keywords"
        content="buy indian products online, indian products online shopping, indian products, wholesale products online india"
      />

      {/* Canonical Tag for Preventing Duplicate Content */}
      <link rel="canonical" href="https://www.shopfrombharat.com/" />

      {/* Open Graph Tags (for Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content="Shop From Bharat - Buy Indian Products Online" />
      <meta property="og:description" content="Shop From Bharat offers a wide range of Indian products with fast delivery worldwide." />
      <meta property="og:image" content="https://www.shopfrombharat.com/og-image.jpg" />
      <meta property="og:url" content="https://www.shopfrombharat.com/" />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags (for Twitter sharing) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Shop From Bharat - Buy Indian Products Online" />
      <meta name="twitter:description" content="Shop From Bharat offers a seamless platform for buying Indian products and shipping them internationally." />
      <meta name="twitter:image" content="https://www.shopfrombharat.com/twitter-image.jpg" />
      <meta name="twitter:url" content="https://www.shopfrombharat.com/" />

      {/* Hreflang Tag (to specify language and region targeting) */}
      <link rel="alternate" href="https://www.shopfrombharat.com/" hreflang="en" />
      <link rel="alternate" href="https://www.shopfrombharat.com/in/" hreflang="en-IN" />

      {/* Structured Data (Schema.org JSON-LD) */}
      <script type="application/ld+json">
        {{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Shop From Bharat",
          "url": "https://www.shopfrombharat.com",
          "logo": "https://www.shopfrombharat.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/shopfrombharat",
            "https://twitter.com/shopfrombharat"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXXXXXXXX",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": "English"
          }
        }}
      </script>

      {/* Preconnect to external domains for faster connections */}
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Robots meta tag for controlling crawling */}
      <meta name="robots" content="index, follow" />

      {/* Link to Sitemap */}
      <link rel="sitemap" type="application/xml" href="https://www.shopfrombharat.com/sitemap.xml" />

      {/* Cache-Control headers for faster loading */}
      <meta httpEquiv="Cache-Control" content="max-age=31536000, public" />

      {/* Add additional meta tags for social sharing and SEO as necessary */}
    </Head>

    <header className={styles.header}>
      <div className={styles.container}>
        <Navbar token={token} />
      </div>
      <div className={styles.header_content}>
        <div className={styles.header_info}>
          <div className={styles.header_main}>
            <h2>
              Shop Products from <span>INDIA</span>
            </h2>
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
