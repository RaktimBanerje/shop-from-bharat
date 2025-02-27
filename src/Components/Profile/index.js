"use client";

import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import Navbar from "../Header/Navbar";
import Account from "./Account";
import Addresses from "./Addresses";
import Orders from "./Orders";
import Payment from "./Payment";

const tabs = [
  {
    id: 1,
    name: "Account Details",
  },
  {
    id: 2,
    name: "Saved Address",
  },
  {
    id: 3,
    name: "Orders",
  },
  // {
  //   id: 4,
  //   name: "Payment Methods",
  // },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [token, setToken] = useState()

  const toggleTab = (val) => {
    setActiveTab(val);
  };

  useEffect(() => {
    setToken(localStorage.getItem('BHARAT_TOKEN'))
  }, [])

  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>
        <div className={styles.selected_tab}>
          <div className={styles.profile_tabs}>
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`${styles.profile_tab} ${
                  activeTab === tab.id ? styles.active : ""
                }`}
                onClick={() => toggleTab(tab.id)}
              >
                {tab.name}
              </div>
            ))}
          </div>
          {activeTab === 1 ? <Account /> : activeTab === 2 ? <Addresses /> : activeTab === 3 ? <Orders /> : <Payment />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
