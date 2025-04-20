'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from '@auth0/nextjs-auth0'

export default function Navbar() {
  const { user } = useUser()

  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      <NavigationMenu className="w-full">
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex">
            <NavigationMenuLink className="text-2xl font-bold text-gray-900">
              Logo
            </NavigationMenuLink>
          </div>

          <div className="flex-grow max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                className="w-full pl-10"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center gap-4">
            <NavigationMenuList className="flex items-center space-x-4">
              {user ? (
                <>
                  <NavigationMenuItem>
                    <Button>My Listings</Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button variant="outline" onClick={() => {
                      window.location.href = "/profile"
                    }}>Profile</Button> 
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button variant="outline" onClick={() => {
                      window.location.href = "/auth/logout"
                    }}>Logout</Button>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Button className="mr-2">Sell Now</Button>
                    <Button variant="outline" className="mr-2">Sign Up</Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/auth/login">
                      <Button variant="outline">Login</Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </div>
        </div>
      </NavigationMenu>
    </div>
  )
} 