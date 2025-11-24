import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaImages, FaPhotoVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageUploader from "./Components/ImageUploader/ImageUploader";
import ProductPhotosGrid from "./Components/ProductPhotosGrid";

const PRODUCT_PHOTOS_STORAGE_KEY = "vexo_product_photos";

function ProductPhotos() {
  const [photos, setPhotos] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(PRODUCT_PHOTOS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load stored product photos:", error);
      return [];
    }
  });

  const stats = useMemo(
    () => [
      {
        label: "Total Media",
        value: photos.length,
        description: "Uploaded files ready for use",
      },
      {
        label: "Storage Status",
        value: photos.length > 0 ? "Active" : "Awaiting uploads",
        description: "Keep a library of product visuals",
      },
    ],
    [photos.length]
  );

  const handlePhotosChange = (urls: string[]) => {
    setPhotos(urls);
  };

  const handleRemovePhoto = (url: string) => {
    setPhotos((prev) => prev.filter((photo) => photo !== url));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(PRODUCT_PHOTOS_STORAGE_KEY, JSON.stringify(photos));
      window.dispatchEvent(new Event("productPhotosUpdated"));
    } catch (error) {
      console.error("Failed to persist product photos:", error);
    }
  }, [photos]);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            <FaPhotoVideo className="text-base" />
            Product Media
          </p>
          <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent">
            Product Photos Library
          </h1>
          <p className="mt-2 text-sm text-zinc-600 max-w-2xl">
            Upload and manage high-quality visuals for your storefront. You can
            add multiple images at once, then reuse them while creating new
            products.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Link
            to="/dashboard/products"
            className="flex-1"
            aria-label="Go back to products page"
          >
            <motion.button
              className="w-full px-6 py-3 border border-zinc-300 text-zinc-800 rounded-lg cursor-pointer outline-none bg-white hover:bg-zinc-50 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Manage Products
            </motion.button>
          </Link>
          <Link
            to="#uploader"
            className="flex-1"
            aria-label="Jump to uploader section"
          >
            <motion.button
              className="w-full px-6 py-3 bg-gradient-to-r from-black to-zinc-800 text-white rounded-lg cursor-pointer outline-none shadow-lg hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaImages />
              Upload Photos
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-200 bg-white/80 px-6 py-5 shadow-sm"
          >
            <p className="text-xs uppercase text-zinc-500 tracking-wide">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">{stat.value}</p>
            <p className="text-sm text-zinc-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Uploader */}
      <section id="uploader">
        <ImageUploader
          label="Upload product media"
          folder="product-photos"
          multiple
          values={photos}
          onChange={handlePhotosChange}
          emptyMessage="Add multiple images to build your product media gallery."
        />
      </section>

      {/* Gallery */}
      <ProductPhotosGrid photos={photos} onRemove={handleRemovePhoto} />
    </div>
  );
}

export default ProductPhotos;


