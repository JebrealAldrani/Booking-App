'use client'

import cancelBooking from '@/actions/bookings/cancelBooking';
import { bookingInterface } from '@/interfaces/booking';
import React from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CancelBookingBtn: React.FC<{booking: bookingInterface}> = ({booking}) => {

    const handleCancelBtn = async (bookingId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want cancel booking this room",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: 'No Keep it'
    });

    if(result.isConfirmed) {
      const state = await cancelBooking(booking);
      if(state.error) {
        toast.error(state.error)
      }
      if(state.success) {
        toast.success('Booking Canceled Successfully');
      }
    }
  };
  return (
    <button onClick={handleCancelBtn.bind(null, booking.id)} className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700">
          Cancel Booking
        </button>
  )
}

export default CancelBookingBtn
