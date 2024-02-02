import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest, params, res: NextResponse){
  // if(req.method === 'POST') {
    const data = await designController.addUserTemplate(req, res, params);
    return NextResponse.json(data, { status: 200 });
  // }
  //
  // return res.status(405).end();
}
