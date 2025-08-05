import db from "./db";
import {roomInterface} from '@/interfaces/rooms'

export const getRooms = () => {
  const stmt = db.prepare("SELECT * FROM rooms");
  return stmt.all();
};

export const getRoomByUserId = async (userId: string) => {
  const room = await db.prepare("SELECT * FROM rooms WHERE user_id = ?").get(userId) as roomInterface;
  console.log(room)
  return room
}
