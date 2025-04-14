// src/app/page.js
'use client'; // Marking this file as a client component

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation"; // Next.js hook for pathname.
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally
import Header from "../Components/Header/Header"; // Adjust path for Next.js
import Categories from "../Components/Categories/Categories";
import Footer from "../Components/Footer/Footer";
import Accordion from "../Components/Accordion/Accordion";
import Sites from "../Components/Sites/Sites";
import Services from "../Components/Services/Services";
import Testimonials from "../Components/Testimonials/Testimonials";
import Partners from "../Components/Partners/Partners";
import FloatingIcon from "../Components/FloatingIcon/FloatingIcon";
import toast from "react-hot-toast"; // Assuming you still use this
import Image from 'next/image';
const SFB = '/assets/images/SFB.png';

export default function HomePage() {

  const faqRef = useRef(null); // Create a ref for the FAQ section
  const partnersRef = useRef(null);
  const wycoRef = useRef(null);
  const pathname = usePathname(); // Use Next.js's usePathname for location

  // Function to scroll to the FAQ section
  const scrollToFAQ = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPartners = () => {
    if (partnersRef.current) {
      partnersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWYCO = () => {
    if (wycoRef.current) {
      wycoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if we need to scroll to specific sections on mount
  useEffect(() => {
    if (pathname === '#faq') {
      scrollToFAQ();
    } else if (pathname === '#partners') {
      scrollToPartners();
    } else if (pathname === '#WYCO') {
      scrollToWYCO();
    }
  }, [pathname]); // Monitor pathname changes

  return (
    <>
      <div className="app">
        <Header scrollToWYCO={scrollToWYCO} />

        <section className="home-about-section">
          <div className="container my-container">
              <div className="row px-0 gx-5">
                <div className="col-md-7">
                  <h2>Shop From Bharat Services In A Nutshell</h2>

                  <p className="text-dark">As the name implies, Shop From Bharat is a package forwarding service where you can buy Indian products online, irrespective of where you are located currently. Unlike conventional freight forwarding services, we take the safety of your products seriously. We comprehend the concerns of being unable to receive Indian products outside the country.</p>
                  
                  <p className="text-dark">Taking your concerns into consideration, we have crafted a global delivery service that enhances your online shopping experience. At Shop From Bharat, we provide a seamless package forwarding experience, offering secure and timely shipping, transparent tracking, and excellent customer service. 
                  </p>

                  <p className="text-dark">Our platform allows Indian products online shopping and have your purchases conveniently delivered to you internationally. We cater to both individuals looking for unique Indian items and businesses in need of consistent, reliable shipping solutions.</p>
                
                  <p className="text-dark">With our competitive rates and commitment to excellence, Shop From Bharat makes cross-border shopping a breeze, ensuring that quality Indian products reach you quickly and safely, no matter the destination. No more hassle of buying wholesale products online India. 
                  </p>
                </div>

                <div className="col-md-5 hm-abt-img">
                <Image
                  src={SFB}
                  alt="Description of the image"
                  layout="intrinsic" // This ensures the aspect ratio is maintained
                  width={800} // Specify an appropriate width
                  height={600} // Specify an appropriate height
                  objectFit="contain" // Ensures the image fits inside the container while maintaining its aspect ratio
                />
                </div>
              </div>
          </div>
        </section>


        <section className="home-about-two-section">
          <div className="container">
              <div className="row d-flex justify-content-center px-0">
              <div className="col-lg-11 col-xl-10">
                <div className="info-wrap">
                  <h2 className="text-center text-dark">Bring Indian Products Home With The Most Trusted Online Shipping Store Globally</h2>
                  <p className="text-center text-dark">Looking for international shipping online stores that simplify delivery for you? We, at Shop From Bharat have made it easier for you to bring home products made in India. Whether you're shopping on Amazon India online shopping or exploring the best deals on Flipkart online shopping, we make delivery seamless.</p>
                  <p className="text-center text-dark">Get your favorite products from international shopping sites India delivered to your doorstep without any damage. With our reliable international shipping online stores, you can now enjoy seamless shipping of Indian goods worldwide, from fashion to electronics, home decor, and more. Experience hassle-free shopping and quick delivery with us, wherever you are!</p>
                </div>

            </div>
                
              </div>
          </div>
        </section>  
        


        <Categories ref={wycoRef} />
        <Sites />
        <Services />
        <Testimonials />
        <Partners ref={partnersRef} />
        <Accordion ref={faqRef} />
        <FloatingIcon />
      </div>
      <Footer
        scrollToFAQ={scrollToFAQ}
        scrollToPartners={scrollToPartners}
      />
    </>
  );
}