import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        alert("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        // update local state for instant UI feedback
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Server error while updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="orders">
      <h2>All Orders</h2>

      <div className="orders-container">
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="orders-item">
              <img src={assets.parcel_icon} alt="parcel" />
              <div className="orders-details">
                <p>
                  <b>Order ID:</b> {order._id}
                </p>
                <p>
                  <b>Customer ID:</b> {order.userId || "N/A"}
                </p>
                <p>
                  <b>Items:</b>{" "}
                  {order.items
                    .map((item) => `${item.name} x${item.quantity}`)
                    .join(", ")}
                </p>
                <p>
                  <b>Amount:</b> ${order.amount}.00
                </p>
                <p>
                  <b>Payment:</b>{" "}
                  {order.payment ? (
                    <span className="paid">Paid</span>
                  ) : (
                    <span className="not-paid">Not Paid</span>
                  )}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <select
                    className="status-dropdown"
                    value={order.status || "Processing"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Processing">Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
