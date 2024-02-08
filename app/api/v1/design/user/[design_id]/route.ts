import { NextRequest, NextResponse } from "next/server";

import designController from "@/controllers/DesignController";

export async function GET(req: NextRequest, params, res: NextResponse){
  const data = await designController.getUserDesign(req, res, params);
  return NextResponse.json(data, { status: 200 });
}

export async function PUT (req: NextRequest, params, res: NextResponse){
  const data = await designController.updateDesign(req, res, params);
  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(req: NextRequest, params, res: NextResponse){
  const data = await designController.deleteUserImage(req, res, params);
  return NextResponse.json(data, { status: 200 });
}