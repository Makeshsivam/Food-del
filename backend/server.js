import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodrouter from './routes/foodroute.js';
import userrouter from './routes/userroute.js';
import 'dotenv/config';
import carrouter from './routes/cartroute.js';
import orderrouter from './routes/orderroute.js';



// app config

const app = express();
const port = 4000;

// middlewares
app.use(express.json());
app.use(cors());

// DB config
connectDB();

// api endpoints
app.use('/api/food', foodrouter);
app.use("/images",express.static('uploads'));
app.use('/api/user',userrouter);
app.use("/api/cart",carrouter);
app.use("/api/order",orderrouter);



app.get('/', (req, res) => {
    res.send("Api working")
});

app.listen(port, () => {
    console.log(`Server started  on http://localhost:${port}`);
});

// mongodb+srv://MkSivam:Makesh02022005@cluster0.jdtepge.mongodb.net/?