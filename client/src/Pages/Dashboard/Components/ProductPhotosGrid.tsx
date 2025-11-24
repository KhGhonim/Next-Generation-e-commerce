import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

interface ProductPhotosGridProps {
  photos: string[];
  onRemove?: (url: string) => void;
  selectable?: boolean;
  selectedPhotos?: string[];
  onToggleSelect?: (url: string) => void;
}

function ProductPhotosGrid({
  photos,
  onRemove,
  selectable = false,
  selectedPhotos = [],
  onToggleSelect,
}: ProductPhotosGridProps) {
  if (photos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-white to-zinc-50 rounded-2xl border border-dashed border-zinc-200"
      >
        <p className="text-lg font-semibold text-zinc-700 mb-2">
          No photos uploaded yet
        </p>
        <p className="text-sm text-zinc-500">
          Start by uploading images using the uploader above.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase text-zinc-500 tracking-wide">
            Gallery
          </p>
          <p className="text-xl font-semibold text-zinc-900">
            {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo, index) => {
          const isSelected = selectedPhotos.includes(photo);
          return (
            <motion.div
              key={photo}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative rounded-2xl overflow-hidden border shadow-sm ${
                selectable && isSelected
                  ? "border-black bg-zinc-100"
                  : "border-zinc-200 bg-zinc-100"
              }`}
            >
              <img
                src={photo}
                alt={`Product photo ${index + 1}`}
                loading="lazy"
                className="w-full h-60 object-cover"
              />
              {onRemove && (
                <motion.button
                  type="button"
                  onClick={() => onRemove(photo)}
                  className="absolute top-3 right-3 bg-white/95 text-red-600 px-3 py-1 rounded-lg cursor-pointer outline-none shadow flex items-center gap-2 text-xs font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Remove photo"
                >
                  <FaTrashAlt />
                  Remove
                </motion.button>
              )}
              {selectable && onToggleSelect && (
                <motion.button
                  type="button"
                  onClick={() => onToggleSelect(photo)}
                  className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer outline-none shadow ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-white/90 text-zinc-700 hover:bg-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isSelected ? "Deselect photo" : "Select photo"}
                >
                  {isSelected ? "Selected" : "Select"}
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductPhotosGrid;


