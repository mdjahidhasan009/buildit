// infrastructure/services/CloudinaryService.ts

import { v2 as cloudinary } from 'cloudinary';
import { IImageStorageService } from '@/core/application/ports/IImageStorageService';

export class CloudinaryService implements IImageStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Uploads an image to Cloudinary using a base64 encoded string.
   *
   * @param {string} base64Image - The base64 encoded image string.
   * @param {object} options - Options for the upload, such as folder.
   * @returns {Promise<string>} The URL of the uploaded image.
   */
  async uploadImage(base64Image: string, options: { folder?: string; uniqueFilename?: boolean } = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64Image,
        {
          folder: options.folder || "buildit",
          unique_filename: options.uniqueFilename || false,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject(error);
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );
    });
  }

  /**
   * Deletes an image from Cloudinary.
   *
   * @param {string} publicId - The public ID of the image to delete.
   */
  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, {}, (error, result) => {
        if (error) {
          console.error('Cloudinary Delete Error:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
