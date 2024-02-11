import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";

export async function GET(req: NextApiRequest, res: NextApiResponse){
    // const data = await designController.getUserDesigns(req, res);
    // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const prismaDesignRepository = new PrismaDesignRepository();
  const prismaTemplateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(prismaDesignRepository, prismaTemplateRepository, cloudinaryService);

  try {
    const designs = await designUseCases.getUserDesigns(userId);
    return NextResponse.json(
      {
        status: 'success',
        data: {
            designs
        }
      }, { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}