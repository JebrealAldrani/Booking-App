"use server";

import { authErrors } from "@/interfaces/authErrors";
import { verifyAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
const createRoom = async (previousState: authErrors, formData: FormData) => {

    const { user } = await verifyAuth();

    if (!user) {
      return {
        error: "You must be logged in to create a room",
      };
    }
    const roomImage = formData.get("image") as File;

    if (!roomImage) {
      return {
        error: "You Should select an image for the room to add ti correctly",
      };
    }
    //Create room
    const imageUrl = await uploadImage(roomImage);
    console.log(imageUrl)
    const roomId = uuidv4();
    const result = await db
      .prepare(
        "INSERT INTO rooms (id, user_id, name, description, address, location, availability, sqft, capacity, price_per_hour, amenities, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .run(
        roomId,
        user.id,
        formData.get("name"),
        formData.get("description"),
        formData.get("address"),
        formData.get("location"),
        formData.get("availability"),
        formData.get("sqft"),
        formData.get("capacity"),
        formData.get("price_per_hour"),
        formData.get("amenities"),
        imageUrl
      );
    
    revalidatePath("/", "layout");
    return {
      success: true,
    }
};

export default createRoom;
