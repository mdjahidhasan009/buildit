import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function PUT (req: NextRequest, params, res: NextResponse){
    // const data = await designController.getUserDesign(req, res, params);
    const data = await designController.updateDesign(req, res, params);
    return NextResponse.json(data, { status: 200 });
  // }
  //
  // return res.status(405).end();
}