import {Schema} from "mongoose";

const { Request, Response } = require('express');
const { formidable } = require('formidable');
const cloudinary = require('cloudinary').v2;
const { mongo: { ObjectId } } = require('mongoose');

const Design = require('../models/designModal');
const DesignImage = require('../models/designImageModal');
const BackgroundImage = require('../models/backgroundImageModal');
const UserImage = require('../models/userImageModel');
const Template = require('../models/templateModel');
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

  getInitialImages = async (req: Request, res: Response) => {
    try {
      const images = await DesignImage.find({});
      return res.status(200).json({
        status: 'success',
        data: {
          images
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting images'
      });
    }
  }

  getBackgroundImages = async (req: Request, res: Response) => {
    try {
      const images = await BackgroundImage.find({});
      return res.status(200).json({
        status: 'success',
        data: {
          images
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting images'
      });
    }
  }

  //a user can upload an image to use in their design
  uploadImage = async (req: Request, res: Response) => {
    const { _id } = req.userInfo;

    const form = formidable({});
    cloudinary.config({
      cloud_name: config.default.cloudinary.cloudName,
      api_key: config.default.cloudinary.apiKey,
      api_secret: config.default.cloudinary.apiSecret
    });

    try {
      const [_, files] = await form.parse(req);
      const { image } = files;
      const { url } = await cloudinary.uploader.upload(image[0].filepath);
      const userImage = await UserImage.create({
        user: _id,
        imageUrl: url
      });

      return res.status(201).json({
        status: 'success',
        data: {
          image: userImage
        }
      });
    } catch (error) {

    }
  }

  getUserImages = async (req: Request, res: Response) => {
    const { _id } = req.userInfo;

    try {
      const images = await UserImage.find({ user: new ObjectId(_id) });
      return res.status(200).json({
        status: 'success',
        data: {
          images
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting images'
      });
    }
  }

  getUserDesigns = async (req: Request, res: Response) => {
    const { _id } = req.userInfo;

    try {
      const designs = await Design.find({ user: new ObjectId(_id) }).sort({ createdAt: -1 });
      return res.status(200).json({
        status: 'success',
        data: {
          designs
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting designs'
      });
    }
  }

  deleteUserImage = async (req: Request, res: Response) => {
    const { design_id } = req.params;

    try {
      const design = await Design.findById(design_id);
      if(!design) {
        return res.status(400).json({
          status: 'fail',
          message: 'Design not found'
        });
      }

      if(design?.imageUrl) {
        cloudinary.config({
          cloud_name: config.default.cloudinary.cloudName,
          api_key: config.default.cloudinary.apiKey,
          api_secret: config.default.cloudinary.apiSecret
        });

        const splitImage = design?.imageUrl.split('/');
        const imageFile = splitImage[splitImage.length - 1];
        const imageName = imageFile.split('.')[0];
        await cloudinary.uploader.destroy(imageName);
      }

      await Design.findByIdAndDelete(design_id);

      return res.status(200).json({
        status: 'success',
        message: 'Design deleted successfully'
      });
    } catch (error) {
      console.log('error', error);
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error deleting design'
      });
    }
  }

  getTemplates = async (req: Request, res: Response) => {
    try {
      const templates = await Template.find({}).sort({ createdAt: -1 });
      return res.status(200).json({
        status: 'success',
        data: {
          templates
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting templates'
      });
    }
  }

  addUserTemplate = async (req: Request, res: Response) => {
    const { template_id } = req.params;
    const { _id } = req.userInfo;

    try {
      const template = await Template.findById(template_id);
      const design = await Design.create({
        user: _id,
        components: template?.components,
        imageUrl: template?.imageUrl
      });
      return res.status(201).json({
        status: 'success',
        data: {
          design
        }
      });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        status: 'fail',
        message: 'Error adding template'
      });
    }
  }
}

module.exports = new DesignController();