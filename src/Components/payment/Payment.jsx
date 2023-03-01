import axios from "axios";
import React from "react";
// import { useHistory } from "react-router-dom";
// import apis from "../../constants/apis";
// import { selectUser } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
// import Loader from "../Admin/Loader";

import classes from "./Payment.module.css"

export function loadRazorpayScript() {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}

function getPaymentOptions(order, callback) {
  return {
    key: "rzp_test_5dK2HoXM3eFo8T",
    amount: order.amount,
    currency: order.currency,
    name: "Myty",
    description: "Payment for Myty",
    order_id: order.id,
    image: "https://myty.in/favicon.png",
    handler: async function (response) {
      try {
        console.log("Success", response);

        const verificationRes = await axios.post(
          "http://192.168.0.100:8080/api/payment/verify-response",
          response
        );

        if (verificationRes.status === 200) {
          console.log("Payment Verified");
          console.log(verificationRes.data);
          callback({ ...response, appliedAt: new Date().toISOString() });
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data);
        }
      }
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    notes: {
      address: "Some address maybe office",
      purpose: "Payment for myty subscription plan",
    },
  };
}

export default function PaymentButton({ label, plan, callback }) {
//   const User = useSelector(selectUser);
  // const history = useHistory();

  const [loading, setLoading] = useState(false);

  async function makePayment() {
    loadRazorpayScript();

    try {
      const order = (await axios.get("http://192.168.0.100:8080/api/payment/create-order/365")).data;
      console.log(order);

      const options = getPaymentOptions(order, callback);
      console.log(options);

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on("payment.failed", function (response) {
        console.log("Failed", response);
      });
    } catch (error) {
      if (error.response.status === 404) {
        console.log("Plan not Provided");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div >
      <button
         
        className={`btn btn-brand-accent ${classes.button}`}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          makePayment();
        }}
      >
        {loading ? (
          <span>
            Loading...
          </span>
        ) : (
          <span>
            {label}
            </span>
        )}
      </button>
    </div>
  );
}