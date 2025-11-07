import { Link, useLocation, useNavigate } from "react-router-dom";
import "../orderSuccess.css";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
function OrderSuccess() {
  const location = useLocation();
  const receipt = location.state?.receipt||null;
  const navigate =useNavigate()

  useEffect(()=>{
if(!receipt){
    navigate('/cart')
}
  },[receipt])

  return (
    <div className="order-success-container">
      <h1><FaCheckCircle style={{ color: "green", marginRight: "10px", verticalAlign: "middle" }} /> Thank You for Your Order!</h1>
      <p>Your order has been successfully placed.</p>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p><strong>Order ID:</strong> {receipt?.orderId??0}</p>
        <p><strong>Date:</strong> {new Date(receipt?.timestamp).toLocaleString()}</p>
        <p><strong>Name:</strong> {receipt?.customer.name||'customer'}</p>
        <p><strong>Email:</strong> {receipt?.customer.email||''}</p>
        <p><strong>Phone:</strong> {receipt?.customer.phone||''}</p>

        <h3>Items:</h3>
        <ul>
          {receipt?.items.map((item, i) => (
            <li key={i}>
              {receipt.quantity[i]}x {item.name} — ₹{item.price}
            </li>
          ))}
        </ul>

        <div className="price-section">
          <p>Subtotal: ₹{receipt?.subtotal}</p>
          <p>Platform Fee: ₹{receipt?.platformFee}</p>
          <p className="total">Total: ₹{receipt?.total}</p>
        </div>

        <div className="order-actions">
          <Link to="/" className="btn">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
