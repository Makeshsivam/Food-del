import express from"express"
import authMiddleware from "../middleware/auth.js"
import { allOrders, placeorder, updateOrderStatus, userOrders, verifyorder } from "../controllers/ordercontroller.js"

const orderrouter=express.Router();

orderrouter.post("/place",authMiddleware,placeorder);
orderrouter.post("/verify",verifyorder)
orderrouter.post("/userorders",authMiddleware,userOrders)
orderrouter.get("/list",allOrders)
orderrouter.post("/status", updateOrderStatus);



export default orderrouter;
