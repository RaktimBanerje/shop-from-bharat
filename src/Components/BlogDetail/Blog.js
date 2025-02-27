"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Blog.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally
import Link from "next/link";  // Import Link from next

const BlogDetail = () => {
  const [token, setToken] = useState(null);  // Initialize state as null to avoid undefined issues

  useEffect(() => {
    // Check if window is defined to avoid SSR issues with localStorage
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem('BHARAT_TOKEN'));
    }
  }, []);

  return (
    <div className={styles.blogDetail} style={{backgroundColor: "#F9F3EE"}}>
      <div className={styles.blogDetail_container}>
        <Navbar token={token} />
          <div className={styles.line}></div>
          <div className={styles.blogContent}>
            <div className="container my-5">
              <div className="row d-flex justify-content-center">
                <div className="col-md-7">
                    <img src="https://placehold.co/300x200" className="card-img-top" />

                    <h2 className="card-title my-3" style={{ color: "#FF4B38" }}>
                      Blog Title: Understanding React
                    </h2>

                    
                    <p className="card-text" style={{ color: "black" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend metus ac nunc efficitur hendrerit. Morbi mauris sem, pharetra sed lacus et, interdum consectetur orci. Fusce molestie elit dictum pretium malesuada. Mauris et lectus ante. Donec urna lectus, viverra nec vulputate ac, vestibulum sed dolor. Nam ornare, massa in dapibus laoreet, metus enim consequat eros, eget volutpat odio nulla sed orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan ultricies sapien et tempus. Cras vitae pulvinar mauris. Sed pretium pharetra elit sed tempus. Phasellus iaculis mattis leo, eu sagittis lacus fringilla at. Nulla sollicitudin justo in mi ullamcorper interdum.
                    </p>

                    <h3>What is Lorem Ipsum?</h3>
                    <p className="card-text" style={{ color: "black" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend metus ac nunc efficitur hendrerit. Morbi mauris sem, pharetra sed lacus et, interdum consectetur orci. Fusce molestie elit dictum pretium malesuada. Mauris et lectus ante. Donec urna lectus, viverra nec vulputate ac, vestibulum sed dolor. Nam ornare, massa in dapibus laoreet, metus enim consequat eros, eget volutpat odio nulla sed orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan ultricies sapien et tempus. Cras vitae pulvinar mauris. Sed pretium pharetra elit sed tempus. Phasellus iaculis mattis leo, eu sagittis lacus fringilla at. Nulla sollicitudin justo in mi ullamcorper interdum.
                    </p>

                    <h3>What is Lorem Ipsum?</h3>
                    <p className="card-text" style={{ color: "black" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend metus ac nunc efficitur hendrerit. Morbi mauris sem, pharetra sed lacus et, interdum consectetur orci. Fusce molestie elit dictum pretium malesuada. Mauris et lectus ante. Donec urna lectus, viverra nec vulputate ac, vestibulum sed dolor. Nam ornare, massa in dapibus laoreet, metus enim consequat eros, eget volutpat odio nulla sed orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam accumsan ultricies sapien et tempus. Cras vitae pulvinar mauris. Sed pretium pharetra elit sed tempus. Phasellus iaculis mattis leo, eu sagittis lacus fringilla at. Nulla sollicitudin justo in mi ullamcorper interdum.
                    </p>
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    </div>
  );
};

export default BlogDetail;
