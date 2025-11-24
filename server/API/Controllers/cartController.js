import Cart from "../Models/Cart.js";

// Generate cart item ID helper
const generateCartItemId = (productId, size, color) => {
  return `${productId}-${size || "no-size"}-${color || "no-color"}`;
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // Create empty cart if it doesn't exist
    cart = await Cart.create({
      userId,
      items: [],
      totalItems: 0,
      uniqueItems: 0,
      totalPrice: 0,
    });
  }

  res.status(200).json({
    success: true,
    cartItems: cart.items,
    items: cart.items, // For backward compatibility
    totalItems: cart.totalItems,
    uniqueItems: cart.uniqueItems,
    totalPrice: cart.totalPrice,
  });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId)
    const { id, name, price, quantity, image, size, color } = req.body;

  // Validate required fields
  if (!id || !name || !price || !quantity || !image) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: id, name, price, quantity, image",
    });
  }

  // Generate cart item ID
  const cartItemId = generateCartItemId(id, size, color);

  // Find or create cart
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
      totalItems: 0,
      uniqueItems: 0,
      totalPrice: 0,
    });
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.cartItemId === cartItemId
  );

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      productId: id,
      name,
      price,
      quantity,
      image,
      size: size || null,
      color: color || null,
      cartItemId,
    });
  }

  // Recalculate totals
  cart['recalculateTotals']();
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item added to cart successfully",
    cartItems: cart.items,
    items: cart.items,
    totalItems: cart.totalItems,
    uniqueItems: cart.uniqueItems,
    totalPrice: cart.totalPrice,
  });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding item to cart",
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:cartItemId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cartItemId } = req.params;
    const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be at least 1",
    });
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.cartItemId === cartItemId
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found in cart",
    });
  }

  // Update quantity
  cart.items[itemIndex].quantity = quantity;

  // Recalculate totals
  cart['recalculateTotals']();
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    cartItems: cart.items,
    items: cart.items,
    totalItems: cart.totalItems,
    uniqueItems: cart.uniqueItems,
    totalPrice: cart.totalPrice,
  });
  } catch (error) {
    console.error("Update cart item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating cart item",
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:cartItemId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cartItemId } = req.params;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.cartItemId === cartItemId
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found in cart",
    });
  }

  // Remove item
  cart.items.splice(itemIndex, 1);

  // Recalculate totals
  cart['recalculateTotals']();
  await cart.save();

  res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
    cartItems: cart.items,
    items: cart.items,
    totalItems: cart.totalItems,
    uniqueItems: cart.uniqueItems,
    totalPrice: cart.totalPrice,
  });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while removing item from cart",
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }

  // Clear all items
  cart.items.splice(0, cart.items.length);
  cart['totalItems'] = 0;
  cart['uniqueItems'] = 0;
  cart['totalPrice'] = 0;

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    cartItems: [],
    items: [],
    totalItems: 0,
    uniqueItems: 0,
    totalPrice: 0,
  });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while clearing cart",
    });
  }
};

