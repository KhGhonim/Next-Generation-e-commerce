import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import SEO from "../../Components/SEO/SEO";

function VerifyToken() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, checkAuth } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token);
        if (result) {
          setStatus("success");
          setMessage("Your email has been verified successfully!");
          // Refresh auth to get updated user data
          await checkAuth();
          // Redirect to profile after 2 seconds
          setTimeout(() => {
            navigate("/profile", { replace: true });
          }, 2000);
        } else {
          setStatus("error");
          setMessage("Verification failed. The link may be invalid or expired.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verify();
  }, [searchParams, verifyEmail, checkAuth, navigate]);

  return (
    <>
      <SEO
        title="Verify Email"
        description="Verify your VEXO account email address to complete your registration and access all features."
        keywords="email verification, verify account, VEXO verification"
        url={`${baseUrl}/verify-token`}
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
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            {status === "loading" && (
              <>
                <div className="flex justify-center mb-4">
                  <FaSpinner className="h-16 w-16 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 stick-bold mb-2">
                  Verifying Email
                </h2>
                <p className="text-gray-600 stick-regular">{message}</p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="flex justify-center mb-4">
                  <FaCheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 stick-bold mb-2">
                  Email Verified!
                </h2>
                <p className="text-gray-600 stick-regular mb-6">{message}</p>
                <p className="text-sm text-gray-500 stick-regular">
                  Redirecting to your profile...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="flex justify-center mb-4">
                  <FaTimesCircle className="h-16 w-16 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 stick-bold mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 stick-regular mb-6">{message}</p>
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    className="block w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer stick-regular"
                  >
                    Go to Profile
                  </Link>
                  <Link
                    to="/"
                    className="block w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer stick-regular"
                  >
                    Go to Home
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default VerifyToken;

