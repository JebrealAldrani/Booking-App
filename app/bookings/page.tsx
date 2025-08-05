import getBookings from '@/actions/bookings/getMyBookings'
import BookedRoomCard from '@/components/BookedRoomCard';
import Heading from '@/components/Heading';
import { bookingInterface } from '@/interfaces/booking';
import React from 'react'

const BookingPage = async () => {
  const bookings = await getBookings();
  console.log(bookings)
  
  return <>
  {bookings.length === 0? (<p className='text-gray-600 mt-4'>You have no bookings</p>): (
    bookings.map((booking: bookingInterface) => <BookedRoomCard key={booking.id} booking={booking}/>
    )
  )}
  </>
}

export default BookingPage
