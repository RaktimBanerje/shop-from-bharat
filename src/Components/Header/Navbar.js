// "use client"; This is needed to use client-side hooks like useState in Next.js
"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image"; // For optimized image loading
import CartImg from "../../assets/Buy.png";
import ProfileImg from "../../assets/Ellipse.png";
import SearchSvg from "../../assets/Search.svg";
import { Menu, X } from "lucide-react";
import Link from "next/link"; // Next.js Link component
// import BulkOrder from "../BulkOrder";
import ShopBharatLogo from "../../assets/shopBharat.svg";

const Navbar = ({ token }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle dropdown for profile
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("BHARAT_TOKEN");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("bharatId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    window.location.href = "/"; // Navigate back to the homepage
  };

  // Toggle bulk order modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.brand}>
          <Image src={ShopBharatLogo} alt="ShopBharat Logo" />
        </Link>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <Menu />
        </div>
        <ul className={`${styles.navlinks} ${isMenuOpen ? styles.open : ""}`}>
          {isMenuOpen && (
            <div className={styles.navbar_close} onClick={toggleMenu}>
              <X />
            </div>
          )}
          <li className={styles.how_it_works}>
            <Link href="/online-shopping-india" className={styles.label}>
              How it Works ?
            </Link>
          </li>
          <li className={styles.platforms}>
            <Link href="/shopping-sites-in-india" className={styles.label}>
              Shopping Sites
            </Link>
          </li>
          {/* <li onClick={toggleModal} className={styles.bulk_order}>
            <span>Bulk Order</span>
          </li> */}
          <li className={styles.about_us}>
            <Link href="/about-us" className={styles.label}>
              About Us
            </Link>
          </li>
          <li className={styles.about_us}>
            <Link href="/prohibited-items" className={styles.label}>
              Prohibited Items
            </Link>
          </li>
          <li className={styles.about_us}>
            <Link href="/faq" className={styles.label}>
              FAQ
            </Link>
          </li>
          <li className={styles.about_us}>
            <Link href="/blog" className={styles.label}>
              Blog
            </Link>
          </li>
          {!token && (
            <li className={styles.login}>
              <Link href="/login" className={styles.label}>
                Sign In
              </Link>
            </li>
          )}
          {token && (
            <li className={styles.profileWrapper} onClick={toggleDropdown}>
              <Image className={styles.profile} src={ProfileImg} alt="Profile" />
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <button
                    onClick={() => window.location.href = "/profile"}
                    className={styles.logoutBtn}
                  >
                    Profile
                  </button>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
      {/* <BulkOrder isVisible={isModalOpen} onClose={toggleModal} /> */}
    </>
  );
};

export default Navbar;
