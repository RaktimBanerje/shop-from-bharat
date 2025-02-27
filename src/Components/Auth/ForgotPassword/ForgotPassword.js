import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { TextField } from "@mui/material";
import styled from "styled-components";
import apiServiceHandler from "../../../service/apiService";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import usePasswordVisible from "../../../utils/passwordVisible";
import Image from "next/image";  // Importing next/image

import EllipseSvg from "../../../assets/EllipseMain.svg";
import EllipseSmallSvg from "../../../assets/EllipseSmall.svg";
import FrameImg from "../../../assets/Frame.png";

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [visible, Icon, toggleVisibility] = usePasswordVisible();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        email: email,
        password: password,
      };

      const response = await apiServiceHandler(
        "POST",
        "api/auth/verify/email/login",
        payload
      );

      if (response.status) {
        localStorage.setItem("JWT_TOKEN", response.secret);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("bharatId", response.userId);
        localStorage.setItem("userName", response.name);
        localStorage.setItem("email", email);
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
          setTimeout(() => {
            navigate("/address");
          }, 2000);
          toast.error(response.message, {
            duration: 2000,
            position: "top-center",
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fff",
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        } else {
          toast.error(response.message || "Login failed");
        }
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className={styles.login}>
        <div className={styles.login_left}>
          <div className={styles.login_left_header}>
            <h1>Enter your Details</h1>
          </div>
          <div className={styles.ellipses}>
            <div className={styles.ellipses_small}>
              {/* Replaced <img> with <Image> */}
              <Image 
                src={EllipseSmallSvg} 
                alt="Small Ellipse" 
                width={100} 
                height={100} 
              />
            </div>
            <div className={styles.ellipses_main}>
              {/* Replaced <img> with <Image> */}
              <Image 
                src={EllipseSvg} 
                alt="Main Ellipse" 
                width={150} 
                height={150} 
              />
            </div>
          </div>
        </div>
        <div className={styles.login_right}>
          <div className={styles.login_form}>
            <div className={styles.brand_logo}>
              {/* Replaced <img> with <Image> */}
              <Image 
                src={FrameImg} 
                alt="Brand Logo" 
                width={150} 
                height={150} 
              />
            </div>

            <div className={styles.login_form_heading}>
              <h1>Change Password</h1>
            </div>

            <div className={styles.textField}>
              <CssTextField
                sx={{ width: "100%" }}
                label="Email Address"
                name="email"
                id="fullWidth"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            {/* 
            <div className={styles.password_textField}>
              <CssTextField
                sx={{ width: "100%" }}
                label="Password"
                id="fullWidth"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className={styles.icon} onClick={toggleVisibility}>
                <Icon />
              </span>
            </div> */}

            <div className={styles.button}>
              <button onClick={handleSubmit}>SEND LINK</button>
            </div>
          </div>
          <div className={styles.dont_have_account}>
            Don't have an Account?
            <span
              onClick={() => navigate("/signup")}
              className={styles.signup_option}
            >
              Signup
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
