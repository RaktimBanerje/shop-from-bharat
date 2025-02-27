import React, {forwardRef } from 'react';
import styles from './Partners.module.css'
import DHL from '../../assets/dhl_logo.svg'
import FEDEX from '../../assets/FedEx_logo.svg'
import DART from '../../assets/aramex.png'
import DELHIVERY from '../../assets/maersk_group.png'
import UPS from '../../assets/ups_logo.svg'
import Llyod from '../../assets/llyod.jpeg'
import Image from 'next/image';


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

const Partners = forwardRef((props, ref) => {
    return (
      <div className={styles.partners} ref={ref}>
        <div className={styles.partners_container}>
          <h3 className={styles.partners_heading}>Our top delivery partners</h3>
          <div className={styles.partners_list}>
            {partners.map((partner) => (
              <div className={styles.partner_box} key={partner.id}>
                <Image src={partner.imgSrc} alt="Partner logo" layout="responsive" width={100} height={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
});

export default Partners