import { dashboardHandlers } from './dashboard-handlers'
import { orderActionsHandlers } from './order-actions-handler'
import { orderHandlers } from './order-handlers'
import { profileHandlers } from './profile-handlers'
import { registerRestaurantHandlers } from './register-restaurant-handlers'
import { signInHandlers } from './sign-in-handlers'

export const handlers = [
  ...signInHandlers,
  ...registerRestaurantHandlers,
  ...dashboardHandlers,
  ...profileHandlers,
  ...orderHandlers,
  ...orderActionsHandlers,
]
