import { Router } from 'express';
import { apiV1Routes } from './v1';
import { dependencyProvider } from '@/dependencies/dependencies';

const router = Router();

// @route /v1
router.use('/ims', apiV1Routes(dependencyProvider()));

export { router as mainRoutes };
