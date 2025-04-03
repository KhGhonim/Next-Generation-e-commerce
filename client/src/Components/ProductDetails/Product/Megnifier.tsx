import { useEffect, useRef, useState } from "react";
import { MegnifierProps } from "../../../Types/ProjectTypes";
import { productImages } from "../../../Context/Context";

function Megnifier({ IsFixed, setIsFixed, currentImageIndex }: MegnifierProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleCloseOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseOutside);

    return () => {
      document.removeEventListener("mousedown", handleCloseOutside);
    };
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0, visible: false });
  const imgRef = useRef<HTMLImageElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (imgRef.current) {
      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      setPosition({ x, y, visible: true });
    }
  };

  const handleMouseLeave = () => {
    setPosition((prev) => ({ ...prev, visible: false }));
  };
  return (
    <>
      <div
        className={`${
          IsFixed
            ? "fixed inset-0 z-50 bg-black opacity-50 flex items-center justify-center"
            : ""
        }`}
      ></div>

      {IsFixed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="w-96  lg:w-[30rem] h-[34rem] lg:h-[40rem] z-50"
            ref={ref}
          >
            <img
              ref={imgRef}
              loading="lazy"
              className="w-full h-full object-cover rounded-4xl"
              src={productImages[currentImageIndex]}
              alt="Product"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {position.visible && (
            <div
              className="hidden lg:flex absolute top-1/2 left-1/5 transform -translate-x-1/2 -translate-y-1/2 w-96 h-[28rem] border-2 border-white bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url(${productImages[currentImageIndex]})`,
                backgroundSize: `${3 * 100}%`,
                backgroundPosition: `${position.x}% ${position.y}%`,
              }}
            ></div>
          )}
        </div>
      )}
    </>
  );
}

export default Megnifier;
