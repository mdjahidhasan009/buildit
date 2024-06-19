import { auth } from "@/auth";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth/next";
// import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
}
