"use server";

import { roomInterface } from "@/interfaces/rooms";
import db from "@/lib/db";

const getAllRooms = async () => {
  //Get Rooms From Database
  const rooms = await db.prepare("SELECT * FROM rooms").all();

  return rooms as roomInterface[];
};

export default getAllRooms;
