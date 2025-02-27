import React, { useEffect, useState } from "react";
// import styles from "../BulkOrder/BulkOrder.module.css"; 
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import styles from './PlaceOrder.module.css'
import LoginStep from "./LoginStep/LoginStep";
import OrderStep from "./OrderStep/OrderStep";
import AdressStep from "./AdressStep/AdressStep";
import PaymentStep from "./PaymentStep/PaymentStep";
import SuccessStep from "./SuccessStep/SuccessStep";

// Styled component for consistent text fields
export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#9ca3af",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      border: "0.8px solid #374151",
    },
  },
});


const PlaceOrderModal = ({ isVisible, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState('login');
  const [formData, setFormData] = useState({
    orderDetails: '',
    address: '',
    paymentMethod: '',
  });

  // Use useEffect to check for login status on the client side
  useEffect(() => {
    const BHARAT_TOKEN = localStorage.getItem('BHARAT_TOKEN') || '';
    if (BHARAT_TOKEN) {
      setIsLoggedIn(true);
      setCurrentStep('order');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const [selectedPayment, setSelectedPayment] = useState(null); // Track selected payment

  if (!isVisible) return null;

  const handleOrderSubmit = () => {
    setCurrentStep('address');
  };

  const handleAddressSubmit = () => {
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    setCurrentStep('success');
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'order':
        return <OrderStep onClose={onClose} handleOrderSubmit={handleOrderSubmit} setCurrentStep={setCurrentStep} />;
      case 'address':
        return <AdressStep onClose={onClose} handleAddressSubmit={handleAddressSubmit} setCurrentStep={setCurrentStep} />;
      case 'payment':
        return <PaymentStep onClose={onClose} handlePaymentSubmit={handlePaymentSubmit} selectedPayment={selectedPayment} handlePaymentSelect={handlePaymentSelect} setCurrentStep={setCurrentStep} />;
      case 'success':
        return <SuccessStep onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className={styles.modal_container}>
          <div className={styles.modal_overlay}>
            <LoginStep setCurrentStep={setCurrentStep} onClose={onClose} />
          </div>
        </div>
      ) : (
        <div className={styles.modal_container}>
          <div className={styles.modal_overlay}>
            <div className={styles.modal}>
              <div className={styles.modal_body}>{renderStepContent()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderModal;

