import { success } from "zod";
import foodmodel from "../models/foodmodels.js";
import fs from 'fs';


//add food  item

const addfood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        color: req.body.color
    });

    try {
        await food.save();
        res.json({ success: true, message: "food added" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
};

// list food item

const listfood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });

    } catch (err) {
        res.json({ success: false, message: "Error" })
    }
}

//remove food item

const removefood = async (req, res) => {
    try {
        //for image
        const food = await foodmodel.findById(req.body._id);
        fs.unlink(`uploads/${food.image}`, () => { });

        await foodmodel.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: "Food Remove" })
    } catch (err) {
        console.log(err);
        res.json({ success: true, message: "Error" })
    }
}


const editid = async (req, res) => {
    try {
        let { _id } = req.body;
        let finddata = await foodmodel.findById(_id);

        res.json({ success: true, message: finddata })
    } catch (err) {
        res.json({ success: false, message: 'Error' })
    }

}


const updatedata = async (req, res) => {

    let images;
    if (req.body.image) {
        images = req.body.image;
        console.log("top")
    } else {
        images = req.file.filename;
    }

    try {
        const updatefoods = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: images,
            color: req.body.color
        }

        await foodmodel.findByIdAndUpdate(req.body._id, updatefoods, { new: true })

        let finddata = await foodmodel.findById(req.body._id);

        return res.json({ success: true, message: finddata })

    } catch (err) {

        return res.json({ success: false, message: "Error" })
    }

};


export { addfood, listfood, removefood, editid, updatedata };
