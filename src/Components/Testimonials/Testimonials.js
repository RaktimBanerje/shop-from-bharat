import React, { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";
import Right from "../../assets/keyboardRight.svg";
import Left from "../../assets/keyboardLeft.svg";
import UserOne from "../../assets/user1.svg";
import UserTwo from "../../assets/user2.svg";
import UserThree from "../../assets/user3.svg";
import { Rating } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image"; // Import Image from next/image

const testimonials = [
  {
    id: 1,
    user: "Priya Nair, 29, Chicago",
    content:
      "Shop from Bharat has made it so easy for me to access authentic Indian products! From fashion to spices, I can shop like I’m in India without ever leaving my home. The virtual Indian address option is a game-changer. I received all my packages in perfect condition, and the shipping process was seamless.",
    imgSrc: UserOne,
    value: 4,
  },
  {
    id: 2,
    user: "Chris Wood, 34, Toronto",
    content:
    "I love supporting Indian brands, and with Shop from Bharat, I can now purchase directly from the source. Their assisted shopping service helped me get traditional Indian outfits that I couldn’t find anywhere else. The updates during shipping kept me informed every step of the way. Amazing service!",
    imgSrc: UserTwo,
    value: 4,
  },
  {
    id: 3,
    user: "Meera Patel, 42, Bangkok",
    content:
      "As an expat living in Thailand, finding quality Indian products was a challenge. Thanks to Shop from Bharat, I can now order everything from Indian snacks to home decor and have them delivered right to my door. The customer service was fantastic and made my shopping experience smooth.",
    imgSrc: UserThree,
    value: 5,
  },
  {
    id: 4,
    user: "Barry Wallace, 27, Austin",
    content:
    "I’ve always admired Indian fashion, and Shop from Bharat lets me shop for Indian brands with ease. The process was so simple, and I loved how I could track my order every step of the way. I’ve recommended this service to all my friends!",
    imgSrc: UserThree,
    value: 5,
  },
  {
    id: 5,
    user: "Omar Khan, 31, Dubai",
    content:
    "Shop from Bharat offers the best of Indian goods right at my fingertips. Their virtual address system allowed me to order tech gadgets from Indian retailers without any hassle. The consolidated shipping saved me so much time and money. I’ll definitely keep shopping here!",
    imgSrc: UserTwo,
    value: 4,
  }
];

const Testimonials = () => {
  const [zoomLevel, setZoomLevel] = useState(100); // Default to 100 (fallback for SSR)
  const [isClient, setIsClient] = useState(false); // Track if the code is running on the client side

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      const updateZoomLevel = () => {
        setZoomLevel(Math.round(window.devicePixelRatio * 100));
      };

      updateZoomLevel(); // Set the initial zoom level

      window.addEventListener("resize", updateZoomLevel);

      return () => {
        window.removeEventListener("resize", updateZoomLevel);
      };
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: zoomLevel <= 150 ? 4 : 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  // Render only after the component has mounted on the client
  if (!isClient) {
    return null; // You can also return a loading spinner or placeholder here
  }

  return (
    <div className={styles.testimonials}>
      <div className={styles.testimonials_container}>
        <div className={styles.testimonials_header}>
          <div className={styles.header_left}>
            <h2>OUR CUSTOMER FEEDBACK</h2>
            <div className={styles.header_info}>
              <p>Don’t take our word for it. Trust our customers</p>
            </div>
          </div>
          <div className={styles.header_right}>
            <button onClick={handlePrev}>
              <Image
                src={Left}
                alt="Previous"
                width={24}
                height={24}
              />
              <span>Prev</span>
            </button>
            <button onClick={handleNext}>
              <span>Next</span>
              <Image
                src={Right}
                alt="Next"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.user_testimonial}>
                <div className={styles.user_testimonial_header}>
                  <div className={styles.user_testimonial_left}>
                    <div className={styles.user_initial}>
                      <span style={{ marginTop: "0" }}>
                        {testimonial.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className={styles.user_name}>{testimonial.user}</h3>
                  </div>
                  <div className={styles.user_testimonial_right}>
                    <Rating name="read-only" value={testimonial.value} readOnly />
                  </div>
                </div>
                <div className={styles.user_testimonial_desc}>
                  {testimonial.content}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;