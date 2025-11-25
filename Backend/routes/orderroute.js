import  express from "express";
import authmiddlerware from "../middleware/auth.js";
import { placeOrder,verifyOrder ,userOrders,listOrders,updateStatus} from "../controllers/ordercontroller.js";

const orderrouter=express.Router();

orderrouter.post("/place",authmiddlerware,placeOrder);
orderrouter.post("/verify", verifyOrder)
orderrouter.post("/userorders",authmiddlerware,userOrders)
orderrouter.get('/list',listOrders)
orderrouter.post('/status', updateStatus)

export default orderrouter;

