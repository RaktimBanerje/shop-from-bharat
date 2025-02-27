'use client';

import { useState } from "react";
import styles from "./Signup.module.css";
import { TextField } from "@mui/material";
import styled from "styled-components";
import apiServiceHandler from "../../../service/apiService";
import Link from "next/link";  // Use Next.js Link for routing
import usePasswordVisible from "../../../utils/passwordVisible";
import toast from "react-hot-toast";
import Image from "next/image"; // Import Image from next/image for optimization

import EllipseSvg from "../../../assets/EllipseMain.svg";
import EllipseSmallSvg from "../../../assets/EllipseSmall.svg";
import LogoIcon from '../../../assets/shopBharat.svg';

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

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
  });
  const [visible, Icon, toggleVisibility] = usePasswordVisible();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, re_password } = formData;

    if (!email || !password || !re_password) {
      toast.error("All Fields are Required!");
      return;
    }

    if (password !== re_password) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const body = {
        email,
        password,
      };

      const response = await apiServiceHandler(
        "POST",
        "api/auth/send/email/otp",
        body
      );

      if (response.status) {
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
        setTimeout(() => {
          // Use Next.js routing for OTP verification page
          window.location.href = `/verify-otp?email=${email}&jwtSecret=${response.secret}`;
        }, 2000); // Navigate after 2 seconds
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_left}>
        <div className={styles.login_left_header}>
          <h1>Enter your Details</h1>
        </div>
        <div className={styles.ellipses}>
          <div className={styles.ellipses_small}>
            <Image
              src={EllipseSmallSvg}
              alt="Small Ellipse"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.ellipses_main}>
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
            <Link href="/">
              <Image
                src={LogoIcon}
                alt="Logo"
                width={150}
                height={50}
              />
            </Link>
          </div>
          <div className={styles.login_form_heading}>
            <h1>Signup</h1>
          </div>

          <div className={styles.textField}>
            <CssTextField
              sx={{ width: "100%" }}
              label="Email Address"
              name="email"
              id="fullWidth"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className={styles.textField}>
            <CssTextField
              sx={{ width: "100%" }}
              label="Password"
              id="fullWidth"
              name="password"
              type="password"
              required
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          <div className={styles.password_textField}>
            <CssTextField
              sx={{ width: "100%" }}
              label="Verify Password"
              type={visible ? "text" : "password"}
              name="re_password"
              id="fullWidth"
              required
              onChange={handleChange}
              value={formData.re_password}
            />
            <span className={styles.icon} onClick={toggleVisibility}>
              <Icon />
            </span>
          </div>

          <div className={styles.button}>
            <button onClick={handleSubmit}>CONTINUE</button>
          </div>
          <div>
            Already have an Account?
            <Link href="/login" className={styles.login_option}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
