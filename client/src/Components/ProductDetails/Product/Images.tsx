import SmallImages from "./SmallImages";
import BigImage from "./BigImage";
import { ImagesProps } from "../../../Types/ProjectTypes";

interface ProductImagesProps extends ImagesProps {
  images: string[];
  title: string;
}

function Images({
  handleNextImage,
  handlePrevImage,
  currentImageIndex,
  setCurrentImageIndex,
  setIsFixed,
  images,
  title,
}: ProductImagesProps) {
  return (
    <div className="relative">
      <BigImage
        currentImageIndex={currentImageIndex}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
        setIsFixed={setIsFixed}
        images={images}
        title={title}
      />
      <SmallImages
        setCurrentImageIndex={setCurrentImageIndex}
        currentImageIndex={currentImageIndex}
        images={images}
        title={title}
      />
    </div>
  );
}

export default Images;
