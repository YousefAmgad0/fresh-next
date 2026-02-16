import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  console.log(pathname, "URL NEW Request");

  /*                                                                                                       */

  const authRoute =
    pathname == "/login" ||
    pathname == "/register" ||
    pathname == "/forgot-password";
  if (token && authRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !authRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/categories",
    "/brand",
    "/address",
    "/allorders",
    "/changePassword",
    "/cart",
    "/wishlist",
    "/forgot-password",
  ],
};
