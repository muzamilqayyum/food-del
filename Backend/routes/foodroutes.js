import express  from "express";
import foodmodel from "../models/foodmodels.js";
import multer from "multer";
import { addfood ,listfood, removefood,editid,updatedata} from "../controllers/foodcontroller.js";

const foodRouter=express.Router();

//image storage engine
const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload=multer({storage:storage});

foodRouter.post('/add',upload.single('image'),addfood);
foodRouter.get('/list',listfood);
foodRouter.post('/list/editid',editid);
foodRouter.post('/list/updatedata',upload.single('image'),updatedata)
foodRouter.post('/remove',removefood);

export default foodRouter;
