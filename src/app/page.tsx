import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-sm">
        <NavigationMenu className="w-full">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <NavigationMenuLink className="text-2xl font-bold text-gray-900">
                Logo
              </NavigationMenuLink>
            </div>
            
            <div className="flex items-center">
              <NavigationMenuList className="flex items-center space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink href="/login">
                    <Button variant="ghost">Sign in</Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/signup">
                    <Button>Sign up</Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </div>
          </div>
        </NavigationMenu>
      </div>
      
      <main className="max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="relative">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-blue-600">Sonny Swap</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
