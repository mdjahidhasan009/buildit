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
    const form = formidable();
    // const { _id } = req.userInfo;

    try {
      cloudinary.config({
        // cloud_name: config.default.cloudinary.cloudName,
        // api_key: config.default.cloudinary.apiKey,
        // api_secret: config.default.cloudinary.apiSecret

        cloud_name: config.cloudinary.cloudName,
        api_key: config.cloudinary.apiKey,
        api_secret: config.cloudinary.apiSecret
      })

      // const [fields, files] = await form.parse(req);
      // const { image } = files;

      const data = await req.formData();

      // const image = data.get('image')
      // const components = JSON.parse(<string>data.get('design'))

      let componentsString = data.get('design');
      let components;
      try {
        components = JSON.parse(componentsString); // Parse string to JSON
      } catch (error) {
        console.log('invalid json')
        return res.status(400).json({ error: "Invalid JSON format for components." });
      }

      try {
        // const result = await cloudinary.uploader.upload(image);
        const url =  "88888";
        // const { url } = await cloudinary.uploader.upload(image[0].filepath);
        // const design = await Design.create({
        //   user: _id,
        //   components: [JSON.parse(fields.design[0])],
        //   imageUrl: url
        // });

        console.log({
          data: {
            userId: _id,
            components,
            imageUrl: url
          }
        })
//         const insertDesignSQL = `
//   INSERT INTO Design (user_id, components, image_url)
//   VALUES ($1, $2, $3)
//   RETURNING *;  -- Returns the inserted row
// `;
//         const design = await pool.query(insertDesignSQL, [_id, {"Jahid": "iiiii"}, url]);

        const design = await prisma.design.create({
          data: {
            userId: _id,
            components:
              [components],
              // {
              //   key: "value",
              //   anotherKey: {
              //     subKey: "subValue"
              //   }
              // },
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

      // console.log("params");
      // console.log(params)
      // console.log('design_id', design_id);
      // const oldDesign = await Design.findById(design_id);
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

        // console.log({data: {
        //   components: [components],
        //     imageUrl: url
        // }})

        await prisma.design.update({
          where: { id: design_id },
          data: {
            components: components?.design,
            imageUrl: url
          }
        });
  
        return res.status(200).json({
          status: 'success',
          message: 'Design updated successfully'
        });
      } catch(e) {
        console.log('error while uploading');
        console.log(e);
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

    // const { design_id } = req.query; // Assuming design_id is a query parameter

    try {
      // const design = await Design.findById(design_id);
      const design = await prisma.design.findUnique({
        where: { id: design_id },
        include: { user: true } // Optional: include related user data if needed
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
      // return res.status(200).json({
      //   status: 'success',
      //   data: {
      //     design: design?.components
      //   }
      // });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Error getting design'
      });
    }
  }

  // getInitialImages = async (req: NextApiRequest, res: NextApiResponse) => {
  //   try {
  //     // const images = await DesignImage.find({});
  //     const images = await prisma.designImage.findMany({});
  //     return res.status(200).json({
  //       status: 'success',
  //       data: {
  //         images
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Error getting images'
  //     });
  //   }
  // }
  //
  // getBackgroundImages = async (req: NextApiRequest, res: NextApiResponse) => {
  //   try {
  //     // const images = await BackgroundImage.find({});
  //     const images = await prisma.backgroundImage.findMany({});
  //     return res.status(200).json({
  //       status: 'success',
  //       data: {
  //         images
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Error getting images'
  //     });
  //   }
  // }
  //
  // //a user can upload an image to use in their design
  // uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { _id } = req.userInfo;
  //
  //   const form = formidable({});
  //   cloudinary.config({
  //     cloud_name: config.default.cloudinary.cloudName,
  //     api_key: config.default.cloudinary.apiKey,
  //     api_secret: config.default.cloudinary.apiSecret
  //   });
  //
  //   try {
  //     const [_, files] = await form.parse(req);
  //     const { image } = files;
  //     const { url } = await cloudinary.uploader.upload(image[0].filepath);
  //     // const userImage = await UserImage.create({
  //     //   user: _id,
  //     //   imageUrl: url
  //     // });
  //     const userImage = await prisma.userImage.create({
  //       data: {
  //         user: { connect: { id: _id } },
  //         imageUrl: url
  //       }
  //     });
  //
  //     return res.status(201).json({
  //       status: 'success',
  //       data: {
  //         image: userImage
  //       }
  //     });
  //   } catch (error) {
  //
  //   }
  // }
  //
  // getUserImages = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const { _id } = req.userInfo;
  //
  //   try {
  //     // const images = await UserImage.find({ user: new ObjectId(_id) });
  //     const images = await prisma.userImage.findMany({
  //       where: {
  //         userId: _id
  //       }
  //     });
  //     return res.status(200).json({
  //       status: 'success',
  //       data: {
  //         images
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Error getting images'
  //     });
  //   }
  // }
  //
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

      return NextResponse.json({
        status: 'success',
        data: {
          designs
        }

      }, { status: 200 });
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

  // deleteUserImage = async (req: NextApiRequest, res: NextApiResponse) => {
  //   // const { design_id } = req.params;
  //   const { design_id } = req.query; // Assuming design_id is passed as a query parameter
  //
  //   try {
  //     // const design = await Design.findById(design_id);
  //     const design = await prisma.design.findUnique({
  //       where: { id: design_id }
  //     });
  //
  //     if(!design) {
  //       return res.status(400).json({
  //         status: 'fail',
  //         message: 'Design not found'
  //       });
  //     }
  //
  //     if(design?.imageUrl) {
  //       cloudinary.config({
  //         cloud_name: config.default.cloudinary.cloudName,
  //         api_key: config.default.cloudinary.apiKey,
  //         api_secret: config.default.cloudinary.apiSecret
  //       });
  //
  //       const splitImage = design?.imageUrl.split('/');
  //       const imageFile = splitImage[splitImage.length - 1];
  //       const imageName = imageFile.split('.')[0];
  //       await cloudinary.uploader.destroy(imageName);
  //     }
  //
  //     // await Design.findByIdAndDelete(design_id);
  //     await prisma.design.delete({
  //       where: { id: design_id }
  //     });
  //
  //     return res.status(200).json({
  //       status: 'success',
  //       message: 'Design deleted successfully'
  //     });
  //   } catch (error) {
  //     console.log('error', error);
  //     console.error(error);
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Error deleting design'
  //     });
  //   }
  // }
  //
  // getTemplates = async (req: NextApiRequest, res: NextApiResponse) => {
  //   try {
  //     // const templates = await Template.find({}).sort({ createdAt: -1 });
  //     const templates = await prisma.template.findMany({
  //       orderBy: {
  //         createdAt: 'desc'
  //       }
  //     });
  //
  //     return res.status(200).json({
  //       status: 'success',
  //       data: {
  //         templates
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Error getting templates'
  //     });
  //   }
  // }
  //
  // addUserTemplate = async (req: NextApiRequest, res: NextApiResponse) => {
  //   // const { template_id } = req.params;
  //   const { template_id } = req.query; // Assuming template_id is a query parameter
  //   const { _id } = req.userInfo;
  //
  //   try {
  //     // const template = await Template.findById(template_id);
  //     const template = await prisma.template.findUnique({
  //       where: { id: template_id }
  //     });
  //
  //     if (!template) {
  //       return res.status(404).json({
  //         status: 'fail',
  //         message: 'Template not found'
  //       });
  //     }
  //
  //     // const design = await Design.create({
  //     //   user: _id,
  //     //   components: template?.components,
  //     //   imageUrl: template?.imageUrl
  //     // });
  //     const design = await prisma.design.create({
  //       data: {
  //         userId: _id,
  //         components: template.components,
  //         imageUrl: template.imageUrl
  //       }
  //     });
  //
  //     return res.status(201).json({
  //       status: 'success',
  //       data: {
  //         design
  //       }
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     return res.status(400).json({
  //       status: 'fail',
  //       message: 'Error adding template'
  //     });
  //   }
  // }
}

export default new DesignController();