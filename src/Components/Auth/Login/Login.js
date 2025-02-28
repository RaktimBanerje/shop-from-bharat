'use client';

import React, { useState } from "react";
import styles from "./Login.module.css";
import { TextField } from "@mui/material";
import styled from "styled-components";
import apiServiceHandler from "../../../service/apiService"; // Make sure apiService is compatible with Next.js
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Update to use Next.js router
import Link from "next/link"; // Using Next.js' Link component
import usePasswordVisible from "../../../utils/passwordVisible"; // Ensure this is compatible with Next.js
import Image from "next/image"; // Import next/image

import LogoIcon from '../../../../public/assets/shopBharat.svg'; // Update path to public directory
import EllipseSvg from "../../../../public/assets/EllipseMain.svg"; // Update path to public directory
import EllipseSmallSvg from "../../../../public/assets/EllipseSmall.svg"; // Update path to public directory
import FrameImg from "../../../../public/assets/Frame.png"; // Update path to public directory

const CssTextField = styled(TextField)(({
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
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Next.js router

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
        localStorage.setItem("BHARAT_TOKEN", response.secret);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("bharatId", response.userId);
        localStorage.setItem("userName", response.name);
        localStorage.setItem("email", email);
        router.push("/"); // Use Next.js router
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
      } else if (!response.hasOwnProperty("is_address_exist")) {
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
        if (!response.is_address_exist) {
          setTimeout(() => {
            router.push("/address"); // Use Next.js router
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
              {/* Replaced img with next/image */}
              <Image
                src={EllipseSmallSvg}
                alt="Small Ellipse"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.ellipses_main}>
              {/* Replaced img with next/image */}
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
              {/* Replaced img with next/image */}
              <Link href={"/"}> {/* Use Next.js Link component */}
                <Image
                  src={LogoIcon}
                  alt="Logo"
                  width={150}
                  height={50}
                />
              </Link>
            </div>

            <div className={styles.login_form_heading}>
              <h1>Login</h1>
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
              <button onClick={handleSubmit}>LOGIN</button>
            </div>
          </div>
          <div className={styles.dont_have_account}>
            Don't have an Account?
            <span
              onClick={() => router.push("/signup")} 
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

export default Login;
