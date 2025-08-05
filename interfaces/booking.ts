import { roomInterface } from "./rooms";

export interface bookingInterface {
    id: string,
    user_id: string,
    room_id: string,
    check_in: string,
    check_out: string,
    room: roomInterface
}

export interface bookingCheck {
    id: string,
    user_id: string,
    room_id: string,
    check_in: string,
    check_out: string,
}