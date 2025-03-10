import React from 'react';
import Link from 'next/link'; // Next.js Link
import Image from 'next/image'; // For optimized images
import Slider from 'react-slick'; // React Slick
import styles from './Categories.module.css';

// Static assets from public folder
const Accessories = '/assets/images/Accessories.png';
const ChildStore = '/assets/images/ChildStore.png';
const Electronics = '/assets/images/Electronics.png';
const EnvironmentFriendly = '/assets/images/EnvironmentFriendly.png';
const Jewels = '/assets/images/Jewels.png';
const Kitchen = '/assets/images/Kitchen.png';
const Luxury = '/assets/images/Luxury.png';
const Maracas = '/assets/images/Maracas.png';
const Market = '/assets/images/Market.png';
const Mensfashion = '/assets/images/Mensfashion.png';
const Shopping = '/assets/images/Shopping.png';
const VehiclesParts = '/assets/images/VehiclesParts.png';
const WomenFashion = '/assets/images/WomenFashion.png';
const ArrowSvg = '/assets/Vector.svg';

// Items list remains the same
const items = [
  { id: 1, name: "Accessories", itemSrc: Accessories },
  { id: 2, name: "Child Store", itemSrc: ChildStore },
  { id: 3, name: "Electronics", itemSrc: Electronics },
  { id: 4, name: "Environment Friendly", itemSrc: EnvironmentFriendly },
  { id: 5, name: "Jewels", itemSrc: Jewels },
  { id: 6, name: "Kitchen", itemSrc: Kitchen },
  { id: 7, name: "Luxury", itemSrc: Luxury },
  { id: 8, name: "Maracas", itemSrc: Maracas },
  { id: 9, name: "CHILDREN STORE", itemSrc: Market },
  { id: 10, name: "Mens Fashion", itemSrc: Mensfashion },
  { id: 11, name: "Shopping", itemSrc: Shopping },
  { id: 12, name: "Vehicles Parts", itemSrc: VehiclesParts },
  { id: 13, name: "Women Fashion", itemSrc: WomenFashion },
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
        <div className={`${styles.categories_header}`}>
          <h2>WHAT CAN YOU ORDER FROM US?</h2>
          <Link href="/platforms" passHref legacyBehavior>
            <a className={styles.sites_viewall}>
              <div className={styles.sites_view}>View All</div>
              <Image className={styles.arrowIcon} src={ArrowSvg} width={20} height={20} />
            </a>
          </Link>
        </div>

        {/* Render items using slider */}
        <Slider {...settings} className={`${styles.slider}`}>
          {items.map((item) => (
            <div className={styles.category_item} key={item.id}>
              <div className={styles.category_item_image}>
                <Image src={item.itemSrc} alt={item.name} width={150} height={150} unoptimized />
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
