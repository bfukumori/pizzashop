import { http, HttpResponse, HttpResponseResolver } from 'msw'

import { SignInBody } from '@/api/sign-in'

const signInResolver: HttpResponseResolver<never, SignInBody> = async ({
  request,
}) => {
  const { email } = await request.json()

  if (email === 'johndoe@example.com') {
    return HttpResponse.json(undefined, {
      status: 204,
      headers: {
        'Set-Cookie': 'auth=mocked-token',
      },
    })
  }

  return HttpResponse.json(undefined, { status: 401 })
}

const handlers = [http.post('/authenticate', signInResolver)]

export const signInHandlers = [...handlers]
