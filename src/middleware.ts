import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Si está en la raíz y está autenticado, redirigir a dashboard
    if (pathname === "/" && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      // Retorna true si el usuario puede acceder
      authorized({ token, req }) {
        const { pathname } = req.nextUrl
        
        // Permitir acceso a rutas públicas
        if (pathname === "/" || pathname.startsWith("/auth/")) {
          return true
        }

        // Para rutas protegidas, requiere token
        return !!token
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
)

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/organizations/:path*",
  ],
}