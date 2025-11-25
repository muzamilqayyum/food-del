import  express  from "express";
//import { addtocart, removetocart, getcart } from "../controllers/cartcontroller.js";
import { addtocart,removetocart,getcart } from "../controllers/cartcontroller.js";
import authmiddlerware from "../middleware/auth.js"

const cartrouter = express.Router();

cartrouter.post("/add", authmiddlerware, addtocart);
cartrouter.post("/remove", authmiddlerware, removetocart);
cartrouter.post("/get", authmiddlerware, getcart);

export default cartrouter;
