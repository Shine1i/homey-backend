import {lucia} from "../lucia";
import { createMiddleware } from 'hono/factory'



const authMiddleware = createMiddleware( async (c, next) => {
    const auth = c.req.raw.headers.get("Authorization") 
    if (!auth) {
        c.set("user", null);
        c.set("session", null);
        return await next();
    }
    const sessionId = lucia.readBearerToken(auth);
    if (!sessionId) {
        c.set("user", null);
        c.set("session", null);
        return await next();
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        c.header("Set-Authorization", session.id, {
            append: true
        });
    }
    if (!session) {
        c.header("Remove-Authorization", '');
    }
    c.set("user", user);
    c.set("session", session);
    await next();
});

export {authMiddleware}