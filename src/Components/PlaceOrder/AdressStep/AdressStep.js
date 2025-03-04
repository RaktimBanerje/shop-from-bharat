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

const baseUrl = "https://13.210.82.75";  // Your API base URL

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

        console.log(response)

        if (response.data.status) {
          alert(response.data.message)
          
          setCurrentStep("payment");
        }
      } catch (error) {
        toast.error("Failed to create order");
        console.error(error);
      }
    } else {
      toast.error("Please select an address");
    }
  };

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
      <div className={styles.modal_header}>
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
          <h2>Enter Your Address</h2>
        </div>
        <button onClick={onClose}>X</button>
      </div>

      <div className={styles.add_address}>
        <button className={styles.add_address_btn} onClick={toggleAddressForm}>
          {addressForm ? "Remove Address Form" : "Add New Address"}
        </button>
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
                    <h5>{address.address_type ? address.address_type.toUpperCase() : ''}</h5>
                    <p>Courier Delivery</p>
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
                    width={16} // Adjust width as needed
                    height={16} // Adjust height as needed
                  />
                  <span>
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
          onClick={addressForm ? newAddress : onSubmit}
        >
          {addressForm ? "Add Address" : "Proceed To Payment"}
        </button>
      </div>
    </>
  );
};

export default AddressStep;
