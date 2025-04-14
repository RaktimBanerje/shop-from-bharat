"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LeftArrow from "../../../assets/leftarrow.svg";
import PinSVG from "../../../assets/pin.svg";
import WhatsAppSVG from "../../../assets/whatsapp.svg";
import { CssTextField } from "../index";
import Image from "next/image";  // Import Image from next/image
import styles from './Addresses.module.css'
import { load } from '@cashfreepayments/cashfree-js';

const baseUrl = "https://shopfrombharat.apsgroup.in";  // Your API base URL

const AddressStep = ({ onClose, setCurrentStep }) => {
  const [addressForm, setAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [products, setProducts] = useState([]);  // Assuming this is how products are set
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    zip_code: "",
    email: "",
    city: "",
    country: "",
    address_type: "home",
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [addressList, setAddressList] = useState([]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle address type change using radio buttons
  const handleAddressTypeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      address_type: value,
    });
  };

  // Fetch the address list
  const getAddressList = async () => {
    const token = localStorage.getItem("BHARAT_TOKEN"); // Get token from localStorage
    try {
      const response = await axios({
        method: "get",
        url: `${baseUrl}/api/address/list`,
        headers: { Authorization: "Bearer " + token },
      });
      setAddressList(response.data.address || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    getAddressList();
  }, []);

  useEffect(() => {
    const total = products.reduce((acc, product) => acc + Number(product.price), 0);
    setTotalAmount(total);
  }, [products]);

  const toggleAddressForm = () => {
    setAddressForm(!addressForm);
  };

  // Handle new address submission
  const newAddress = async () => {
    const token = localStorage.getItem("BHARAT_TOKEN");
    try {
      const response = await axios({
        method: "post",
        url: `${baseUrl}/api/address/create`,
        headers: { Authorization: "Bearer " + token },
        data: formData,
      });
      toast.success("New Address Successfully Added", {
        duration: 4000,
        position: "top-center",
        iconTheme: {
          primary: "#15803d",
          secondary: "#fff",
        },
      });
      setFormData({
        name: "",
        phone: "",
        address: "",
        zip_code: "",
        email: "",
        city: "",
        country: "",
        address_type: "home",
      });
      setAddressForm(false);
      getAddressList(); // Reload the address list after adding a new address
    } catch (err) {
      toast.error("Failed to add new address");
      console.error(err);
    }
  };

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const onSubmit = async () => {

    let cashfree;
    var initializeSDK = async function () {          
        cashfree = await load({
            mode: "sandbox"
        });
    };
    initializeSDK();

    const doPayment = async (session_id, order_number) => {
      let checkoutOptions = {
          paymentSessionId: session_id,
          redirectTarget: "_modal",
      };
      cashfree.checkout(checkoutOptions).then((result) => {
          if(result.error){
              // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
              console.log("User has closed the popup or there is some payment error, Check for Payment Status");
              console.log(result.error);
          }
          if(result.redirect){
              // This will be true when the payment redirection page couldnt be opened in the same window
              // This is an exceptional case only when the page is opened inside an inAppBrowser
              // In this case the customer will be redirected to return url once payment is completed
              console.log("Payment will be redirected");
          }
          if(result.paymentDetails){
            // Construct the message and WhatsApp URL
            // const orderNumber = order_number;
            // const message = `New order placed, Order number is ${orderNumber}`;
            // const phoneNumber = "919731733771"; // Replace with the desired phone number
            const productData = localStorage.getItem('productData'); // Get product data from localStorage
          
            // Sample customer info (replace with real customer data if needed)
            const customer = {
              name: "Shriom",
              email: "shriomtyagi1998@gmail.com",
              phone: "7889896521"
            };
          
            // Sample order data sent from client
            const data = {
              products: productData,
              selectedAddressId: selectedAddressId
            };
          
            // Sample address list
            const addressList = [
              {
                id: "67149f7887b725ee580ec089",
                name: "Shriom Tyagi",
                contact_number: "+91-987654327",
                email: "amit@example.com",
                address: "101, Friends Colony Testing",
                city: "New Delhi",
                country: "India",
                address_type: "Home"
              },
              {
                id: "673987c575df453424a54d79",
                name: "Prajjwal Chaudhary",
                email: "prajjwalchaudhary29898@gmail.com",
                address: "TEST",
                city: "Noida",
                country: "India",
                address_type: "Home"
              },
              {
                id: "6739887775df453424a54d88",
                name: "Prajjwal Test",
                contact_number: "09730516411",
                email: "prajjwalchaudhary29898@gmail.com",
                address: "TEST",
                city: "Noida",
                country: "India",
                address_type: "Work"
              },
              {
                id: "673b6485eab48181713f8387",
                name: "Prajjwal",
                contact_number: "7011029201",
                email: "prajjwalchaudhary29898@gmail.com",
                address: "101, Test Colony",
                city: "Delhi",
                country: "India",
                address_type: "Work"
              },
              {
                id: "673b6740eab48181713f838b",
                name: "Prajjwal Testing",
                contact_number: "7011029201",
                email: "prajjwalchaudhary29898@gmail.com",
                address: "111, Test Colony",
                city: "Delhi",
                country: "India",
                address_type: "Work"
              },
              {
                id: "673f386f1d68ae1af1dc03f0",
                name: "Shriom Tyagi",
                contact_number: "7889896521",
                email: "",
                address: "Road No U 14",
                city: "Gurugram",
                country: "India",
                address_type: "Home"
              },
              {
                id: "67403ebceb7b64526512e469",
                name: "Tanish Gupta",
                email: "tanigupt@adobe.com",
                address: "14A Shivam Enclave",
                city: "New Delhi",
                country: "India",
                address_type: "Home"
              },
              {
                id: "67403edeeb7b64526512e46b",
                name: "Tanish Gupta",
                email: "tanish16106@iiitd.ac.in",
                address: "14A Shivam Enclave",
                city: "New Delhi",
                country: "India",
                address_type: "Home"
              },
              {
                id: "6741b5f77bf02d3fc820ca64",
                name: "Testing Address",
                email: "prajjwalchaudhary29898@gmail.com",
                address: "Jamuna Vihar",
                city: "Khatauli",
                country: "India",
                address_type: "Other"
              },
              {
                id: "6741e3e6eb7b64526512e473",
                name: "Tanish Gupta",
                email: "tanigupt@adobe.com",
                address: "14A Shivam Enclave",
                city: "New Delhi",
                country: "India",
                address_type: "Home"
              },
              {
                id: "6753f7bd03cddce3380d48df",
                name: "Shank",
                email: "shank189@gmail.com",
                address: "01, Shop",
                city: "Texas",
                country: "America",
                address_type: "Home"
              }
            ];
          
            // Step 1: Match the selected address
            let selectedAddress = addressList.find(address => address.id === data.selectedAddressId);
          
            // Step 2: Decode the products data from JSON string to array
            let productsData = JSON.parse(data.products);
          
            // Step 3: Construct order items from productsData
            let orderItems = productsData.map(product => ({
              price: parseFloat(product['Price (USD)']), // Adjust field names as per your data
              weight: parseFloat(product['Weight Range'] || 0), // Add proper default or conversion for weight
              quantity: parseInt(product['Quantity']),
              product_link: product['Product Link'],
              product_size: parseInt(product['Product Size']),
              product_title: product['Product Title'],
              additional_comment: product['Customer Comments'] || ''
            }));
          
            // Step 4: Prepare data for posting to Directus
            const orderData = {
              customer_name: customer.name,
              customer_email: customer.email,
              customer_phone: customer.phone,
              address_line: JSON.stringify(selectedAddress.address),
              payment_amount: 100,
              order_items: orderItems, // Directus expects an array of objects here
              transaction_id: "5114917333613", // Assuming the transaction ID is available from payment details
              date_created: new Date().toISOString(),
              date_updated: null // Or you can set it dynamically if applicable
            };

            console.log(orderData)
          
            // Step 5: Post data to Directus API
            axios.post('https://shopfrombharat-admin.apsgroup.in/items/orders/', orderData)
              .then(response => {
                console.log('Order posted to Directus:', response.data);
              })
              .catch(error => {
                console.error('Error posting order to Directus:', error);
              });
          
            // // Step 6: Send the product data to email.php (as in the original code)
            // axios.post('https://researchindiatoday.com/email.php', { products: productData, selectedAddressId: selectedAddressId })
            //   .then(response => { })
            //   .catch(error => {
            //     console.error("Error making order request:", error);
            //   });
          
            // Step 7: WhatsApp message functionality
            // const whatsappPhoneNumber = "8050063435"; // Replace with the recipient's phone number
            // const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappPhoneNumber}&text=${encodeURIComponent(message)}`;
            // window.open(whatsappUrl, "_blank");
          
            // Step 8: Continue the payment process (if required)
            setCurrentStep("payment");
          }
      });
  };


    const token = localStorage.getItem("BHARAT_TOKEN");
    if (selectedAddressId) {
      const payload = {
        address_id: selectedAddressId,
        products: products.map((product) => ({
          ...product,
          weight: convertWeightToNumber(product.weight),
        })),
      };

      try {
        const response = await axios({
          method: "post",
          url: `${baseUrl}/api/order/create`,
          headers: { Authorization: "Bearer " + token },
          data: payload,
        });

        if (response.data.status) {
          // alert(response.data.message)

          let order_id = 'order_' + Math.random().toString(36).substr(2, 9) 

          const orderData = {
            order_amount: 1.00,
            order_currency: 'INR',
            order_id: order_id, // Generate a random order ID
            customer_details: {
              customer_id: 'raktim_banerjee',
              customer_phone: '9836739907',
              customer_name: 'Raktim',
              customer_email: 'test@cashfree.com',
            },
            order_meta: {
              return_url: 'https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}',
            },
          };

          axios.post('https://apsgroup.in/shopfrombharat/create-order.php', orderData)
          .then((response) => {
            // Log the response data

            console.log('Response Data:', response.data);
            doPayment(response.data.payment_session_id, order_id)
            
          })
          .catch((error) => {
            // Handle errors
            console.error('Error occurred:', error);
          });
        }
      } catch (error) {
        toast.error("Failed to create order");
        console.error(error);
      }
    } else {
      toast.error("Please select an address");
    }
  };

  const [cfLoaded, setCfLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    script.onload = () => {
      console.log("Cashfree script loaded ✅");
      setCfLoaded(true);
    };

    script.onerror = (err) => {
      console.error("Failed to load Cashfree script ❌", err);
    };

    console.log('cashfree loading')

    document.body.appendChild(script);
  }, []);

  const convertWeightToNumber = (weightRange) => {
    const weightMap = {
      "0-1 kg": 0.5,
      "1-5 kg": 3,
      "5-10 kg": 7.5,
      "10+ kg": 15,
    };

    return weightMap[weightRange] || 0; // Default to 0 if no match
  };

  return (
    <>
      <div className={styles.modal_header} style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={styles.header_left}>
          <Image
            src={LeftArrow}
            alt="Back"
            width={24} // Adjust width as needed
            height={24} // Adjust height as needed
            onClick={() => {
              setCurrentStep("order");
            }}
          />
          <h2 style={{ fontSize: 20, marginTop: 20 }}>Select Your Address</h2>
        </div>
        <button onClick={onClose} style={{ height: 40, width: 40, borderRadius: "100%" }}>X</button>
      </div>

      {/* <div className={styles.add_address}>
        <button className={styles.add_address_btn} onClick={toggleAddressForm}>
          {addressForm ? "Remove Address Form" : "Add New Address"}
        </button>
      </div> */}

      {!addressForm ? (
        <div className={styles.addresses_list} style={{ maxHeight: "300px", overflowY: "auto" }}>
          {addressList.length > 0 &&
            addressList.map((address) => (
              <div key={address._id} className={styles.address_info}>
                <div className={styles.select_address}>
                  <input
                    type="radio"
                    checked={selectedAddressId === address._id}
                    onChange={() => handleAddressSelect(address._id)}
                  />
                  <div className={styles.address_type}>
                    <h5 style={{ textAlign: 'left' }}>{address.address_type ? address.address_type.toUpperCase() : ''}</h5>
                    <p style={{ fontSize: 13 }}>Courier Delivery</p>
                  </div>
                </div>

                <div className={styles.address_status}>
                  {selectedAddressId === address._id && (
                    <>
                      <div className={styles.address_circle}></div>
                      <span>Selected</span>
                    </>
                  )}
                </div>

                <div className={styles.user_address}>
                  <Image
                    src={PinSVG}
                    alt="Pin"
                    width={40} // Adjust width as needed
                    height={65} // Adjust height as needed
                  />
                  <span style={{ textAlign: 'left' }}>
                    <strong>{address.name} </strong>
                    {`${address.address}, ${address.city}, ${address.country}, ${address.zip_code}`}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.modal_inputs}>
          <CssTextField
            className={styles.name_field}
            label="What should we call you?"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className={styles.form_zip_city}>
            <CssTextField
              className={styles.input_field}
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <PhoneInput
              country={"in"}
              label="Phone Number"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              className={styles.input_field}
              inputProps={{
                placeholder: "Your Phone",
                name: "phone",
                required: true,
              }}
              inputStyle={{
                height: "100%",
                width: "100%",
                color: "black",
              }}
              placeholder="Your Phone"
            />
          </div>

          <div className={styles.form_zip_city}>
            <CssTextField
              className={styles.input_field}
              label="House/Flat/Floor No."
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <CssTextField
              className={styles.input_field}
              label="Zip Code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.form_zip_city}>
            <CssTextField
              className={styles.input_field}
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <CssTextField
              className={styles.input_field}
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                name="address_type"
                value="home"
                checked={formData.address_type === "home"}
                onChange={handleAddressTypeChange}
              />{" "}
              Home
            </label>
            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                name="address_type"
                value="work"
                checked={formData.address_type === "work"}
                onChange={handleAddressTypeChange}
              />{" "}
              Work
            </label>
            <label className={styles.checkbox_label}>
              <input
                type="checkbox"
                name="address_type"
                value="other"
                checked={formData.address_type === "other"}
                onChange={handleAddressTypeChange}
              />{" "}
              Other
            </label>
          </div>
        </div>
      )}

      <div className={styles.modal_actions}>
        <button
          className={styles.proceedBtn}
          style={{
            backgroundColor: 'var(--theme)',
            color: '#fff',
            padding: '15px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            width: '50%',
            fontSize: '17px',
            fontWeight: '500',
            lineHeight: '18.88px',
            textAlign: 'center'
          }}
          onClick={addressForm ? newAddress : onSubmit}
        >
          {addressForm ? "Add Address" : "Place Order"}
        </button>
      </div>
    </>
  );
};

export default AddressStep;
