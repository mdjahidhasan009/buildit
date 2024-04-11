import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaBackgroundImageRepository} from "@/infrastructure/adapters/PrismaBackgroundImageRepository";
import {BackgroundImageUseCases} from "@/core/application/use-cases/BackgroundImageUseCases";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getBackgroundImages(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest) return earlyAbortRequest;

  if (!userId) {
    return new Response(JSON.stringify({ message: "Authentication required" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const backgroundImageRepository = new PrismaBackgroundImageRepository();
  const backgroundImageUseCases = new BackgroundImageUseCases(backgroundImageRepository);

  try {
    const images = await backgroundImageUseCases.getBackgroundImages();
    return new Response(JSON.stringify({ status: 'success', data: { images } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json(
    //   {
    //     status: 'success',
    //     data: {
    //         images
    //     }
    //   }, { status: 200 }
    // );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}