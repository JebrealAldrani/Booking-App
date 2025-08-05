import { bookingInterface } from "@/interfaces/booking";
import { NextPage } from "next";
import Link from "next/link";
import CancelBookingBtn from "./CancelBookingBtn";

const BookedRoomCard: NextPage<{ booking: bookingInterface }> = ({
  booking,
}) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        //get month
        const month = date.toLocaleString('en-US',  {timeZone: 'Asia/Amman', month: 'short'})

        //get day
        const day = date.getUTCDate()

        //Format time in UTC 12-hour
        const time = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Amman'
        })

        //Final formatted string
        return `${month} ${day} at ${time}`
    }
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h4 className="text-lg font-semibold">{booking.room.name}</h4>
        <p className="text-sm text-gray-600">
          <strong>Check In:</strong> {formatDate(booking.check_in)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Check Out:</strong> {formatDate(booking.check_out)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${booking.room.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
        <CancelBookingBtn booking={booking}/>
      </div>
    </div>
  );
};

export default BookedRoomCard;
