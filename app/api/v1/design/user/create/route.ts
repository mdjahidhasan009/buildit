import {NextRequest, NextResponse} from "next/server";
import {postHandler} from "@/utils/requestHandlerFactory";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";

export async function POST(req: NextRequest, params, res: NextResponse){

  const [_, userId, earlyAbortRequest] = await postHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const data = await req.formData();
  const base64Image = data.get('image')
  let componentsString = data.get('design') || "";
  let components;
  try {
    if (componentsString) {
      if (componentsString) {
        components = JSON.parse(componentsString);
      }
    }
  } catch (error) {
    console.error('Invalid Json', error);
    return NextResponse.json({ message: "Image must be a base64 string" }, { status: 400 });
  }


  const designRepository = new PrismaDesignRepository();
  const templateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository, cloudinaryService);

  const createdDesign = await designUseCases.createDesign(userId, components, base64Image as string);
  return NextResponse.json({ message: createdDesign }, { status: 201 });
}