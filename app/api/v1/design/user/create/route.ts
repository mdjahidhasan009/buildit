import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";

export async function POST(req: NextRequest, params, res: NextResponse){
  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const data = await req.formData();
  const base64Image = data.get('image')
  let componentsString: string | File = data.get('design') || "";

  const designRepository = new PrismaDesignRepository();
  const templateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository, cloudinaryService);

  try {
    const createdDesign = await designUseCases.createDesign(userId, componentsString, base64Image as string);
    return NextResponse.json({ message: createdDesign }, { status: 201 });
  } catch (error) {
    console.error(error);
    // Adjust error handling as needed
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}