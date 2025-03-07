import React, { useState, forwardRef } from 'react';
import styles from "./Accordion.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

export const accordionData = [
  {
    id: 1,
    title: "What is Shop From Bharat?",
    content: `Shop From Bharat is an online platform that allows customers outside India to purchase authentic Indian products directly from Indian brands and online marketplaces. We also offer sourcing services for bulk purchases, enabling buyers to procure items directly from manufacturers. Our mission is to showcase the richness and diversity of Indian products on the global stage, emphasizing quality, reliability, and cultural authenticity.`,
  },
  {
    id: 2,
    title: "Which countries does Shop From Bharat deliver to?",
    content: `Shop From Bharat delivers globally. No matter where you are, you can place an order with us, and we will ensure delivery to your specified location.`,
  },
  {
    id: 3,
    title: "How can I place an order with Shop From Bharat?",
    content: (
      <div className={styles.accordion_three}>
        <div>
        Placing an order is simple and can be done through two convenient methods:
        </div>
        <div className={styles.accordion_points}>
          <div>
            1.<strong> Online</strong>:
            Sign up on our platform, fill out the order form by pasting product links and other details, and proceed with payment.
          </div>
          <div>
            2.<strong> WhatsApp</strong>:
             Share product links and relevant details directly via WhatsApp. Payments can be made through the secure payment link provided.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "What type of products can i buy from Shop from Bharat?",
    // content: `Shop from Bharat offers a wide variety of products, including traditional Indian clothing, handicrafts, home decor, jewelry,gems,footwear,skincare, toys and more. You can also shop authentic furnitures, appliances, kitchen ware,marbles, granites,tiles too. We cater anykind of quantity for your personal use along with reselling purpose in the respectable countries. Our platform is designed to showcase the best of Indian craftsmanship and culture, catering to global audience.`,
    content: (
      <div >
      Shop From Bharat offers an extensive range of products, including:
      <ul style={{color:"black",listStyleType: "circle",marginLeft:"20px"}}>
        <li style={{color:"black"}}>Traditional Indian attire</li>
        <li style={{color:"black"}}>Handicrafts</li>
        <li style={{color:"black"}}>Home decor</li>
        <li style={{color:"black"}}>Jewelry and gemstones</li>
        <li style={{color:"black"}}>Footwear</li>
        <li style={{color:"black"}}>Skincare products</li>
        <li style={{color:"black"}}>Toys</li>
        <li style={{color:"black"}}>Furniture, appliances, kitchenware, marbles, granites, tiles, and more</li>
      </ul>
      </div>
    ),
  },
  {
    id: 5,
    title: "How are the products sourced and guranteed authentic?",
    content: `We cater to both personal and commercial quantities, ensuring a seamless experience for individual buyers and resellers. Our platform highlights the finest of Indian craftsmanship and culture for a global audience.
    `,
  },
  {
    id: 6,
    title: "Are orders subject to duties and taxes?",
    content: `Yes, you are responsible for any duties and taxes applicable to your order. These charges depend on the destination country, origin, and value of the shipment. We recommend consulting your local customs office for the most accurate and up-to-date information.`,
  },
  {
    id: 7,
    title: "Do you facilitate offline purchases?",
    content: `Yes, we provide offline purchase services. You can select the product, and we will purchase it on your behalf, handle collection, and dispatch it to your designated country. This service is available for any quantity you wish to order.`,
  },
  {
    id: 8,
    title: "How are shipping rates calculated?",
    content: `Shipping rates are determined based on the size and volume of your consolidated order. While we can provide an estimated delivery cost, the exact amount will only be confirmed once the consignment is ready for dispatch.`,
  },

];

const Accordion = forwardRef ((props, ref) => {
  const [activeId, setActiveId] = useState(null);

  const handleActive = (id) => {
    setActiveId((prevActiveId) => (prevActiveId === id ? null : id));
  };

  return (
    <div ref={ref} className={styles.accordionMain}>
      <div className={styles.accordion_heading}>
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
      </div>
      <div className={styles.accordion}>
        {accordionData.map(({ title, content, id }) => (
          <div className={styles.accordion_item} key={id}>
            <div
              className={styles.accordion_title}
              onClick={() => handleActive(id)}
            >
              <div className={styles.accordion_mainTitle}>{title}</div>
              <div>{activeId === id ? <ChevronDown /> : <ChevronUp />}</div>
            </div>
            {activeId === id && (
              <div className={styles.accordion_content}>{content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Accordion;
