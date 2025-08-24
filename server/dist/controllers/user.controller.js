import { ObjectId } from "mongodb";
import { collections } from "../config/db.js";
import { CartService } from "../services/cart.service.js";
const cartService = new CartService();
class UserController {
    async createNewUser() {
        // Generate a random username from a list of 20 adjectives and 20 animals
        const adjectives = [
            "Abrasive",
            "Brash",
            "Callous",
            "Daft",
            "Eccentric",
            "Fiesty",
            "Golden",
            "Holy",
            "Ignominious",
            "Joltin",
            "Killer",
            "Luscious",
            "Mushy",
            "Nasty",
            "OldSchool",
            "Pompous",
            "Quiet",
            "Rowdy",
            "Sneaky",
            "Tawdry",
        ];
        const animals = [
            "Alligator",
            "Barracuda",
            "Cheetah",
            "Dingo",
            "Elephant",
            "Falcon",
            "Gorilla",
            "Hyena",
            "Iguana",
            "Jaguar",
            "Koala",
            "Lemur",
            "Mongoose",
            "Narwhal",
            "Orangutan",
            "Platypus",
            "Quetzal",
            "Rhino",
            "Scorpion",
            "Tarantula",
        ];
        const randomUsername = `${adjectives[Math.floor(Math.random() * 20)]} ${animals[Math.floor(Math.random() * 20)]}`;
        let user = await collections?.users?.findOne({ name: randomUsername });
        if (!user) {
            const tempUser = { name: randomUsername, isAdmin: true };
            const result = await collections?.users?.insertOne(tempUser);
            if (!result?.insertedId) {
                throw new Error("Failed to create user: insertedId is undefined");
            }
            user = { ...tempUser, _id: result.insertedId };
        }
        await cartService.createOrGetCart(user._id.toString());
        return user;
    }
    async getUser(username) {
        const user = await collections?.users?.findOne({ name: username });
        return user;
    }
    async getUserById(userId) {
        const objectId = new ObjectId(userId);
        const user = await collections?.users?.findOne({ _id: objectId });
        return user;
    }
}
export default UserController;
