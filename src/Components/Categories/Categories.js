import React from 'react';
import Link from 'next/link'; // Next.js Link
import Image from 'next/image'; // For optimized images
import Slider from 'react-slick'; // React Slick
import styles from './Categories.module.css';

// Static assets from public folder
const PharmacySvg = '/assets/Health.svg';
const FashionSvg = '/assets/clothes.svg';
const KitchenSvg = '/assets/Kitchen.svg';
const SofaSvg = '/assets/Sofa.svg';
const FoodSvg = '/assets/food.svg';
const ArrowSvg = '/assets/Vector.svg';

// Items list remains the same
const items = [
  { id: 1, name: "MEN'S FASHION", itemSrc: FashionSvg },
  { id: 2, name: "WOMEN'S FASHION", itemSrc: FashionSvg },
  { id: 3, name: "MARKETPLACE", itemSrc: KitchenSvg },
  { id: 4, name: "HEALTH & BEAUTY", itemSrc: FoodSvg },
  { id: 5, name: "CONSUMER ELECTRONICS", itemSrc: PharmacySvg },
  { id: 6, name: "LIGHTS & FURNITURE", itemSrc: SofaSvg },
  { id: 7, name: "JEWELS & TIMEPIECES", itemSrc: PharmacySvg },
  { id: 8, name: "ENVIRONMENT FRIENDLY", itemSrc: PharmacySvg },
  { id: 9, name: "CHILDREN STORE", itemSrc: PharmacySvg },
  { id: 10, name: "SPORTS & TOYS", itemSrc: PharmacySvg },
  { id: 11, name: "ACCESSORIES", itemSrc: SofaSvg },
  { id: 12, name: "HOME & KITCHEN", itemSrc: PharmacySvg },
  { id: 13, name: "VEHICLES & PARTS", itemSrc: PharmacySvg },
  { id: 14, name: "INDIAN BRANDS", itemSrc: PharmacySvg },
  { id: 15, name: "LUXURY", itemSrc: PharmacySvg },
];

const Categories = React.forwardRef((props, ref) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true,
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
        <div className={styles.categories_header}>
          <h2>What can you order from us?</h2>
          <Link href="/platforms" passHref legacyBehavior>
            <a className={styles.sites_viewall}>
              <div className={styles.sites_view}>View All</div>
              <Image className={styles.arrowIcon} src={ArrowSvg} alt="Arrow" width={20} height={20} />
            </a>
          </Link>
        </div>

        {/* Render items using slider */}
        <Slider {...settings} className={styles.slider}>
          {items.map((item) => (
            <div className={styles.category_item} key={item.id}>
              <div className={styles.category_item_image}>
                <Image src={item.itemSrc} alt={item.name} width={150} height={150} />
                <p className={styles.category_item_name}>{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default Categories;
