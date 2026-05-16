import axios from 'axios';

const IMGBB_API_KEY = '7a5c3a7dddd676591dd0c82c4178df30';

/**
 * Uploads an image file to imgBB and returns the URL.
 * @param {File} file The image file to upload.
 * @returns {Promise<string>} The URL of the uploaded image.
 */
export const uploadImage = async (file) => {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
    if (response.data.success) {
      return response.data.data.url;
    } else {
      throw new Error('imgBB upload failed');
    }
  } catch (error) {
    console.error('Error uploading image to imgBB:', error);
    throw error;
  }
};
