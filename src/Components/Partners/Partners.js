import React, {forwardRef, useRef} from 'react';
import styles from './Partners.module.css'
import DHL from '../../assets/dhl_logo.svg'
import FEDEX from '../../assets/FedEx_logo.svg'
import DART from '../../assets/aramex.png'
import DELHIVERY from '../../assets/maersk_group.png'
import UPS from '../../assets/ups_logo.svg'
import Llyod from '../../assets/llyod.jpeg'
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const partners = [
    {
        id: 1,
        imgSrc: DHL
    },
    {
        id: 2,
        imgSrc: FEDEX
    },
    {
        id: 3,
        imgSrc: DART
    },
    {
        id: 4,
        imgSrc: DELHIVERY
    },
    {
        id: 5,
        imgSrc: UPS
    },
    {
        id: 6,
        imgSrc: Llyod
    },
    // {
    //     id: 7,
    //     imgSrc: DART
    // },
    // {
    //     id: 8,
    //     imgSrc: DELHIVERY
    // },
]

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
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

const Partners = forwardRef((props, ref) => {
    return (
      <div className={styles.partners} ref={ref}>
        <div className={styles.partners_container}>
          <h2>OUR TOP DELIVERY PARTNERS</h2>

          <div className={styles.partners_list}>
            <div className="slider-container">
              <Slider {...settings}>
                  {partners.map((partner) => (
                    <div className={styles.partner_box} key={partner.id}>
                      <Image src={partner.imgSrc} alt="Partner logo" layout="responsive" width={100} height={100} />
                    </div>
                  ))}
              </Slider> 
            </div>
          </div>
        </div>
      </div>
    );
});

export default Partners