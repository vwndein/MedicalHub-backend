import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();

// Cấu hình CORS cho cả local và production
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      "https://medical-hub-frontend-sigma.vercel.app", // Your Vercel frontend
    ],
    credentials: true,
  })
);

// Hoặc cho phép tất cả domain (tạm thời để test)
// app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port : " + port);
});
