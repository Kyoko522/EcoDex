import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Create a Supabase client in middleware
export async function middleware(request) {
  const response = NextResponse.next() // Default Next.js response
  
  // Initialize Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Fetch user session
  const { data: { user } } = await supabase.auth.getUser()

  // Define protected routes -> only accessible after authentication
  const protectedRoutes = ['/view/private', '/view/database', '/view/vision']

  // Redirect unauthenticated users accessing protected routes
  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/view/login'
    return NextResponse.redirect(url)
  }

  // Return updated response with cookies
  return response
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    '/view/(.*)', // Protect routes under /view/
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}