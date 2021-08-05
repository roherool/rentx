import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { CreateUserController } from "@modules/accounts/controllers/CreateUser.controller";
import { ListUsersController } from "@modules/accounts/controllers/ListUsers.controller";
import { UpdateUserAvatarController } from "@modules/accounts/controllers/UpdateUserAvatar.controller";
import { ProfileUserController } from "@modules/accounts/controllers/ProfileUser.controller";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/listing", ensureAuth, ensureAdmin, listUsersController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuth,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

userRoutes.get("/profile", ensureAuth, profileUserController.handle);

export { userRoutes };
