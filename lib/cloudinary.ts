import { v2 as cloudinary } from 'cloudinary'

if(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('CLOUDINARY_CLOUD_NAME is not set')
}

if(!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY) {
    throw new Error('API_Key is not set')
}

if(!process.env.CLOUDINARY_API_SECRET) {
    throw new Error('CLOUDINARY_CLOUD_API_SECRET is not set')
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (image: File) => {
    const imageData = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
    const result = await cloudinary.uploader.upload(fileUri, {
        folder: 'Room Bookings'
    })

    return result.secure_url;
}

export default cloudinary;