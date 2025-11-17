import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaQuestionCircle, FaSearch, FaPhone, FaEnvelope, FaComments } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";

function HelpCenter() {
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

  const faqCategories = [
    {
      title: "Orders & Shipping",
      icon: "📦",
      questions: [
        {
          question: "How can I track my order?",
          answer: "You can track your order by logging into your account and going to 'My Orders'. You'll also receive tracking updates via email."
        },
        {
          question: "What shipping options are available?",
          answer: "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and overnight shipping for urgent orders."
        },
        {
          question: "Can I change my shipping address?",
          answer: "You can change your shipping address before your order ships. Once shipped, address changes are not possible."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      icon: "🔄",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unworn items with original tags. Returns are free and easy to process."
        },
        {
          question: "How do I start a return?",
          answer: "Log into your account, go to 'My Orders', select the item you want to return, and follow the return process."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your return. You'll be refunded to your original payment method."
        }
      ]
    },
    {
      title: "Account & Billing",
      icon: "💳",
      questions: [
        {
          question: "How do I update my account information?",
          answer: "You can update your account information by going to your Profile page and editing the relevant sections."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and other secure payment methods."
        },
        {
          question: "Can I save my payment information?",
          answer: "Yes, you can securely save your payment information for faster checkout on future orders."
        }
      ]
    },
    {
      title: "Products & Sizing",
      icon: "👕",
      questions: [
        {
          question: "How do I find the right size?",
          answer: "Check our Size Guide page for detailed measurements and sizing charts for each product category."
        },
        {
          question: "Do you offer size exchanges?",
          answer: "Yes, we offer free size exchanges within 30 days of purchase. Simply start a return and select 'Exchange'."
        },
        {
          question: "What if an item is out of stock?",
          answer: "You can sign up for restock notifications on the product page. We'll email you when the item is back in stock."
        }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Help Center"
        description="Get help and support at VEXO's Help Center. Find answers to frequently asked questions, contact support, and learn about our services."
        keywords="help center, customer support, FAQ, VEXO support, customer service"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        tags={["help", "support", "FAQ", "customer service"]}
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
              <FaQuestionCircle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Help Center</h1>
              <p className="text-gray-600 stick-regular mt-2">
                Find answers to your questions and get support
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaSearch className="text-gray-400" size={20} />
              <h2 className="text-xl font-semibold stick-bold">Search Help Articles</h2>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help topics..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent stick-regular"
              />
              <button className="absolute right-2 top-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer stick-regular">
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Contact */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaPhone className="text-blue-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Call Us</h3>
            <p className="text-gray-600 stick-regular text-sm mb-3">Speak with our support team</p>
            <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800 stick-regular font-semibold">
              +1 (555) 123-4567
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaEnvelope className="text-green-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Email Us</h3>
            <p className="text-gray-600 stick-regular text-sm mb-3">Get help via email</p>
            <a href="mailto:support@vexo.com" className="text-green-600 hover:text-green-800 stick-regular font-semibold">
              support@vexo.com
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaComments className="text-purple-500 mx-auto mb-3" size={32} />
            <h3 className="font-semibold stick-bold mb-2">Live Chat</h3>
            <p className="text-gray-600 stick-regular text-sm mb-3">Chat with us instantly</p>
            <button className="text-purple-600 hover:text-purple-800 stick-regular font-semibold">
              Start Chat
            </button>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 stick-bold text-center mb-8">Frequently Asked Questions</h2>
          
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-2xl font-semibold stick-bold">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold stick-bold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-700 stick-regular">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help */}
        <motion.div variants={itemVariants} className="mt-12 bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-300 stick-regular mb-6">
            Can't find what you're looking for? Our support team is here to help you 24/7.
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
              Email Support
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default HelpCenter;
