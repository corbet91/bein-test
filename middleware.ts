import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

const publicRoutes = ["/pages/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const cookies = parse(req.headers.get("cookie") || "");
    const user = JSON.parse(cookies.user || "{}");
    const accessToken = user.accessToken;

    if (!accessToken && !publicRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/pages/login", req.url));
    }

    if (publicRoutes.includes(path) && accessToken) {
        return NextResponse.redirect(new URL("/pages/home", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
