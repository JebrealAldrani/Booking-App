import { roomInterface } from "@/interfaces/rooms";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import DeleteRoomBtn from "./DeleteRoomBtn";

const MyRoomCard: NextPage<{ room: roomInterface }> = ({ room }) => {

  //Extract image key
  const imageUrl = room.image;
  const imageName = imageUrl.split("/");
  const imageKey = imageName[imageName.length - 1].split(".")[0];
  
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold">{room.name}</h4>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${room.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          <FaEye className="inline mr-1" /> View
        </Link>

        <DeleteRoomBtn key={room.id} roomId={room.id} imageKey={imageKey} />
      </div>
    </div>
  );
};

export default MyRoomCard;
