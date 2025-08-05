import Link from "next/link";
import Image from "next/image";
import { roomInterface } from "@/interfaces/rooms";
import DeleteRoomBtn from "./DeleteRoomBtn";
import { verifyAuth } from "@/lib/auth";

const RoomCard: React.FC<{ room: roomInterface }> = async ({ room }) => {
  const {user} = await verifyAuth();
  const Admin =
    user?.id === "1b57ff7c-c23a-4492-81ad-7cd7b323a957" ? true : false;

  //Extract image key
  const imageUrl = room.image;
  const imageName = imageUrl.split("/");
  const imageKey = imageName[imageName.length - 1].split(".")[0];

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Image
          src={room.image}
          width={400}
          height={100}
          alt="Grand Conference Hall"
          className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{room.name}</h4>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Address:</span>{" "}
            {room.address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Availability:</span>
            {room.availability}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Price:</span>$
            {room.price_per_hour}/hour
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${room.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
        {/* Just Appear For Admin */}
        {Admin && (
          <DeleteRoomBtn key={room.id} roomId={room.id} imageKey={imageKey}/>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
