// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession }  from "next-auth/next";
// import {authOptions} from "@/app/api/auth/authOptions";
//
// export async function authMiddleware(req: NextRequest) {
//   const session = await getServerSession(authOptions)
//   console.log(session)
//
//   // Ensure session object exists and contains the user property
//   if (!session || !session.user) {
//     return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED1" }), { status: 403 });
//   }
//
//   if (!session.user.id) {
//     return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED2" }), { status: 403 });
//   }
//
//   // If authenticated, add the userId to headers for downstream use
//   // const response = new NextResponse(null);
//   // response.headers.set('X-User-Id', session.user.id);
//   // return response;
//   // return session;
//
//   // Attach the session to the request for further use
//   req.userId = session?.user?.id;
//
//   return null;
// }
//

import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function authMiddleware(req: NextRequest) {
  console.log('authMiddleware')
  // const session = await getServerSession(authOptions);
  // console.log("Session:", session);
  //
  // if (!session || !session.user) {
  //   return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED1" }), { status: 403 });
  // }
  //
  // if (!session.user.id) {
  //   return new NextResponse(JSON.stringify({ code: "UNAUTHORIZED2" }), { status: 403 });
  // }

  // Attach the userId to the request for further use
  req.userId = "asfdsaf";

  return null;
}
