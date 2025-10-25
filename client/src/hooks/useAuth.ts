import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setUser, clearUser, setLoading } from "../store/slices/userSlice";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//environment variables
const API_URL = import.meta.env.VITE_APP_API_URL;

export const useAuth = () => {
  const { user, isLoading, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setUser(result.user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signup = async (data: SignupData) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Account created successfully!");
        navigate("/login");
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(clearUser());
        toast.success("Logged out successfully!");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setUser(result.user));
        return result.user;
      } else {
        dispatch(clearUser());
        return null;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      dispatch(clearUser());
      return null;
    }
  };

  const updateBillingAddress = async (billingData: {
    phone?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  }) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/billing`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(billingData),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setUser(result.user));
        toast.success("Billing address updated successfully!");
        return result.user;
      } else {
        toast.error(result.message || "Failed to update billing address");
        return null;
      }
    } catch (error) {
      console.error("Update billing address error:", error);
      toast.error("An error occurred while updating billing address");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addPaymentMethod = async (paymentData: {
    cardNumber: string;
    expiryDate: string;
    cardHolderName: string;
    isDefault?: boolean;
  }) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/payment-methods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh user data to get updated payment methods
        await checkAuth();
        toast.success("Payment method added successfully!");
        return result.paymentMethod;
      } else {
        toast.error(result.message || "Failed to add payment method");
        return null;
      }
    } catch (error) {
      console.error("Add payment method error:", error);
      toast.error("An error occurred while adding payment method");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updatePaymentMethod = async (methodId: string, paymentData: {
    cardNumber?: string;
    expiryDate?: string;
    cardHolderName?: string;
    isDefault?: boolean;
  }) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/payment-methods/${methodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh user data to get updated payment methods
        await checkAuth();
        toast.success("Payment method updated successfully!");
        return result.paymentMethod;
      } else {
        toast.error(result.message || "Failed to update payment method");
        return null;
      }
    } catch (error) {
      console.error("Update payment method error:", error);
      toast.error("An error occurred while updating payment method");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deletePaymentMethod = async (methodId: string) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/payment-methods/${methodId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh user data to get updated payment methods
        await checkAuth();
        toast.success("Payment method deleted successfully!");
        return true;
      } else {
        toast.error(result.message || "Failed to delete payment method");
        return false;
      }
    } catch (error) {
      console.error("Delete payment method error:", error);
      toast.error("An error occurred while deleting payment method");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfile = async (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setUser(result.user));
        toast.success("Profile updated successfully!");
        return result.user;
      } else {
        toast.error(result.message || "Failed to update profile");
        return null;
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("An error occurred while updating profile");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuth,
    updateProfile,
    updateBillingAddress,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  };
};
