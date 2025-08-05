"use server";

import { authErrors } from "@/interfaces/authErrors";
import { verifyAuth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import db from "@/lib/db";
import { getRoomByUserId } from "@/lib/rooms";
import { revalidatePath } from "next/cache";

const deleteRoom = async (roomId: string, imageId: string) => {
  const { user } = await verifyAuth();

  if (!user) {
    return {
      error: "You must be logged in to create a room",
    };
  }


  try {
    // Step 1: Delete image from Cloudinary
    const deleteImageResult = await cloudinary.uploader.destroy(
      `Room Bookings/${imageId}`
    );
    if (deleteImageResult.result !== "ok") {
      return { error: "Failed to delete image from Cloudinary" };
    }

    // Step 2: Delete the room from your DB here
    const stmt = await db.prepare("DELETE FROM rooms WHERE id = ?");
    const deleteRoomResult = stmt.run(roomId);

    if (!deleteRoomResult) {
      return {
        error: "Failed to delete room",
      };
    }

    revalidatePath("/", "layout");
    return {
      success: true
    }
  } catch (err) {
    console.error("deletion error:", err);
    return {
      error: 'Failed delete room, please try again later'
    }
  }
};

export default deleteRoom;
