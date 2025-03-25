"use client"

// OrderStep.jsx
import React, { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import WhatsAppSVG from "../../../assets/whatsapp.svg";
import Image from "next/image"; // Importing Image from Next.js for optimization
import styles from "../PlaceOrder.module.css";
import { CssTextField } from "../index";
import axios from "axios"; // Axios for API calls
import toast from "react-hot-toast"; // For displaying notifications

const dorpdownStyles = {
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
    backgroundColor: "#363636",
    "&:hover": {
      backgroundColor: "#505050",
    },
  },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
    backgroundColor: "#4396e6",
    "&:hover": {
      backgroundColor: "#5aa7f0",
    },
  },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
    backgroundColor: "#4396e6",
  },
};

const OrderStep = ({ onClose, handleOrderSubmit }) => {
  const sizes = [
    { label: "XS" },
    { label: "S" },
    { label: "M" },
    { label: "L" },
    { label: "XL" },
    { label: "XXL" },
    { label: "XXXL" },
  ];

  const weightOptions = [
    { label: '0 - 1 kg', value: '0-1 kg' },
    { label: '1 - 2 kg', value: '1-2 kg' },
    { label: '2 - 3 kg', value: '2-3 kg' },
    { label: '3 - 4 kg', value: '3-4 kg' },
    { label: '4 - 5 kg', value: '4-5 kg' },
    { label: '5 - 7 kg', value: '5-7 kg' },
    { label: '7 - 10 kg', value: '7-10 kg' },
  ];

  const [orderProducts, setOrderProducts]  = useState([])

  const [formData, setFormData] = useState({
    product_link: "",
    product_title: "",
    product_size: "",
    quantity: "",
    colors: "",
    comments: "",
    weight: "",
    price: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state for API request
  const [products, setProducts] = useState([]); // Local state for products

  // Fetch form data from localStorage on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Save updated form data to localStorage
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const createOrder = async (newOrder) => {
    try {
      // Map the keys to more human-readable labels
      const humanReadableData = orderProducts.map(product => ({
        "Product Link": product.product_link,
        "Product Title": product.product_title,
        "Product Size": product.product_size,
        "Quantity": product.quantity,
        "Colors Available": product.colors,
        "Customer Comments": product.comments,
        "Weight Range": product.weight,
        "Price (USD)": product.price
      }));

      console.log(humanReadableData)
      localStorage.setItem('productData', JSON.stringify(humanReadableData));
      setIsLoading(true);
      
      const token = localStorage.getItem('BHARAT_TOKEN'); 
      
      // Make the POST request with the token in the Authorization header
      const response = await axios({
        method: 'post',
        url: "https://3.107.179.121/api/order/create",
        headers: { 'Authorization': 'Bearer ' + token },
        data: newOrder
      });
      
      if (response) {
        console.log({OrderID: response.data.order.order_number})

        // axios.post('https://wajd.co.uk/email.php', {order_number: response.data.order.order_number})
        //   .then(response => {})
        //   .catch(error => {
        //       console.error("Error making order request:", error);
        // });

        toast.success("Order created successfully", {
          duration: 2000,
          position: "top-center",
        });
        setIsLoading(false); // Reset loading
        setProducts((prevProducts) => [...prevProducts, newOrder]); // Add new order to local products state
        handleOrderSubmit();
      }
    } catch (error) {
      toast.error("An error occurred while creating the order", {
        duration: 2000,
        position: "top-center",
      });
      setIsLoading(false); // Reset loading
    }
  };

  const onSubmit = () => {
    const form = {
      product_link: formData.product_link || "",
      product_title: formData.product_title || "",
      product_size: formData.product_size || "",
      quantity: formData.quantity || "",
      colors: formData.colors || "",
      comments: formData.comments || "",
      weight: formData.weight || "",
      price: formData.price || "",
      id: Date.now(), // Generate a temporary ID for the product
    };

    if (form.product_link && form.product_title && form.weight && form.price) {
      createOrder(form); // Create order via API
    } else {
      toast.error("Please fill in all required fields", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const clearFormData = () => {
    if (!formData.product_link || !formData.product_title || !formData.weight || !formData.price) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    console.log("Here")
    console.log(formData)
    setOrderProducts((prevOrderProducts) => [...prevOrderProducts, formData]);

    setFormData({
      product_link: "",
      product_title: "",
      product_size: "",
      quantity: "",
      colors: "",
      comments: "",
      weight: "",
      price: "",
    });
    localStorage.removeItem("formData"); // Clear form data from localStorage
  };

  const populateForm = (idx) => {
    const product = orderProducts.find((product) => idx === product.id);
    if (product) {
      setFormData(product); // Populate form with selected product details
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    onClose();
    // Optionally, do not clear localStorage if you want to persist data
  };

  return (
    <>
      <div className={styles.modal_header}>
        <h2>Place your order</h2>
        <button onClick={handleCloseModal}>X</button>
      </div>

      {orderProducts.length > 0 && (
        <div className={styles.all_orders}>
          {orderProducts.map((product) => (
            <div
              key={product.id}
              className={styles.order_item}
              onClick={() => populateForm(product.id)}
            >
              {product.product_title}
            </div>
          ))}
        </div>
      )}

      <div className={styles.modal_inputs}>
        <div className={styles.product_link_container}>
          <CssTextField
            className={styles.link_field}
            label="Paste Product Link"
            name="product_link"
            value={formData.product_link}
            onChange={handleChange}
            required
          />
          <span onClick={clearFormData}>Add another product link</span>
        </div>

        <CssTextField
          className={styles.name_field}
          label="Product Title"
          name="product_title"
          value={formData.product_title}
          onChange={handleChange}
        />

        <div className={styles.form_zip_city}>
          <Autocomplete
            className={styles.dropdown_field}
            disablePortal
            id="weight-select"
            options={weightOptions}
            getOptionLabel={(option) => option.label}
            sx={{
              width: '50%',
              ...dorpdownStyles,
            }}
            value={weightOptions.find((option) => option.value === formData.weight) || null}
            onChange={(event, value) => {
              setFormData({
                ...formData,
                weight: value ? value.value : null,
              });
            }}
            renderInput={(params) => (
              <CssTextField
                {...params}
                label="Select Weight"
                variant="outlined"
                autoComplete="off"
              />
            )}
          />
          <CssTextField
            className={styles.input_field}
            label="Price(INR)"
            required
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_zip_city}>
          <CssTextField
            className={styles.input_field}
            label="Quantity"
            name="quantity"
            value={formData.quantity || ""}
            onChange={handleChange}
          />
          <CssTextField
            className={styles.input_field}
            label="Colour"
            name="colors"
            value={formData.colors || ""}
            onChange={handleChange}
          />
        </div>

        {/* Product size as a regular text input */}
        <CssTextField
          className={styles.input_field}
          sx={{ width: "100%" }}
          label="Product Size"
          name="product_size"
          value={formData.product_size || ""}
          onChange={handleChange}
          variant="outlined"
          autoComplete="off"
        />

        <CssTextField
          sx={{ width: "100%" }}
          multiline
          rows={2}
          label="Additional Comment (Optional)"
          name="comments"
          value={formData.comments || ""}
          onChange={handleChange}
        />
      </div>

      <div className={styles.modal_actions}>
        <button className={styles.submitBtn} onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Submitting..." : "CONTINUE"}
        </button>
        <button
          className={styles.directBtn}
          onClick={() => window.open("https://wa.me/9197317 33771", "_blank")}
        >
          <Image src={WhatsAppSVG} alt="WhatsApp" width={30} height={30} />
          DIRECT CONTACT
        </button>
      </div>
    </>
  );
};

export default OrderStep;
