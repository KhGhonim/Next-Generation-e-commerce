import express from "express";
import { submitContactForm } from "../Controllers/contactController.js";

const router = express.Router();

router.post("/contact", submitContactForm);

export default router;


