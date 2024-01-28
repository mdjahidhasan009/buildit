import { NextRequest, NextResponse } from "next/server";

import designController from "@/controllers/DesignController";

export async function GET(req: NextRequest, params, res: NextResponse){
  const data = await designController.getUserDesign(req, res, params);
  return NextResponse.json(data, { status: 200 });
}