// import { authOptions } from "./authOptions";
// import NextAuth from "next-auth/next";
//
// const handler = NextAuth(authOptions);
//
// export { handler as GET, handler as POST };
import { handlers } from "@/auth"
export const { GET, POST } = handlers