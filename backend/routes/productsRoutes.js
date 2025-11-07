import express from 'express';
import Products from '../controllers/productsController.js';


const route = express.Router();

route.get('/products',Products.getProducts);


export default route;