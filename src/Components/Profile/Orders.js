import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import SearchSvg from "../../assets/Search.svg";
import FilterSvg from "../../assets/Filter.svg";
import AmazonaSvg from "../../assets/amazona.svg";
import itemOneSvg from "../../assets/itemOne.svg";
import itemTwoSvg from "../../assets/itemTwo.svg";
import itemThreeSvg from "../../assets/itemThree.svg";
import DHLSvg from "../../assets/dhl.svg";
import apiServiceHandler from "../../service/apiService";
import Spinner from "../Spinner/Spinner";
import Image from "next/image"; // Import Image component

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to store the list of orders
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch orders from the API on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiServiceHandler("GET", "api/order/list");
        if (response.status) {
          setOrders(response.orders); // Set the orders data to state
        } else {
          alert("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Spinner />; // Show the spinner while loading
  }

  return (
    <div className={styles.orders}>
      <div className={styles.orders_container}>
        <div className={styles.orders_info}>
          <div className={styles.orders_header}>
            <div className={styles.header_left}>
              <h4>Orders</h4>
              <p>Access all the orders you have placed</p>
            </div>
            <div className={styles.header_right}>
              <div className={styles.inputWrapper}>
                <Image
                  src={SearchSvg}
                  alt="search icon"
                  className={styles.searchIcon}
                  width={24} // Adjust width as needed
                  height={24} // Adjust height as needed
                />
                <input
                  className={styles.input}
                  placeholder="Search by order name"
                />
                <Image
                  src={FilterSvg}
                  alt="Filter icon"
                  className={styles.filterIcon}
                  width={24} // Adjust width as needed
                  height={24} // Adjust height as needed
                />
              </div>
            </div>
          </div>
    
          <div className={styles.orders_list}>
            {orders.map((order) => (
              <div className={styles.order_info} key={order._id}>
                <div className={styles.info_header}>
                  <div className={styles.info_header_left}>
                    <div className={styles.info_header_left_info}>
                      <div className={styles.info_header_left_top}>
                        <span className={styles.total_price}>
                          {/* $11,999.99  */}
                        </span>
                        <span className={styles.header_info_tag}>
                          PROCESSING
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.info_header_right}>
                    <div className={styles.total_items}>
                      {order.products.length} items
                    </div>
                  </div>
                </div>
    
                <div className={styles.order_details}>
                  <div className={styles.order_details_left}>
                    <div className={styles.order_number_container}>
                      <div className={styles.order_number_heading}>
                        Order Number
                      </div>
                      <div className={styles.order_number}>
                        {order.order_number}
                      </div>
                    </div>
    
                    <div className={styles.order_receiver_container}>
                      <div className={styles.order_receiver_heading}>
                        Receiver
                      </div>
                      <div className={styles.order_receiver}>
                        {order.address?.name || 'N/A'} {/* Safe access with optional chaining */}
                      </div>
                    </div>
    
                    <div className={styles.order_eta_container}>
                      <div className={styles.order_eta_heading}>
                        Estimated delivery time
                      </div>
                      <div className={styles.order_eta}>
                        7 business days after the store confirms the order
                      </div>
                    </div>
                  </div>
    
                  <div className={styles.order_details_right}>
                    <div className={styles.order_service_container}>
                      <div className={styles.order_service_heading}>
                        Delivery Service
                      </div>
                      <div className={styles.order_service}>
                        <span>--</span>
                      </div>
                    </div>
    
                    <div className={styles.order_courier_container}>
                      <div className={styles.order_courier_heading}>
                        Courier delivery to
                      </div>
                      <div className={styles.order_courier}>
                        {/* Use optional chaining to safely access address properties */}
                        {order.address ? (
                          <>
                            <p>{order.address.address},</p>
                            <p>{order.address.city}, {order.address.zip_code}</p>
                            <p>{order.address.country}</p>
                          </>
                        ) : (
                          <p>Address not available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Orders;
