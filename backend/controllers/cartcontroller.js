import userModel from "../models/usermodel.js";

// Add item to cart
const addtocart = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "itemId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData if not present
    const cartData = userData.cartData || {};

    // Add or increment item count
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove item from cart
const removefromcart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "itemId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.status(400).json({ success: false, message: "Item not in cart" });
    }

    // Decrement or remove item
    cartData[itemId] -= 1;
    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Item removed from cart", cartData });
  } catch (error) {
    console.error("Remove from cart error:", error.message);
    return res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Fetch cart data
const getcart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("Get cart error:", error.message);
    return res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export { addtocart, removefromcart, getcart };
