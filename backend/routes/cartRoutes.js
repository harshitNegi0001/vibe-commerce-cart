import express from 'express';
import Cart from '../controllers/cartController.js'


const route = express.Router();

route.post('/cart',Cart.addCart)
.get('/cart',Cart.getCart)
.delete('/cart',Cart.deleteCart);


export default route;