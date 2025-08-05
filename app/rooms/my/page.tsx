import { getMyRooms } from "@/actions/Rooms/getMyRooms";
import Heading from "@/components/Heading";
import MyRoomCard from "@/components/MyRoomCard";
import { roomInterface } from "@/interfaces/rooms";
import { verifyAuth } from "@/lib/auth";
import { NextPage } from "next"
import { redirect } from "next/navigation";

const MyRoomsPage: NextPage = async () => {
 const { user, session } = await verifyAuth();
 if(!session) {
    redirect('/login')
 }
 const myRooms = await getMyRooms(user.id);
 console.log(myRooms)
 if(!myRooms) {
    return <Heading title='No Rooms Found'/>
 }
  return (<>
    <Heading title='My Rooms'/>
    {myRooms.length > 0 ? (myRooms.map((room: roomInterface) => (
        <MyRoomCard room={room} key={room.id}/>
      ))) : (
        <p>No rooms available</p>
      )}
    </>
  )
}

export default MyRoomsPage
