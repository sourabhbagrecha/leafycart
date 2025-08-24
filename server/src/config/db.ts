import * as mongodb from "mongodb";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";

export const collections: {
  users?: mongodb.Collection<User>;
  products?: mongodb.Collection<Product>;
  orders?: mongodb.Collection<Order>;
  carts?: mongodb.Collection<Cart>;
} = {};

export const databases: {
  LeafyCart?: mongodb.Db;
} = {};

export async function connectToDatabase(uri?: string) {
  if (
    !uri ||
    uri === "mongodb+srv://user:password@cluster" ||
    typeof uri !== "string"
  ) {
    throw new Error(`
        ####### ######  ######  ####### ######  
        #       #     # #     # #     # #     # 
        #       #     # #     # #     # #     # 
        #####   ######  ######  #     # ######  
        #       #   #   #   #   #     # #   #   
        #       #    #  #    #  #     # #    #  
        ####### #     # #     # ####### #     # 

        Missing database connection string! Open the .env file and add your MongoDB connection string to the DATABASE_URI variable.
    `);
  }

  const client = new mongodb.MongoClient(uri, {
    appName: "devrel.workshop.ecomm-agents",
  });

  try {
    await client.connect();
    console.log(`Connected to MongoDB (${process.env.DATABASE_NAME})`);

    const db = client.db(process.env.DATABASE_NAME);
    databases.LeafyCart = db;

    const usersCollection = db.collection<User>("users");
    const productsCollection = db.collection<Product>("products");
    const ordersCollection = db.collection<Order>("orders");
    const cartsCollection = db.collection<Cart>("carts");

    collections.users = usersCollection;
    collections.products = productsCollection;
    collections.orders = ordersCollection;
    collections.carts = cartsCollection;

    return client;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    // Close client if partially opened
    try {
      await client.close();
    } catch (_) {
      // ignore
    }
    throw err;
  }
}
