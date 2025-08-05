"use client";

import deleteRoom from "@/actions/Rooms/deleteRoom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DeleteRoomBtn: React.FC<{ roomId: string, imageKey: string }> = ({ roomId, imageKey }) => {

  const handleDeleteBtn = async (roomId: string, imageKey: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if(result.isConfirmed) {
      const state = await deleteRoom(roomId,imageKey);
      if(state.error) {
        toast.error(state.error)
      }
      if(state.success) {
        toast.success('Room Deleted Successfully');
      }
    }
  };

  return (
    <button onClick={handleDeleteBtn.bind(null, roomId, imageKey)} className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700">
      <FaTrash className="inline mr-1" /> Delete
    </button>
  );
};

export default DeleteRoomBtn;
