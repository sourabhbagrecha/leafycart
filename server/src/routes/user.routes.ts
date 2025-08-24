import { Router, Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import UserController from "../controllers/user.controller.js";

const router = Router();
const userController = new UserController();
const secret = process.env.JWT_SECRET || "secret";

router.get("/register", async (req, res) => {
  let user = await userController.createNewUser();

  // Generate a JWT with algorithm none
  const accessToken = jsonwebtoken.sign(
    {
      sub: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    },
    secret,
    { algorithm: "HS256" }
  );

  const response = { accessToken };

  res.json(response).status(200);
});

router.get("/login/:username", async (req, res) => {
  const username = req?.params?.username;
  let user;

  if (username) {
    user = await userController.getUser(username);
  }

  if (!user) {
    user = await userController.createNewUser();
  }

  // Generate a JWT with algorithm none
  const accessToken = jsonwebtoken.sign(
    {
      sub: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
    },
    secret,
    { algorithm: "HS256" }
  );

  const response = { accessToken };

  res.json(response).status(200);
});

export const userRoutes = router;
