const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout",authController.protect, authController.logout);
router.post("/VerifyToken/:token", authController.VerifyToken);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyEmail", authController.verifyEmail);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/emailVerfication/:token", authController.emailVerfication);

router.patch(
  "/updateMyPassword/",
  authController.protect,
  authController.updatePassword
);
router.get("/me",authController.protect, userController.getMe)
router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
