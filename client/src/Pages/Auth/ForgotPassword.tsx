import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useAppSelector } from "../../store/hooks";
import SEO from "../../Components/SEO/SEO";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_API_URL;

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || "Password reset email sent successfully");
        // Optionally redirect after a delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to send password reset email");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Forgot Password"
        description="Reset your VEXO account password. Enter your email to receive a password reset link."
        keywords="forgot password, reset password, VEXO account recovery"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <Link to="/" className="inline-block">
              <img
                src="/VEXO.svg"
                className="mx-auto h-16 w-auto"
                alt="VEXO Logo"
                 loading="lazy"
                />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 stick-bold">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600 stick-regular">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg outline-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200 cursor-pointer stick-regular disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send password reset email"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors stick-regular"
              >
                <FaArrowLeft className="mr-2" />
                Back to Login
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}

export default ForgotPassword;

