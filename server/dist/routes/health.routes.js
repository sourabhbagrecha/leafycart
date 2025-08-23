import { Router } from "express";
const router = Router();
// Get all orders (admin gets all, user gets their own)
router.get("/", async (_, res, __) => {
    res.status(200).json({ status: "ok" });
});
export const healthRoutes = router;
