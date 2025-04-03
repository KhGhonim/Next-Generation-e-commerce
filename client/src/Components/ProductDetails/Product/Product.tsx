import { useState } from "react";
import { productImages } from "../../../Context/Context";
import Details from "./Details";
import Images from "./Images";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Megnifier from "./Megnifier";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSize = searchParams.get("size") || "";
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVibing, setIsVibing] = useState(false);
  const [IsFixed, setIsFixed] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const addToCart = () => {
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
      />

      <Megnifier
        setIsFixed={setIsFixed}
        IsFixed={IsFixed}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
}

export default Product;
