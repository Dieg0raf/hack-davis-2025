'use client'
import * as React from "react"
import { useUser } from '@auth0/nextjs-auth0'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Navbar from "@/components/Navbar"
import Profile from "@/components/Profile"

type Props = {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: Props) {
  const { id } = params
  //const { user } = useUser()

  const ListingCard = ({ index }: { index: number }) => (
    <div className="p-1">
      <Card className="border-2">
        <CardContent className="flex aspect-square items-center justify-center p-4 max-w-[150px]">
          <span className="text-lg font-semibold">{index}</span>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Profile Section */}
          <Profile userId={id} />

          {/* Items for Sale */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Items for Sale</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4">
                      <ListingCard index={index + 1} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>

          {/* Items for Trade */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Items for Trade</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4">
                      <ListingCard index={index + 101} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>

          {/* Past Trades */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Past Trades</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4">
                      <ListingCard index={index + 201} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 