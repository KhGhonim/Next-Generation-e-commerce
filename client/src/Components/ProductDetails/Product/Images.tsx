import SmallImages from "./SmallImages";
import BigImage from "./BigImage";
import { ImagesProps } from "../../../Types/ProjectTypes";

function Images({
  handleNextImage,
  handlePrevImage,
  currentImageIndex,
  setCurrentImageIndex,
  setIsFixed,
}: ImagesProps) {
  return (
    <div className="relative">
      <BigImage
        currentImageIndex={currentImageIndex}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
        setIsFixed={setIsFixed}
      />
      <SmallImages
        setCurrentImageIndex={setCurrentImageIndex}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
}

export default Images;
