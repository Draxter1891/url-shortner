import { Router } from "express";
import {
  createController,
  deleteController,
  getAllURLController,
} from "../controller/url.controller.js";

const router = Router();

/**
 * @POST /api/url
 * req.body = {url:"https://longurl.com"}
 *
 */
router.post("/", createController);

/**
 * @GET /api/url
 */
router.get("/", getAllURLController);

/**
 * @DELETE /api/url/:id
 */
router.delete("/:id", deleteController);

export default router;
