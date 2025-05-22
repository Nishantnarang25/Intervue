import {getProfessions, getLimitedProfessions, getSidebarProfessions} from "../controllers/professionsControllers.js"
import express from "express"

const router = express.Router();

router.get("/professions", getProfessions);
router.get("/professions/dropdown", getLimitedProfessions)
router.get("/professions/sidebar", getSidebarProfessions)

export default router