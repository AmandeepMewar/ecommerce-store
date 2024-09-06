import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.get('/', protectRoute, getCoupon);

export default router;
