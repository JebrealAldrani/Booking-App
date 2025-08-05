"use server";

import { authErrors } from "@/interfaces/authErrors";
import { verifyAuth } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import checkRoomAvailability from "./checkRoomAvailability";

const bookRoom = async (previousState: authErrors, formData: FormData) => {
  try {
    const { user, session } = await verifyAuth();

    const roomId = formData.get('room_id') as string;

    if (!session) {
      redirect("/");
    }

    if (!user?.id) {
      return {
        error: "You must be logged in to book a room",
      };
    }

    //Extract date and time from the formData
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");

    // combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    //check if room is available
    const isAvailable = await checkRoomAvailability(roomId, checkInDateTime, checkOutDateTime)

    if(!isAvailable) {
      return {
        error: 'This room is already booked for thi selected time'
      }
    }

    const bookingData = {
      id: uuidv4(),
      user_id: user.id,
      room_id: roomId,
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
    };

    

    //create booking
    const newBooking = await db.prepare(
      "INSERT INTO bookings (id, user_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?, ?)"
    );
    const bookingResult = newBooking.run(
      bookingData.id,
      bookingData.user_id,
      bookingData.room_id,
      bookingData.check_in,
      bookingData.check_out
    );

    console.log(bookingData);

    // revalidate cache
    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed booking room, please try again later",
    };
  }
};

export default bookRoom;
