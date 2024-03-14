import express from "express";
import {getBandas} from "../controllers/user.js";


const router = express.Router();

router.get("/", getBandas);

export default router;