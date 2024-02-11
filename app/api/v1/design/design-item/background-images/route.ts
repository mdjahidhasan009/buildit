import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaBackgroundImageRepository} from "@/infrastructure/adapters/PrismaBackgroundImageRepository";
import {BackgroundImageUseCases} from "@/core/application/use-cases/BackgroundImageUseCases";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getBackgroundImages(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const backgroundImageRepository = new PrismaBackgroundImageRepository();
  const backgroundImageUseCases = new BackgroundImageUseCases(backgroundImageRepository);

  try {
    const images = await backgroundImageUseCases.getBackgroundImages();
    return NextResponse.json(
      {
        status: 'success',
        data: {
            images
        }
      }, { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}