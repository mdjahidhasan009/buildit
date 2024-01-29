import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";

export async function GET(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET') {
    return designController.getUserDesigns(req, res);
  }

  return res.status(405).end();
}