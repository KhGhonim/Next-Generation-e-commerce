import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import MongoDB from "./API/Config/MongoDB.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to Khaled Ghonim Gateway Server");
});

const startServer = async () => {
  try {
    await MongoDB();
    app.listen(process.env.PORT, () => {
      console.log(
        `Server started on port ${process.env.PORT}, http://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(`Failed to start server: ${error}`);
  }
};

startServer();
