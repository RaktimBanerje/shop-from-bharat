"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Blog.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally
import Link from "next/link";  // Import Link from next

const Blog = () => {
  const [token, setToken] = useState(null);  // Initialize state as null to avoid undefined issues

  useEffect(() => {
    // Check if window is defined to avoid SSR issues with localStorage
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem('BHARAT_TOKEN'));
    }
  }, []);

  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUs_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>

        <section
          className="bg-dark text-white text-center py-5 d-flex align-items-center fullwidth"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1920x600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginLeft: -120
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="display-4 fw-bold">Welcome to Our Inner Page</h1>
                <p className="lead text-light">Explore the best of our content, products, and services.</p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.items_container}>
          <div className="container my-5">
            <div className="row">
              {/* Box 1 */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                    <Link href="/blog-detail" style={{ textDecoration: "none" }}> {/* Link to Blog Detail using Slug */}
                        <img
                        src="https://placehold.co/300x200"
                        className="card-img-top"
                        alt="Blog image"
                        />
                        <div className="card-body">
                        <h5 className="card-title" style={{ color: "#FF4B38" }}>Blog Title 1</h5>
                        <p className="card-text" style={{ color: "black" }}>This is a short description of the blog post.</p>
                        </div>
                    </Link>
                    </div>
                </div>

              {/* Box 2 */}
              <div className="col-md-4 mb-4">
                    <div className="card">
                    <Link href="/blog-detail" style={{ textDecoration: "none" }}> {/* Link to Blog Detail using Slug */}
                        <img
                        src="https://placehold.co/300x200"
                        className="card-img-top"
                        alt="Blog image"
                        />
                        <div className="card-body">
                        <h5 className="card-title" style={{ color: "#FF4B38" }}>Blog Title 2</h5>
                        <p className="card-text" style={{ color: "black" }}>This is a short description of the blog post.</p>
                        </div>
                    </Link>
                    </div>
              </div>

              {/* Box 3 */}
              <div className="col-md-4 mb-4">
                    <div className="card">
                    <Link href="/blog-detail" style={{ textDecoration: "none" }}> {/* Link to Blog Detail using Slug */}
                        <img
                        src="https://placehold.co/300x200"
                        className="card-img-top"
                        alt="Blog image"
                        />
                        <div className="card-body">
                        <h5 className="card-title" style={{ color: "#FF4B38" }}>Blog Title 3</h5>
                        <p className="card-text" style={{ color: "black" }}>This is a short description of the blog post.</p>
                        </div>
                    </Link>
                    </div>
              </div>

              {/* Box 4 */}
              <div className="col-md-4 mb-4">
                    <div className="card">
                    <Link href="/blog-detail" style={{ textDecoration: "none" }}> {/* Link to Blog Detail using Slug */}
                        <img
                        src="https://placehold.co/300x200"
                        className="card-img-top"
                        alt="Blog image"
                        />
                        <div className="card-body">
                        <h5 className="card-title" style={{ color: "#FF4B38" }}>Blog Title 4</h5>
                        <p className="card-text" style={{ color: "black" }}>This is a short description of the blog post.</p>
                        </div>
                    </Link>
                    </div>
              </div>

              {/* Box 5 */}
              <div className="col-md-4 mb-4">
                    <div className="card">
                    <Link href="/blog-detail" style={{ textDecoration: "none" }}> {/* Link to Blog Detail using Slug */}
                        <img
                        src="https://placehold.co/300x200"
                        className="card-img-top"
                        alt="Blog image"
                        />
                        <div className="card-body">
                        <h5 className="card-title" style={{ color: "#FF4B38" }}>Blog Title 5</h5>
                        <p className="card-text" style={{ color: "black" }}>This is a short description of the blog post.</p>
                        </div>
                    </Link>
                    </div>
              </div>

              {/* Box 6 */}
              <div className="col-md-4 mb-4">
                    <div className="card">
                    <Link href="/blog-detail" style={{ textDecoration: "none" }}> {/* Link to Blog Detail using Slug */}
                        <img
                        src="https://placehold.co/300x200"
                        className="card-img-top"
                        alt="Blog image"
                        />
                        <div className="card-body">
                        <h5 className="card-title" style={{ color: "#FF4B38" }}>Blog Title 6</h5>
                        <p className="card-text" style={{ color: "black" }}>This is a short description of the blog post.</p>
                        </div>
                    </Link>
                    </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Blog;
