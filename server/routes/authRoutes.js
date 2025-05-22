import express from "express";
import passport from "passport";
import { authController } from "../config/passport.js";

const router = express.Router();

// Step 1: User clicks "Sign in with Google"
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google redirects user back to backend
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/logout", authController.logout);

export default router;
