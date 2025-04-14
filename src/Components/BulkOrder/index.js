"use client";

import React, { useEffect, useState } from "react";
import styles from "./BulkOrder.module.css";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import Image from "next/image";
import toast from "react-hot-toast";
import WhatsAppSVG from "../../assets/whatsapp.svg";
import Spinner from "../Spinner/Spinner";
import axios from "axios";

const categories = [
  { label: "Perfume", id: 1 },
  { label: "Electronics", id: 2 },
  { label: "Books", id: 3 },
  { label: "Sports", id: 4 },
  { label: "Cosmetics", id: 5 },
  { label: "Shoes", id: 6 },
  { label: "Clothes", id: 7 },
];

const CssTextField = styled(TextField)(`
  & label.Mui-focused {
    color: #9ca3af;
  }
  & .MuiInput-underline:after {
    borderBottomColor: #B2BAC2;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      borderColor: #E0E3E7;
    }
    &:hover fieldset {
      borderColor: #B2BAC2;
    }
    &.Mui-focused fieldset {
      border: 0.8px solid #374151;
    }
  }
`);

const BulkOrder = ({ isVisible, onClose }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    category: "",
    country: "",
    category_description: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        const data = await response.json();
        const countryList = data.data.map((country) => ({
          label: country.country,
          cities: country.cities,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const isFormValid = () => {
    const { name, contact_number, category, country, quantity } = formData;
    return name && contact_number && category && country && quantity;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("Please fill all required fields", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    setLoading(true);
    try {
      const updatedFormData = { ...formData, country: formData.country.label };
      
      let msg = ""

      msg = `Name: ${updatedFormData.name} \n`;
      msg+= `Phone: ${updatedFormData.contact_number} \n`;
      msg+= `Category: ${updatedFormData.category} \n`;
      msg+= `Category Description: ${updatedFormData.category_description} \n`;
      msg+= `Quantity: ${updatedFormData.quantity} \n`;
      msg+= `Country: ${updatedFormData.country} \n`;

      // const whatsappPhoneNumber = "8050063435"; // Replace with the recipient's phone number
      // const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappPhoneNumber}&text=${encodeURIComponent(msg)}`;

      // // Step 6: Open WhatsApp with the pre-filled message
      
      // window.open(whatsappUrl, "_blank");


      // Step 5: Post data to Directus API
      axios.post('https://shopfrombharat-admin.apsgroup.in/items/bulk_orders/', {name: updatedFormData.name, phone: updatedFormData.contact_number, category: updatedFormData.category, country: updatedFormData.country, quantity: updatedFormData.quantity, category_description: updatedFormData.category_description})
      .then(response => {
        console.log('Order posted to Directus:', response.data);
      })
      .catch(error => {
        console.error('Error posting order to Directus:', error);
      });

      setOrderPlaced(true);
    
      setFormData({
        name: "",
        contact_number: "",
        category: "",
        country: "",
        category_description: "",
        quantity: "",
      });

    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
      {orderPlaced ? (
          <div className="text-center">
            <div className={styles.modal_header} style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={onClose} style={{ height: 40, width: 40, borderRadius: "100%" }}>X</button>
            </div>
            <div className="container mt-5">
              <div className="text-center">
                <img src="https://i.pinimg.com/564x/e3/0d/b7/e30db7466f1c3f7eaa110351e400bb79.jpg" alt="tick" className="mb-3" style={{ width: '100px', height: '100px' }} />
                <h4 className="text-success">Thank You!</h4>
                <p className="text-dark">Your order has been successfully placed. We appreciate your business and will process your order shortly.</p>
                <hr />
              </div>
            </div>
          </div>
        ) : (
          <>
          <div className={styles.modal_header}>
            <h4>Enter details for bulk order</h4>
            <button onClick={onClose}>X</button>
          </div>

          <div className={styles.modal_inputs}>
            <CssTextField
              className={styles.name_field}
              value={formData.name}
              onChange={handleChange}
              name="name"
              label="What should we call you?"
              required
            />
            <div className={styles.form_zip_city}>
              <CssTextField
                className={styles.input_field}
                label="Phone Number"
                value={formData.contact_number}
                onChange={handleChange}
                name="contact_number"
                required
              />
              <CssTextField
                className={styles.input_field}
                label="Category"
                value={formData.category}
                onChange={handleChange}
                name="category"
                required
              />
            </div>
            <div className={styles.form_zip_city}>
              <Autocomplete
                className={styles.input_field}
                disablePortal
                id="country-select"
                options={countries}
                getOptionLabel={(option) => option.label || ""}
                value={formData.country}
                onChange={(event, value) => {
                  setFormData({ ...formData, country: value });
                }}
                renderInput={(params) => (
                  <CssTextField {...params} label="Country" variant="outlined" required />
                )}
              />
              <CssTextField
                className={styles.input_field}
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <CssTextField
              sx={{ width: "100%" }}
              multiline
              rows={2}
              label="Category Description (Optional)"
              value={formData.category_description}
              onChange={handleChange}
              name="category_description"
            />
          </div>

          <div className={styles.modal_actions}>
            <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
              <span className={styles.btnLabel}>{loading ? "Processing Order" : "SUBMIT DETAILS"}</span>
              {loading && (
                <span className={styles.spinner}>
                  <Spinner />
                </span>
              )}
            </button>
            <a href="https://wa.me/919731733771" target="_blank" rel="noopener noreferrer">
              <button
                type="button"
                className={styles.directBtn}
                aria-label="Contact us via WhatsApp"
              >
                <Image src={WhatsAppSVG} alt="WhatsApp" width={25} height={25} />
                <span>DIRECT CONTACT</span>
              </button>
            </a>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default BulkOrder;
