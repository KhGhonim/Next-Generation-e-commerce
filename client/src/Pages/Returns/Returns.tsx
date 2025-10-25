import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaUndo, FaClock, FaShieldAlt } from "react-icons/fa";

function Returns() {
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

  const returnsContent = `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-900 stick-bold mb-4">Return Policy Overview</h2>
        <p class="text-gray-700 stick-regular leading-relaxed">
          At VEXO, we want you to love your purchase. If you're not completely satisfied, 
          we offer a hassle-free return process within 30 days of purchase.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-3">Eligible Items</h3>
          <ul class="space-y-2 text-gray-700 stick-regular">
            <li>• Unworn clothing and accessories</li>
            <li>• Items with original tags attached</li>
            <li>• Products in original packaging</li>
            <li>• Items purchased within 30 days</li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-3">Non-Eligible Items</h3>
          <ul class="space-y-2 text-gray-700 stick-regular">
            <li>• Worn or damaged items</li>
            <li>• Items without original tags</li>
            <li>• Personalized or customized products</li>
            <li>• Items purchased over 30 days ago</li>
          </ul>
        </div>
      </div>

      <div class="bg-blue-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-blue-900 stick-bold mb-4">How to Return</h3>
        <ol class="space-y-3 text-blue-800 stick-regular">
          <li><strong>Step 1:</strong> Log into your account and go to "My Orders"</li>
          <li><strong>Step 2:</strong> Select the item(s) you want to return</li>
          <li><strong>Step 3:</strong> Print the prepaid return label</li>
          <li><strong>Step 4:</strong> Package items securely with original packaging</li>
          <li><strong>Step 5:</strong> Drop off at any authorized shipping location</li>
        </ol>
      </div>

      <div class="bg-green-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-green-900 stick-bold mb-4">Refund Process</h3>
        <div class="space-y-3 text-green-800 stick-regular">
          <p><strong>Processing Time:</strong> 3-5 business days after we receive your return</p>
          <p><strong>Refund Method:</strong> Original payment method</p>
          <p><strong>Shipping Costs:</strong> Free returns on all orders</p>
          <p><strong>Exchange Policy:</strong> Free exchanges for different sizes or colors</p>
        </div>
      </div>

      <div class="bg-yellow-50 p-6 rounded-lg">
        <h3 class="text-xl font-semibold text-yellow-900 stick-bold mb-4">Important Notes</h3>
        <ul class="space-y-2 text-yellow-800 stick-regular">
          <li>• Returns must be initiated within 30 days of delivery</li>
          <li>• Items must be in original condition with tags attached</li>
          <li>• We reserve the right to refuse returns that don't meet our criteria</li>
          <li>• International returns may have different policies</li>
        </ul>
      </div>
    </div>
  `;

  return (
    <div className="min-h-screen bg-zinc-50 py-20 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto"
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
              <FaUndo className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Returns & Exchanges</h1>
              <p className="text-gray-600 stick-regular mt-2">
                Hassle-free returns within 30 days
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaClock className="text-blue-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">30-Day Window</h3>
            <p className="text-gray-600 stick-regular text-sm">Plenty of time to decide</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaUndo className="text-green-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Free Returns</h3>
            <p className="text-gray-600 stick-regular text-sm">No return shipping costs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaShieldAlt className="text-purple-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Secure Process</h3>
            <p className="text-gray-600 stick-regular text-sm">Safe and protected returns</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: returnsContent }}
            className="prose prose-gray max-w-none"
          />
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-12 bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-4">Need Help?</h2>
          <p className="text-gray-300 stick-regular mb-6">
            Our customer service team is here to help with any questions about returns or exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer stick-regular text-center"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@vexo.com"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer stick-regular text-center"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Returns;
