// Re-export route modules from a single entry point to keep dynamic imports tidy.
export { healthRoutes } from "./health.routes.js";
export { productRoutes } from "./product.routes.js";
export { userRoutes } from "./user.routes.js";
export { orderRoutes } from "./order.routes.js";
export { cartRoutes } from "./cart.routes.js";
export { reviewRoutes } from "./review.routes.js";
export { adminRoutes } from "./admin.routes.js";
export { default as conversationRoutes } from "./conversation.routes.js";
