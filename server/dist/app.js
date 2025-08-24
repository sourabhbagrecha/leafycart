import { config as dotenvConfig } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDatabase } from "./config/db.js";
dotenvConfig();
const app = express();
const PORT = process.env.PORT || 3000;
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
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
