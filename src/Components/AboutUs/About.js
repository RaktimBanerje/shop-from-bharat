import React from "react";
import styles from "./About.module.css";
import Image from 'next/image';  // Importing Image from next/image
import AllItemsSvg from "../../assets/allSites.svg";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about_container}>
        <div className={styles.about_left}>
          <h6>ABOUT US</h6>
          <h3 className={styles.about_left_heading}>
            At Shop From Bharat, our mission is to simplify global access to authentic Indian products
          </h3>
          <div className={styles.about_left_info}>
            <div style={{fontSize:"14px"}}> We bridge the gap for international shoppers by enabling them to purchase directly from renowned Indian marketplaces such as Amazon India, Flipkart, Myntra, Industrybuying, Indiamart, and trusted Indian brands like FabIndia, Mamaearth, Lenskart, Boat, Ola, Claycraft, Forest Essentials, Tatacliq, Ajio, and many more.</div>
            <span style={{fontSize:"14px",color:"#475467E5"}}> As the demand for Indian products continues to grow worldwide, we’ve built a platform that offers a seamless shopping experience. Since many Indian platforms do not support international shipping, Shop From Bharat provides a comprehensive solution by consolidating orders across platforms and delivering them directly to your doorstep. Whether you're looking for personal shopping or business sourcing, we are your trusted partners in India </span>
          </div>

          {/* Using next/image for image optimization */}
          <Image 
            src={AllItemsSvg}
            alt="All Items"
            width={500}  // You can adjust this to your preferred width
            height={300}  // You can adjust this to your preferred height
            className={styles.all_items_image}  // Optional: Add a class for styling
          />

          <div>
            <h1>Why Choose Shop From Bharat?</h1>
            <div style={{color:"black"}}>At <b>Shop From Bharat</b>, we treat every order as if it were our own. Our dedicated team ensures:</div>
            <ul style={{listStyleType:"circle"}} >
              <li style={{fontSize:"14px",color:"#475467E5",marginLeft:"40px"}}> A hassle-free shopping and sourcing experience</li>
              <li style={{fontSize:"14px",color:"#475467E5",marginLeft:"40px"}}> Secure packaging and reliable delivery services</li>
              <li style={{fontSize:"14px",color:"#475467E5",marginLeft:"40px"}}> Unparalleled customer support.</li>
            </ul>
            <div style={{fontSize:"14px",color:"#475467E5",marginTop:"20px"}}>
              We pride ourselves on delivering excellence and providing outstanding customer service. Our team is always ready to assist you with any inquiries or requirements, whether by email or WhatsApp.
            </div>
            <h2 style={{color:"black",marginTop:"20px"}}>Your Trusted Partner</h2>
            <div style={{fontSize:"14px",color:"#475467E5"}}>We’re committed to making your international shopping and sourcing journey smooth, cost-effective, and enjoyable. Whatever you need from India, we’re just a message away and eager to assist.</div>
          </div>
        </div>
        <div className={styles.about_right}>
            <iframe
              width="600"
              height="340"
              src="https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
