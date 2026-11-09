import app from "./src/app/app.js";
import config from "./src/config/config.js";
import dbConnect from "./src/config/db.config.js";

await dbConnect();

app.listen(config.PORT, () => {
  console.log("Server is running✅");
});
