import React, { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import WhatsAppSVG from "../../../assets/whatsapp.svg";
import styles from "../PlaceOrder.module.css";
import { CssTextField } from "../index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, showLastProduct } from "../../../store/productSlice";
import toast from "react-hot-toast";
import apiServiceHandler from "../../../service/apiService";

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
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const lastProduct = useSelector((state) => state.products.lastProduct);

  const sizes = [
    { label: "" },
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
    { label: '7 - 10 kg', value:'7-10 kg' },
  ];

  const [formData, setFormData] = useState({
    product_link: "",
    product_title: "",
    product_size: sizes[0],
    quantity: "",
    colors: "",
    comments: "",
    weight: "",
    price: "",
  });

  // Fetch form data from localStorage on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else if (lastProduct) {
      setFormData(lastProduct);
    }
  }, [lastProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Save updated form data to localStorage
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const createOrder = async (newOrder) => {
    const response = await apiServiceHandler("POST", "api/order/create", newOrder);
    return response;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      // Optionally, close modal on success
      // onClose();
    },
  });

  const onSubmit = () => {
    const form = {
      product_link: formData.product_link || "",
      product_title: formData.product_title || "",
      product_size: formData.product_size || sizes[0],
      quantity: formData.quantity || "",
      colors: formData.colors || "",
      comments: formData.comments || "",
      weight: formData.weight || "",
      price: formData.price || "",
      id: formData.id || "",
    };

    if (products.length > 0) {
      if (form.product_link && form.product_title && form.weight && form.price) {
        dispatch(addProducts(form));
        dispatch(showLastProduct({}));
        handleOrderSubmit();
      } else {
        handleOrderSubmit();
      }
    } else if (Object.keys(form).length > 0 && form.product_link && form.weight && form.price) {
      dispatch(addProducts(form));
      dispatch(showLastProduct({}));
      handleOrderSubmit();
    } else {
      toast.error("Please add at least one product", {
        duration: 2000,
        position: "top-center",
        ariaProps: { role: "status", "aria-live": "polite" },
      });
    }
  };

  const clearFormData = () => {
    if (!formData.product_link || !formData.product_title || !formData.weight || !formData.price) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    dispatch(addProducts(formData));
    setFormData({
      product_link: "",
      product_title: "",
      product_size: sizes[0],
      quantity: "",
      colors: "",
      comments: "",
      weight: "",
      price: "",
    });
    // Optionally, clear the localStorage data when resetting the form
    // localStorage.removeItem("formData");
  };

  const populateForm = (idx) => {
    if (formData.product_link && formData.product_title && formData.weight && formData.price) {
      dispatch(addProducts(formData));
    }

    const data = products.filter((product) => idx === product.id);

    if (data.length > 0 && formData.id !== data[0].id) {
      setFormData(data[0]);
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

      {products.length > 0 && (
        <div className={styles.all_orders}>
          {products.map((product) => (
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

        <CssTextField
          className={styles.input_field}
          sx={{ width: "100%" }}
          label="Select Size"
          required
          name="product_size"
          value={formData.product_size || ""}
          onChange={(event) => setFormData({ ...formData, product_size: event.target.value })}
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
        <button className={styles.submitBtn} onClick={onSubmit}>
          CONTINUE
        </button>
        <button
          className={styles.directBtn}
          onClick={() => window.open("https://wa.me/9197317 33771", "_blank")}
        >
          <img src={WhatsAppSVG} alt="WhatsApp" />
          DIRECT CONTACT
        </button>
      </div>
    </>
  );
};

export default OrderStep;



