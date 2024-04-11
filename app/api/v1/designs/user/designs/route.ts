import {NextRequest} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";

export async function GET(req: NextRequest){
  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest) return earlyAbortRequest;
  if(!userId) return new Response(JSON.stringify({ message: "Authentication required" }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  const prismaDesignRepository = new PrismaDesignRepository();
  const prismaTemplateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(prismaDesignRepository, prismaTemplateRepository, cloudinaryService);

  try {
    const designs = await designUseCases.getUserDesigns(userId);
    return new Response(JSON.stringify({ status: 'success', data: { designs } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json(
    //   {
    //     status: 'success',
    //     data: {
    //         designs
    //     }
    //   }, { status: 200 }
    // );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}