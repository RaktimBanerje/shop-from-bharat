// "use client"; This is needed to use client-side hooks like useState and localStorage in Next.js
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Header/Navbar";
import styles from "./Works.module.css";
import Virtual from "./Virtual";
import AssistedPurchase from "./AssistedPurchase";
// import "react-tooltip/dist/react-tooltip.css";  // Corrected import path
import Footer from "../Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally

const Works = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if window is defined to avoid SSR issues with localStorage
    if (typeof window !== "undefined") {
      // Set the token (if you need to keep the logic from your example)
      const token = localStorage.getItem('BHARAT_TOKEN');

      // Your existing code for adjusting the '.fullwidth' element's position
      const onloadmethod = () => {
        const fullwidth = document.querySelector('.fullwidth').offsetWidth;
        document.querySelector('.fullwidth').style.left = `-${fullwidth / 2}px`;
      };

      // Call onloadmethod on page load
      window.onload = onloadmethod;

      // If you need to clean up (e.g., for when component unmounts)
      return () => {
        window.onload = null; // Clean up the event handler if needed
      };
    }
  }, []);

  useEffect(() => {
    // Check if window is defined to avoid SSR issues
    if (typeof window !== 'undefined') {
      // This function mimics your onloadmethod functionality
      const onloadmethod = () => {
        const fullwidth = document.querySelector('.fullwidth').offsetWidth;
        document.querySelector('.fullwidth').style.left = `-${fullwidth / 2}px`;
      };

      // Call onloadmethod once the component is mounted
      onloadmethod();
      
      // Optionally, handle resizing events if you want to adjust it dynamically
      window.addEventListener('resize', onloadmethod);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('resize', onloadmethod);
      };
    }
  }, []); // Empty dependency array, so this runs once after the initial render


  
  return (
    <div className={styles.works}>
      <div className={styles.works_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>

        <section
          className="bg-dark text-white text-center py-5 d-flex align-items-center fullwidth"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1920x600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="display-4 fw-bold">How it Works</h1>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.works_info}>
        
          <div class="row d-flex justify-content-center px-0">
            <div class="col-md-9">
                <h2 class="text-center text-dark">How Can You Shop Your Favourite Products Made In India?</h2>
                
                <p class="text-center text-dark">Looking forward to seamless Indian clothes international shipping? We have made it easier for you. Follow these simple steps and shop for your favorite “Made in India” goods: </p>
            </div>
          </div>
          {/* Uncomment if you're using the tabs */}
          {/* <div className={styles.works_header}>
            <div className={styles.horizontal_tabs}>
              <button
                className={`${styles.assisted_btn} ${tab === 0 ? styles.active : ""}`}
                onClick={() => toggleTab(0)}
              >
                Assisted Purchase
              </button>
              <button
                className={`${styles.virtual_btn} ${tab === 1 ? styles.active : ""}`}
                onClick={() => toggleTab(1)}
              >
                Virtual Indian Address
              </button>
            </div>
          </div> */}
          {/* {tab === 1 ? <Virtual /> : <AssistedPurchase />} */}
          <AssistedPurchase />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Works;
