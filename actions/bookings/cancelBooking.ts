"use server";

import { bookingInterface } from "@/interfaces/booking";
import { verifyAuth } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

const cancelBooking = async (booking: bookingInterface) => {
  const { user } = await verifyAuth();
  console.log(user)

  //check user authentication
  if (!user?.id) {
    return {
      error: "You must be logged in to cancel a room",
    };
  }

  //check if booking belong to current user
  if(booking.user_id !== user.id) {
    return {
        error: 'You are not authorized to cancel this booking'
    }
  }

  try {
    // cancel booking and delete it from DB
    const stmt = await db.prepare("DELETE FROM bookings WHERE id = ?");
    const deleteRoomResult = stmt.run(booking.id);

    if (!deleteRoomResult) {
      return {
        error: "Failed to delete booking",
      };
    }

    //revalidate cache
    revalidatePath("/", "layout");

    return {
      success: true
    }
  } catch (err) {
    console.error("deletion error:", err);
    return {
      error: 'Failed delete booking, please try again later'
    }
  }
};

export default cancelBooking;

