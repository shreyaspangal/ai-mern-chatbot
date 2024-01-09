import { connect, disconnect } from 'mongoose';

export async function connectToDB() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        throw new Error("Failed to connect MongoDB");
    }
}

export async function disconnectFromDB() {
    try {
        await disconnect();
    } catch (error) {
        throw new Error("Failed to disconnect MongoDB");
    }
}

export default {
    connectToDB,
    disconnectFromDB
}