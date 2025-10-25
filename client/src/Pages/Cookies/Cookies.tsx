import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaCookie, FaCog, FaChartBar, FaShieldAlt } from "react-icons/fa";

function Cookies() {
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

  const cookiesContent = `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
        <h2 class="text-2xl font-bold text-gray-900 stick-bold mb-4">Cookie Policy</h2>
        <p class="text-gray-700 stick-regular leading-relaxed">
          This Cookie Policy explains how VEXO uses cookies and similar technologies when 
          you visit our website. It explains what these technologies are and why we use them, 
          as well as your rights to control our use of them.
        </p>
        <p class="text-sm text-gray-600 stick-regular mt-2">
          Last updated: ${new Date().toLocaleDateString()}
        </p>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">What Are Cookies?</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            Cookies are small text files that are placed on your computer or mobile device 
            when you visit a website. They are widely used to make websites work more 
            efficiently and to provide information to website owners.
          </p>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-900 stick-bold mb-2">How Cookies Work:</h4>
            <ul class="space-y-1 text-blue-800 stick-regular text-sm">
              <li>• Stored on your device when you visit our website</li>
              <li>• Sent back to our servers on subsequent visits</li>
              <li>• Help us remember your preferences and settings</li>
              <li>• Enable personalized experiences</li>
            </ul>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">Types of Cookies We Use</h3>
          <div class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 stick-bold mb-3">Essential Cookies</h4>
              <p class="text-green-800 stick-regular text-sm mb-2">
                These cookies are necessary for the website to function properly. 
                They cannot be disabled in our systems.
              </p>
              <ul class="space-y-1 text-green-700 stick-regular text-xs">
                <li>• Shopping cart functionality</li>
                <li>• User authentication</li>
                <li>• Security features</li>
                <li>• Basic website navigation</li>
              </ul>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 stick-bold mb-3">Analytics Cookies</h4>
              <p class="text-blue-800 stick-regular text-sm mb-2">
                These cookies help us understand how visitors interact with our website 
                by collecting and reporting information anonymously.
              </p>
              <ul class="space-y-1 text-blue-700 stick-regular text-xs">
                <li>• Google Analytics</li>
                <li>• Page views and user behavior</li>
                <li>• Performance metrics</li>
                <li>• Error tracking</li>
              </ul>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-900 stick-bold mb-3">Marketing Cookies</h4>
              <p class="text-purple-800 stick-regular text-sm mb-2">
                These cookies are used to track visitors across websites to display 
                relevant and engaging advertisements.
              </p>
              <ul class="space-y-1 text-purple-700 stick-regular text-xs">
                <li>• Social media advertising</li>
                <li>• Retargeting campaigns</li>
                <li>• Personalized content</li>
                <li>• Conversion tracking</li>
              </ul>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg">
              <h4 class="font-semibold text-yellow-900 stick-bold mb-3">Preference Cookies</h4>
              <p class="text-yellow-800 stick-regular text-sm mb-2">
                These cookies remember your choices and preferences to provide a 
                more personalized experience.
              </p>
              <ul class="space-y-1 text-yellow-700 stick-regular text-xs">
                <li>• Language preferences</li>
                <li>• Currency settings</li>
                <li>• Theme preferences</li>
                <li>• Location settings</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">Third-Party Cookies</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            Some cookies on our site are set by third-party services that appear on our pages.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 stick-bold mb-2">Google Analytics</h4>
              <p class="text-gray-700 stick-regular text-sm">
                Helps us understand website traffic and user behavior. 
                <a href="https://policies.google.com/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 stick-bold mb-2">Social Media</h4>
              <p class="text-gray-700 stick-regular text-sm">
                Facebook, Instagram, and Twitter cookies for social features and advertising.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 stick-bold mb-2">Payment Processors</h4>
              <p class="text-gray-700 stick-regular text-sm">
                Stripe, PayPal cookies for secure payment processing and fraud prevention.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 stick-bold mb-2">Customer Support</h4>
              <p class="text-gray-700 stick-regular text-sm">
                Live chat and support widget cookies for customer service functionality.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">Managing Your Cookie Preferences</h3>
          <div class="space-y-4">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 stick-bold mb-2">Cookie Consent Banner</h4>
              <p class="text-green-800 stick-regular text-sm">
                When you first visit our website, you'll see a cookie consent banner. 
                You can choose which types of cookies to accept or reject.
              </p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-blue-900 stick-bold mb-2">Browser Settings</h4>
              <p class="text-blue-800 stick-regular text-sm mb-2">
                You can control cookies through your browser settings:
              </p>
              <ul class="space-y-1 text-blue-700 stick-regular text-xs">
                <li>• Chrome: Settings > Privacy and security > Cookies</li>
                <li>• Firefox: Options > Privacy & Security > Cookies</li>
                <li>• Safari: Preferences > Privacy > Cookies</li>
                <li>• Edge: Settings > Cookies and site permissions</li>
              </ul>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-purple-900 stick-bold mb-2">Opt-Out Links</h4>
              <p class="text-purple-800 stick-regular text-sm">
                You can opt out of specific third-party cookies:
              </p>
              <ul class="space-y-1 text-purple-700 stick-regular text-xs">
                <li>• <a href="https://tools.google.com/dlpage/gaoptout" class="text-blue-600 hover:underline">Google Analytics Opt-out</a></li>
                <li>• <a href="https://www.facebook.com/settings?tab=ads" class="text-blue-600 hover:underline">Facebook Ad Preferences</a></li>
                <li>• <a href="https://optout.aboutads.info/" class="text-blue-600 hover:underline">Digital Advertising Alliance</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">Impact of Disabling Cookies</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-red-50 p-4 rounded-lg">
              <h4 class="font-semibold text-red-900 stick-bold mb-2">What You'll Lose</h4>
              <ul class="space-y-1 text-red-800 stick-regular text-sm">
                <li>• Personalized shopping experience</li>
                <li>• Saved cart and wishlist items</li>
                <li>• Remembered login status</li>
                <li>• Tailored product recommendations</li>
              </ul>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-green-900 stick-bold mb-2">What Still Works</h4>
              <ul class="space-y-1 text-green-800 stick-regular text-sm">
                <li>• Basic website functionality</li>
                <li>• Product browsing and search</li>
                <li>• Making purchases</li>
                <li>• Contact and support</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">Cookie Retention</h3>
          <p class="text-gray-700 stick-regular leading-relaxed mb-4">
            Different cookies have different lifespans. Here's how long we keep different types of cookies:
          </p>
          <div class="space-y-3">
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span class="font-semibold text-gray-900 stick-bold">Session Cookies</span>
              <span class="text-gray-600 stick-regular text-sm">Deleted when you close your browser</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span class="font-semibold text-gray-900 stick-bold">Persistent Cookies</span>
              <span class="text-gray-600 stick-regular text-sm">30 days to 2 years</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span class="font-semibold text-gray-900 stick-bold">Analytics Cookies</span>
              <span class="text-gray-600 stick-regular text-sm">Up to 2 years</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span class="font-semibold text-gray-900 stick-bold">Marketing Cookies</span>
              <span class="text-gray-600 stick-regular text-sm">Up to 1 year</span>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 stick-bold mb-4">Updates to This Policy</h3>
          <p class="text-gray-700 stick-regular leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in our 
            practices or for other operational, legal, or regulatory reasons. We will 
            notify you of any material changes by posting the updated policy on our website.
          </p>
        </div>
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
              <FaCookie className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Cookie Policy</h1>
              <p className="text-gray-600 stick-regular mt-2">
                How we use cookies and similar technologies
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaCog className="text-blue-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Cookie Control</h3>
            <p className="text-gray-600 stick-regular text-sm">Manage your preferences</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaChartBar className="text-green-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Analytics</h3>
            <p className="text-gray-600 stick-regular text-sm">Understand site usage</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaShieldAlt className="text-purple-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Privacy First</h3>
            <p className="text-gray-600 stick-regular text-sm">Your privacy matters</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: cookiesContent }}
            className="prose prose-gray max-w-none"
          />
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="mt-12 bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-4">Questions About Cookies?</h2>
          <p className="text-gray-300 stick-regular mb-6">
            If you have any questions about our use of cookies or this Cookie Policy, 
            please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer stick-regular text-center"
            >
              Contact Us
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
  );
}

export default Cookies;
