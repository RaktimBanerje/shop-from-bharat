import React from "react";
import styles from "./Payment.module.css";
import Image from "next/image"; // Import Image from next/image
import PencilSVG from "../../assets/pencil.svg";
import TrashSVG from "../../assets/trash.svg";

const Payment = () => {
  return (
    <div className={styles.payment}>
      <div className={styles.payment_container}>
        <div className={styles.payment_info}>
          <div className={styles.payment_header}>
            <div className={styles.header_left}>
              <h4>Payment Methods</h4>
              <p>Manage your saved payment methods</p>
            </div>
            <div className={styles.header_right}>
              <button>ADD PAYMENT METHODS</button>
            </div>
          </div>

          <div className={styles.payments_list}>
            <div className={styles.payment_data}>
              <div className={styles.payment_type}>
                <h5>mygpay9-1@okhdfcbank</h5>
                <p>GooglePay UPI</p>
              </div>
              <div className={styles.payment_status}>
                <div className={styles.payment_circle}></div>
                <span>UPI</span>
              </div>
              <div className={styles.payment_actions}>
                <Image
                  src={PencilSVG}
                  alt="Edit Icon"
                  width={24} // Adjust width and height as needed
                  height={24}
                />
                <Image
                  src={TrashSVG}
                  alt="Delete Icon"
                  width={24} // Adjust width and height as needed
                  height={24}
                />
              </div>
            </div>
            <div className={styles.payment_data}>
              <div className={styles.payment_type}>
                <h5>**** **** **** 8977</h5>
                <p>Flipkart Axis Bank Credit Card</p>
              </div>
              <div className={styles.payment_status}>
                <div className={styles.payment_circle}></div>
                <span>CREDIT CARD</span>
              </div>
              <div className={styles.payment_actions}>
                <Image
                  src={PencilSVG}
                  alt="Edit Icon"
                  width={24} // Adjust width and height as needed
                  height={24}
                />
                <Image
                  src={TrashSVG}
                  alt="Delete Icon"
                  width={24} // Adjust width and height as needed
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
