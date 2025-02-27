// pages/account.js (Next.js page)

import { useState, useEffect } from "react";
import apiServiceHandler from "../../service/apiService";  // Adjust import path
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Account.module.css";  // Import the CSS module
import { CssTextField } from "../PlaceOrder";

const Account = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);

  // Get the userId from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("bharatId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await apiServiceHandler("GET", `api/user/${userId}`);
          if (response.status) {
            const { user } = response;
            setName(user.name || "Your Name");
            setContactNumber(user.contact_number || "Your Phone");
            setEmail(user.email || "youremail@example.com");
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleEditSave = async () => {
    if (isEditing) {
      try {
        const payload = {
          name,
          contact_number: contactNumber,
        };

        const response = await apiServiceHandler("POST", `api/user/${userId}`, payload);

        if (response.status) {
          toast.success("User details updated successfully");
        } else {
          toast.error("Failed to update user details");
        }
      } catch (error) {
        console.error("Error updating user details:", error);
        toast.error("An error occurred while updating details");
      }
    }
    // Toggle between editing and saving modes
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.account}>
      <div className={styles.account_container}>
        <div className={styles.account_info}>
          <div className={styles.account_header}>
            <div className={styles.header_left}>
              <h4>Account Details</h4>
              <p>Your profile photo, phone number, and email</p>
            </div>
            <div className={styles.header_right}>
              <button onClick={handleEditSave}>
                {isEditing ? "SAVE DETAILS" : "EDIT DETAILS"}
              </button>
            </div>
          </div>
          <div className={styles.account_section}>
            <div className={styles.account_name}>
              <CssTextField
                className={styles.name_field}
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                placeholder="Your Name"
              />
            </div>
            <div className={styles.account_contact}>
              <PhoneInput
                country={"us"}
                label="Phone"
                value={contactNumber}
                onChange={(phone) => setContactNumber(phone)}
                disabled={!isEditing}
                className={styles.input_field}
                inputStyle={{
                  height: "100%",
                  width: "100%",
                  color: isEditing ? "black" : "rgba(0, 0, 0, 0.38)",
                }}
                placeholder="Your Phone"
              />
              <CssTextField
                className={styles.input_field}
                label="Email Address"
                value={email}
                disabled
                placeholder="youremail@example.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
