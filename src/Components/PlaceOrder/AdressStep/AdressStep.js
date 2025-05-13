"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LeftArrow from "../../../assets/leftarrow.svg";
import PinSVG from "../../../assets/pin.svg";
import WhatsAppSVG from "../../../assets/whatsapp.svg";
import { CssTextField } from "../index";
import Image from "next/image"; // Import Image from next/image
import styles from './Addresses.module.css';
import { load } from '@cashfreepayments/cashfree-js';

const baseUrl = "https://shopfrombharat.apsgroup.in"; // Your API base URL
const fedExAPIUrl = "https://apis-sandbox.fedex.com/rate/v1/freight/rates/quotes"; // Replace with the FedEx rate API URL

const AddressStep = ({ onClose, setCurrentStep }) => {
  const [addressForm, setAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [products, setProducts] = useState([]);
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
  const [shippingCost, setShippingCost] = useState(0); // Store the shipping cost

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
    if (!selectedAddressId) {
      toast.error("Please select an address");
      return;
    }

    let totalWeight = 0;

    // Calculate total weight of the products
    products.forEach((product) => {
      totalWeight += convertWeightToNumber(product.weight) * product.quantity;
    });

    // Get selected address data
    const selectedAddress = addressList.find(address => address._id === selectedAddressId);

    // Call FedEx API to get the shipping rate based on the selected address and weight
    try {
      const shippingResponse = await axios.post(fedExAPIUrl, {
        data: {
          requestedShipment: {
            shipper: {
              address: {
                streetLines: [selectedAddress.address],
                city: selectedAddress.city,
                stateOrProvinceCode: selectedAddress.state,
                postalCode: selectedAddress.zip_code,
                countryCode: selectedAddress.country,
              },
            },
            recipient: {
              address: {
                streetLines: [selectedAddress.address],
                city: selectedAddress.city,
                stateOrProvinceCode: selectedAddress.state,
                postalCode: selectedAddress.zip_code,
                countryCode: selectedAddress.country,
              },
            },
            packages: [
              {
                weight: {
                  value: totalWeight, // Total weight of the products
                  units: "KG",
                },
              },
            ],
          },
        },
      });
      setShippingCost(shippingResponse.data.rate);
      console.log("Shipping Cost:", shippingResponse.data.rate);
    } catch (error) {
      toast.error("Failed to fetch shipping cost");
      console.error("Error fetching shipping cost", error);
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
          {/* Form for new address */}
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
        {shippingCost > 0 && <p>Shipping Cost: ₹{shippingCost}</p>}
      </div>
    </>
  );
};

export default AddressStep;
