// pages/prohibited-restricted-items.js
import React from "react";
import Head from "next/head"; // Import Head from Next.js for handling the document's head section
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import "./ProhibitedItems.css"; // Global CSS file import (or use scoped styles if desired)


const ProhibitedRestrictedItems = () => {
  return (
    <div> 
      <Head>
        <title>Prohibited and Restricted Items for Export</title>
        <meta name="description" content="A list of prohibited and restricted items for export. Learn about items that require licenses and restrictions for international shipping." />
      </Head>

      <Navbar/>
      <div className="prohibited-items-container">
        <h1>Prohibited and Restricted Items for Export</h1>

        <div className="section">
          <h2>1. Prohibited Items (Not Allowed for Export)</h2>
          <p>These items cannot be exported under any circumstances:</p>
          <ul>
            <li>
              <strong>Wildlife and related products:</strong> Endangered species, certain animal products like ivory, musk, and certain types of skin and fur.
            </li>
            <li>
              <strong>Antiques:</strong> Items over 100 years old, unless permitted by the Archaeological Survey of India.
            </li>
            <li>
              <strong>Narcotics and psychotropic substances:</strong> As defined under international conventions.
            </li>
            <li>
              <strong>Weapons and ammunition:</strong> Certain categories of firearms, explosives, and ammunition.
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>2. Restricted Items (Require Export Licensing/Permission)</h2>
          <p>These items require special permission or a license from the DGFT:</p>
          <ul>
            <li>
              <strong>Agricultural Products:</strong> Certain rice varieties, wheat, pulses, and edible oils.
            </li>
            <li>
              <strong>Precious Metals and Stones:</strong> Gold and jewelry (beyond limits), rough diamonds.
            </li>
            <li>
              <strong>Minerals and Ores:</strong> Specific minerals like bauxite and iron ore in raw form.
            </li>
            <li>
              <strong>Technology and Software:</strong> High-tech equipment or encryption software.
            </li>
            <li>
              <strong>Pharmaceuticals:</strong> Certain drugs, medicines, or raw materials with an NOC.
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>3. Items with Conditional Export (Subject to Policy)</h2>
          <p>These items are subject to specific conditions:</p>
          <ul>
            <li>Textiles: Handloom and handicraft items.</li>
            <li>Ayurvedic, Siddha, and Unani medicines.</li>
            <li>Artworks and Manuscripts.</li>
          </ul>
        </div>

        <div className="section">
          <h2>4. Alcoholic Beverages and Tobacco Products</h2>
          <ul>
            <li>Alcoholic beverages, cigarettes, e-cigarettes, vape products, hookah flavors.</li>
            <li>Pan/Gutka/Areca Nuts, and other tobacco-related items.</li>
          </ul>
        </div>

        <div className="section">
          <h2>5. Beverages and Food Items</h2>
          <ul>
            <li>Perishable foods, beverages requiring refrigeration.</li>
            <li>Rice, ghee, honey, non-veg pickles, spices, and liquid food items.</li>
            <li>Cooking oils, energy drinks, and milk-made products.</li>
          </ul>
        </div>

        <div className="section">
          <h2>Chemical, Hazardous, and Controlled Substances</h2>
          <ul>
            <li>Charcoal, dyes, dry ice, paints, and sealants.</li>
            <li>Hand sanitizers, mosquito repellents, and toxic substances.</li>
          </ul>
        </div>

        <div className="section">
          <h2>Documents, Currency, and Cards</h2>
          <ul>
            <li>Currency notes, government-issued documents, debit/credit cards.</li>
            <li>High-value gadgets containing sensitive data.</li>
          </ul>
        </div>

        <div className="section">
          <h2>Religious and Cultural Items</h2>
          <ul>
            <li>Incense sticks, camphor, pooja oils, and Ganga Jal.</li>
            <li>Flammable items and religious powders (e.g., kumkum, turmeric).</li>
          </ul>
        </div>

        <div className="section">
          <h2>Beauty and Cosmetics</h2>
          <ul>
            <li>Nail polish, perfumes, deodorants, and petroleum-based cosmetics.</li>
            <li>Hair extensions, sprays, and henna powder.</li>
          </ul>
        </div>

        <div className="section">
          <h2>Miscellaneous Restricted Items</h2>
          <ul>
            <li>Peacock feathers, sandalwood, fake currency, and detergent powders.</li>
            <li>Batteries, wax, and flammable materials.</li>
          </ul>
        </div>

        <div className="section">
          <h2>Note</h2>
          <p>
            In addition to the listed items, certain goods may be restricted or prohibited by carriers or customs authorities 
            due to international shipping regulations of the destination countries. Please contact our support team for 
            further clarification.
          </p>
        </div>

        <div className="section">
          <h2>Countries in which the customers need to hire a broker to clear the customs are:</h2>
          <ul>
            <li>China</li>
            <li>Bangladesh</li>
            <li>South Africa</li>
            <li>Mexico</li>
            <li>Brazil</li>
            <li>Japan</li>
            <li>Taiwan</li>
            <li>African countries</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProhibitedRestrictedItems;
