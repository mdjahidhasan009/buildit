import {NextApiRequest, NextApiResponse} from "next";

import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse){
//   if(req.method === 'POST') {
//     return designController.createDesign(req, res);
//   }
//
//   return res.status(405).end();
// }

export async function POST(req: NextRequest, params, res: NextResponse){
  const data = await designController.createDesign(req, res, params);
  return NextResponse.json(data, { status: 200 });
}