import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')
  const user = 'laref'
  const pass = 'authenticate'
  const expectedAuth = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64')

  if (auth === expectedAuth) {
    return NextResponse.next()
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
