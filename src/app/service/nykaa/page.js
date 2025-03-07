// "use client"; This is needed to use client-side hooks like useState and localStorage in Next.js
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Header/Navbar";
import Footer from "../../../Components/Footer/Footer";
import styles from "../Faq.module.css";


const Page= () => {
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

        
        <div className={styles.items_container}>

          <div className="container">
            <div className="card card-body" style={{backgroundColor: "#f9f3ee", border: "none"}}>
              <div className="row d-flex justify-content-center">
                <img 
                  src="https://banner2.cleanpng.com/20180406/odw/avgbrzk0j.webp" 
                  style={{width: 300}} 
                  alt="Logo" 
                />
                
                {/* Review Star Rating */}
                <div className="review-stars text-center">
                  <span style={{color: '#FFD700', fontSize: '30px'}}>&#9733;</span>
                  <span style={{color: '#FFD700', fontSize: '30px'}}>&#9733;</span>
                  <span style={{color: '#FFD700', fontSize: '30px'}}>&#9733;</span>
                  <span style={{color: '#FFD700', fontSize: '30px'}}>&#9733;</span>
                  <span style={{color: '#B0B0B0', fontSize: '30px'}}>&#9733;</span>
                </div>

                <p className="text-dark text-center">4.5/5 - 1,000 Review</p>
              </div>
              
              <div className="row my-5">
                <h2 className="text-dark">Looking for the best shipping option that's from India?</h2>
                <p className="text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit erat nibh. Phasellus vulputate sed lacus sed venenatis. Duis dignissim eu arcu quis dapibus. Aliquam quis magna interdum, vulputate ipsum id, pretium mauris. Maecenas dictum congue accumsan. Pellentesque finibus metus vitae nibh aliquam ultricies. Nullam sit amet risus porta, viverra nisl porta, porta lectus. Aliquam faucibus eros vel mattis pellentesque. Donec lacus mi, efficitur eu viverra ut, eleifend nec risus. Aenean ac ex vel nibh accumsan suscipit non sit amet ex.</p>
                <p className="text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit erat nibh. Phasellus vulputate sed lacus sed venenatis. Duis dignissim eu arcu quis dapibus. Aliquam quis magna interdum, vulputate ipsum id, pretium mauris. Maecenas dictum congue accumsan. Pellentesque finibus metus vitae nibh aliquam ultricies. Nullam sit amet risus porta, viverra nisl porta, porta lectus. Aliquam faucibus eros vel mattis pellentesque. Donec lacus mi, efficitur eu viverra ut, eleifend nec risus. Aenean ac ex vel nibh accumsan suscipit non sit amet ex.</p>
                <p className="text-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit erat nibh. Phasellus vulputate sed lacus sed venenatis. Duis dignissim eu arcu quis dapibus. Aliquam quis magna interdum, vulputate ipsum id, pretium mauris. Maecenas dictum congue accumsan. Pellentesque finibus metus vitae nibh aliquam ultricies. Nullam sit amet risus porta, viverra nisl porta, porta lectus. Aliquam faucibus eros vel mattis pellentesque. Donec lacus mi, efficitur eu viverra ut, eleifend nec risus. Aenean ac ex vel nibh accumsan suscipit non sit amet ex.</p>

                <div class="row my-4">
                  <h2 className="text-center text-dark">International Credit/Debit Cards Giving You Trouble?</h2>
                  <p className="text-center">No worries! Our Personal Shopper will swoop in & take care of it all for you!</p>
                    <div className="text-center">
                      <button className="btn btn-primary" style={{backgroundColor: "#fe5402", border: "#fe5402"}}>Go Shop Flipkart Now!</button>
                    </div>
                </div>
              </div>

              <div className="row my-5" style={{backgroundColor: "#f9f3ee"}}>
                <div className="col-md-12">
                  <h2 className="text-center text-dark">Unlock the Future of Innovation with Lorem Ipsum</h2>
                  <p className="text-center text-dark">No worries! Our Personal Shopper will swoop in & take care of it all for you!</p>
                </div>

                <div className="col-md-4">
                  <div className="card card-body border border-0 shadow">
                      <ul style={{listStyle: 'disc'}}>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                      </ul>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card card-body border border-0 shadow">
                      <ul style={{listStyle: 'disc'}}>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                      </ul>
                  </div>
                </div>


                <div className="col-md-4">
                  <div className="card card-body border border-0 shadow">
                      <ul style={{listStyle: 'disc'}}>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                        <li className="text-dark">Personal Shipping Address</li>
                      </ul>
                  </div>
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

export default Page
