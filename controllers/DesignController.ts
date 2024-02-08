// import {Schema} from "mongoose";
import {NextApiRequest, NextApiResponse} from "next";

// const { formidable } = require('formidable');
import { formidable } from 'formidable';
// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary';

// const { mongo: { ObjectId } } = require('mongoose');

import config from '@/config/index';

import { PrismaClient } from '@prisma/client';
import {getSession} from "@/lib/auth";
import {NextRequest, NextResponse} from "next/server";
const prisma = new PrismaClient();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: config.pgconnection
});

class DesignController {
  createDesign = async (req: NextRequest, res: NextResponse) => {
    const session = await getSession();
    if (!session || !session?.user?.id) {
      return NextResponse.json(
          {
            code: "UNAUTHORIZED",
          },
          {
            status: 403,
          }
      );
    }

    const _id = session?.user?.id;

    try {
      cloudinary.config({
        cloud_name: config.cloudinary.cloudName,
        api_key: config.cloudinary.apiKey,
        api_secret: config.cloudinary.apiSecret
      })

      const data = await req.formData();

      const image = data.get('image')

      let componentsString = data.get('design');
      let components;
      try {
        components = JSON.parse(componentsString); // Parse string to JSON
      } catch (error) {
        console.error('invalid json')
        return res.status(400).json({ error: "Invalid JSON format for components." });
      }

      try {

        const result = await cloudinary.uploader.upload(image, {
          use_filename: true,
          folder: "buildit",
          unique_filename: false, // Set to true if you want Cloudinary to append random characters for uniqueness
        });

        const url = result?.secure_url || "";

        const design = await prisma.design.create({
          data: {
            userId: _id,
            components: [components],
            imageUrl: url
          }
        });

        return {
          status: 'success',
          data: {
            design
          }
        }

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

  updateDesign = async (req: NextRequest, res: NextResponse, params) => {
    const form = formidable({});
    const { params: { design_id } }  = params; // Assuming design_id is a query parameter

    try {
      cloudinary.config({
        cloud_name: config.cloudinary.cloudName,
        api_key: config.cloudinary.apiKey,
        api_secret: config.cloudinary.apiSecret
      });

      const data = await req.formData();

      const image = data.get('image')
      const components = JSON.parse(<string>data.get('design'))

      const oldDesign = await prisma.design.findUnique({
        where: { id: design_id }
      });

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

      try {
        const result = await cloudinary.uploader.upload(image);
        const url = result?.secure_url || "";

        await prisma.design.update({
          where: { id: design_id },
          data: {
            components: components?.design,
            imageUrl: url
          }
        });

        return {
          status: 'success',
          data: {
            message: 'Design updated successfully'
          }
        }
      } catch(e) {
        console.error('error while uploading');
        console.error(e);
      }
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        status: 'fail',
        message: 'Error updating design'
      });
    }
  }

  getUserDesign = async (req: Request, res: Response, params) => {
    const design_id = params?.params?.design_id;

    try {
      const design = await prisma.design.findUnique({
        where: { id: design_id },
        include: { user: true }
      });

      if (!design) {
        return res.status(400).json({
          status: 'fail',
          message: 'Design not found'
        });
      }

      return {
        status: 'success',
        data: {
          design: design?.components
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting design'
      });
    }
  }

  getInitialImages = async (req: NextRequest, res: NextResponse) => {
    try {
      // const images = await DesignImage.find({});
      const images = await prisma.designImage.findMany({});

      return {
        status: 'success',
        data: {
          images
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting images'
      });
    }
  }

  getBackgroundImages = async (req: NextRequest, res: NextResponse) => {
    try {
      // const images = await BackgroundImage.find({});
      const images = await prisma.backgroundImage.findMany({});

      return {
        status: 'success',
        data: {
          images
        }
      }
      // return res.status(200).json({
      //   status: 'success',
      //   data: {
      //     images
      //   }
      // });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting images'
      });
    }
  }

  //a user can upload an image to use in their design
  uploadImage = async (req: NextRequest, res: NextResponse) => {
    const session = await getSession();
    if (!session || !session?.user?.id) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
        },
        {
          status: 403,
        }
      );
    }

    const _id = session?.user?.id;
    // const { _id } = req.userInfo;

    const data = await req.formData();
    cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret
    });

    try {
      // const [_, files] = await form.parse(req);
      // const { image } = files;
      // const { url } = await cloudinary.uploader.upload(image[0].filepath);
      // const userImage = await UserImage.create({
      //   user: _id,
      //   imageUrl: url
      // });


      const image = data.get('image')
      let url = '';
      try {
        const result = await cloudinary.uploader.upload(image,
          {
            use_filename: true,
            folder: "buildit",
            unique_filename: false, // Set to true if you want Cloudinary to append random characters for uniqueness
          });
        url = result?.secure_url || "";
      } catch(e) {
        console.error('error while uploading');
        console.error(e);
      }


      const userImage = await prisma.userImage.create({
        data: {
          user: { connect: { id: _id } },
          imageUrl: url
        }
      });

      return {
        status: 'success',
        data: {
          image: userImage
        }
      }

      // return res.status(201).json({
      //   status: 'success',
      //   data: {
      //     image: userImage
      //   }
      // });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error uploading image'
      });
    }
  }

  getUserImages = async (req: NextRequest, res: NextResponse) => {
    const session = await getSession();
    if (!session || !session?.user?.id) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
        },
        {
          status: 403,
        }
      );
    }

    const _id = session?.user?.id;
    // const { _id } = req.userInfo;

    try {
      // const images = await UserImage.find({ user: new ObjectId(_id) });
      const images = await prisma.userImage.findMany({
        where: {
          userId: _id
        }
      });

      return {
        status: 'success',
        data: {
          images
        }
      }
      // return res.status(200).json({
      //   status: 'success',
      //   data: {
      //     images
      //   }
      // });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting images'
      });
    }
  }

  getUserDesigns = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession();
    if (!session || !session?.user?.id) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
        },
        {
          status: 403,
        }
      );
    }

    const _id = session?.user?.id;
    // const { _id } = req.userInfo;

    try {
      // const designs = await Design.find({ user: new ObjectId(_id) }).sort({ createdAt: -1 });
      const designs = await prisma.design.findMany({
        where: {
          userId: _id
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // return NextResponse.json({
      //   status: 'success',
      //   data: {
      //     designs
      //   }
      //
      // }, { status: 200 });

      return {
        status: 'success',
        data: {
          designs
        }
      }
      // return res.status(200).json({
      //   status: 'success',
      //   data: {
      //     designs
      //   }
      // });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          status: 'fail',
          message: 'Error getting designs'
        },
        { status: 400 }
      );
      // return res.status(400).json({
      //   status: 'fail',
      //   message: 'Error getting designs'
      // });
    }
  }

  deleteUserImage = async (req: NextRequest, res: NextResponse, params) => {
    // const { design_id } = req.params;
    // const { design_id } = req.query; // Assuming design_id is passed as a query parameter
    const { params: { design_id } }  = params;

    try {
      // const design = await Design.findById(design_id);
      const design = await prisma.design.findUnique({
        where: { id: design_id }
      });

      if(!design) {
        return res.status(400).json({
          status: 'fail',
          message: 'Design not found'
        });
      }

      if(design?.imageUrl) {
        cloudinary.config({
          cloud_name: config.cloudinary.cloudName,
          api_key: config.cloudinary.apiKey,
          api_secret: config.cloudinary.apiSecret
        });

        const splitImage = design?.imageUrl.split('/');
        const imageFile = splitImage[splitImage.length - 1];
        const imageName = imageFile.split('.')[0];
        await cloudinary.uploader.destroy(imageName);
      }

      // await Design.findByIdAndDelete(design_id);
      await prisma.design.delete({
        where: { id: design_id }
      });

      // return res.status(200).json({
      //   status: 'success',
      //   message: 'Design deleted successfully'
      // });

      return {
        status: 'success',
        data: {
          message: 'Design deleted successfully'
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error deleting design'
      });
    }
  }

  getTemplates = async (req: NextResponse, res: NextResponse) => {
    try {
      // const templates = await Template.find({}).sort({ createdAt: -1 });
      const templates = await prisma.template.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return {
        status: 'success',
        data: {
          templates
        }
      }
      // return res.status(200).json({
      //   status: 'success',
      //   data: {
      //     templates
      //   }
      // });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting templates'
      });
    }
  }

  createDesignFromTemplate = async (req: NextResponse, res: NextResponse, params) => {
    // const { template_id } = req.params;
    // const { template_id } = req.query; // Assuming template_id is a query parameter
    const { params: { template_id } }  = params;
    // const { _id } = req.userInfo;
    const session = await getSession();
    if (!session || !session?.user?.id) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
        },
        {
          status: 403,
        }
      );
    }

    const _id = session?.user?.id;

    try {
      console.log('template_id', template_id)
      // const template = await Template.findById(template_id);
      const template = await prisma.template.findUnique({
        where: { id: template_id }
      });

      if (!template) {
        return {
          status: 'fail',
          message: 'Template not found'
        }
        // return res.status(404).json({
        //   status: 'fail',
        //   message: 'Template not found'
        // });
      }

      // const design = await Design.create({
      //   user: _id,
      //   components: template?.components,
      //   imageUrl: template?.imageUrl
      // });
      const design = await prisma.design.create({
        data: {
          userId: _id,
          components: template?.components,
          imageUrl: template?.imageUrl
        }
      });

      return {
        status: 'success',
        data: {
          design
        }
      }

      // return res.status(201).json({
      //   status: 'success',
      //   data: {
      //     design
      //   }
      // });
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        status: 'fail',
        message: 'Error adding template'
      });
    }
  }
}

export default new DesignController();