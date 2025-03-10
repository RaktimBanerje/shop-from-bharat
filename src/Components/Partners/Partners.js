import React from 'react';
import Link from 'next/link'; // Next.js Link
import Image from 'next/image'; // For optimized images
import Slider from 'react-slick'; // React Slick
import styles from './Partner.module.css';

// Static assets from public folder
import DHL from '../../assets/dhl_logo.svg'
import FEDEX from '../../assets/FedEx_logo.svg'
import DART from '../../assets/aramex.png'
import DELHIVERY from '../../assets/maersk_group.png'
import UPS from '../../assets/ups_logo.svg'
import Llyod from '../../assets/llyod.jpeg'

// Items list remains the same
const items = [
  { id: 1, itemSrc: DHL },
  { id: 2, itemSrc: FEDEX },
  { id: 3, itemSrc: DART },
  { id: 4, itemSrc: DELHIVERY },
  { id: 5, itemSrc: UPS },
  { id: 6, itemSrc: Llyod },
];

const Partners = React.forwardRef((props, ref) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className={styles.categories} ref={ref}>
      <div className={styles.categories_container}>
        <div className={`${styles.categories_header}`}>
          <h2>OUR TOP DELIVERY PARTNERS</h2>
        </div>

        {/* Render items using slider */}
        <Slider {...settings} className="partner-carousel">
          {items.map((item) => (
            <div className={styles.category_item} key={item.id}>
              <div className={styles.category_item_image}>
                <Image src={item.itemSrc} alt={item.name} unoptimized />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default Partners;
