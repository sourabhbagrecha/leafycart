// Re-export route modules from a single entry point to keep dynamic imports tidy.
export { healthRoutes } from "./health.routes.js";
export { productRoutes } from "./product.routes.js";
export { userRoutes } from "./user.routes.js";
export { orderRoutes } from "./order.routes.js";
