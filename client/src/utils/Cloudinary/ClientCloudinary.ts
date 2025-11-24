export interface CloudinaryUploadOptions {
  folder?: string;
  onProgress?: (progress: number) => void;
}

/**
 * Client-side upload to Cloudinary using unsigned uploads.
 * Requires env vars: VITE_APP_CLOUDINARY_CLOUD_NAME, VITE_APP_CLOUDINARY_UPLOAD_PRESET
 */
export async function uploadToCloudinary(
  file: File,
  options: CloudinaryUploadOptions = {}
): Promise<string> {
  const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Missing Cloudinary config. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  // Determine the resource type based on file type
  const getResourceType = (fileType: string): string => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    if (fileType.startsWith('audio/')) return 'video'; // Cloudinary handles audio as video
    // Use 'auto' for PDFs to let Cloudinary auto-detect and properly handle the format
    if (fileType === 'application/pdf') return 'auto';
    if (fileType.includes('document') || 
        fileType.includes('spreadsheet') || fileType.includes('presentation') ||
        fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) {
      return 'raw';
    }
    // Default to raw for other file types
    return 'raw';
  };

  const resourceType = getResourceType(file.type);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    // Create a new File object with preserved extension to ensure Cloudinary detects format correctly
    // This is especially important for PDF files
    let fileToUpload = file;
    if (file.type === 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      // If file doesn't have .pdf extension, create a new File with it
      fileToUpload = new File([file], `${file.name}.pdf`, { type: file.type });
    }
    
    formData.append("file", fileToUpload);
    formData.append("upload_preset", uploadPreset);
    if (options.folder) formData.append("folder", options.folder);
    
    // For PDF files, ensure the filename has .pdf extension for proper format detection
    // Using 'auto' resource_type will let Cloudinary properly detect and handle PDFs
    if (file.type === 'application/pdf') {
      // Ensure resource_type is auto (already set by getResourceType above)
      // Add context to preserve metadata
      formData.append("context", JSON.stringify({ alt: file.name }));
    }

    // Progress tracking
    if (options.onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          options.onProgress!(progress);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const result = JSON.parse(xhr.responseText);
          resolve(result.secure_url);
        } catch (error) {
          console.error('Invalid response from Cloudinary', error);
          reject(new Error('Invalid response from Cloudinary'));
        }
      } else {
        try {
          const result = JSON.parse(xhr.responseText);
          const message = result?.error?.message || "Cloudinary upload failed";
          reject(new Error(message));
        } catch (error) {
          console.error('Invalid response from Cloudinary', error);
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload was aborted'));
    });

    xhr.open('POST', url);
    xhr.send(formData);
  });
}

export async function uploadManyToCloudinary(
  files: (File | { name: string; size: number; type: string; url: string })[],
  options: CloudinaryUploadOptions = {}
): Promise<string[]> {
  const uploads = files.map((f) => {
    if (f instanceof File) {
      return uploadToCloudinary(f, options);
    } else {
      // For existing files, we can't determine the resource type, so we'll skip them
      // or handle them differently based on your needs
      return Promise.resolve(f.url || '');
    }
  });
  return Promise.all(uploads);
}


