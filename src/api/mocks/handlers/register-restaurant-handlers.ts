import { http, HttpResponse, HttpResponseResolver } from 'msw'

import { RegisterRestaurantBody } from '@/api/register-restaurant'

const registerRestaurantResolver: HttpResponseResolver<
  never,
  RegisterRestaurantBody
> = async ({ request }) => {
  const { restaurantName } = await request.json()

  if (restaurantName === 'Pizza Shop') {
    return HttpResponse.json(undefined, { status: 201 })
  }

  return HttpResponse.json(undefined, { status: 400 })
}

const handlers = [http.post('/restaurants', registerRestaurantResolver)]

export const registerRestaurantHandlers = [...handlers]
