import { http, HttpResponse, HttpResponseResolver } from 'msw'

import { GetManagedRestaurantResponse } from '@/api/get-managed-restaurant'
import { GetProfileResponse, Role } from '@/api/get-profile'
import { UpdateProfileBody } from '@/api/update-profile'

const getProfileResolver: HttpResponseResolver<
  never,
  never,
  GetProfileResponse
> = async () => {
  return HttpResponse.json({
    id: 'mocked-user-id',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '11999999999',
    role: Role.MANAGER,
    createdAt: new Date(),
    updatedAt: null,
  })
}

const getManagedRestaurantResolver: HttpResponseResolver<
  never,
  never,
  GetManagedRestaurantResponse
> = async () => {
  return HttpResponse.json({
    id: 'mocked-restaurant-id',
    name: 'Pizza Shop',
    description: 'A nice restaurant',
    managerId: 'mocked-manager-id',
    createdAt: new Date(),
    updatedAt: null,
  })
}

const updateProfileResolver: HttpResponseResolver<
  never,
  UpdateProfileBody
> = async ({ request }) => {
  const { name } = await request.json()

  if (name === 'New Pizza Shop') {
    return HttpResponse.json(undefined, { status: 204 })
  }

  return HttpResponse.json(undefined, { status: 400 })
}

const handlers = [
  http.get('/me', getProfileResolver),
  http.get('/managed-restaurant', getManagedRestaurantResolver),
  http.put('/profile', updateProfileResolver),
]

export const profileHandlers = [...handlers]
