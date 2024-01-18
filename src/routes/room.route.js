import { Router } from "express";
import roomController from "../controllers/room.controller.js";

import isLoggedIn from "../middlewares/isLoggedIn.js";

const router = Router();
router.get("/", isLoggedIn, roomController.getAllRooms);
router.get("/:id", isLoggedIn, roomController.getRoomById);
router.delete("/:id", isLoggedIn, roomController.deleteRoom);

export default router;
