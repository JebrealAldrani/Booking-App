import { verifyAuth } from "@/lib/auth";
import { getBookingsByRoomId } from "@/lib/bookings";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";

//convert date string to a luxon DateTime object in UTC
const toUTCDateTime = (dateString: string) => {
  return DateTime.fromISO(dateString, { zone: "Asia/Amman" }).toUTC();
};

//check for overlapping date ranges
const dateRangesOverlap = (
  checkInA: any,
  checkOutA: any,
  checkInB: any,
  checkOutB: any
) => {
  return checkInA < checkOutB && checkOutA > checkInB;
};

const checkRoomAvailability = async (
  roomId: string,
  checkIn: string,
  checkOut: string
) => {
  const { session } = await verifyAuth();
  if (!session) {
    redirect("/login");
  }

  try {
    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    console.log(checkInDateTime);

    //Fetch all bookings for a given room
    const bookings = await getBookingsByRoomId(roomId);
    console.log(bookings);

    //Loop over bookings and check for overlap
    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

      if (
        dateRangesOverlap(
          checkInDateTime,
          checkOutDateTime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false; //overlap found do not book
      }
    }

    //No overlap found, continue to book
    return true;
    
  } catch (error) {
    console.log("Failed to check availability", error);
    return {
      error: "Failed to check availability",
    };
  }
};

export default checkRoomAvailability;
