import { useMemo, useState } from "react";
import Details from "./Details";
import Images from "./Images";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Megnifier from "./Megnifier";
import type { Product as ProductType } from "../../../Pages/Dashboard/types";

interface ProductComponentProps {
  product: ProductType;
}

const defaultGallery = [
  "https://via.placeholder.com/800x1000.png?text=VEXO",
  "https://via.placeholder.com/800x1000.png?text=VEXO+2",
  "https://via.placeholder.com/800x1000.png?text=VEXO+3",
];

function normalizeImages(images?: string[]) {
  if (!images || images.length === 0) {
    return defaultGallery;
  }
  return images.filter(Boolean).length ? images : defaultGallery;
}

function Product({ product }: ProductComponentProps) {
  const gallery = useMemo(() => normalizeImages(product.images), [product.images]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSize = searchParams.get("size") || "";
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVibing, setIsVibing] = useState(false);
  const [IsFixed, setIsFixed] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  const addToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    setIsVibing(true);
    setTimeout(() => setIsVibing(false), 3000);
  };

  const handleSizeChange = (size: string) => {
    setSearchParams({ size });
  };

  const HandleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
      {/* Product Images */}
      <Images
        handleNextImage={handleNextImage}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        handlePrevImage={handlePrevImage}
        setIsFixed={setIsFixed}
        images={gallery}
        title={product.name}
      />

      {/* Product Details */}
      <Details
        isVibing={isVibing}
        addToCart={addToCart}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
        HandleCopyToClipboard={HandleCopyToClipboard}
        product={product}
        gallery={gallery}
      />

      <Megnifier
        setIsFixed={setIsFixed}
        IsFixed={IsFixed}
        currentImageIndex={currentImageIndex}
        images={gallery}
      />
    </div>
  );
}

export default Product;
