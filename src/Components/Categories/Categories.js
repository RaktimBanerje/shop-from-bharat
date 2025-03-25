import React from 'react';
import Link from 'next/link'; // Next.js Link
import Image from 'next/image'; // For optimized images
import Slider from 'react-slick'; // React Slick
import styles from './Categories.module.css';

// Static assets from public folder
const Accessories = '/assets/images/Accessories.png';
const Electronics = '/assets/images/Electronics.png';
const EnvironmentFriendly = '/assets/images/EnvironmentFriendly.png';
const HealthBeauty = '/assets/images/HealthBeauty.png';
const Jewels = '/assets/images/Jewels.png';
const Kitchen = '/assets/images/Kitchen.png';
const LightsFurniture = '/assets/images/LightsFurniture.png';
const Luxury = '/assets/images/Luxury.png';
const Market = '/assets/images/Market.png';
const Mensfashion = '/assets/images/Mensfashion.png';
const MucialInstrument = '/assets/images/MucialInstrument.png';
const PetSupplies = '/assets/images/PetSupplies.png';
const Science = '/assets/images/Science.png';
const Toys = '/assets/images/Toys.png';
const Vehicle = '/assets/images/Vehicle.png';
const WomenFashion = '/assets/images/WomenFashion.png';


const ArrowSvg = '/assets/Vector.svg';

// Items list remains the same
const items = [
  { id: 1, name: "Accessories", itemSrc: Accessories },
  { id: 2, name: "Child Store", itemSrc: Electronics },
  { id: 3, name: "Environment Friendly", itemSrc: EnvironmentFriendly },
  { id: 4, name: "Health Beauty", itemSrc: HealthBeauty },
  { id: 5, name: "Jewels", itemSrc: Jewels },
  { id: 6, name: "Kitchen", itemSrc: Kitchen },
  { id: 7, name: "Lights Furniture", itemSrc: LightsFurniture },
  { id: 8, name: "Luxury", itemSrc: Luxury },
  { id: 9, name: "Market", itemSrc: Market },
  { id: 10, name: "Mens Fashion", itemSrc: Mensfashion },
  { id: 11, name: "Mucial Instrument", itemSrc: MucialInstrument },
  { id: 12, name: "Pet Supplies", itemSrc: PetSupplies },
  { id: 13, name: "Science", itemSrc: Science },
  { id: 14, name: "Toys", itemSrc: Toys },
  { id: 15, name: "Vehicle", itemSrc: Vehicle },
  { id: 16, name: "Women Fashion", itemSrc: WomenFashion },
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
          <Link href="/shopping-sites-in-india" passHref legacyBehavior>
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
