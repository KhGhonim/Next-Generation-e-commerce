import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaFileContract, FaGavel, FaShieldAlt } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";

function Terms() {
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

  const termsContent = `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-900 stick-bold mb-4">Terms of Service</h2>
        <p class="text-gray-700 stick-regular leading-relaxed">
          These Terms of Service ("Terms") govern your use of VEXO's website and services. 
          By accessing or using our platform, you agree to be bound by these terms.
        </p>
        <p class="text-sm text-gray-600 stick-regular mt-2">
          Last updated: ${new Date().toLocaleDateString()}
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">1. Acceptance of Terms</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            By accessing and using VEXO's website, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, 
            please do not use this service.
          </p>
          <ul class="space-y-2 text-gray-700 stick-regular">
            <li>• You must be at least 13 years old to use our services</li>
            <li>• You are responsible for maintaining the confidentiality of your account</li>
            <li>• You agree to provide accurate and complete information</li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">2. Use License</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            Permission is granted to temporarily download one copy of the materials on VEXO's 
            website for personal, non-commercial transitory viewing only.
          </p>
          <div class="bg-red-50 p-4 rounded-lg">
            <h4 class="font-semibold text-red-900 stick-bold mb-2">Prohibited Uses:</h4>
            <ul class="space-y-1 text-red-800 stick-regular text-sm">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose</li>
              <li>• Attempt to reverse engineer any software</li>
              <li>• Remove any copyright or proprietary notations</li>
            </ul>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">3. User Accounts</h3>
          <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 stick-bold mb-2">Account Creation</h4>
              <p class="text-blue-800 stick-regular text-sm">
                When you create an account with us, you must provide information that is 
                accurate, complete, and current at all times.
              </p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold text-yellow-900 stick-bold mb-2">Account Security</h4>
              <p class="text-yellow-800 stick-regular text-sm">
                You are responsible for safeguarding the password and for all activities 
                that occur under your account.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">4. Purchases and Payments</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 stick-bold mb-2">Payment Methods</h4>
              <ul class="space-y-1 text-green-800 stick-regular text-sm">
                <li>• Credit/Debit Cards</li>
                <li>• PayPal</li>
                <li>• Apple Pay</li>
                <li>• Google Pay</li>
              </ul>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-900 stick-bold mb-2">Pricing</h4>
              <ul class="space-y-1 text-purple-800 stick-regular text-sm">
                <li>• All prices are in USD</li>
                <li>• Prices subject to change</li>
                <li>• Taxes calculated at checkout</li>
                <li>• Free shipping on orders $50+</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">5. Intellectual Property</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            The VEXO name, logo, and all related names, logos, product and service names, 
            designs, and slogans are trademarks of VEXO or its affiliates.
          </p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-gray-700 stick-regular text-sm">
              You may not use such marks without our prior written permission. All other 
              names, logos, product and service names, designs, and slogans on this website 
              are the trademarks of their respective owners.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">6. Limitation of Liability</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            In no event shall VEXO, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential, 
            or punitive damages, including without limitation, loss of profits, data, use, 
            goodwill, or other intangible losses, resulting from your use of the service.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">7. Governing Law</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            These Terms shall be interpreted and governed by the laws of the State of New York, 
            without regard to its conflict of law provisions. Our failure to enforce any right 
            or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">8. Changes to Terms</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms 
            at any time. If a revision is material, we will try to provide at least 30 days 
            notice prior to any new terms taking effect.
          </p>
        </div>
      </div>
    </div>
  `;

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read VEXO's Terms of Service. Understand the rules and guidelines for using our e-commerce platform, including user responsibilities and service terms."
        keywords="terms of service, terms and conditions, VEXO terms, user agreement"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        tags={["terms", "legal", "user agreement"]}
      />
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
              <FaFileContract className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Terms of Service</h1>
              <p className="text-gray-600 stick-regular mt-2">
                Legal terms governing your use of VEXO
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaGavel className="text-blue-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Legal Protection</h3>
            <p className="text-gray-600 stick-regular text-sm">Clear terms and conditions</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaShieldAlt className="text-green-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">User Rights</h3>
            <p className="text-gray-600 stick-regular text-sm">Your rights and responsibilities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaFileContract className="text-purple-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Service Agreement</h3>
            <p className="text-gray-600 stick-regular text-sm">Terms for using our platform</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: termsContent }}
            className="prose prose-gray max-w-none"
          />
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-12 bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-4">Questions About These Terms?</h2>
          <p className="text-gray-300 stick-regular mb-6">
            If you have any questions about these Terms of Service, please contact our legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer stick-regular text-center"
            >
              Contact Legal Team
            </Link>
            <a
              href="mailto:legal@vexo.com"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer stick-regular text-center"
            >
              Email Legal
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default Terms;
