import React from "react";
import Navbar from "../Header/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./TermsAndCondition.module.css"

const TermsAndConditions = () => {
  return (
    <div className="container">
    <Navbar/>
    <div className="terms-container">
      <h1>Terms and Conditions for Shop from Bharat (Cross-Border E-commerce Aggregator)</h1>
      <p><strong>Effective Date:</strong> [02-01-25]</p>
      <p>
        Welcome to Shop from Bharat! These Terms and Conditions ("Terms") govern your use of our services,
        including website access, cross-border e-commerce services, and all related tools, applications, and content.
        By accessing or using Shop from Bharat’s services, you agree to be bound by these Terms. If you do not agree, 
        please do not use our services.
      </p>

      <h2>1. Definitions</h2>
      <ul>
        <li>
          <strong>1.1 "Platform"</strong> refers to Shop from Bharat’s website and any associated applications or tools.
        </li>
        <li>
          <strong>1.2 "Vendor"</strong> refers to businesses or individuals listing products for sale on the Platform.
        </li>
        <li>
          <strong>1.3 "Buyer"</strong> refers to individuals or entities purchasing goods via the Platform.
        </li>
        <li>
          <strong>1.4 "We," "Us," "Our"</strong> refer to Shop from Bharat, its employees, agents, and affiliates.
        </li>
      </ul>

      <h2>2. Eligibility</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>Be at least 18 years of age.</li>
        <li>Comply with all applicable laws and regulations of your jurisdiction.</li>
      </ul>
      <p>
        By using the Platform, you represent and warrant that you meet all eligibility requirements.
      </p>

      <h2>3. User Obligations</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Users must provide accurate, complete, and current information during registration and maintain the
          confidentiality of their account credentials.
        </li>
        <li>
          Users must not:
          <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
            <li>Engage in fraudulent, misleading, or illegal activities.</li>
            <li>Violate intellectual property or proprietary rights.</li>
            <li>Use the Platform to transmit harmful or unauthorized content.</li>
          </ul>
        </li>
      </ul>

      <h2>4. Cross-Border Transactions</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Shop from Bharat acts as an intermediary between Vendors and Buyers for cross-border transactions. 
          The final purchase agreement is between the Buyer and the Vendor.
        </li>
        <li>
          All cross-border shipments are subject to applicable customs duties, taxes, and import/export regulations of the destination country.
        </li>
        <li>
          Buyers are responsible for ensuring the legality of importing purchased goods into their country and paying any associated fees.
        </li>
      </ul>

      <h2>5. Fees and Payments</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Shop from Bharat charges service fees for transactions conducted on the Platform. These fees are non-refundable unless explicitly stated otherwise.
        </li>
        <li>
          All payments on the Platform are processed through secure third-party payment gateways. Shop from Bharat is not liable for payment processing errors.
        </li>
      </ul>

      <h2>6. Shipping and Delivery</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Shipping timelines and costs are estimated and subject to change based on carrier availability, customs clearance, and unforeseen delays.
        </li>
        <li>
          Buyers must provide accurate shipping details. Shop from Bharat is not responsible for lost or undelivered packages due to incorrect information.
        </li>
      </ul>

      <h2>7. Returns and Exchange Policy</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Refunds and returns are governed by the Vendor’s individual policies. As the delivery will be made to you after 
          7-15 days of the orders received at our warehouse, the return and exchange window will be closed, so we can't assist with such issues.
        </li>
        <li>Shop from Bharat may mediate disputes between Buyers and Vendors at its sole discretion.</li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          All content, trademarks, and logos on the Platform are the property of Shop from Bharat or its licensors. Unauthorized use is prohibited.
        </li>
        <li>
          Users retain ownership of content they submit but grant Shop from Bharat a non-exclusive license to use, display, and distribute such content on the Platform.
        </li>
      </ul>

      <h2>9. Limitation of Liability</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>Shop from Bharat is not liable for any losses or damages arising from transactions between Buyers and Vendors.</li>
        <li>Delays, interruptions, or failures in the Platform’s operations.</li>
        <li>Liability is limited to the extent permissible under applicable law.</li>
      </ul>

      <h2>10. Indemnification</h2>
      <p>
        Users agree to indemnify and hold harmless Shop from Bharat from claims, losses, or damages arising from their use of the Platform.
      </p>

      <h2>11. Termination</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>Shop from Bharat reserves the right to suspend or terminate user accounts for violating these Terms.</li>
        <li>Users may terminate their accounts by notifying Shop from Bharat in writing.</li>
      </ul>

      <h2>12. Governing Law and Dispute Resolution</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>These Terms are governed by the laws of India.</li>
        <li>
          Disputes shall be resolved through arbitration in [City], India, under the Arbitration and Conciliation Act, 1996.
        </li>
      </ul>

      <h2>13. Amendments</h2>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Shop from Bharat reserves the right to amend these Terms at any time. Changes will be notified via the Platform or email.
        </li>
        <li>Continued use of the Platform constitutes acceptance of the revised Terms.</li>
      </ul>

      <h2>14. Contact Us</h2>
      <p>
        For questions or support, contact us at:
        <br />
        <strong>Email:</strong> info@shopfrombharat.com
        <br />
        <strong>Phone:</strong> +91 9731733771
        <br />
        <strong>Address:</strong> 381, 1st Main Rd, 7th Block, Startup Lane, Koramangala, Bengaluru, Karnataka 560095
      </p>

      <p>
        By using Shop from Bharat, you acknowledge and agree to these Terms and Conditions.
      </p>
    </div>
    <Footer/>
    </div>
  );
};

export default TermsAndConditions;
