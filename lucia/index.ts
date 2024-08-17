import {MongodbAdapter} from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import {Lucia} from "lucia";

const adapter = new MongodbAdapter(
    mongoose.connection.collection("sessions"),
    mongoose.connection.collection("users")
);

const lucia = new Lucia(adapter);


export {lucia};