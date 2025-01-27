import { Router } from "express";
import { getAllWaters, getWaterById, createWater } from "../controllers/waterControll.js";

const router = Router();

router.get("/", getAllWaters);
router.get("/:id", getWaterById);
router.post("/", createWater);

export default router;