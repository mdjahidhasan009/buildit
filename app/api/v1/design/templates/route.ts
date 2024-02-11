import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {DesignImageUseCases} from "@/core/application/use-cases/DesignImageUseCases";
import {TemplateUseCases} from "@/core/application/use-cases/TemplateUseCases";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getTemplates(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const templateRepository = new PrismaTemplateRepository();
  const templateUseCases = new TemplateUseCases(templateRepository);

  try {
    const templates = await templateUseCases.getAllTemplates();
    return NextResponse.json(
      {
        status: 'success',
        data: {
            templates
        }
      }, { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}