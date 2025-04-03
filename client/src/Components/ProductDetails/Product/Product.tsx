import { useState } from "react";
import { productImages } from "../../../Context/Context";
import Details from "./Details";
import Images from "./Images";

function Product() {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVibing, setIsVibing] = useState(false);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Images */}
      <Images
        handleNextImage={handleNextImage}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        handlePrevImage={handlePrevImage}
      />

      {/* Product Details */}
      <Details
        isVibing={isVibing}
        addToCart={addToCart}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
    </div>
  );
}

export default Product;
