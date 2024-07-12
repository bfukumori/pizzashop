import { api } from '@/lib/axios'

export enum Role {
  MANAGER = 'manager',
  CUSTOMER = 'customer',
}

export interface GetProfileResponse {
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
