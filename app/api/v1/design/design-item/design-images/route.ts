import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaDesignImageRepository} from "@/infrastructure/adapters/PrismaDesignImageRepository";
import {DesignImageUseCases} from "@/core/application/use-cases/DesignImageUseCases";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getInitialImages(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const designImageRepository = new PrismaDesignImageRepository();
  const designUseCases = new DesignImageUseCases(designImageRepository);

  try {
    const images = await designUseCases.getDesignImages();
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