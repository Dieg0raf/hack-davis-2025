'use client'
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Profile from "@/components/Profile"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ListingContentProps = {
  id: string
}

export default function ListingContent({ id }: ListingContentProps) {
  const [listingTypes, setListingTypes] = React.useState({
    forSale: false,
    forTrade: false,
  });

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Carousel */}
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card className="border-2">
                    <CardContent className="p-0">
                      <div className="aspect-square w-full bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-2xl font-semibold">{index + 1}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Right Column - Listing Details */}
        <div className="space-y-6">
          {/* Seller Profile */}
          <Profile userId={id} isCompact />

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Sonny Angel Name #{id}
            </h1>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="forSale" 
                  checked={listingTypes.forSale}
                  onCheckedChange={(checked: boolean | "indeterminate") => 
                    setListingTypes(prev => ({ ...prev, forSale: checked === true }))
                  }
                />
                <label
                  htmlFor="forSale"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  For Sale
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="forTrade" 
                  checked={listingTypes.forTrade}
                  onCheckedChange={(checked: boolean | "indeterminate") => 
                    setListingTypes(prev => ({ ...prev, forTrade: checked === true }))
                  }
                />
                <label
                  htmlFor="forTrade"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  For Trade
                </label>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
              <p className="text-gray-600">
                This is a detailed description of the Sonny Angel listing. Include condition, 
                special features, and any other relevant information about the item.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            {listingTypes.forSale && (
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Buy Now
              </Button>
            )}
            {listingTypes.forTrade && (
              <Button variant="outline" className="flex-1">
                Send Trade Offer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 