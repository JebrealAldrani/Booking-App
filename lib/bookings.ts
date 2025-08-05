import { bookingCheck } from "@/interfaces/booking";
import db from "./db"

export const getBookingsByRoomId = async (roomId: string) => {
    const roomBookings = await db.prepare('SELECT * FROM bookings WHERE room_id = ?').all(roomId);
    return roomBookings as bookingCheck[];
}