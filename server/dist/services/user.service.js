import { ObjectId } from "mongodb";
import { collections } from "../config/db.js";
import { AppError } from "../middlewares/error.middleware.js";
export class UserService {
    async findAll() {
        return collections.users
            ?.find({}, { projection: { password: 0 } })
            .toArray();
    }
    async findById(id) {
        const user = await collections.users?.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
        if (!user) {
            throw new AppError(404, "User not found");
        }
        return user;
    }
    async findByEmail(email) {
        return collections.users?.findOne({ email });
    }
}
