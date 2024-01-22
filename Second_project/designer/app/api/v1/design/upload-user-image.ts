import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST') {
    return designController.uploadImage(req, res);
  }

  return res.status(405).end();
}