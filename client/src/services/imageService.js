// Image upload service for Cloudinary
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'amazon-clone');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your-cloud-name'}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
};

// Multiple image upload
export const uploadMultipleImages = async (files) => {
  try {
    const uploadPromises = Array.from(files).map(file => uploadImage(file));
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  } catch (error) {
    console.error('Multiple image upload error:', error);
    throw error;
  }
};

// Image optimization helper
export const optimizeImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width = 'auto',
    height = 'auto',
    quality = 'auto',
    format = 'auto'
  } = options;

  const baseUrl = url.split('/upload/')[0];
  const imagePath = url.split('/upload/')[1];
  
  return `${baseUrl}/upload/w_${width},h_${height},q_${quality},f_${format}/${imagePath}`;
};

export default {
  uploadImage,
  uploadMultipleImages,
  optimizeImageUrl
};
