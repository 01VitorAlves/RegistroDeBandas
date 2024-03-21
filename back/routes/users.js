import express from "express";
import {getBandas, addBanda, editBanda, deleteBanda} from "../controllers/user.js";

const router = express.Router()

router.get("/", getBandas)

router.post("/", addBanda)

router.put("/:idBandas", editBanda)

router.delete("/:idBandas", deleteBanda)

export default router