import express from "express";
import {
	countByCity,
	countByType,
	createHotel,
	deleteHotel,
	getHotel,
	getHotels,
	updateHotel,
} from "../controllers/hotelControllers.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/find/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GETALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
