import * as mongodb from "mongodb";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Conversation } from "../models/conversation.model.js";

export const collections: {
  users?: mongodb.Collection<User>;
  products?: mongodb.Collection<Product>;
  orders?: mongodb.Collection<Order>;
  carts?: mongodb.Collection<Cart>;
  conversations?: mongodb.Collection<Conversation>;
  agents?: mongodb.Collection;
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
    console.log(`Connected to MongoDB`);

    const db = client.db(process.env.DATABASE_NAME);
    databases.LeafyCart = db;

    collections.users = db.collection<User>("users");
    collections.products = db.collection<Product>("products");
    collections.orders = db.collection<Order>("orders");
    collections.carts = db.collection<Cart>("carts");
    collections.conversations = db.collection<Conversation>("conversations");
    collections.agents = db.collection("agents");

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
