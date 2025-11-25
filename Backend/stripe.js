import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';
import Stripe from "stripe"
const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY)






import orderModel from '../models/ordermodels.js';
import userModel from '../models/usermodels.js';
import Stripe from "stripe"

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// // Placing user order for frontend
// const placeOrder = async (req, res) => {
//     const frontend_url = 'http://localhost:5173';
//     try {
//         // Don't create order yet - just prepare the checkout session
//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: "lkr",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100 * 300
//             },
//             quantity: item.quantity
//         }))

//         line_items.push({
//             price_data: {
//                 currency: "lkr",
//                 product_data: {
//                     name: "Delivery Charges"
//                 },
//                 unit_amount: 2 * 100 * 80
//             },
//             quantity: 1
//         })

//         // Store order data in session metadata
//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `${frontend_url}/verify?success=false`,
//             metadata: {
//                 userId: req.body.userId,
//                 items: JSON.stringify(req.body.items),
//                 amount: req.body.amount.toString(),
//                 address: JSON.stringify(req.body.address)
//             }
//         })

//         res.json({ success: true, session_url: session.url })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }

// const verifyOrder = async (req, res) => {
//     const { session_id, success } = req.body;
//     try {
//         if (success === 'true') {
//             // Retrieve session from Stripe to get metadata
//             const session = await stripe.checkout.sessions.retrieve(session_id);
            
//             // Verify payment status
//             if (session.payment_status === 'paid') {
//                 // Now create the order
//                 const newOrder = new orderModel({
//                     userId: session.metadata.userId,
//                     items: JSON.parse(session.metadata.items),
//                     amount: parseFloat(session.metadata.amount),
//                     address: JSON.parse(session.metadata.address),
//                     payment: true
//                 });

//                 await newOrder.save();
                
//                 // Clear user's cart
//                 await userModel.findByIdAndUpdate(session.metadata.userId, { cartData: {} });
                
//                 res.json({ success: true, message: "Paid", orderId: newOrder._id })
//             } else {
//                 res.json({ success: false, message: "Payment not completed" })
//             }
//         } else {
//             res.json({ success: false, message: "Payment cancelled" })
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }

// // user orders for frontend
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId })
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }

// // listing orders for admin panel
// const listOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({});
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }

// // api for updating order status
// const updateStatus = async (req, res) => {
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
//         res.json({ success: true, message: "Status Updated" })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }

// export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };











// Placing user order for frontend
const placeOrder = async (req, res) =>{

    const frontend_url = 'http://localhost:5173';
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount:req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data :{
                currency: "",
                product_data:{
                    name: item.name
                },
                unit_amount:item.price*100*300
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data :{
                currency:"lkr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}
