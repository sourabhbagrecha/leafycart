import * as mongodb from "mongodb";
export const collections = {};
export const databases = {};
export async function connectToDatabase(uri) {
    if (!uri ||
        uri === "mongodb+srv://user:password@cluster" ||
        typeof uri !== "string") {
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
        databases.library = db;
        const usersCollection = db.collection("users");
        const productsCollection = db.collection("products");
        const ordersCollection = db.collection("orders");
        const cartsCollection = db.collection("carts");
        collections.users = usersCollection;
        collections.products = productsCollection;
        collections.orders = ordersCollection;
        collections.carts = cartsCollection;
        return client;
    }
    catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        // Close client if partially opened
        try {
            await client.close();
        }
        catch (_) {
            // ignore
        }
        throw err;
    }
}
