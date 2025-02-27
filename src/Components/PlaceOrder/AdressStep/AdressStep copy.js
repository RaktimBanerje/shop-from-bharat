import React, { useEffect, useState } from "react";
import { CssTextField } from "../index";  // Adjust based on your Next.js structure
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LeftArrow from "../../../assets/leftarrow.svg"; // Update the asset path accordingly
import { useDispatch, useSelector } from "react-redux";
import { showLastProduct, updateOrderData, updateTotalAmount } from "../../../store/productSlice";
import PinSVG from "../../../assets/pin.svg"; // Update the asset path accordingly
import toast from "react-hot-toast";
import apiServiceHandler from "../../../service/apiService";  // Ensure this is properly set up for Next.js
import PhoneInput from "react-phone-input-2"; 
import "react-phone-input-2/lib/style.css"; 
import WhatsAppSVG from "../../../assets/whatsapp.svg";  // Update the asset path accordingly

const AdressStep = ({ onClose, setCurrentStep }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [addressForm, setAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const products = useSelector((state) => state.products.products);

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
    const endpoint = "api/address/list";
    const method = "GET";
    const addressList = await apiServiceHandler(method, endpoint);
    return addressList;
  };

  const { data: addressList, isPending } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddressList,
  });

  // Select the first address by default after the address list is fetched
  useEffect(() => {
    if (addressList?.address?.length > 0) {
      setSelectedAddressId(addressList.address[0]._id);
    }
  }, [addressList]);

  // Toggle address form visibility
  const toggleAddressForm = () => {
    setAddressForm(!addressForm);
  };

  // Handle new address submission
  const newAddress = async () => {
    const response = await apiServiceHandler("POST", "api/address/create", formData);
    return response;
  };

  const { mutate } = useMutation({
    mutationFn: newAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
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
    },
    onError: () => {
      toast.error("Failed to add new address");
    },
  });

  const addNewAddress = () => {
    if (
      formData.name &&
      formData.phone &&
      formData.address &&
      formData.zip_code &&
      formData.email &&
      formData.city &&
      formData.country
    ) {
      mutate();
    } else {
      toast.error("Please fill all fields");
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
    const totalAmount = products.reduce(function (acc, obj) {
      return acc + Number(obj.price);
    }, 0);
    dispatch(updateTotalAmount(totalAmount));
    if (selectedAddressId) {
      const payload = {
        address_id: selectedAddressId,
        products: products.map((product) => ({
          ...product,
          weight: convertWeightToNumber(product.weight),
        })),
      };

      try {
        const response = await apiServiceHandler("POST", "api/order/create", payload);
        if (response.status) {
          dispatch(updateOrderData(response?.order));
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
      }
    } else {
      toast.error("Please select an address");
    }
  };

  if (isPending) {
    return <span>Loading Address List...</span>;
  }

  return (
    <>
      <div className={styles.modal_header}>
        <div className={styles.header_left}>
          <img
            src={LeftArrow}
            alt="Back"
            onClick={() => {
              setCurrentStep("order");
              dispatch(showLastProduct());
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
        <div className={styles.addresses_list}>
          {addressList?.status &&
            addressList.address.map((address) => (
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
              onChange={handlePhoneChange}
              className={styles.input_field}
              inputProps={{
                placeholder: "Your Phone", 
                name: "phone",            
                required: true, 
              }}
              inputStyle={{
                height: "100%",
                width: "100%",
                color:  "black",
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
                name="other"
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
          onClick={addressForm ? addNewAddress : onSubmit}
        >
          {addressForm ? "Add Address" : "Proceed To Payment"}
        </button>
      </div>
    </>
  );
};

export default AdressStep;
