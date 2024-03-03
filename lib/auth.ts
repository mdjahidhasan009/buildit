// import {
//   GetServerSidePropsContext,
//   NextApiRequest,
//   NextApiResponse,
// } from "next";
// import { Session, getServerSession } from "next-auth";
// // import { getServerSession } from "next-auth/next";
// import {authOptions} from "@/app/api/auth/authOptions";
//
// export async function getSession(
//   req?: NextApiRequest | GetServerSidePropsContext["req"],
//   res?: NextApiResponse | GetServerSidePropsContext["res"]
// ) {
//   // if (!req || !res) {
//   //   return (await getServerSession(authOptions));
//   // }
//
//   return (await getServerSession(req, res, authOptions));
// }
