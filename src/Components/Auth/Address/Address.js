import React, { useEffect, useState } from "react";
import styles from "./Address.module.css";
import Navbar from "../../Header/Navbar";
import styled from "styled-components";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiServiceHandler from "../../../service/apiService";
import toast from "react-hot-toast";
import axios from "axios";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#9ca3af",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      border: "0.8px solid #374151",
    },
  },
});

const Address = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [email, setEmail] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const token = localStorage.getItem('JWT_TOKEN')

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const countriesData = response.data.data.map((country) => ({
        label: country.country,
        cities: country.cities,
      }));
      console.log(countriesData, "countries...");
      setCountries(countriesData);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    const mail = localStorage.getItem("email") || "user@hotmail.com";
    setEmail(mail);
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.label === country.label);
      setCities(selectedCountry ? selectedCountry.cities : []);
    } else {
      setCities([]);
      setCity("");
    }
  }, [country, countries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name,
        phone: phone,
        country: country.label,
        city: city,
        area: area,
        zipCode: zipcode,
        email: email,
        otherInfo: otherInfo,
      };

      const response = await apiServiceHandler(
        "POST",
        "api/user/address",
        payload
      );
      if (response.status) {
        navigate("/");
        toast.success(response.message, {
          duration: 2000,
          position: "top-center",
          iconTheme: {
            primary: "#15803d",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      } else {
        if (!response.is_address_exist) {
          navigate("/address");
        } else {
          toast.error(response.message || "Login failed");
        }
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div className={styles.address}>
      <div className={styles.address_container}>
        <Navbar token={token} />
        <div className={styles.address_form}>
          <div className={styles.form_heading}>
            <h1>Enter Your Address</h1>
          </div>
          <div className={styles.form_inputs}>
            <div className={styles.form_name_phone}>
              <CssTextField
                className={styles.input_field}
                label="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <CssTextField
                className={styles.input_field}
                disabled
                value={email}
              />
            </div>
            <div className={styles.form_zip_city}>
              <CssTextField
                className={styles.input_field}
                label="Phone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <CssTextField
                className={styles.input_field}
                label="Zipcode"
                value={zipcode}
                required
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className={styles.form_zip_city}>
              <Autocomplete
                className={styles.input_field}
                disablePortal
                id="country-select"
                options={countries}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => setCountry(value)}
                sx={{
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                    backgroundColor: "#363636",
                    "&:hover": {
                      backgroundColor: "#505050",
                    },
                  },
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                    {
                      backgroundColor: "#4396e6",
                      "&:hover": {
                        backgroundColor: "#5aa7f0",
                      },
                    },
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true'].Mui-focused":
                    {
                      backgroundColor: "#4396e6"
                    },
                }}
                renderInput={(params) => (
                  <CssTextField
                    {...params}
                    className={styles.input_field}
                    label="Country"
                    variant="outlined"
                    autoComplete="off"
                    required
                  />
                )}
              />

              <Autocomplete
                className={styles.input_field}
                disablePortal
                id="city-select"
                options={cities}
                getOptionLabel={(option) => option}
                onChange={(event, value) => setCity(value || "")}
                sx={{
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                    backgroundColor: "#363636",
                    "&:hover": {
                      backgroundColor: "#505050",
                    },
                  },
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                    {
                      backgroundColor: "#4396e6",
                      "&:hover": {
                        backgroundColor: "#5aa7f0",
                      },
                    },
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true'].Mui-focused":
                    {
                      backgroundColor: "#4396e6",
                    },
                }}
                renderInput={(params) => (
                  <CssTextField
                    {...params}
                    className={styles.input_field}
                    label="City"
                    variant="outlined"
                    required
                  />
                )}
              />
            </div>
            <div className={styles.area_street}>
              <CssTextField
                sx={{ width: "100%" }}
                multiline
                rows={2}
                label="Area and Street"
                value={area}
                required
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <div className={styles.area_street}>
              <CssTextField
                sx={{ width: "100%" }}
                multiline
                rows={2}
                label="Other Info if Any"
                value={otherInfo}
                onChange={(e) => setOtherInfo(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.address_button}>
            <button onClick={handleSubmit}>SAVE ADDRESS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
