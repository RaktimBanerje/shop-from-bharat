"use client"

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation';
import Navbar from '@/Components/Header/Navbar';
import Footer from '@/Components/Footer/Footer';
import styles from  './Faq.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function page({ params }) {
    const [site, setSite] = useState(null);
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      const fetchSiteData = async () => {
        try {
          const localToken = localStorage.getItem('BHARAT_TOKEN');
          setToken(localToken);
  
          const res = await fetch(
            `http://ec2-3-107-13-124.ap-southeast-2.compute.amazonaws.com:8055/items/shopping_sites?filter[slug][_eq]=${params.slug}`);
  
          const result = await res.json();
          const siteData = result.data?.[0];
  
          if (!siteData) {
            notFound(); // navigate to 404
          } else {
            setSite(siteData);
          }
        } catch (err) {
          console.error('Error fetching site:', err);
          notFound();
        }
      };
  
      if (typeof window !== 'undefined') {
        fetchSiteData(); // trigger once on mount
      }
    }, [params.slug]);
  
    if (!site) return <div>Loading...</div>;
    
    return (
        <div className={styles.aboutUs}>
          <div className={styles.aboutUs_container}>
            <Navbar token={token} />
            <div className={styles.line}></div>
    
            
            <div className={styles.items_container}>
                <div className="container">
                    <div style={{ backgroundColor: "#f9f3ee", border: "none" }}>
                    <div className="row d-flex justify-content-center">
                        <img 
                            src={`http://ec2-3-107-13-124.ap-southeast-2.compute.amazonaws.com:8055/assets/${site.logo}`} 
                            style={{ width: 300 }} 
                            alt={site.name} 
                        />

                        {/* Review Star Rating */}
                        {/* <div className="review-stars text-center">
                        <span style={{ color: '#FFD700', fontSize: '30px' }}>&#9733;</span>
                        <span style={{ color: '#FFD700', fontSize: '30px' }}>&#9733;</span>
                        <span style={{ color: '#FFD700', fontSize: '30px' }}>&#9733;</span>
                        <span style={{ color: '#FFD700', fontSize: '30px' }}>&#9733;</span>
                        <span style={{ color: '#B0B0B0', fontSize: '30px' }}>&#9733;</span>
                        </div>

                        <p className="text-dark text-center">4.5/5 - 1,000 Review</p> */}
                    </div>

                    {/* Template Content Section */}
                    <div className="row my-5">
                        {site.template_title_1 && <h2 className="text-dark">{site.template_title_1}</h2>}
                        {site.template_content_1?.split('\n\n').map((para, idx) => (
                        <p key={idx} className="text-dark">{para}</p>
                        ))}

                        {/* Second Content Block */}
                        <div className="row my-4">
                        {site.template_title_2 && <h2 className="text-center text-dark">{site.template_title_2}</h2>}
                        {site.template_content_2 && <p className="text-center">{site.template_content_2}</p>}
                        <div className="text-center">
                            <a href={site.main_website_link} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary" style={{ backgroundColor: "#fe5402", border: "#fe5402" }}>
                                Go Shop {site.name} Now!
                            </button>
                            </a>
                        </div>
                        </div>
                    </div>

                    {/* Feature Area Blocks */}
                    <div className="row main-item-box">
                        <div className="col-md-12">
                        {site.template_title_3 && <h2 className="text-center text-dark">{site.template_title_3}</h2>}
                        {site.template_content_3 && <p className="text-center text-dark">{site.template_content_3}</p>}
                        </div>

                        {/* Feature Columns */}
                        {[site.first_feature_area, site.second_feature_area, site.third_feature_area].map((area, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card card-body border border-0 shadow">
                            <ul style={{ listStyle: 'disc' }}>
                                {area?.map((item, idx) => (
                                <li key={idx} className="text-dark">{item.text}</li>
                                ))}
                            </ul>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                <Footer />
            </div>
          </div>
        </div>
      );
}