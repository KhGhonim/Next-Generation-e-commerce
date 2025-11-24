import { useId, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../../../../utils/Cloudinary/ClientCloudinary";

interface ImageUploaderProps {
  label: string;
  values: string[];
  folder: string;
  multiple?: boolean;
  accept?: string;
  emptyMessage?: string;
  onChange: (urls: string[]) => void;
}

const defaultAccept = "image/*,video/*,application/pdf";

const getAssetKind = (url: string) => {
  const lower = url.toLowerCase();
  if (lower.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/)) {
    return "video";
  }
  if (lower.endsWith(".pdf")) {
    return "pdf";
  }
  return "image";
};

const sanitizeList = (items: string[], allowMultiple: boolean) => {
  if (!allowMultiple) {
    return items.slice(-1);
  }
  return items.filter((item, index, array) => item && array.indexOf(item) === index);
};

function ImageUploader({
  label,
  values,
  folder,
  multiple = false,
  accept = defaultAccept,
  emptyMessage = "Upload media files",
  onChange,
}: ImageUploaderProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls: string[] = [];

      for (let index = 0; index < selectedFiles.length; index += 1) {
        const file = selectedFiles[index];
        const url = await uploadToCloudinary(file, {
          folder,
          onProgress: (progress: number) => {
            const aggregate = multiple
              ? Math.round(((index + progress / 100) / selectedFiles.length) * 100)
              : progress;
            setUploadProgress(aggregate);
          },
        });
        uploadedUrls.push(url);
      }

      const merged = multiple ? [...values, ...uploadedUrls] : uploadedUrls;
      const sanitized = sanitizeList(merged, multiple);
      onChange(sanitized);
      toast.success(
        sanitized.length > 1 || multiple
          ? "Media uploaded successfully"
          : "Image uploaded successfully"
      );
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      const message = error instanceof Error ? error.message : "Failed to upload media";
      toast.error(message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      event.target.value = "";
    }
  };

  const handleRemove = (url: string) => {
    const remaining = values.filter((item) => item !== url);
    onChange(remaining);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-zinc-900">{label}</label>

      <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4">
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dotted border-zinc-300 bg-white/80 px-6 py-8 text-center text-sm text-zinc-600 cursor-pointer transition hover:bg-white"
        >
          <span className="font-semibold text-zinc-800">
            {multiple ? "Click to browse or drag files" : "Click to upload an image"}
          </span>
          <span className="text-xs text-zinc-500">
            Supports images, videos, and PDFs
          </span>
          <motion.span
            className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Select file(s)
          </motion.span>
        </label>
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleUpload}
          className="hidden"
        />

        {isUploading && (
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-black rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-zinc-600">
              {uploadProgress}%
            </span>
          </div>
        )}

        {values.length > 0 ? (
          <div
            className={`mt-4 grid gap-4 ${
              multiple ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {values.map((asset) => {
              const kind = getAssetKind(asset);
              return (
                <div
                  key={asset}
                  className="relative rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm overflow-hidden"
                >
                  {kind === "video" ? (
                    <video
                      src={asset}
                      controls
                      className="w-full h-48 object-cover bg-black"
                    />
                  ) : kind === "pdf" ? (
                    <div className="flex h-48 items-center justify-center bg-white text-sm font-semibold text-zinc-700">
                      PDF Document
                    </div>
                  ) : (
                    <img
                      src={asset}
                      alt="Uploaded media preview"
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <motion.button
                    type="button"
                    onClick={() => handleRemove(asset)}
                    className="absolute top-3 right-3 bg-white/90 text-zinc-800 px-3 py-1 text-xs font-semibold rounded-lg cursor-pointer outline-none shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Remove media"
                  >
                    Remove
                  </motion.button>
                </div>
              );
            })}
          </div>
        ) : (
          !isUploading && (
            <p className="mt-4 text-sm text-zinc-500 text-center">{emptyMessage}</p>
          )
        )}
      </div>
    </div>
  );
}

export default ImageUploader;


