import React from "react";
import styles from "./Possible.module.css";
import Image from 'next/image';  // Import next/image for optimized images
import StepOne from "../../assets/step1.svg";
import StepTwo from "../../assets/step2.svg";
import StepThree from "../../assets/step3.svg";
import StepFour from "../../assets/step4.svg";

const steps = [
  {
    step: 1,
    title: "1. Effortless Shopping",
    description:
      " Simply share your product links via our order form or WhatsApp, and we’ll take care of the rest. We consolidate all your orders into a single shipment, minimizing your transportation costs.",
    imgSrc: StepOne,
    width: 100,  // Set the width and height for the images
    height: 100,
  },
  {
    step: 2,
    title: "2. Cost Efficiency",
    description:
      "By aggregating shipments, we help reduce your shipping costs by 50-60%, making international shopping more affordable.",
    imgSrc: StepTwo,
    width: 100,
    height: 100,
  },
  {
    step: 3,
    title: "3. Comprehensive Sourcing",
    description:
      "For businesses and individuals, we assist with sourcing bulk quantities of products, including furniture, home decor, jewelry, apparel, footwear, kitchenware, hardware, and more.",
    imgSrc: StepThree,
    width: 100,
    height: 100,
  },
  {
    step: 4,
    title: "4. Specialized Solutions",
    description:
      "If you're building a hotel, home, or any project requiring tiles, sanitary ware, marbles, granites, or other materials, we handle the sourcing and delivery from India.",
    imgSrc: StepFour,
    width: 100,
    height: 100,
  },
];

const Possible = () => {
  return (
    <div className={styles.possible}>
      <div className={styles.possible_container}>
        <h3>But how we make it possible?</h3>
        <div className={styles.possible_steps}>
          {steps.map((step) => (
            <div key={step.step} className={styles.step_box}>
              <div className={styles.step_left}>
                <div className={styles.box_step_number}>STEP {step.step}</div>
                <div className={styles.box_step}>{step.title}</div>
                <div className={styles.box_step_desc}>{step.description}</div>
              </div>
              <div className={styles.step_right}>
                {/* Use next/image here */}
                <Image
                  src={step.imgSrc}
                  alt={`Step ${step.step} image`}
                  width={step.width}  // Set the width you want
                  height={step.height}  // Set the height you want
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Possible;
