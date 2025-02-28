'use client';

import { useState, useEffect } from "react";
import styles from "./VerifyOtp.module.css";
import { TextField } from "@mui/material";
import styled from "styled-components";
import toast from "react-hot-toast";
import apiServiceHandler from "../../../service/apiService";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image"; // Import Image from next/image for optimization

import EllipseSvg from "../../../assets/EllipseMain.svg";
import EllipseSmallSvg from "../../../assets/EllipseSmall.svg";
import shopBharatLogo from "../../../assets/shopBharat.svg";

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  gap: 30px;
  max-width: 60%;
  margin-inline: auto;
`;

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [jwtSecret, setJwtSecret] = useState("");
  const [seconds, setSeconds] = useState(10);

  // Fetch email and jwtSecret from URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    const jwtSecret = params.get("jwtSecret");

    if (email && jwtSecret) {
      setEmail(email);
      setJwtSecret(jwtSecret);
    } else {
      toast.error("Missing email or JWT secret.");
      window.location.href = "/"; // Redirect to home page if parameters are missing
    }
  }, []);

  const handleOtpChange = (newValue) => {
    setOtp(newValue);
  };

  const handleOtpVerification = async () => {
    try {
      const response = await apiServiceHandler(
        "POST",
        "api/auth/verify/email/otp",
        { email, otp, jwtSecret }
      );

      if (response.status) {
        localStorage.setItem("JWT_TOKEN", response.secret);
        toast.success("OTP verification successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", email);
        setTimeout(() => {
          window.location.href = "/address"; // Redirect to address page
        }, 2000); // Navigate after 2 seconds
      } else {
        toast.error(response.message); // OTP verification failed
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying OTP.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval);
          return prevSeconds;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const reSendOtp = () => {
    setSeconds(10);
    // You would need to call an API to resend the OTP here
    console.log("Resending OTP...");
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
            <Image
              src={shopBharatLogo}
              alt="ShopBharat Logo"
              width={150}
              height={50}
            />
          </div>
          <div className={styles.login_form_heading}>
            <h1>OTP Verification</h1>
          </div>

          <MuiOtpInputStyled value={otp} onChange={handleOtpChange} />

          <div className={styles.countdown_text}>
            <p>
              Time Remaining:{" "}
              <span style={{ fontWeight: 600 }}>
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </p>
            <button
              disabled={seconds > 0}
              style={seconds > 0 ? { color: "#DFE3E8" } : { color: "#FF5630" }}
              onClick={reSendOtp}
            >
              RESEND OTP
            </button>
          </div>

          <div className={styles.button}>
            <button onClick={handleOtpVerification}>CONTINUE</button>
          </div>
          <div className={styles.dont_have_account}>
            Want to change your email?{" "}
            <span
              onClick={() => window.history.back()} // Use window.history.back() for going back to previous page
              className={styles.change_email_option}
            >
              Click here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
