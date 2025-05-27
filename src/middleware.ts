import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Verificar que existe el token y que tiene al menos ID o email
        // Esto permite usuarios tanto con email como sin email
        const hasValidIdentifier = token && (token.id || token.email);

        return !!hasValidIdentifier;
      },
    },
  }
);

// Specify the paths that should be protected
export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };
