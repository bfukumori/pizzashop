import { api } from '@/lib/axios'

enum Role {
  MANAGER = 'manager',
  CUSTOMER = 'customer',
}

interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: Role
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
