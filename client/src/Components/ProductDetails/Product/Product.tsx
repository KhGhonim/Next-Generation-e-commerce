import { useState } from "react";
import { productImages } from "../../../Context/Context";
import Details from "./Details";
import Images from "./Images";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Megnifier from "./Megnifier";
import { useAppDispatch } from "../../../store/hooks";
import { addToCart as addToCartAction } from "../../../store/slices/cartSlice";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSize = searchParams.get("size") || "";
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVibing, setIsVibing] = useState(false);
  const [IsFixed, setIsFixed] = useState(false);
  const dispatch = useAppDispatch();

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
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    dispatch(addToCartAction({
      id: "product-1", // This should come from the actual product data
      name: "Ridley High Waist",
      price: 36.00,
      quantity: quantity,
      image: productImages[0],
      size: selectedSize,
    }));
    
    setIsVibing(true);
    toast.success("Added to cart!");
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
