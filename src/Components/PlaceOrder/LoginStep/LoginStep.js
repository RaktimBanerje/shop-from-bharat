"use client"

import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import GoogleSvg from "../../../assets/google.svg";
import { TextField } from "@mui/material";
import styled from "styled-components";
import EllipseSvg from "../../../assets/EllipseMain.svg";
import EllipseSmallSvg from "../../../assets/EllipseSmall.svg";
import apiServiceHandler from "../../../service/apiService";
import toast from "react-hot-toast";
import FrameImg from "../../../assets/Frame.png";
import usePasswordVisible from "../../../utils/passwordVisible";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image"; // Import the Image component from Next.js

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

const LoginStep = ({ setCurrentStep, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [visible, Icon, toggleVisibility] = usePasswordVisible();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        localStorage.setItem("BHARAT_TOKEN", response.secret);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("bharatId", response.userId);
        localStorage.setItem("userName", response.name);
        localStorage.setItem("email", email);

        setTimeout(() => {
          toast.success(response.message, {
            duration: 4000,
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
          setIsLoading(false);

          // Navigate programmatically using window.location
          window.location.href = '/order'; // Direct to the 'order' page
        }, 2000);
        
      } else {
        toast.error(response.message || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
      setIsLoading(false);
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
              <Image src={EllipseSmallSvg} alt="Small Ellipse" />
            </div>
            <div className={styles.ellipses_main}>
              <Image src={EllipseSvg} alt="Main Ellipse" />
            </div>
          </div>
        </div>
        <div className={styles.login_right}>
          <button className={styles.close_button} onClick={onClose}>X</button>
          <div className={styles.login_form}>
            <div className={styles.brand_logo}>
              <Image src={FrameImg} alt="Brand Logo" />
            </div>
            <div className={styles.login_form_heading}>
              <h1>Login</h1>
            </div>

            <div className={styles.textField}>
              <CssTextField
                sx={{ width: "100%" }}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

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
            </div>

            <div className={styles.button}>
              <button onClick={handleSubmit}>
                {isLoading ? "Logging in..." : "Continue"}
              </button>
            </div>
          </div>
          <div className={styles.dont_have_account}>
            Don't have an Account?
            <Link href="/signup">
              <a className={styles.signup_option}>Signup</a> {/* Wrap the "Signup" with <a> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginStep;
