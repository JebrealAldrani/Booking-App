import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "./context/authContext";
import { cookies } from "next/headers";

export const middleware = async (request: NextRequest) => {
  const sessionCookie = (await cookies()).get('auth_session');

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/bookings", "/rooms/add", "/rooms/my"],
};
