import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";

export async function PUT (req: NextRequest, params, res: NextResponse){
    // const data = await designController.getUserDesign(req, res, params);
    return designController.updateDesign(req, res, params);
  // }
  //
  // return res.status(405).end();
}