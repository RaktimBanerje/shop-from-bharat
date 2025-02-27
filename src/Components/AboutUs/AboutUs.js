import React, { useEffect, useState } from "react";
import styles from "./AboutUs.module.css";
import Navbar from "../Header/Navbar";
import About from "./About";
import Possible from "./Possible";
import Accordion from "../Accordion/Accordion";
import Footer from "../Footer/Footer";

const AboutUs = () => {

  const [token, setToken] = useState()


  useEffect(() => {
    setToken(localStorage.getItem('BHARAT_TOKEN'))
  }, [])

  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUs_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>
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
