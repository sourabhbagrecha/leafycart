import {
  OrderService,
  ProductService,
  ReviewService,
} from "./agentServices.js";

// Cancel order
export async function cancelOrder({ orderId }: { orderId?: string }) {
  if (!orderId) {
    const lastOrder = await OrderService.getMostRecentOrder();
    if (!lastOrder) return { success: false, message: "No orders found." };
    orderId = lastOrder!._id;
  }
  await OrderService.updateStatus(orderId, "cancelled");
  return { success: true, message: `Order ${orderId} cancelled.` };
}

// Post review
export async function postReview({
  productId,
  rating,
  comment,
}: {
  productId: string;
  rating: number;
  comment: string;
}) {
  const review = await ReviewService.createReview(productId, rating, comment);
  return { success: true, message: "Review posted.", review };
}

// Search products
export async function searchProducts({ query }: { query: string }) {
  const products = await ProductService.searchByKeyword(query);
  return { success: true, products };
}
