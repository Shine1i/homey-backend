import {zValidator} from "@hono/zod-validator";
import {z} from "zod";

const passwordSchema = z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
);
const usernameSchema = z.string().min(3);

const authValidator = zValidator(
    'json',
    z.object({
        username: usernameSchema,
        password: passwordSchema,
    })
);


export {authValidator, passwordSchema, usernameSchema}