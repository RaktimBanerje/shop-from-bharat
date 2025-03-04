import React from "react";
import styles from "./Services.module.css";
import Image from 'next/image';  // Import next/image for optimized images
import GroupZero from "../../assets/1000-happy-customers.jpg";
import GroupOne from '../../assets/60-orders-graphic.jpg'
import GroupTwo from "../../assets/Group2.svg";

const items = [
  {
    id: 1,
    itemSrc: GroupZero,
    itemDesc: "1000+ Happy Customers",
    width: 300,  // Define width and height for each image
    height: 200,
  },
  {
    id: 2,
    itemSrc: GroupOne,
    itemDesc: "60+ Websites to order",
    width: 300,
    height: 200,
  },
  {
    id: 3,
    itemSrc: GroupTwo,
    itemDesc: "Fast and trusted service",
    width: 300,
    height: 200,
  },
];

const Services = () => {
  return (
    <div className={styles.services}>
      <div className={styles.services_container}>
        <div className={styles.services_header}>
          <div className={styles.services_heading}>
            <h1 style={{fontSize: "2.5rem"}}><b>WHY USE OUR SERVICES?</b></h1>
          </div>
          <div className={styles.services_paragraph}>
            <p>Bringing you the best selection of Authentic Indian. Goods and Products Delivered Right to your doorstep</p>
          </div>
        </div>
        <div className={styles.services_info}>
          {items.map((item) => (
            <div key={item.id} className={styles.service_info}>
              {/* Use next/image here for optimized images */}
              <Image
                className={item.id === 3 ? styles.image_style_two : styles.image_style}
                src={item.itemSrc}
                alt={item.itemDesc}
                width={item.width}   // Set the width you want
                height={item.height} // Set the height you want
                style={{height: "100%"}}
              />
              <div className={styles.service_desc}>{item.itemDesc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
