
import express from "express";
import { addtocart, removefromcart, getcart } from "../controllers/cartcontroller.js";
import authMiddleware from "../middleware/auth.js";

const carrouter = express.Router();

carrouter.post("/add", authMiddleware, addtocart);
carrouter.post("/remove", authMiddleware, removefromcart);
carrouter.post("/get", authMiddleware, getcart);

export default carrouter;
