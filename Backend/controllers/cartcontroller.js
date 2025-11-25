
// DMJcdJJ1B8YuvzXW

// muzamilqayyum69_db_user
import usermodel from "../models/usermodels.js";

//add item to cart

const deleteData = async () => {
    try {
        await usermodel.deleteMany({});
        
        console.log('All data deleted successfully');
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};

//deleteData();



const addtocart = async (req, res) => {
    try {



       // let userdata = await usermodel.findOne({ _id: req.body.userId });
        let userdata = await usermodel.findById(req.body.userId)
        let cartdata =await userdata.cartdata;
      
       
        if (!cartdata[req.body.itemid]) {
            cartdata[req.body.itemid] = 1;
        } else {
            cartdata[req.body.itemid] += 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userId, { cartdata });
        return res.json({ success: true, message: "Added to cart" });

    } catch (err) {

       
        return res.json({ success: false, message: "Error" });

    }
}

//remove item from cart

const removetocart = async (req, res) => {
    try {
        let userdata = await usermodel.findById(req.body.userId);
        let cartdata =await userdata.cartdata;

        if (cartdata[req.body.itemid] > 0) {
            cartdata[req.body.itemid] -= 1;
        }

        await usermodel.findByIdAndUpdate(req.body.userId, { cartdata });
        return res.json({ success: true, message: "Removed from cart" });

    } catch (err) {

        console.log(err);
        return res.json({ success: false, message: "Error" });

    }
}

//fectch user cart data

const getcart = async (req, res) => {

    try {
        let userdata = await usermodel.findById(req.body.userId);
        let cartdata =await userdata.cartdata;
      
      
        return res.json({ success: true, cartdata });

    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error" });
    }
}





export { addtocart, removetocart, getcart };







