import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt, FaLock, FaEye, FaUserShield } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";

function Privacy() {
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

  const privacyContent = `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-900 stick-bold mb-4">Privacy Policy</h2>
        <p class="text-gray-700 stick-regular leading-relaxed">
          At VEXO, we are committed to protecting your privacy and ensuring the security 
          of your personal information. This Privacy Policy explains how we collect, use, 
          and safeguard your data.
        </p>
        <p class="text-sm text-gray-600 stick-regular mt-2">
          Last updated: ${new Date().toLocaleDateString()}
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">1. Information We Collect</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 stick-bold mb-3">Personal Information</h4>
              <ul class="space-y-2 text-blue-800 stick-regular text-sm">
                <li>• Name and contact information</li>
                <li>• Email address and phone number</li>
                <li>• Billing and shipping addresses</li>
                <li>• Payment information (encrypted)</li>
                <li>• Account credentials</li>
              </ul>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 stick-bold mb-3">Usage Information</h4>
              <ul class="space-y-2 text-green-800 stick-regular text-sm">
                <li>• Website browsing behavior</li>
                <li>• Product preferences and interests</li>
                <li>• Device and browser information</li>
                <li>• IP address and location data</li>
                <li>• Cookies and tracking data</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">2. How We Use Your Information</h3>
          <div class="space-y-4">
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-900 stick-bold mb-2">Service Delivery</h4>
              <ul class="space-y-1 text-purple-800 stick-regular text-sm">
                <li>• Process and fulfill your orders</li>
                <li>• Provide customer support</li>
                <li>• Send order confirmations and updates</li>
                <li>• Manage your account</li>
              </ul>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold text-yellow-900 stick-bold mb-2">Marketing & Communication</h4>
              <ul class="space-y-1 text-yellow-800 stick-regular text-sm">
                <li>• Send promotional emails (with consent)</li>
                <li>• Personalize your shopping experience</li>
                <li>• Recommend products you might like</li>
                <li>• Conduct surveys and feedback</li>
              </ul>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <h4 class="font-semibold text-red-900 stick-bold mb-2">Legal & Security</h4>
              <ul class="space-y-1 text-red-800 stick-regular text-sm">
                <li>• Comply with legal obligations</li>
                <li>• Prevent fraud and abuse</li>
                <li>• Protect our rights and property</li>
                <li>• Ensure platform security</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">3. Information Sharing</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. 
            We may share your information only in the following circumstances:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 stick-bold mb-2">Service Providers</h4>
              <p class="text-gray-700 stick-regular text-sm">
                Trusted third-party companies that help us operate our business, 
                such as payment processors, shipping companies, and analytics providers.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 stick-bold mb-2">Legal Requirements</h4>
              <p class="text-gray-700 stick-regular text-sm">
                When required by law, court order, or to protect our rights, 
                property, or safety, or that of our users or the public.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">4. Data Security</h3>
          <div class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 stick-bold mb-2">Security Measures</h4>
              <ul class="space-y-1 text-green-800 stick-regular text-sm">
                <li>• SSL encryption for all data transmission</li>
                <li>• Secure servers with regular security updates</li>
                <li>• Limited access to personal information</li>
                <li>• Regular security audits and monitoring</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 stick-bold mb-2">Payment Security</h4>
              <p class="text-blue-800 stick-regular text-sm">
                We use industry-standard encryption and security measures to protect 
                your payment information. We do not store complete credit card numbers 
                on our servers.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">5. Your Rights</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="bg-purple-50 p-3 rounded-lg">
                <h4 class="font-semibold text-purple-900 stick-bold text-sm">Access & Portability</h4>
                <p class="text-purple-800 stick-regular text-xs">Request a copy of your data</p>
              </div>
              <div class="bg-blue-50 p-3 rounded-lg">
                <h4 class="font-semibold text-blue-900 stick-bold text-sm">Correction</h4>
                <p class="text-blue-800 stick-regular text-xs">Update inaccurate information</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="bg-red-50 p-3 rounded-lg">
                <h4 class="font-semibold text-red-900 stick-bold text-sm">Deletion</h4>
                <p class="text-red-800 stick-regular text-xs">Request deletion of your data</p>
              </div>
              <div class="bg-yellow-50 p-3 rounded-lg">
                <h4 class="font-semibold text-yellow-900 stick-bold text-sm">Opt-out</h4>
                <p class="text-yellow-800 stick-regular text-xs">Unsubscribe from marketing</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">6. Cookies and Tracking</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            We use cookies and similar technologies to enhance your browsing experience, 
            analyze site traffic, and personalize content. You can control cookie settings 
            through your browser preferences.
          </p>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 stick-bold mb-2">Types of Cookies We Use:</h4>
            <ul class="space-y-1 text-gray-700 stick-regular text-sm">
              <li>• Essential cookies (required for site functionality)</li>
              <li>• Analytics cookies (help us understand site usage)</li>
              <li>• Marketing cookies (personalize your experience)</li>
              <li>• Preference cookies (remember your settings)</li>
            </ul>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">7. Children's Privacy</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            Our services are not intended for children under 13 years of age. We do not 
            knowingly collect personal information from children under 13. If you are a 
            parent or guardian and believe your child has provided us with personal 
            information, please contact us immediately.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">8. International Transfers</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            Your information may be transferred to and processed in countries other than 
            your own. We ensure that such transfers comply with applicable data protection 
            laws and implement appropriate safeguards to protect your information.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">9. Changes to This Policy</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of 
            any material changes by posting the new Privacy Policy on this page and 
            updating the "Last updated" date. We encourage you to review this Privacy 
            Policy periodically.
          </p>
        </div>
      </div>
    </div>
  `;

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how VEXO protects your privacy and handles your personal information. Read our comprehensive privacy policy covering data collection, usage, and security."
        keywords="privacy policy, data protection, privacy, VEXO privacy, personal information"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        tags={["privacy", "data protection", "legal"]}
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
              <FaShieldAlt className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Privacy Policy</h1>
              <p className="text-gray-600 stick-regular mt-2">
                How we protect and use your personal information
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaLock className="text-blue-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Data Protection</h3>
            <p className="text-gray-600 stick-regular text-sm">Your privacy is our priority</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaEye className="text-green-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Transparency</h3>
            <p className="text-gray-600 stick-regular text-sm">Clear information about data use</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaUserShield className="text-purple-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Your Rights</h3>
            <p className="text-gray-600 stick-regular text-sm">Control over your information</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: privacyContent }}
            className="prose prose-gray max-w-none"
          />
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-12 bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-4">Questions About Privacy?</h2>
          <p className="text-gray-300 stick-regular mb-6">
            If you have any questions about this Privacy Policy or how we handle your data, 
            please contact our privacy team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer stick-regular text-center"
            >
              Contact Privacy Team
            </Link>
            <a
              href="mailto:privacy@vexo.com"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer stick-regular text-center"
            >
              Email Privacy Team
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default Privacy;
