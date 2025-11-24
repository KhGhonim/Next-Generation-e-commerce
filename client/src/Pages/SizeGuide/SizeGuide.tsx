import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaRuler, FaTshirt, FaFemale, FaChild, FaShoePrints } from "react-icons/fa";
import SEO from "../../Components/SEO/SEO";
import { useEffect } from "react";

function SizeGuide() {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://vexo.com";
  // On first amount make sure it scroll smoothly to the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
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

  const sizeCharts = [
    {
      category: "Men's Tops",
      icon: <FaTshirt className="text-blue-500" size={24} />,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      measurements: [
        { label: "Chest (inches)", values: [32, 34, 36, 38, 40, 42] },
        { label: "Waist (inches)", values: [28, 30, 32, 34, 36, 38] },
        { label: "Length (inches)", values: [26, 27, 28, 29, 30, 31] }
      ]
    },
    {
      category: "Men's Bottoms",
      icon: <FaTshirt className="text-green-500" size={24} />,
      sizes: ["28", "30", "32", "34", "36", "38"],
      measurements: [
        { label: "Waist (inches)", values: [28, 30, 32, 34, 36, 38] },
        { label: "Inseam (inches)", values: [30, 30, 32, 32, 34, 34] },
        { label: "Hip (inches)", values: [36, 38, 40, 42, 44, 46] }
      ]
    },
    {
      category: "Women's Tops",
      icon: <FaFemale className="text-pink-500" size={24} />,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      measurements: [
        { label: "Bust (inches)", values: [32, 34, 36, 38, 40, 42] },
        { label: "Waist (inches)", values: [24, 26, 28, 30, 32, 34] },
        { label: "Hip (inches)", values: [34, 36, 38, 40, 42, 44] }
      ]
    },
    {
      category: "Women's Bottoms",
      icon: <FaFemale className="text-purple-500" size={24} />,
      sizes: ["0", "2", "4", "6", "8", "10"],
      measurements: [
        { label: "Waist (inches)", values: [24, 25, 26, 27, 28, 29] },
        { label: "Hip (inches)", values: [34, 35, 36, 37, 38, 39] },
        { label: "Inseam (inches)", values: [28, 28, 29, 29, 30, 30] }
      ]
    },
    {
      category: "Kids Clothing",
      icon: <FaChild className="text-yellow-500" size={24} />,
      sizes: ["2T", "3T", "4T", "5T", "6", "7"],
      measurements: [
        { label: "Chest (inches)", values: [20, 21, 22, 23, 24, 25] },
        { label: "Waist (inches)", values: [19, 20, 21, 22, 23, 24] },
        { label: "Length (inches)", values: [16, 17, 18, 19, 20, 21] }
      ]
    },
    {
      category: "Shoes",
      icon: <FaShoePrints className="text-orange-500" size={24} />,
      sizes: ["6", "7", "8", "9", "10", "11"],
      measurements: [
        { label: "US Men's", values: ["6", "7", "8", "9", "10", "11"] },
        { label: "US Women's", values: ["7", "8", "9", "10", "11", "12"] },
        { label: "EU", values: ["39", "40", "41", "42", "43", "44"] }
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Size Guide"
        description="Find the perfect fit with VEXO's comprehensive size guide. Learn how to measure yourself and choose the right size for clothing, shoes, and accessories."
        keywords="size guide, sizing, measurements, clothing size, shoe size, VEXO sizes"
        url={`${baseUrl}${location.pathname}`}
        type="website"
        tags={["size guide", "sizing", "measurements"]}
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
              <FaRuler className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 stick-bold">Size Guide</h1>
              <p className="text-gray-600 stick-regular mt-2">
                Find the perfect fit for every item
              </p>
            </div>
          </div>
        </motion.div>

        {/* How to Measure */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold stick-bold mb-6 text-center">How to Measure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📏</span>
                </div>
                <h3 className="font-semibold stick-bold mb-2">Chest/Bust</h3>
                <p className="text-gray-600 stick-regular text-sm">
                  Measure around the fullest part of your chest, keeping the tape measure horizontal
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📐</span>
                </div>
                <h3 className="font-semibold stick-bold mb-2">Waist</h3>
                <p className="text-gray-600 stick-regular text-sm">
                  Measure around your natural waistline, usually the narrowest part of your torso
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold stick-bold mb-2">Hip</h3>
                <p className="text-gray-600 stick-regular text-sm">
                  Measure around the fullest part of your hips, about 7-9 inches below your waist
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📏</span>
                </div>
                <h3 className="font-semibold stick-bold mb-2">Inseam</h3>
                <p className="text-gray-600 stick-regular text-sm">
                  Measure from the crotch to the bottom of the ankle for pants length
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Size Charts */}
        <motion.div variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 stick-bold text-center mb-8">Size Charts</h2>
          
          {sizeCharts.map((chart, chartIndex) => (
            <motion.div
              key={chartIndex}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                {chart.icon}
                <h3 className="text-2xl font-semibold stick-bold">{chart.category}</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left stick-bold">Size</th>
                      {chart.sizes.map((size, sizeIndex) => (
                        <th key={sizeIndex} className="border border-gray-300 px-4 py-3 text-center stick-bold">
                          {size}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.measurements.map((measurement, measurementIndex) => (
                      <tr key={measurementIndex} className={measurementIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-4 py-3 stick-bold">{measurement.label}</td>
                        {measurement.values.map((value, valueIndex) => (
                          <td key={valueIndex} className="border border-gray-300 px-4 py-3 text-center stick-regular">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tips */}
        <motion.div variants={itemVariants} className="mt-12 bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold stick-bold mb-6">Size Guide Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold stick-bold mb-3">Getting the Right Fit</h3>
              <ul className="space-y-2 text-gray-300 stick-regular">
                <li>• Measure yourself wearing minimal clothing</li>
                <li>• Use a flexible measuring tape</li>
                <li>• Don't pull the tape too tight or too loose</li>
                <li>• Measure twice to ensure accuracy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold stick-bold mb-3">Still Unsure?</h3>
              <ul className="space-y-2 text-gray-300 stick-regular">
                <li>• Check customer reviews for fit notes</li>
                <li>• Contact our support team for advice</li>
                <li>• Order multiple sizes and return what doesn't fit</li>
                <li>• Free returns make trying different sizes easy</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants} className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="text-center">
            <h3 className="text-xl font-semibold stick-bold mb-3">Need Help Finding Your Size?</h3>
            <p className="text-gray-600 stick-regular mb-4">
              Our customer service team is here to help you find the perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/help"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer stick-regular"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@vexo.com"
                className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer stick-regular"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}

export default SizeGuide;
