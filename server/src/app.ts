import { config as dotenvConfig } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenvConfig();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const routes = await import("./routes/index.js");

// Start server
const startServer = async () => {
  try {
    // Initialize database first
    await connectToDatabase(process.env.MONGODB_URI);

    // Import routes and middleware after database initialization
    const { errorHandler } = await import("./middlewares/error.middleware.js");

    // Route
    app.use("/api/users", routes.userRoutes);
    app.use("/health", routes.healthRoutes);
    app.use("/api/products", routes.productRoutes);
    app.use("/api/order", routes.orderRoutes);
    app.use("/api/cart", routes.cartRoutes);

    // Error handling
    app.use(errorHandler);

    // Serve static files from React (Vite build)
    app.use(express.static(path.join(__dirname, "public")));

    // Catch-all route (for SPA routing)
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running`);
      console.log("Serving static from:", path.join(__dirname, "public"));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
