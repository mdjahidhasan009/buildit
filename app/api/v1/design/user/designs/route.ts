import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextResponse} from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET') {
    const data = await designController.getUserDesigns(req, res);
    return NextResponse.json(data, { status: 200 });
  }

  return res.status(405).end();
}