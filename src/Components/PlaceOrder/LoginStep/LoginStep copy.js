import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import GoogleSvg from "../../../assets/google.svg";
import { TextField } from "@mui/material";
import styled from "styled-components";
import EllipseSvg from "../../../assets/EllipseMain.svg";
import EllipseSmallSvg from "../../../assets/EllipseSmall.svg";
import apiServiceHandler from "../../../service/apiService";
import toast from "react-hot-toast";
import { useRouter } from 'next/router'; // Use Next.js useRouter for navigation
import FrameImg from "../../../assets/Frame.png";
import usePasswordVisible from "../../../utils/passwordVisible";

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
  const router = useRouter(); // Using Next.js useRouter

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
          setCurrentStep('order');
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
              <img src={EllipseSmallSvg} />
            </div>
            <div className={styles.ellipses_main}>
              <img src={EllipseSvg} />
            </div>
          </div>
        </div>
        <div className={styles.login_right}>
          <button className={styles.close_button} onClick={onClose}>X</button>
          <div className={styles.login_form}>
            <div className={styles.brand_logo}>
              <img src={FrameImg} alt="" />
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
              <button onClick={handleSubmit}>{isLoading ? "Logging in..." : "Continue"}</button>
            </div>

            <div className={styles.forgot_password}>
              FORGOT YOUR PASSWORD?
              <Link href="/forgot-password">Click here</Link> {/* Next.js Link */}
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

export default LoginStep;
