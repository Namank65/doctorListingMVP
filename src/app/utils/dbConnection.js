import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL

if(!MONGO_DB_URL){
    throw new Error("Please Define MongoDb Url in Env file!")
}

const cached = global.mongoose || {conn: null, promise: null}

export async function dbConnect() {
    if(cached.conn) return cached.conn

    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        cached.promise = mongoose
        .connect(MONGO_DB_URL, opts)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        return error
        console.log("123"+ error );
    }
console.log("db connected");

    return cached.conn
}