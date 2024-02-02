import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";
import {NextApiRequest, NextApiResponse} from "next";

export async function POST (req: NextRequest, params, res: NextResponse){
  const data = await designController.uploadImage(req, res, params);
  return NextResponse.json(data, { status: 200 });
}