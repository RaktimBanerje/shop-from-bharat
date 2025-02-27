import React, { useEffect, useState } from "react";
import { CssTextField } from "../index";  // Adjust based on your Next.js structure
import axios from "axios";
import LeftArrow from "../../../assets/leftarrow.svg"; // Update the asset path accordingly
import PinSVG from "../../../assets/pin.svg"; // Update the asset path accordingly
import toast from "react-hot-toast";
import apiServiceHandler from "../../../service/apiService";  // Ensure this is properly set up for Next.js
import PhoneInput from "react-phone-input-2"; 
import "react-phone-input-2/lib/style.css"; 
import WhatsAppSVG from "../../../assets/whatsapp.svg";  // Update the asset path accordingly

const AdressStep = ({ onClose, setCurrentStep, products }) => {
  const [addressForm, setAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    zip_code: "",
    email: "",
    city: "",
    country: "",
    address_type: "home", // Set a default address type
  });
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch the address list
  const getAddressList = async () => {
    try {
      const response = await axios.get("http://13.210.82.75/api/address/list");
      if (response.data?.address) {
        setAddressList(response.data.address);
        if (response.data.address.length > 0) {
          setSelectedAddressId(response.data.address[0]._id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch address list", error);
    }
  };

  useEffect(() => {
    getAddressList();
  }, []);

  // Calculate total amount of products
  useEffect(() => {
    if (products && Array.isArray(products)) {
      const total = products.reduce((acc, product) => acc + Number(product.price), 0);
      setTotalAmount(total);
    } else {
      setTotalAmount(0);  // If products are undefined or not an array, set total amount to 0
    }
  }, [products]);

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

  // Handle new address submission
  const newAddress = async () => {
    try {
      const response = await axios.post("http://13.210.82.75/api/address/create", formData);
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
      getAddressList(); // Refresh the address list after adding a new one
    } catch (error) {
      toast.error("Failed to add new address");
    }
  };

  const handleAddressSelect = (id) => {
    setSelectedAddressId(id);
  };

  const convertWeightToNumber = (weightRange) => {
    const weightMap = {
      "0-1 kg": 0.5,       // Average of the range
      "1-5 kg": 3,         // Average of the range
      "5-10 kg": 7.5,      // Average of the range
      "10+ kg": 15,        // Assuming a threshold of 15 kg for "10+"
    };

    return weightMap[weightRange] || 0; // Default to 0 if no match
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const onSubmit = async () => {
    if (selectedAddressId) {
      const payload = {
        address_id: selectedAddressId,
        products: products.map((product) => ({
          ...product,
          weight: convertWeightToNumber(product.weight),
        })),
      };

      try {
        const response = await axios.post("http://13.210.82.75/api/order/create", payload);
        if (response.status) {
          toast.success(response.message, {
            duration: 2000,
            position: "top-center",
            iconTheme: {
              primary: "#15803d",
              secondary: "#fff",
            },
          });
          setCurrentStep("payment");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to create order");
      }
    } else {
      toast.error("Please select an address");
    }
  };

  return (
    <>
      <div className="modal_header">
        <div className="header_left">
          <img
            src={LeftArrow}
            alt="Back"
            onClick={() => {
              setCurrentStep("order");
            }}
          />
          <h2>Enter Your Address</h2>
        </div>
        <button onClick={onClose}>X</button>
      </div>

      <div className="add_address">
        <button className="add_address_btn" onClick={() => setAddressForm(!addressForm)}>
          {addressForm ? "Remove Address Form" : "Add New Address"}
        </button>
      </div>

      {!addressForm ? (
        <div className="addresses_list">
          {addressList.map((address) => (
            <div key={address._id} className="address_info">
              <div className="select_address">
                <input
                  type="radio"
                  checked={selectedAddressId === address._id}
                  onChange={() => handleAddressSelect(address._id)}
                />
                <div className="address_type">
                  <h5>{address.address_type ? address.address_type.toUpperCase() : ''}</h5>
                  <p>Courier Delivery</p>
                </div>
              </div>

              <div className="address_status">
                {selectedAddressId === address._id && (
                  <>
                    <div className="address_circle"></div>
                    <span>Selected</span>
                  </>
                )}
              </div>

              <div className="user_address">
                <img src={PinSVG} alt="Pin" />
                <span>
                  <strong>{address.name} </strong>
                  {`${address.address}, ${address.city}, ${address.country}, ${address.zip_code}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="modal_inputs">
          <CssTextField
            className="name_field"
            label="What should we call you?"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="form_zip_city">
            <CssTextField
              className="input_field"
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
              onChange={handlePhoneChange}
              className="input_field"
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

          <div className="form_zip_city">
            <CssTextField
              className="input_field"
              label="House/Flat/Floor No."
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <CssTextField
              className="input_field"
              label="Zip Code"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form_zip_city">
            <CssTextField
              className="input_field"
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <CssTextField
              className="input_field"
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkboxContainer">
            <label className="checkbox_label">
              <input
                type="radio"
                name="address_type"
                value="home"
                checked={formData.address_type === "home"}
                onChange={handleAddressTypeChange}
              />{" "}
              Home
            </label>
            <label className="checkbox_label">
              <input
                type="radio"
                name="address_type"
                value="work"
                checked={formData.address_type === "work"}
                onChange={handleAddressTypeChange}
              />{" "}
              Work
            </label>
            <label className="checkbox_label">
              <input
                type="radio"
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

      <div className="modal_actions">
        <button
          className="proceedBtn"
          onClick={addressForm ? newAddress : onSubmit}
        >
          {addressForm ? "Add Address" : "Proceed To Payment"}
        </button>
      </div>
    </>
  );
};

export default AdressStep;
