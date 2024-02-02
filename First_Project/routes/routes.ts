import express from 'express';
import authRoutes from './authRoutes';
import designRoutes from "./designRoutes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes
  },
  {
    path: '/design',
    route: designRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;