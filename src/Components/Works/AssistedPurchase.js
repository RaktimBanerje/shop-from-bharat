import React from "react";
import styles from "./AssistedPurchase.module.css";
import RightSvg from "../../assets/right.svg";
import LeftSvg from "../../assets/left.svg";
import Image from "next/image"; // Import Image from next/image

const steps = [
  {
    step: 1,
    title: "1. Join Shop From Bharat for Free!",
    description:
      "Sign up with Shop From Bharat to create your profile and gain access to unlimited product links.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 2,
    title: "2. Add Product Links.",
    description:
      "Select your desired products from any Indian platform and paste the links into the order form. You can add multiple product links and provide the necessary details. Alternatively, you can share the links directly with us via WhatsApp along with the required information to confirm your order.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 3,
    title: "3. Provide Your Address and Make the Payment.",
    description:
      "Once the product links are shared, fill out your delivery address and proceed with the payment. After the payment is completed, our online shopping assistant team will place the order on your behalf.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 4,
    title: "4. Receive and Consolidate Your Orders",
    description:
      "When your products are delivered to our warehouse, we will notify you of their arrival. After receiving all your parcels, we will consolidate and securely pack them, preparing them for dispatch.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 5,
    title: "5. Enjoy Quick, Reliable, and Stress-Free Delivery.",
    description:
      "Excited to receive your order? We understand the anticipation! Once your shipment is dispatched, we will provide real-time tracking so you can stay updated on the delivery status of your parcel.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
];

const AssistedPurchase = () => {
  return (
    <div className={styles.assisted_page}>
      {steps.map((step, index) => (
        <div key={index} className={styles.assisted_page_wrapper}>
          {step.step % 2 === 0 && step.step !== steps.length && (
            <Image
              src={LeftSvg}
              alt="Left Arrow"
              className={styles.arrow_left}
              width={24} // Adjust width as needed
              height={24} // Adjust height as needed
            />
          )}

          <div
            className={`${styles.assisted_page_step} ${
              index % 2 === 0 ? styles.odd : styles.even
            }`}
          >
            <div className={styles.step_info}>
              <span className={styles.step_number}>STEP {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <div className={styles.step_video}>
              <iframe
                width="278"
                height="154"
                src={step.videoSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {step.step % 2 !== 0 && step.step !== steps.length && (
            <Image
              src={RightSvg}
              alt="Right Arrow"
              className={styles.arrow_right}
              width={24} // Adjust width as needed
              height={24} // Adjust height as needed
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AssistedPurchase;
