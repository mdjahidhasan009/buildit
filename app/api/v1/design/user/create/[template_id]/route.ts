import { NextRequest, NextResponse } from "next/server";

import designController from "@/controllers/DesignController";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {TemplateUseCases} from "@/core/application/use-cases/TemplateUseCases";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";

export async function POST(req: NextRequest, params, res: NextResponse){
  // const data = await designController.createDesignFromTemplate(req, res, params);
  // return NextResponse.json(data, { status: 200 });

  const [ _, userId, earlyAbortRequest ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const { params: { template_id } }  = params;
  if(!template_id) return NextResponse.json({ message: "Template id is required" }, { status: 400 });

  const templateRepository = new PrismaTemplateRepository();
  const designRepository = new PrismaDesignRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository , cloudinaryService);

  try {
    const createdDesign = await designUseCases.createDesignFromTemplateForUser(userId, template_id);
    return NextResponse.json({
      status: 'success',
      data: {
        design: createdDesign
      }
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}