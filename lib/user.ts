import { user } from "@/interfaces/user";
import db from "./db"
import { v4 as uuidv4 } from 'uuid';
import { roomInterface } from "@/interfaces/rooms";

export const createUser = async (email: string, password: string, name: string) => {
    const userId = uuidv4(); // generates a random UUID
    const result = await db.prepare('INSERT INTO users (id, email, password, name) VALUES(? ,?, ?, ?)').run(userId, email, password, name);

    return userId as string;
}

export const getUserByEmail = async (email: string) => {
    const result = await db.prepare('SELECT * FROM users WHERE email = ?').get(email) as user;
    return result;
}

export const getUserById = async (id: string) => {
    const result = await db.prepare('SELECT * FROM users WHERE id = ?').get(id) as user;
    return result;
}

