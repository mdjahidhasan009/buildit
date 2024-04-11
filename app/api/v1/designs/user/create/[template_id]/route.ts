import { NextRequest, NextResponse } from "next/server";

import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";

export async function POST(req: NextRequest, params : { params: { template_id: string } }, res: NextResponse){const [ _, userId, earlyAbortRequest ] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest) return earlyAbortRequest;
  if(!userId) return new Response(JSON.stringify({ message: "Authentication required" }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  const { params: { template_id } }  = params;
  if(!template_id) return new Response(JSON.stringify({ message: "Template id is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  const templateRepository = new PrismaTemplateRepository();
  const designRepository = new PrismaDesignRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository , cloudinaryService);

  try {
    const createdDesign = await designUseCases.createDesignFromTemplateForUser(userId, template_id);
    return new Response(JSON.stringify({ status: 'success', data: { design: createdDesign } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({
    //   status: 'success',
    //   data: {
    //     designs: createdDesign
    //   }
    // }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}