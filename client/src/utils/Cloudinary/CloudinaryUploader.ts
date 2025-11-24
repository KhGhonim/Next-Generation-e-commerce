import { Readable } from 'stream'
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

// Helper function to determine resource type based on file extension
export const getResourceType = (filename: string): 'auto' | 'image' | 'video' | 'raw' => {
  const extension = filename.toLowerCase().split('.').pop();
  
  // Image files
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(extension || '')) {
    return 'image';
  }
  
  // Video files
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v'].includes(extension || '')) {
    return 'video';
  }
  
  // Audio files (Cloudinary handles as video)
  if (['mp3', 'wav', 'aac', 'ogg', 'flac', 'wma'].includes(extension || '')) {
    return 'video';
  }
  
  // PDF files - use auto to let Cloudinary properly detect and handle the format
  if (extension === 'pdf') {
    return 'auto';
  }
  
  // Other document files - use raw
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'].includes(extension || '')) {
    return 'raw';
  }
  
  // Archive files - use raw
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) {
    return 'raw';
  }
  
  // Default to auto for unknown types
  return 'auto';
};

export const uploadStream = async (buffer: Buffer, folder: string, resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto', filename?: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    // Determine if this is a PDF file
    const isPDF = filename && filename.toLowerCase().endsWith('.pdf');
    
    const uploadOptions: {
      folder: string;
      resource_type: 'auto' | 'image' | 'video' | 'raw';
      use_filename?: boolean;
      unique_filename?: boolean;
      context?: string;
    } = { 
      folder: folder,
      resource_type: resourceType
    };

    // For PDF files, preserve filename to maintain format detection
    // Using 'auto' resource_type will let Cloudinary properly detect PDF format
    if (isPDF) {
      uploadOptions.use_filename = true;
      uploadOptions.unique_filename = true;
      
      if (filename) {
        uploadOptions.context = JSON.stringify({ alt: filename });
      }
    } else if (resourceType === 'raw') {
      // For other raw files, preserve filename
      uploadOptions.use_filename = true;
      uploadOptions.unique_filename = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions, 
      (error, result) => {
        if (error) return reject(error);
        resolve(result as CloudinaryUploadResult);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};