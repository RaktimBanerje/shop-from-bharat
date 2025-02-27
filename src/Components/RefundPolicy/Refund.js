import React from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Refund.module.css";

const Refund = () => {
  return (
    <div style={{paddingLeft:"20px"}}>
            <Navbar />
<div class="return-policy">
  <h1>Return and Refund Policy</h1>
  <p>Last updated: September 20, 2024</p>

  <p>Thank you for shopping at Shop From Bharat.</p>
  <p>If for any reason You are not completely satisfied with a purchase, We invite You to review our policy on refunds and returns. This Return and Refund Policy has been created with the help of the Free Return and Refund Policy Generator.</p>

  <h2>Interpretation and Definitions</h2>

  <h3>Interpretation</h3>
  <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.</p>

  <h3>Definitions</h3>
  <p>For the purposes of this Return and Refund Policy:</p>
  {/* <ul>
    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us", or "Our" in this Agreement) refers to Shop From India, Ground Floor, No 381, Flat No 101, 1st A Cross, 7th Block, Koramangala.</li>
    <li><strong>Goods</strong> refer to the items offered for sale on the Service.</li>
    <li><strong>Orders</strong> mean a request by You to purchase Goods from Us.</li>
    <li><strong>Service</strong> refers to the Website.</li>
    <li><strong>Website</strong> refers to Shop From Bharat, accessible from <a href="https://shopfrombharat.com/">https://shopfrombharat.com/</a></li>
    <li><strong>You</strong> means the individual accessing or using the Service or the company or other legal entity on behalf of which such individual is accessing or using the Service as applicable.</li>
  </ul> */}

  <h2>Your Order Cancellation Rights</h2>

  <p>You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</p>
  <p>The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
  <p>In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>
  <ul>
    <li>Email: <a href="mailto:info@shopfrombharat.com">info@shopfrombharat.com</a></li>
  </ul>
  <p>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>

  <h2>Conditions for Returns</h2>

  <p>In order for the Goods to be eligible for a return, please make sure that:</p>
  <ul>
    <li>The Goods were purchased in the last 7 days</li>
    <li>The Goods are in the original packaging</li>
  </ul>
  <p>The following Goods cannot be returned:</p>
  <ul>
    <li>The supply of Goods made to Your specifications or clearly personalized.</li>
    <li>The supply of Goods which, according to their nature, are not suitable to be returned, deteriorate rapidly, or where the date of expiry is over.</li>
    <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
    <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
  </ul>
  <p>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>
  <p>Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.</p>

  <h2>Returning Goods</h2>

  <p>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods to the following address:</p>
  <address>
    Ground Floor No.381, Flat No.101, 1st A Cross, 7th Block, Koramangala, Bengaluru, Karnataka, 560095
  </address>
  <p>We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>

  <h2>Gifts</h2>

  <p>If the Goods were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.</p>
  <p>If the Goods weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.</p>

  <h2>Contact Us</h2>

  <p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
  <ul>
    <li>Email: <a href="mailto:info@shopfrombharat.com">info@shopfrombharat.com</a></li>
  </ul>
</div>

      <Footer />
    </div>
  );
};

export default Refund;
