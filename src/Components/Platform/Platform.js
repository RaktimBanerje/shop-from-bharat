'use client'; // Mark this component as client-side

import React, { useEffect, useState } from "react";
import styles from "./Platform.module.css"; // Correct path to your CSS
import Navbar from "../Header/Navbar";
import PlatformSvg from "../../assets/platform.svg";
import MeeshoTechSvg from "../../assets/meesho_tech.svg";
import GoArrowSvg from "../../assets/go_arrow.svg";
import { platforms } from "../../platforms"; // Assuming platforms is a local data file
import Image from "next/image"; // For Next.js Image Optimization
import PlaceOrderModal from "../PlaceOrder";
import OnlineShoppingIcon from "../../assets/online-shopping-sale.png";
import Link from "next/link"; // Using Next.js Link component

const Platform = () => {
  const filters = [
    "ALL CATEGORIES",
    "MEN'S FASHION",
    "WOMEN'S FASHION",
    "MARKETPLACE",
    "HEALTH & BEAUTY",
    "CONSUMER ELECTRONICS",
    "LIGHTS & FURNITURES",
    "JEWELS & TIME PIECES",
    "ENVIRONMENT FRIENDLY",
    "CHILDREN STORE",
    "SPORTS & TOYS",
    "ACCESSORIES",
    "HOME & KITCHEN",
    "VEHICLES",
    "INDIAN BRANDS",
    "LUXURY",
    "INTERNATIONAL BRANDS IN INDIA",
    "PET SUPPLIES",
    "MUSICAL INSTRUMENT",
    "BUSINESS, EQUIPMENT & SCIENCE",
  ];

  const [token, setToken] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL CATEGORIES");
  const [filteredPlatforms, setFilteredPlatforms] = useState(platforms);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("BHARAT_TOKEN"));
  }, []);

  // Function to filter platforms based on selected category
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "ALL CATEGORIES") {
      setFilteredPlatforms(platforms); // Show all platforms
    } else {
      const filtered = platforms.filter((platform) =>
        platform.categories.some((category) =>
          category.toLowerCase().includes(filter.toLowerCase())
        )
      );
      setFilteredPlatforms(filtered); // Show filtered platforms
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true); // Show modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide modal
    window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.platform}>
      <div className={styles.platform_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>
        <div className={styles.platforms}>
          <div className={styles.platform__header}>
            <div className={styles.platforms_info}>
              <h2>Shopping sites?</h2>
              <p>
                These are the best and most trending shopping websites from India where you can shop with us
              </p>
            </div>
            <div className={styles.platform_image}>
              <Image src={PlatformSvg} alt="Platform" />
            </div>
          </div>

          <div className={styles.platforms_section}>
            <div className={styles.filter_platforms}>
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className={`${styles.filter_name} ${activeFilter === filter ? styles.active : ""}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>
            <div className={styles.platforms_list_container}>
              <div className={styles.platforms_list}>
                {filteredPlatforms.map((platform, index) => (
                  <Link href={platform.link} target="_blank" key={index}>
                    <div className={styles.platform_item}>
                      <div className={styles.platform_img}>
                        <Image src={platform.imgSrc} alt={platform.name} />
                      </div>
                      <div className={styles.platform_link}>
                        <p>{platform.name}</p>
                        <Image src={GoArrowSvg} alt="Arrow icon" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={styles.platform__footer}>
                <div className={styles.platforms_info}>
                  <h2>Unable to find your favorite website?</h2>
                  <p>
                    We understand! You can still place an order by pasting the link of your favorite product.
                  </p>
                  <button className={styles.place_order_btn} onClick={handleOpenModal}>
                    <span>PLACE ORDER</span>
                  </button>
                  <PlaceOrderModal isVisible={isModalVisible} onClose={handleCloseModal} />
                </div>
                <div className={styles.platform_image}>
                  <Image src={OnlineShoppingIcon} alt="Online Shopping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
