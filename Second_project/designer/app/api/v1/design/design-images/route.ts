import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
  // if(req.method === 'GET') {
  const data = await designController.getInitialImages(req, res);
  console.log(data, 'data')
  return NextResponse.json(data, { status: 200 });
}

  // return res.status(405).end();
// }