const { Request, Response } = require('express');
const { formidable } = require('formidable');
const cloudinary = require('cloudinary').v2;

const Design = require('../models/designModal');
const config = require('../src/config/index');

class DesignController {
  createDesign = async (req: Request, res: Response) => {
    const form = formidable();
    const { _id } = req.userInfo;

    try {
      cloudinary.config({
        cloud_name: config.default.cloudinary.cloudName,
        api_key: config.default.cloudinary.apiKey,
        api_secret: config.default.cloudinary.apiSecret
      })

      const [fields, files] = await form.parse(req);
      const { image } = files;

      try {
        const { url } = await cloudinary.uploader.upload(image[0].filepath);
        const design = await Design.create({
          user: _id,
          components: [JSON.parse(fields.design[0])],
          imageUrl: url
        });

        res.status(201).json({
          status: 'success',
          data: {
            design
          }
        });

      } catch(e) {
        console.error(e);
        return res.status(400).json({
          status: 'fail',
          message: 'Error uploading image'
        });
      }

    } catch (error) {
      console.error(error);
        return res.status(400).json({
            status: 'fail',
            message: 'Error creating design'
        });
    }
  }

  updateDesign = async (req: Request, res: Response) => {
    const form = formidable({});
    const { design_id } = req.params;

    try {
      cloudinary.config({
        cloud_name: config.default.cloudinary.cloudName,
        api_key: config.default.cloudinary.apiKey,
        api_secret: config.default.cloudinary.apiSecret
      });
      const [fields, files] = await form.parse(req);
      const { image } = files;
      const components = JSON.parse(fields.design[0])?.design;

      const oldDesign = await Design.findById(design_id);
      if(!oldDesign) {
        return res.status(400).json({
          status: 'fail',
          message: 'Design not found'
        });
      }

      if(oldDesign?.imageUrl) {
        const splitImage = oldDesign?.imageUrl.split('/');
        const imageFile = splitImage[splitImage.length - 1];
        const imageName = imageFile.split('.')[0];
        await cloudinary.uploader.destroy(imageName);
      }

      const { url } = await cloudinary.uploader.upload(image[0].filepath);
      await Design.findByIdAndUpdate(design_id, {
        components,
        imageUrl: url
      });
      return res.status(200).json({
        status: 'success',
        message: 'Design updated successfully'
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
          status: 'fail',
          message: 'Error updating design'
      });
    }
  }

  getUserDesign = async (req: Request, res: Response) => {
    const { design_id } = req.params;
    try {
      const design = await Design.findById(design_id);

      if (!design) {
          return res.status(400).json({
          status: 'fail',
          message: 'Design not found'
          });
      }

      return res.status(200).json({
          status: 'success',
          data: {
              design: design?.components
          }
      });
    } catch (error) {
      console.error(error);
        return res.status(400).json({
            status: 'fail',
            message: 'Error getting design'
        });
    }
  }
}

module.exports = new DesignController();