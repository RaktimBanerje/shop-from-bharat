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
                <h1 className="display-4 fw-bold">Welcome to Our Inner Page</h1>
                <p className="lead text-light">Explore the best of our content, products, and services.</p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.platforms}>
          
          <div class="row d-flex justify-content-center px-0">
            <div class="col-md-9">
                <h2 class="text-center text-dark">Bring Indian Products Home With The Most Trusted Online Shipping Store Globally                </h2>
                
                <p class="text-center text-dark">Looking for international shipping online stores that simplify delivery for you? We, at Shop From Bharat have made it easier for you to bring home products made in India. Whether you're shopping on Amazon India online shopping or exploring the best deals on Flipkart online shopping, we make delivery seamless.</p>
                
                <p class="text-center text-dark">Get your favorite products from international shopping sites India delivered to your doorstep without any damage. With our reliable international shipping online stores, you can now enjoy seamless shipping of Indian goods worldwide, from fashion to electronics, home decor, and more. Experience hassle-free shopping and quick delivery with us, wherever you are!</p>
            </div>
          </div>

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
