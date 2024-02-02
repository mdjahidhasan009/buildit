import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
  const data = await designController.getUserImages(req, res);
  return NextResponse.json(data, { status: 200 });
}