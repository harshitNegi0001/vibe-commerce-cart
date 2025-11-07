import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prodRoute from './routes/productsRoutes.js';
import cartRoute from './routes/cartRoutes.js';

dotenv.config();
const port = process.env.PORT||5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',prodRoute);
app.use('/api',cartRoute);

app.get('/',(req,res)=>{
    res.send('Welcome to the backend');
})


app.listen(port,()=>{
    console.log(`Server running on port ${port}.`);
})