import { DefaultSession } from "next-auth";

// this process is known as module augmentation
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// this process is known as module augmentation
declare module "next/server" {
  interface NextRequest {
    userId?: string;
  }
}