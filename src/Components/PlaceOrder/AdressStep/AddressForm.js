import React, { useState, useEffect } from "react";
import styles from "../PlaceOrder.module.css";
import { CssTextField } from "../index";
import apiServiceHandler from "../../../service/apiService";
import { toast } from "react-hot-toast";

const AddressForm = ({ onClose, address_obj,onSave }) => {

  console.log("address_obj",address_obj)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    zipCode: "",
    email: "",
    city: "",
    country: "",
    addressType: [],
  });

  // Use useEffect to initialize formData when address_obj changes
  useEffect(() => {
    if (address_obj) {
      console.log(address_obj,'address_obj====.')
      setFormData({
        name: address_obj.name || "",
        phone: address_obj.contact_number || "",
        address: address_obj.address || "",
        zipCode: address_obj.zip_code || "",
        email: address_obj.email || "",
        city: address_obj.city || "",
        country: address_obj.country || "",
        addressType: address_obj.address_type ? [address_obj.address_type] : [],
      });
    }
  }, [address_obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        addressType: [...formData.addressType, name],
      });
    } else {
      setFormData({
        ...formData,
        addressType: formData.addressType.filter((type) => type !== name),
      });
    }
  };

  const handleAddress = async () => {
    try {
      let response;
      const requestBody = {
        name: formData.name,
        contact_number: formData.phone, // Ensure this matches the backend field
        email: formData.email,
        address: formData.address,
        zip_code: formData.zipCode, // Ensure this matches the backend field
        city: formData.city,
        country: formData.country,
        address_type: formData.addressType[0], // Assuming you want the first selected type
      };
  
      if (address_obj) {
        // Updating existing address
        response = await apiServiceHandler("POST", `api/address/${address_obj._id}`, requestBody);
      } else {
        // Creating new address
        response = await apiServiceHandler("POST", "api/address/create", requestBody);
      }
  
      if (response.status) {
        toast.success("Address details saved successfully");
        console.log("Address saved successfully:", response);
        onSave()
        onClose();
      } else {
        toast.error("Failed to save address details");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("An error occurred while saving the address");
    }
  };
  


  return (
    <div>
      <div className={styles.modal_header}>
        <div className={styles.header_left}>
          <h2>Enter Your Address</h2>
        </div>
        <button onClick={onClose}>X</button>
      </div>

      <div className={styles.modal_inputs}>
        <CssTextField
          className={styles.name_field}
          label="What should we call you?"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <div className={styles.form_zip_city}>
          <CssTextField
            className={styles.input_field}
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <CssTextField
            className={styles.input_field}
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            name="zipCode"
            value={formData.zipCode}
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
              name="home"
              checked={formData.addressType.includes("home")}
              onChange={handleCheckboxChange}
            />{" "}
            Home
          </label>
          <label className={styles.checkbox_label}>
            <input
              type="checkbox"
              name="work"
              checked={formData.addressType.includes("work")}
              onChange={handleCheckboxChange}
            />{" "}
            Work
          </label>
          <label className={styles.checkbox_label}>
            <input
              type="checkbox"
              name="other"
              checked={formData.addressType.includes("other")}
              onChange={handleCheckboxChange}
            />{" "}
            Other
          </label>
        </div>
      </div>

      <div className={styles.modal_actions}>
        <button className={styles.proceedBtn} onClick={handleAddress}>
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
