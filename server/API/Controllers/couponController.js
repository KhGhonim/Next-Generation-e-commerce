import Coupon from "../Models/Coupon.js";
import Product from "../Models/Product.js";

const DEFAULT_GLOBAL_USER_LIMIT = 2;
const DEFAULT_GLOBAL_LIMIT = 50;

const normalizeCode = (code = "") => code.trim().toUpperCase();

const ensureGlobalDefaults = (payload) => {
  if (payload.category === "global" || !payload.category) {
    if (payload.userLimit === undefined || payload.userLimit === null) {
      payload.userLimit = DEFAULT_GLOBAL_USER_LIMIT;
    }
    if (payload.globalLimit === undefined || payload.globalLimit === null) {
      payload.globalLimit = DEFAULT_GLOBAL_LIMIT;
    }
    payload.productId = undefined;
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    console.error("Get coupons error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching coupons",
    });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.code) {
      return res.status(400).json({
        success: false,
        message: "Coupon code is required",
      });
    }

    payload.code = normalizeCode(payload.code);
    ensureGlobalDefaults(payload);
    payload.createdBy = req.user?.userId;

    if (payload.category === "product") {
      if (!payload.productId) {
        return res.status(400).json({
          success: false,
          message: "Select a product for product-specific coupons",
        });
      }
      const productExists = await Product.exists({ _id: payload.productId });
      if (!productExists) {
        return res.status(400).json({
          success: false,
          message: "Selected product does not exist",
        });
      }
    } else {
      payload.productId = undefined;
    }

    const coupon = await Coupon.create(payload);

    res.status(201).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    console.error("Create coupon error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || "Server error while creating coupon",
    });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    let coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    const updates = { ...req.body };
    if (updates.code) {
      updates.code = normalizeCode(updates.code);
    }
    ensureGlobalDefaults(updates);

    const nextCategory = updates.category || coupon.category;

    if (nextCategory === "product") {
      const targetProductId = updates.productId || coupon.productId;
      if (!targetProductId) {
        return res.status(400).json({
          success: false,
          message: "Select a product for product-specific coupons",
        });
      }
      const productExists = await Product.exists({ _id: targetProductId });
      if (!productExists) {
        return res.status(400).json({
          success: false,
          message: "Selected product does not exist",
        });
      }
      updates.productId = targetProductId;
    } else {
      updates.productId = undefined;
    }

    coupon = await Coupon.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    console.error("Update coupon error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error while updating coupon",
    });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("Delete coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting coupon",
    });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal, items } = req.body;

    if (!code || cartTotal === undefined) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and cart total are required",
      });
    }

    const normalizedCode = normalizeCode(code);
    const coupon = await Coupon.findOne({ code: normalizedCode });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "Coupon is no longer active",
      });
    }

    const now = new Date();
    if (coupon.startsAt && now < coupon.startsAt) {
      return res.status(400).json({
        success: false,
        message: "Coupon is not active yet",
      });
    }

    if (coupon.expiresAt && now > coupon.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    if (coupon.minimumOrderValue && cartTotal < coupon.minimumOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value is $${coupon.minimumOrderValue.toFixed(2)}`,
      });
    }

    if (coupon.usageCount >= coupon.globalLimit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit has been reached",
      });
    }

    const cartItems = Array.isArray(items) ? items : [];

    if (coupon.category === "product") {
      if (!coupon.productId) {
        return res.status(400).json({
          success: false,
          message: "Coupon is not configured correctly. Missing product reference.",
        });
      }

      const containsProduct = cartItems.some(
        (item) =>
          item &&
          item.productId &&
          item.productId.toString() === coupon.productId.toString()
      );

      if (!containsProduct) {
        return res.status(400).json({
          success: false,
          message: "This coupon applies to a specific product that is not in your cart.",
        });
      }
    }

    const usageRecord =
      coupon.usageByUser.find((entry) => entry.userId.toString() === req.user.userId) || null;

    if (usageRecord && usageRecord.count >= coupon.userLimit) {
      return res.status(400).json({
        success: false,
        message: "You have reached the usage limit for this coupon",
      });
    }

    let discountAmount =
      coupon.discountType === "percentage"
        ? (cartTotal * coupon.discountValue) / 100
        : coupon.discountValue;

    discountAmount = Math.min(discountAmount, cartTotal);

    // increment usage counts
    coupon.usageCount += 1;
    if (usageRecord) {
      usageRecord.count += 1;
    } else {
      coupon.usageByUser.push({
        userId: req.user.userId,
        count: 1,
      });
    }

    await coupon.save();

    res.status(200).json({
      success: true,
      data: {
        coupon,
        discountAmount,
        finalTotal: Math.max(cartTotal - discountAmount, 0),
      },
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while validating coupon",
    });
  }
};


