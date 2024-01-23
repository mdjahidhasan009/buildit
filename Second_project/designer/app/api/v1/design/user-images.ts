import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET') {
    return designController.getUserImages(req, res);
  }

  return res.status(405).end();
}