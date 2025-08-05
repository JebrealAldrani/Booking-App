import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
import getAllRooms from '@/actions/Rooms/getAllRooms';

export default async function Home () {
  
  const rooms = await getAllRooms();

  if(!rooms) {
    return <Heading title='No Available Rooms'/>
  }

  

  return (
    <>
    <Heading title='Available Rooms'/>
      {rooms.length > 0 ? (rooms.map((room) => (
        <RoomCard room={room} key={room.id}/>
      ))) : (
        <p>No rooms available</p>
      )}
    </>
  );
}
