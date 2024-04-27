import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-4 sm:px-8">
        <Pizza className="hidden h-6 w-6 min-[440px]:block" />
        <Separator
          orientation="vertical"
          className="hidden h-6 min-[440px]:block"
        />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-6 w-6 min-[440px]:h-4 min-[440px]:w-4" />
            Início
          </NavLink>
          <NavLink to="/orders?status=all&page=1">
            <UtensilsCrossed className="h-6 w-6 min-[440px]:h-4 min-[440px]:w-4" />
            Pedidos
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
