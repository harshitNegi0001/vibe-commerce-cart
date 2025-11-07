import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

import './App.css';
import OrderSuccess from './pages/OrderSuccess';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
       <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="*" element={<NotFound />} />
       
    </Routes>
  );
}

export default App;
