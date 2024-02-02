import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
  const data = await designController.getTemplates(req, res);
  return NextResponse.json(data, { status: 200 });
}