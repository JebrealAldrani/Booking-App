
import { bookingInterface } from "@/interfaces/booking";
import { verifyAuth } from "@/lib/auth";
import db from "@/lib/db"

const getMyBookings = async () => {

  try {
     const { user } = await verifyAuth();

  if(!user?.id) {
    return {
      error: 'You must be logged in to view bookings'
    }
  }

  //Fetch user bookings
  const bookings = await db.prepare(`
  SELECT 
    bookings.*,
    json_object(
      'id', rooms.id,
      'name', rooms.name,
      'description', rooms.description,
      'address', rooms.address,
      'location', rooms.location,
      'availability', rooms.availability,
      'sqft', rooms.sqft,
      'capacity', rooms.capacity,
      'price_per_hour', rooms.price_per_hour,
      'amenities', rooms.amenities,
      'image', rooms.image
    ) AS room
  FROM bookings
  JOIN rooms ON bookings.room_id = rooms.id
  WHERE bookings.user_id = ?
`).all(user.id);

const parseBookings =  bookings.map((booking: any) => ({
  ...booking,
  room: JSON.parse(booking.room),
}));

  return parseBookings as bookingInterface[];
  } catch (error) {
    console.log('Failed to get user bookings');
  }

 
}

export default getMyBookings;
