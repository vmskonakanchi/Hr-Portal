import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// importing routes
import UserRoutes from "./routes/UserRoutes.js";
import CandidateRoutes from "./routes/CandidateRoutes.js";
import StageRoutes from "./routes/StageRoutes.js";
import DepartmentRoutes from './routes/DepartmentRoutes.js'
import StatusRoutes from './routes/StatusRoutes.js'

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      console.log("error connecting to database");
    } else {
      console.log("Connected to MongoDB Database");
      app.listen(port, '0.0.0.0', () => {
        console.log("Listening on port " + port);
      });
    }
  }
);

/**
 * Hr Portal Backend
 * Version : 1.0
 * API : /api/v1/
 * DATE : 18/10/2022
 * AUTHOR : CSE TEAM
 * DESCRIPTION : This is the main entry point of the application
 */
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/candidates", CandidateRoutes);
app.use("/api/v1/stages", StageRoutes);
app.use("/api/v1/departments", DepartmentRoutes);
app.use("/api/v1/status", StatusRoutes);


/**
 * Open API docs and definitions
 *
 */
const swaggerDefinition = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hr Portal Backend",
      version: "1.0.0",
      description: "This is the Rest api for the Hr Portal",
      contact: {
        name: "CSE TEAM",
        email: "cse@takeoff.com",
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(process.cwd(), "backend", "routes", "*.js")],
};

const swaggerDocument = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
