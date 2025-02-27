// "use client"; This is needed to use client-side hooks like useState and localStorage in Next.js
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Header/Navbar";
import styles from "./Works.module.css";
import Virtual from "./Virtual";
import AssistedPurchase from "./AssistedPurchase";
// import "react-tooltip/dist/react-tooltip.css";  // Corrected import path
import Footer from "../Footer/Footer";

const Works = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if window is defined to avoid SSR issues with localStorage
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem('BHARAT_TOKEN'));
    }
  }, []);

  return (
    <div className={styles.works}>
      <div className={styles.works_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>
        <div className={styles.works_info}>
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
