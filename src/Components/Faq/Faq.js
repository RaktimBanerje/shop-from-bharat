// "use client"; This is needed to use client-side hooks like useState and localStorage in Next.js
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Faq.module.css";
import Accordion from "../Accordion/Accordion";

const Faq = () => {
  const [token, setToken] = useState(null);  // Initialize state as null to avoid undefined issues

  useEffect(() => {
    // Check if window is defined to avoid SSR issues with localStorage
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem('BHARAT_TOKEN'));
    }
  }, []);

  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUs_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>

        <section
          className="bg-dark text-white text-center py-5 d-flex align-items-center fullwidth"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1920x600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginLeft: -120
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="display-4 fw-bold">FAQ</h1>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.items_container}>
          <Accordion />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Faq;
