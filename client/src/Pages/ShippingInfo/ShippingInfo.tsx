import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaTruck, FaClock, FaGlobe, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";

function ShippingInfo() {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const shippingOptions = [
    {
      name: "Standard Shipping",
      icon: <FaTruck className="text-blue-500" size={24} />,
      duration: "3-5 business days",
      price: "Free on orders $50+",
      description: "Reliable delivery to your doorstep",
      features: ["Tracking included", "Signature confirmation", "Insurance coverage"]
    },
    {
      name: "Express Shipping",
      icon: <FaClock className="text-green-500" size={24} />,
      duration: "1-2 business days",
      price: "$9.99",
      description: "Fast delivery for urgent orders",
      features: ["Priority handling", "Real-time tracking", "Delivery confirmation"]
    },
    {
      name: "Overnight Shipping",
      icon: <FaTruck className="text-purple-500" size={24} />,
      duration: "Next business day",
      price: "$19.99",
      description: "Same-day processing, next-day delivery",
      features: ["Express processing", "Guaranteed delivery", "Premium packaging"]
    },
    {
      name: "International Shipping",
      icon: <FaGlobe className="text-orange-500" size={24} />,
      duration: "7-14 business days",
      price: "Varies by location",
      description: "Worldwide delivery to over 50 countries",
      features: ["Customs handling", "Duty calculation", "International tracking"]
    }
  ];

  const shippingZones = [
    {
      zone: "Domestic (US)",
      countries: ["United States"],
      timeframe: "1-5 business days",
      cost: "Free on orders $50+"
    },
    {
      zone: "North America",
      countries: ["Canada", "Mexico"],
      timeframe: "3-7 business days",
      cost: "Starting at $12.99"
    },
    {
      zone: "Europe",
      countries: ["UK", "Germany", "France", "Italy", "Spain", "Netherlands"],
      timeframe: "5-10 business days",
      cost: "Starting at $15.99"
    },
    {
      zone: "Asia Pacific",
      countries: ["Australia", "Japan", "South Korea", "Singapore"],
      timeframe: "7-14 business days",
      cost: "Starting at $18.99"
    }
  ];

  return (
    <>
      <SEO
        title="Shipping Information"
        description="Learn about VEXO's shipping options, delivery times, and shipping rates. Find information about international shipping, tracking orders, and delivery policies."
        keywords="shipping, delivery, shipping rates, tracking, VEXO shipping, delivery times"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        tags={["shipping", "delivery", "tracking"]}
      />
      <div className="min-h-screen bg-zinc-50 py-20 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-black transition-colors stick-regular mb-6"
          >
            <FaArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-black p-3 rounded-full">
              <FaTruck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Shipping Information</h1>
              <p className="text-gray-600 stick-regular mt-2">
                Fast, reliable delivery options worldwide
              </p>
            </div>
          </div>
        </motion.div>

        {/* Shipping Options */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 stick-bold text-center mb-8">Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {option.icon}
                  <h3 className="text-xl font-semibold stick-bold">{option.name}</h3>
                </div>
                <p className="text-gray-600 stick-regular mb-4">{option.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="stick-regular text-gray-700">Duration:</span>
                    <span className="stick-bold text-gray-900">{option.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="stick-regular text-gray-700">Price:</span>
                    <span className="stick-bold text-gray-900">{option.price}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold stick-bold mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-600 stick-regular text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shipping Zones */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 stick-bold text-center mb-8">International Shipping</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left stick-bold">Zone</th>
                    <th className="border border-gray-300 px-4 py-3 text-left stick-bold">Countries</th>
                    <th className="border border-gray-300 px-4 py-3 text-left stick-bold">Delivery Time</th>
                    <th className="border border-gray-300 px-4 py-3 text-left stick-bold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-3 stick-bold">{zone.zone}</td>
                      <td className="border border-gray-300 px-4 py-3 stick-regular">{zone.countries.join(", ")}</td>
                      <td className="border border-gray-300 px-4 py-3 stick-regular">{zone.timeframe}</td>
                      <td className="border border-gray-300 px-4 py-3 stick-regular">{zone.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaShieldAlt className="text-blue-500" size={24} />
              <h3 className="text-xl font-semibold stick-bold">Order Processing</h3>
            </div>
            <ul className="space-y-2 text-gray-700 stick-regular">
              <li>• Orders placed before 2 PM EST ship same day</li>
              <li>• Orders placed after 2 PM EST ship next business day</li>
              <li>• Weekend orders ship on Monday</li>
              <li>• Processing time: 1-2 business days</li>
              <li>• You'll receive tracking information via email</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaMapMarkerAlt className="text-green-500" size={24} />
              <h3 className="text-xl font-semibold stick-bold">Delivery Information</h3>
            </div>
            <ul className="space-y-2 text-gray-700 stick-regular">
              <li>• Delivery attempts made Monday-Friday</li>
              <li>• Signature required for orders over $100</li>
              <li>• Packages left in safe locations when possible</li>
              <li>• Delivery confirmation sent via email/SMS</li>
              <li>• Failed deliveries returned to sender after 3 attempts</li>
            </ul>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 stick-bold text-center mb-8">Shipping FAQ</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold stick-bold mb-2">Can I change my shipping address after placing an order?</h3>
              <p className="text-gray-700 stick-regular">
                Yes, you can change your shipping address before your order ships. Once shipped, 
                address changes are not possible. Contact our support team for assistance.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold stick-bold mb-2">What if my package is lost or damaged?</h3>
              <p className="text-gray-700 stick-regular">
                All packages are insured. If your package is lost or damaged during transit, 
                we'll send a replacement or provide a full refund. Contact support within 30 days.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold stick-bold mb-2">Do you ship to PO boxes?</h3>
              <p className="text-gray-700 stick-regular">
                Yes, we ship to PO boxes for domestic orders. International PO box delivery 
                may have restrictions depending on the destination country.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold stick-bold mb-2">Can I track my international order?</h3>
              <p className="text-gray-700 stick-regular">
                Yes, all international orders include tracking. You'll receive tracking updates 
                via email and can monitor your package's progress online.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants} className="bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-4">Questions About Shipping?</h2>
          <p className="text-gray-300 stick-regular mb-6">
            Our customer service team is here to help with any shipping questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/help"
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer stick-regular text-center"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@vexo.com"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer stick-regular text-center"
            >
              Email Support
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default ShippingInfo;
