import {Hono} from "hono";
import mongoose from "mongoose";
import {Scrypt} from "lucia";
import {authValidator} from "../validators";
import {User} from "../database";
import {lucia} from "../lucia";
import type {User as LUser,Session as LSession} from "lucia"
import {authMiddleware} from "./middleware.ts";
const app = new Hono<{
    Variables: {
        user: LUser | null;
        session: LSession | null;
    };
}>()

app.use(authMiddleware);
app.post(
    '/register',
    authValidator, async (c) => {
        const {username, password} = c.req.valid('json')

        const existing = await User.findOne({username}).exec();
        if (existing) {
            return c.json({message: "User already exists"}, 409);
        }
        const id = new mongoose.Types.ObjectId();
        const hashedPassword = await new Scrypt().hash(password);
        const user = new User({
            _id: id,
            username,
            hashed_password: hashedPassword,
        })
        let saved = await user.save();
        return c.json(saved,
            201
        )
    });

app.post("/login", authValidator, async (c) => {
    const {username, password} = c.req.valid('json')
    const user = await User.findOne().where({username}).exec();

    if (!user) {
        return c.json({message: "User not found"}, 404);
    }
    console.log(`User: ${user}`);
    const isValid = await new Scrypt().verify(user.hashed_password, password);

    if (!isValid) {
        return c.json({message: "Invalid password"}, 401);
    }

    const session = await lucia.createSession(user._id,{});
    const cookie = lucia.createSessionCookie(session.id);

    c.header('Set-Cookie', cookie.serialize());

    return c.json({message: "Logged in successfully"});

});

app.get('/user', async (c) => {
    const user = c.get('user');
    
    return c.json(user);
});

export {app}