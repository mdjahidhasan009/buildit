import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
  const data = await designController.getUserImages(req, res);
  return NextResponse.json(data, { status: 200 });
}

export async function POST (req: NextRequest, params, res: NextResponse){
  const data = await designController.uploadImage(req, res, params);
  return NextResponse.json(data, { status: 200 });
}