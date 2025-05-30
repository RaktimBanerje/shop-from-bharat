"use client"

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

import Image from 'next/image';
import wpIcon from '../assets/wp-icon.png';
import wpBg from '../assets/wp-bg.png';
import PlaceOrderModal from "@/Components/PlaceOrder";

// Load the fonts from Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Shop From Bharat - Buy Indian Products Online",
//   description:
//     "Shop From Bharat is your one-stop platform for buying Indian products online. Shop securely and get your favorite Indian items delivered worldwide.",
// };

export default function RootLayout({ children }) {

  const [isModalVisible, setModalVisible] = useState(false);
  
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

  return (
    <html lang="en">
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
        <meta
          property="og:description"
          content="Shop From Bharat offers a wide range of Indian products with fast delivery worldwide."
        />
        <meta property="og:image" content="https://www.shopfrombharat.com/og-image.jpg" />
        <meta property="og:url" content="https://www.shopfrombharat.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags (for Twitter sharing) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop From Bharat - Buy Indian Products Online" />
        <meta
          name="twitter:description"
          content="Shop From Bharat offers a seamless platform for buying Indian products and shipping them internationally."
        />
        <meta name="twitter:image" content="https://www.shopfrombharat.com/twitter-image.jpg" />
        <meta name="twitter:url" content="https://www.shopfrombharat.com/" />

        {/* hreFlang Tag (to specify language and region targeting) */}
        <link rel="alternate" href="https://www.shopfrombharat.com/" hreFlang="en" />
        <link rel="alternate" href="https://www.shopfrombharat.com/in/" hreFlang="en-IN" />

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

        {/* hreFlang Tag (to specify language and region targeting) */}
        <link rel="alternate" href="https://www.shopfrombharat.com/" hreFlang="en" />
        <link rel="alternate" href="https://www.shopfrombharat.com/in/" hreFlang="en-IN" />
        <link rel="alternate" href="https://www.shopfrombharat.com/hi/" hreFlang="hi-IN" />
        <link rel="alternate" href="https://www.shopfrombharat.com/us/" hreFlang="en-US" />
        <link rel="alternate" href="https://www.shopfrombharat.com/fr/" hreFlang="fr-FR" />
        <link rel="alternate" href="https://www.shopfrombharat.com/es/" hreFlang="es-ES" />

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}


        <div className="floting-btn">
          <a href="#" className="p-btn" onClick={handleOpenModal}>Place Order</a>
        </div>

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

        <PlaceOrderModal isVisible={isModalVisible} onClose={handleCloseModal} />
      </body>      
    </html>
  );
}