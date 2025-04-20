'use client'
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useUser } from '@auth0/nextjs-auth0'
import Dashboard from "./dashboard/page"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  const { user } = useUser()
  
  if (user) {
    return <div>
      <Dashboard />
    </div>
  }
  else {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full bg-white shadow-sm">
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
              
              <div className="flex justify-between items-center gap-20">
                <NavigationMenuList className="flex  justify-end space-x-4">
                  <NavigationMenuItem>
                  <NavigationMenuLink >
                      <Button> Sell Now </Button>
                      <Button> Sell Sign Up </Button>
  
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/auth/login">
                      Login
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </div>
            </div>
          </NavigationMenu>
        </div>
        
        <main className="w-full">
          {/* Hero section */}
          <div className="relative max-w-7xl mx-auto">
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
  
          {/*Trending Series Carousel*/}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-2xl font-bold mb-4">Trending Series</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {Array.from({ length: 4}).map((_, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4">
                      <div className="p-1">
                        <Card className="border-2">
                          <CardContent className="flex aspect-square items-center justify-center p-4 max-w-[150px]">
                            <span className="text-lg font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>
  
          {/* Carousel Popular Listings */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-2xl font-bold mb-4">Popular Listings</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/6">
                      <div className="p-1">
                        <Card className="border-2">
                          <CardContent className="flex aspect-square items-center justify-center p-4 max-w-[150px]">
                            <span className="text-lg font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>
        </main>
      </div>
    );
  }


}
