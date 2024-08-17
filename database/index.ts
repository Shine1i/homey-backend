import mongoose from "mongoose";

await mongoose.connect("mongodb://127.0.0.1:27017/local");

const User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            _id: {
                type: String,
                required: true
            },
            username: {
                type: String,
                required: true,
                unique: true
            },
            hashed_password: {
                type: String,
                required: true
            },
        } as const,
        {_id: false}
    )
);
const Session = mongoose.model(
    "Session",
    new mongoose.Schema(
        {
            _id: {
                type: String,
                required: true
            },
            user_id: {
                type: String,
                required: true
            },
            expires_at: {
                type: Date,
                required: true
            }
        } as const,
        {_id: false}
    )
);

export {User, Session};