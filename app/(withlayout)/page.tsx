import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import {authOptions} from "@/app/api/auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
}
