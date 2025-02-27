import React from "react";
import styles from "./AssistedPurchase.module.css";
import RightSvg from "../../assets/right.svg";
import LeftSvg from "../../assets/left.svg";
import Image from "next/image"; // Import Image from next/image

const steps = [
  {
    step: 1,
    title: "1. SIGN UP AND GET A UNIQUE ADDRESS",
    description:
      "Sign up with our easy online registration form and instantly get your own free Unique address in India to Start shopping straight away.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 2,
    title: "2. START SHOPPING",
    description:
      "Shop from local and international top brands and get deals from online stores in India.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 3,
    title: "3. WAIT FOR YOUR ORDERS",
    description:
      "After you place your orders, we receive and consolidate them at the chosen Shop from Bharat Virtual Address.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
  {
    step: 4,
    title: "4. PAYMENT AND DELIVERY",
    description:
      "From your account on Shop from Bharat, you can manage, ship, and track all your packages from India, till delivery to your doorstep. Get regular updates from Shop From India team till you receive your order.",
    videoSrc: "https://www.youtube.com/embed/0Oacr8VrnNk?si=YzCrNf7pHR2_Qx5Q",
  },
];

const Virtual = () => {
  return (
    <div className={styles.assisted_page}>
      {steps.map((step, index) => (
        <div key={index} className={styles.assisted_page_wrapper}>
          {step.step % 2 === 0 && step.step !== steps.length && (
            <Image
              src={LeftSvg}
              alt="Left Arrow"
              className={styles.arrow_left}
              width={24} // Set the appropriate width
              height={24} // Set the appropriate height
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
              width={24} // Set the appropriate width
              height={24} // Set the appropriate height
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Virtual;
