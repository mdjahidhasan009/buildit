// core/application/ports/IImageStorageService.ts

export interface IImageStorageService {
  /**
   * Uploads an image to a storage service.
   *
   * @param {string} base64Image - The base64 encoded image string.
   * @param {object} options - Options for the upload, such as folder and whether to use a unique filename.
   * @returns {Promise<string>} - The URL of the uploaded image.
   */
  uploadImage(base64Image: string, options?: { folder?: string; uniqueFilename?: boolean }): Promise<string>;

  /**
   * Deletes an image from the storage service.
   *
   * @param {string} publicId - The public ID of the image to delete.
   * @returns {Promise<void>}
   */
  deleteImage(publicId: string): Promise<void>;
}
