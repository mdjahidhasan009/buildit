import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaUserImageRepository} from "@/infrastructure/adapters/PrismaUserImageRepository";
import {UserImageUseCases} from "@/core/application/use-cases/UserImageUseCases";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getUserImages(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const userImageRepository = new PrismaUserImageRepository();
  const userImageUseCases = new UserImageUseCases(userImageRepository);

  try {
    const images = await userImageUseCases.getUserImages(userId);
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

export async function POST (req: NextRequest, params, res: NextResponse){
  const data = await designController.uploadImage(req, res, params);
  return NextResponse.json(data, { status: 200 });
}