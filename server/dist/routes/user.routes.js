import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import { auth } from "../middlewares/auth.middleware.js";
import UserController from "../controllers/user.controller.js";
import { UserService } from "../services/user.service.js";
const router = Router();
const userService = new UserService();
const userController = new UserController();
const secret = process.env.SECRET || "secret";
// Get all users (admin only)
router.get("/", auth(["admin"]), async (req, res, next) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
// Get current user profile
router.get("/me", auth(), async (req, res, next) => {
    try {
        const user = await userService.findById(req.user.userId);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
// Get user by id (admin only)
router.get("/:id", auth(["admin"]), async (req, res, next) => {
    try {
        const user = await userService.findById(req.params.id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
router.get("/login/:username?", async (req, res) => {
    const username = req?.params?.username;
    let user;
    if (username) {
        user = await userController.getUser(username);
    }
    if (!user) {
        user = await userController.createNewUser();
    }
    // Generate a JWT with algorithm none
    const jwt = jsonwebtoken.sign({
        sub: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    }, secret, { algorithm: "HS256" });
    const response = { jwt };
    res.send(response).status(200);
});
export const userRoutes = router;
