import React from "react";
import styles from "./Sites.module.css";
import SearchSvg from "../../assets/Search.svg";
import FilterSvg from "../../assets/Filter.svg";
import ArrowSvg from "../../assets/Vector.svg";
import AmazonSvg from "../../assets/amazon.svg";
import ZaraSvg from "../../assets/zara.svg";
import FirstCrySvg from "../../assets/firstcry.svg";
import FlipkartSvg from "../../assets/flipkart.svg";
import TataSvg from "../../assets/tata.svg";
import MeeshoSvg from "../../assets/meesho.svg";
import ShopSvg from "../../assets/shopclues.svg";
import NykaaSvg from "../../assets/nykaa.svg";
import MyntraLogo from '../../assets/myntra.png';
import LenskartLogo from '../../assets/lenskart.png';
import BoatLogo from '../../assets/boat.png';
import KhadiLogo from '../../assets/khadinatural.webp';
import NeemanLogo from '../../assets/naamans.webp';
import HeadsLogo from '../../assets/headsupfortails.jpg';
import MokobaraLogo from '../../assets/mokobara.jpg';
import VegNonVegLogo from '../../assets/vegnonveg.png';
import Link from 'next/link'; // Import Next.js Link
import Image from 'next/image';

const items = [
  {
    itemSrc: AmazonSvg,
    url: "https://www.amazon.in/",
  },
  {
    itemSrc: FlipkartSvg,
    url: "https://www.flipkart.com/",
  },
  {
    itemSrc: MyntraLogo,
    url: "https://www.myntra.com",
  },
  {
    itemSrc: NykaaSvg,
    url: "https://www.nykaa.com/",
  },
  {
    itemSrc: TataSvg,
    url: "https://www.tatacliq.com/",
  },
  {
    itemSrc: LenskartLogo,
    url: "https://www.lenskart.com",
  },
  {
    itemSrc: BoatLogo,
    url: "https://www.boat-lifestyle.com/",
  },
  {
    itemSrc: KhadiLogo,
    url: "https://www.khadinatural.com",
  },
  {
    itemSrc: NeemanLogo,
    url: "https://neemans.com",
  },
  {
    itemSrc: HeadsLogo,
    url: "https://headsupfortails.com/",
  },
  {
    itemSrc: MokobaraLogo,
    url: "https://mokobara.com",
  },
  {
    itemSrc: VegNonVegLogo,
    url: "https://www.vegnonveg.com",
  },
];

const Sites = () => {
  return (
    <div className={styles.sites}>
      <div className={styles.sites_container}>
        <div className={styles.sites_header}>
          <div className={styles.heading}>
            <h2><b>Recommended sites from India</b></h2>
          </div>
          <div className={styles.sites_right}>
            {/* Search and Filter inputs can be implemented as needed */}
            {/* <div className={styles.inputWrapper}>
              <img
                src={SearchSvg}
                alt="search icon"
                className={styles.searchIcon}
              />
              <input
                className={styles.input}
                placeholder="Search for Websites"
              />
              <img
                src={FilterSvg}
                alt="Filter icon"
                className={styles.filterIcon}
              />
            </div> */}
            <Link href="/platforms" className={styles.sites_viewall}>
              <div className={styles.sites_view}>View All</div>
              <img className={styles.arrowIcon} src={ArrowSvg} alt="Arrow icon" />
            </Link>

          </div>
        </div>
        <div className={styles.sites_items}>
          {items.map((item, index) => (
            <div className={styles.site_item} key={index}>
              <div className={styles.site_item_image}>
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                <Image 
                    src={item.itemSrc} 
                    alt="Site logo" 
                    width={100} // Set width based on your design
                    height={100} // Set height based on your design
                    layout="intrinsic" // Or use "responsive" if you want responsive images
                />
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sites;
