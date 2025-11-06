import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import {app} from './utils/io.js';

dotenv.config();
const port = process.env.PORT;
// const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',authRoute);

app.get('/',(req,res)=>{
    res.send('Welcome to the backend');
})


app.listen(port,()=>{
    console.log(`Server running on port ${port}.`);
})