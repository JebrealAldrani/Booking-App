'use server'

import { roomInterface } from "@/interfaces/rooms";
import db from "@/lib/db"

export const getMyRooms = async (userId: string | null) => {
    const stmt = await db.prepare('SELECT * FROM rooms WHERE user_id = ?');
    const myRooms = stmt.all(userId);
    return myRooms as roomInterface[];
}