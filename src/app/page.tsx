'use client'
import * as React from "react"
import { useUser } from '@auth0/nextjs-auth0'
import Dashboard from "./dashboard/page"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Navbar from "@/components/Navbar"

export default function Home() {
  const { user } = useUser()
  
  if (user) {
    return (
      <div>
        <Navbar />
        <Dashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
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
