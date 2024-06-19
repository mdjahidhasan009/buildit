import { auth } from "@/auth";
import { Session } from "next-auth";

interface AuthResult {
  userId?: string;
  response?: Response;
}

export async function getUserId(): Promise<AuthResult> {
  const session : Session | null = await auth();
  const userId: string | undefined = session?.user?.id || "";

  if (!userId) {
    return {
      userId: userId,
      response: new Response(
        JSON.stringify({ message: "Authentication required" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ),
    };
  }

  return { userId };
}
