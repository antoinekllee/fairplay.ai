import { Schema, model, models } from "mongoose";

// User Schema
const UserSchema = new Schema(
    {
        // USER INFO
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        photo: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);

export default User;
