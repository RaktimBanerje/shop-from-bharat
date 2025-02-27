import React, { useState } from "react";
import styles from "../PlaceOrder.module.css";
import { CssTextField } from "../index";
import HistoryIcon from "@mui/icons-material/History";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import payPalIcon from "../../../assets/paypal_icon.jpg";
import LeftArrow from "../../../assets/leftarrow.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import apiServiceHandler from "../../../service/apiService";
import toast from "react-hot-toast";

// In Next.js, the Redux Provider needs to be configured in _app.js

// const PaymentStep = ({
//   onClose,
//   handlePaymentSelect,
//   handlePaymentSubmit,
//   selectedPayment,
//   setCurrentStep,
// }) => {
//   // Payment methods array
//   const paymentMethods = [
//     {
//       id: 1,
//       name: "Saved Options",
//       icon: <HistoryIcon />,
//     },
//     {
//       id: 2,
//       name: "Debit/Credit Card",
//       icon: <CreditCardOutlinedIcon />,
//     },
//     {
//       id: 3,
//       name: "Paypal",
//       icon: (
//         <img src={payPalIcon} alt="PayPal" className={styles.payPalIcon} />
//       ),
//     },
//   ];

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");

//       script.src = src;

//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };

//       document.body.appendChild(script);
//     });
//   };

//   const order_data = useSelector((state) => state.products.newOrder);
//   const totalAmount = useSelector((state) => state.products.totalAmount);

//   const token = localStorage.getItem("BHARAT_TOKEN");

//   // Create Razorpay order
//   const createRazorpayOrder = () => {
//     let data = JSON.stringify({
//       amount: totalAmount * 100,
//       order_id: order_data?._id,
//     });

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://13.210.82.7/api/razorpay/create",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: data,
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         handleRazorpayScreen(totalAmount * 100, response?.data?.payment?._id);
//       })
//       .catch((error) => {
//         console.log("error at", error);
//       });
//   };

//   // Handle Razorpay screen
//   const handleRazorpayScreen = async (total_amount, paymentId) => {
//     const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");
//     if (!res) {
//       alert("Some error at razorpay screen loading");
//       return;
//     }

//     const options = {
//       key: "rzp_test_mL8Uac3w1TExqK",
//       amount: total_amount,
//       currency: "INR",
//       name: "shop from bharat",
//       description: "payment to shop from bharat pvt ltd",
//       image: "",
//       handler: async function (response) {
//         const res = await apiServiceHandler("POST", `api/razorpay/${paymentId}`, {
//           payment_id: response?.razorpay_payment_id,
//           status: "success",
//         });
//         if (res.status) {
//           setCurrentStep("success");
//         } else {
//           toast.error(res.message);
//         }
//       },
//       modal: {
//         ondismiss: function () {
//           apiServiceHandler("POST", `api/razorpay/${paymentId}`, {
//             payment_id: null,
//             status: "failed",
//           });
//           toast.error("Payment was unsuccessful.");
//         },
//       },
//       theme: {
//         color: "#F4C430",
//       },
//     };
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const [activeMethod, setActiveMethod] = useState(1);

//   const toggleMethod = (val) => {
//     setActiveMethod(val);
//   };

//   return (
//     <>
//       <div className={styles.modal_header}>
//         <div className={styles.header_left}>
//           <img src={LeftArrow} onClick={() => setCurrentStep("address")} />
//           <h2>Select Payment Method</h2>
//         </div>
//         <button onClick={onClose}>X</button>
//       </div>
//       <div style={{ display: "flex", gap: "2rem" }}>
//         {/* You can uncomment and add the logic to toggle payment methods */}
//       </div>
//       <button className={styles.proceedBtn} onClick={createRazorpayOrder}>
//         CONFIRM
//       </button>
//     </>
//   );
// };

const PaymentStep = () => {
  return (
    <></>
  );
};

export default PaymentStep;
