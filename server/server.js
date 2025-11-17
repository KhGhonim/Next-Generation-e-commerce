import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import MongoDB from "./API/Config/MongoDB.js";
import AuthRoutes from "./API/Routes/authRoutes.js";
import ProductRoutes from "./API/Routes/productRoutes.js";
import CategoryRoutes from "./API/Routes/categoryRoutes.js";
import SalesTeamRoutes from "./API/Routes/salesTeamRoutes.js";
import PaymentRoutes from "./API/Routes/paymentRoutes.js";
import AnalyticsRoutes from "./API/Routes/analyticsRoutes.js";
import UserRoutes from "./API/Routes/userRoutes.js";
import CartRoutes from "./API/Routes/cartRoutes.js";

dotenv.config();
const app = express();

//environment variables
const CLIENT_API_URL = process.env.CLIENT_API_URL;

//Middlewares
app.use(
  cors({
    origin: CLIENT_API_URL, 
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

app.use("/api", AuthRoutes);
app.use("/api", ProductRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", SalesTeamRoutes);
app.use("/api", PaymentRoutes);
app.use("/api", AnalyticsRoutes);
app.use("/api", UserRoutes);
app.use("/api", CartRoutes);


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
