import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { TextField } from "@mui/material";
import styled from "styled-components";
import apiServiceHandler from "../../../service/apiService";
import toast from 'react-hot-toast';
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

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [visible, Icon, toggleVisibility] = usePasswordVisible();

  const handleSubmit = () => {
    console.log('first');
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

            <div className={styles.password_textField}>
              <CssTextField
                sx={{ width: "100%" }}
                label="New Password"
                id="fullWidth"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.password_textField}>
              <CssTextField
                sx={{ width: "100%" }}
                label="Confirm Password"
                id="fullWidth"
                type={visible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className={styles.icon} onClick={toggleVisibility}>
                <Icon />
              </span>
            </div>

            <div className={styles.button}>
              <button onClick={handleSubmit}>CHANGE PASSWORD</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
