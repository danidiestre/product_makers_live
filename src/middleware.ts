import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Return true if the user is logged in
        // console.log("middleware:", token);
        return !!token;
      },
    },
  }
);

// Specify the paths that should be protected
export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };
