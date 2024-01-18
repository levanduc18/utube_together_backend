import { Router } from "express";
import { FRONTEND_URL } from "../config/env.js";
import passportInit from "../config/passportInit.js";
import authController from "../controllers/auth.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router();
router.get("/getAuthenticated", isLoggedIn, authController.getAuthenticated);

router.get("/profile", isLoggedIn, authController.getProfile);

//Route login with google
router.get(
  "/google",
  passportInit.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passportInit.authenticate("google", {
    successRedirect: FRONTEND_URL + "/room",
    failureRedirect: FRONTEND_URL + "/auth/failure",
  })
);

router.get("/failure", (req, res) => {
  res.send("Something went wrong...");
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(FRONTEND_URL + "/login");
  });
});

export default router;
