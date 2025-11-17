import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebook, 
  FaYoutube, 
  FaTiktok,
  FaDiscord,
  FaSnapchat,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaAward
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

function Footer() {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-black text-white Footer">
      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/VEXO.svg" alt="VEXO" className="h-32 w-auto" />
              </Link>
              <p className="text-gray-400 stick-regular mt-4 text-sm leading-relaxed">
                The ultimate destination for Gen Z fashion. Express yourself with our curated collection of trendy, sustainable, and affordable clothing.
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold stick-bold text-gray-300">Follow Us</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-pink-500 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-black transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="TikTok"
                >
                  <FaTiktok size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-purple-500 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Discord"
                >
                  <FaDiscord size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Snapchat"
                >
                  <FaSnapchat size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold stick-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Shop All", href: "/shop" },
                { name: "New Arrivals", href: "/shop?category=new" },
                { name: "Best Sellers", href: "/shop?category=bestsellers" },
                { name: "Sale", href: "/shop?category=sale" },
                { name: "Trending", href: "/shop?category=trending" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors stick-regular text-sm cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold stick-bold mb-6">Categories</h4>
            <ul className="space-y-3">
              {[
                { name: "Men's Fashion", href: "/shop?category=men" },
                { name: "Women's Fashion", href: "/shop?category=women" },
                { name: "Accessories", href: "/shop?category=accessories" },
                { name: "Shoes", href: "/shop?category=shoes" },
                { name: "Streetwear", href: "/shop?category=streetwear" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors stick-regular text-sm cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold stick-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center", href: "/help" },
                { name: "Size Guide", href: "/size-guide" },
                { name: "Shipping Info", href: "/shipping" },
                { name: "Returns", href: "/returns" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors stick-regular text-sm cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 text-sm stick-regular">
                <MdEmail size={16} />
                <span>support@vexo.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm stick-regular">
                <MdPhone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm stick-regular">
                <MdLocationOn size={16} />
                <span>New York, NY</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-800 p-3 rounded-full">
                <FaTruck className="text-green-400" size={20} />
              </div>
              <div>
                <h5 className="font-semibold stick-bold text-sm">Free Shipping</h5>
                <p className="text-gray-400 stick-regular text-xs">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-800 p-3 rounded-full">
                <FaShieldAlt className="text-blue-400" size={20} />
              </div>
              <div>
                <h5 className="font-semibold stick-bold text-sm">Secure Payment</h5>
                <p className="text-gray-400 stick-regular text-xs">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-800 p-3 rounded-full">
                <FaHeadset className="text-purple-400" size={20} />
              </div>
              <div>
                <h5 className="font-semibold stick-bold text-sm">24/7 Support</h5>
                <p className="text-gray-400 stick-regular text-xs">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-800 p-3 rounded-full">
                <FaAward className="text-yellow-400" size={20} />
              </div>
              <div>
                <h5 className="font-semibold stick-bold text-sm">Quality Guarantee</h5>
                <p className="text-gray-400 stick-regular text-xs">Premium quality items</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        variants={itemVariants}
        className="border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 stick-regular text-sm">
                © {currentYear} VEXO. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors stick-regular text-sm cursor-pointer"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors stick-regular text-sm cursor-pointer"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-white transition-colors stick-regular text-sm cursor-pointer"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 stick-regular text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500" size={14} />
              <span>by Khaled Ghonim</span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
