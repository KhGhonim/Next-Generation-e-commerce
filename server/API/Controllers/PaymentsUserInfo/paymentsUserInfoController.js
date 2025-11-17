import User from "../../Models/User.js";

// @desc    Update billing address
// @route   PUT /api/auth/billing
// @access  Private
export const updateBillingAddress = async (req, res) => {
  try {
    const { phone, address, city, zipCode, country } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update billing address fields
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (zipCode !== undefined) user.zipCode = zipCode;
    if (country !== undefined) user.country = country;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Billing address updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        zipCode: user.zipCode,
        country: user.country,
        paymentMethods: user.paymentMethods,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update billing address error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Add payment method
// @route   POST /api/auth/payment-methods
// @access  Private
export const addPaymentMethod = async (req, res) => {
  try {
    const { cardNumber, expiryDate, cardHolderName, isDefault } = req.body;

    // Validation
    if (!cardNumber || !expiryDate || !cardHolderName) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required payment method fields",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If this is set as default, remove default from other cards
    if (isDefault) {
      user.paymentMethods.forEach(method => {
        method.isDefault = false;
      });
    }

    // Add new payment method
    const newPaymentMethod = {
      cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces
      expiryDate,
      cardHolderName,
      isDefault: isDefault || false,
    };

    user.paymentMethods.push(newPaymentMethod);

    // If this is the first payment method, make it default
    if (user.paymentMethods.length === 1) {
      user.paymentMethods[0].isDefault = true;
    }

    await user.save();

    res.status(201).json({
      success: true,
      message: "Payment method added successfully",
      paymentMethod: newPaymentMethod,
    });
  } catch (error) {
    console.error("Add payment method error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Update payment method
// @route   PUT /api/auth/payment-methods/:methodId
// @access  Private
export const updatePaymentMethod = async (req, res) => {
  try {
    const { methodId } = req.params;
    const { cardNumber, expiryDate, cardHolderName, isDefault } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const paymentMethod = user.paymentMethods.id(methodId);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      });
    }

    // Update fields
    if (cardNumber !== undefined) paymentMethod.cardNumber = cardNumber.replace(/\s/g, '');
    if (expiryDate !== undefined) paymentMethod.expiryDate = expiryDate;
    if (cardHolderName !== undefined) paymentMethod.cardHolderName = cardHolderName;
    if (isDefault !== undefined) {
      if (isDefault) {
        // Remove default from other cards
        user.paymentMethods.forEach(method => {
          if (method._id.toString() !== methodId) {
            method.isDefault = false;
          }
        });
      }
      paymentMethod.isDefault = isDefault;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment method updated successfully",
      paymentMethod,
    });
  } catch (error) {
    console.error("Update payment method error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Delete payment method
// @route   DELETE /api/auth/payment-methods/:methodId
// @access  Private
export const deletePaymentMethod = async (req, res) => {
  try {
    const { methodId } = req.params;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const paymentMethod = user.paymentMethods.id(methodId);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      });
    }

    const wasDefault = paymentMethod.isDefault;
    
    // Remove the payment method
    user.paymentMethods.pull(methodId);

    // If the deleted method was default and there are other methods, make the first one default
    if (wasDefault && user.paymentMethods.length > 0) {
      user.paymentMethods[0].isDefault = true;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment method deleted successfully",
    });
  } catch (error) {
    console.error("Delete payment method error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

