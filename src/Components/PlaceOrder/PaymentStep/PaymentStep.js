"use client"

import React, { useState } from "react";
import styles from '../AdressStep/Addresses.module.css'
import LeftArrow from "../../../assets/leftarrow.svg";

const PaymentStep = ({onClose}) => {
  return (
    <>
      <div className={styles.modal_header} style={{display: "flex", justifyContent: "space-between"}}>
        <div className={styles.header_left}>
          <img
            src="/assets/leftarrow.svg"
            alt="Back"
            onClick={() => {
              setCurrentStep("order");
              dispatch(showLastProduct());
            }}
            style={{display: 'none'}}
          />
        </div>
        <button onClick={onClose} style={{height: 40, width: 40, borderRadius: "100%"}}>X</button>
      </div>
      <div className="container mt-5">
          <div className="text-center">
              <img 
                  src="https://i.pinimg.com/564x/e3/0d/b7/e30db7466f1c3f7eaa110351e400bb79.jpg" 
                  alt="tick" 
                  className="mb-3" 
                  style={{ width: '100px', height: '100px' }}
              />
              <h4 className="text-success">Thank You!</h4>
              <p className="text-dark">Your order has been successfully placed. We appreciate your business and will process your order shortly.</p>
              <hr />
          </div>
      </div>
    </>
  );
};

export default PaymentStep;
