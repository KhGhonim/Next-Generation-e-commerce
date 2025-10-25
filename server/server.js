import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import MongoDB from "./API/Config/MongoDB.js";
import AuthRoutes from "./API/Routes/authRoutes.js"

dotenv.config();
const app = express();

//Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Routes
app.get("/", (req, res) => {
  res.send("Welcome to Khaled Ghonim Gateway Server");
});

app.use("/api", AuthRoutes)


// Server Starter 
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
