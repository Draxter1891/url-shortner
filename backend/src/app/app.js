import express from "express";
import { generateCode } from "../utils/url.utils.js";
import router from "../routes/url.routes.js";
import { redirectionController } from "../controller/url.controller.js";

const app = express();
app.use(express.json());

app.use("/api/url",router)

app.get("/:code",redirectionController)

export default app;
