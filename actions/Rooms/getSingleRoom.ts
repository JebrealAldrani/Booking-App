"use server";

import { roomInterface } from "@/interfaces/rooms";
import db from "@/lib/db";

const getSingleRoom = async (id: string) => {
  //Get Rooms From Database
  const room =  await db.prepare("SELECT * FROM rooms WHERE id = ?").get(id);
  return room as roomInterface;
};

export default getSingleRoom;