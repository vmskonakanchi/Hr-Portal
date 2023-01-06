import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const cache = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379
    }
});


cache.on("error", (err) => console.log('Error', err));

await cache.connect();

console.log("Connected to Redis");

export default cache;
