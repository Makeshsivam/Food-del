import OrderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeorder = async (req, res) => {
  const frontend_url = "https://food-del-frontend-3sr5.onrender.com";

  try {
    // create new order with userId from middleware
    const neworder = new OrderModel({
      userId: req.userId,              // ✅ comes from decoded JWT
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,                  // add default if not passed
    });

    await neworder.save();

    // clear user cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // prepare stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // add delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "delivery charge" },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe/order error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

  const verifyorder=async(req,res)=>{
    const{orderId,success}=req.body;

    try {
      if (success==='true'){
        await OrderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
      }
      else{
        await OrderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:" not paid"})
      }
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"erroe"})
      
    }
  
  }

  // user order for frontend

  const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId }); // latest first
    res.json({ success: true,data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "failed to fetch orders" });
  }
};


// get all orders (admin only)
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: "Failed to fetch all orders" });
  }
};

// update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", data: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.json({ success: false, message: "Failed to update order status" });
  }
};

export { placeorder,verifyorder,userOrders,allOrders,updateOrderStatus};
