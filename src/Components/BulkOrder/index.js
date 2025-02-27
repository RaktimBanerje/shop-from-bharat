import React, { useEffect, useState } from "react";
import styles from "./BulkOrder.module.css";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import WhatsAppSVG from "../../assets/whatsapp.svg";
import axios from "axios";
import apiServiceHandler from "../../service/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";
import Image from 'next/image'; // Import next/image for optimized image loading

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
  const queryClient = useQueryClient();
  const [countries, setCountries] = useState([]);
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

  // Fetch countries for Autocomplete
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://countriesnow.space/api/v0.1/countries");
      const countriesData = response.data.data.map((country) => ({
        label: country.country,
        cities: country.cities,
      }));
      setCountries(countriesData);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const isFormValid = () => {
    const { name, contact_number, category, country, quantity } = formData;
    return name !== "" && contact_number !== "" && category !== "" && country !== "" && quantity !== "";
  };

  const createBulkOrder = async () => {
    const updatedFormData = { ...formData, country: formData.country.label };
    const response = await apiServiceHandler('POST', 'api/bulk-order/create', updatedFormData);
    return response;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createBulkOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulkOrder"] });
      toast.success("Bulk Order Successfully Placed", {
        duration: 4000,
        position: "top-center",
        iconTheme: {
          primary: "#15803d",
          secondary: "#fff",
        },
      });
      setFormData({
        name: "",
        contact_number: "",
        category: "",
        country: "",
        category_description: "",
        quantity: "",
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    },
  });

  const onSubmit = () => {
    if (isFormValid()) {
      mutate();
    } else {
      toast.error("Please fill all the required fields", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>Enter details for bulk order</h2>
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
                <CssTextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  autoComplete="off"
                  required
                />
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
          <button className={styles.submitBtn} onClick={onSubmit} disabled={isLoading}>
            <span className={styles.btnLabel}>
              {isLoading ? "Processing Order" : "SUBMIT DETAILS"}
            </span>
            {isLoading && (
              <span className={styles.spinner}>
                <Spinner />
              </span>
            )}
          </button>
          <a
            href="https://wa.me/9197317 33771"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button 
              type="button" // Ensures it's not treated as a submit button
              className={styles.directBtn}
              onClick={() => window.open("https://wa.me/9197317 33771", "_blank")} // Direct link to WhatsApp
              aria-label="Contact us via WhatsApp" // Accessibility enhancement
            >
              <Image src={WhatsAppSVG} alt="WhatsApp" width={25} height={25} /> 
              <span>DIRECT CONTACT</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;
