// "use client"; This is needed to use client-side hooks like useState and localStorage in Next.js
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Faq.module.css";
import { useRouter } from "next/router";
import Accordion from "../Accordion/Accordion";

// Example platform data (replace this with your actual data or fetch it from an API)
const platformData = {
  "adidas-india": {
    name: "Adidas India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit erat nibh.",
    image: "https://banner2.cleanpng.com/20180406/odw/avgbrzk0j.webp",
    rating: 4.5,
    reviews: 1000,
  },
  "flipkart-india": {
    name: "Flipkart India",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit erat nibh.",
    image: "https://banner2.cleanpng.com/20180406/odw/avgbrzk0j.webp",
    rating: 4.0,
    reviews: 800,
  },
  // Add more platforms as needed
};

export async function getStaticPaths() {
  // Generate paths dynamically based on the platformData object
  const paths = Object.keys(platformData).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // Show a 404 page for unknown slugs
  };
}

export async function getStaticProps({ params }) {
  // Fetch platform data based on the slug
  const platform = platformData[params.slug];

  return {
    props: {
      platform: platform || null, // Return null if no platform is found (to handle 404)
    },
  };
}

const ServicePage = ({ platform }) => {
  const [token, setToken] = useState(null);  // Initialize state as null to avoid undefined issues
  const router = useRouter();
  
  useEffect(() => {
    // Check if window is defined to avoid SSR issues with localStorage
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem('BHARAT_TOKEN'));
    }
  }, []);

  // Handle the case where the platform is not found
  if (!platform) {
    return <div>Platform not found</div>;
  }

  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUs_container}>
        <Navbar token={token} />
        <div className={styles.line}></div>

        <div className={styles.items_container}>
          <div className="container">
            <div className="card card-body" style={{backgroundColor: "#f9f3ee", border: "none"}}>
              <div className="row d-flex justify-content-center">
                <img
                  src={platform.image}
                  style={{ width: 300 }}
                  alt={platform.name}
                />

                {/* Review Star Rating */}
                <div className="review-stars text-center">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color: index < platform.rating ? '#FFD700' : '#B0B0B0',
                        fontSize: '30px',
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>

                <p className="text-dark text-center">{platform.rating}/5 - {platform.reviews} Reviews</p>
              </div>

              <div className="row my-5">
                <h2 className="text-dark">Looking for the best shipping option from {platform.name}?</h2>
                <p className="text-dark">{platform.description}</p>
                {/* More dynamic content based on the platform */}
              </div>

              <div className="row my-5" style={{ backgroundColor: "#f9f3ee" }}>
                <div className="col-md-12">
                  <h2 className="text-center text-dark">Unlock the Future of Innovation with {platform.name}</h2>
                </div>

                {/* List of services offered by the platform */}
                <div className="col-md-4">
                  <div className="card card-body border border-0 shadow">
                    <ul style={{ listStyle: "disc" }}>
                      <li className="text-dark">Personal Shipping Address</li>
                      <li className="text-dark">Express Shipping Options</li>
                      <li className="text-dark">Discount Offers</li>
                    </ul>
                  </div>
                </div>


                <div className="col-md-4">
                  <div className="card card-body border border-0 shadow">
                    <ul style={{ listStyle: "disc" }}>
                      <li className="text-dark">Personal Shipping Address</li>
                      <li className="text-dark">Express Shipping Options</li>
                      <li className="text-dark">Discount Offers</li>
                    </ul>
                  </div>
                </div>


                <div className="col-md-4">
                  <div className="card card-body border border-0 shadow">
                    <ul style={{ listStyle: "disc" }}>
                      <li className="text-dark">Personal Shipping Address</li>
                      <li className="text-dark">Express Shipping Options</li>
                      <li className="text-dark">Discount Offers</li>
                    </ul>
                  </div>
                </div>

                {/* More details or services */}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
