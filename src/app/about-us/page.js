'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../Components/AboutUs/AboutUs.module.css'; // Correct path
import Navbar from '../../Components/Header/Navbar';
import About from '../../Components/AboutUs/About';
import Possible from '../../Components/AboutUs/Possible';
import Accordion from '../../Components/Accordion/Accordion';
import Footer from '../../Components/Footer/Footer';

const AboutUs = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Ensure we access localStorage only in the client-side
    if (typeof window !== 'undefined') {
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
                <h1 className="display-4 fw-bold">About Us</h1>
              </div>
            </div>
          </div>
        </section>
        
        <About />
        <div className={styles.items_container}>
          <Possible />
          {/* <Accordion /> */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
