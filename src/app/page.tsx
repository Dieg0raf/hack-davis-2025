"use client";
import * as React from "react";
// import { useUser } from '@auth0/nextjs-auth0'
// import Dashboard from "./dashboard/page"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Navbar from "@/components/Navbar";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import Link from "next/link";

export default function Home() {
  // const { user } = useUser()

  const seriesImages = [
    { 
      src: "/series4.webp", 
      alt: "Series 1",
      name: "Animal Series"
    },
    { 
      src: "/series2.jpg", 
      alt: "Series 2",
      name: "Fruit Series"
    },
    { 
      src: "/series5.jpg", 
      alt: "Series 3",
      name: "Marine Series"
    }
  ];

  const sonnyImages = [
    { 
      src: "/sony1.webp", 
      alt: "Sonny Angel 1",
      series: "Animal Series",
      title: "Rabbit",
      price: "$12.99"
    },
    { 
      src: "/sony2.webp", 
      alt: "Sonny Angel 2",
      series: "Fruit Series",
      title: "Strawberry",
      price: "$14.99"
    },
    { 
      src: "/sony3.webp", 
      alt: "Sonny Angel 3",
      series: "Animal Series",
      title: "Panda",
      price: "$13.99"
    },
    { 
      src: "/sony4.webp", 
      alt: "Sonny Angel 4",
      series: "Fruit Series",
      title: "Banana",
      price: "$12.99"
    },
    { 
      src: "/sony5.jpg", 
      alt: "Sonny Angel 5",
      series: "Animal Series",
      title: "Lion",
      price: "$15.99"
    },
    { 
      src: "/sony6.jpg", 
      alt: "Sonny Angel 6",
      series: "Fruit Series",
      title: "Grape",
      price: "$13.99"
    },
    { 
      src: "/sony7.jpg", 
      alt: "Sonny Angel 7",
      series: "Animal Series",
      title: "Elephant",
      price: "$14.99"
    }
  ];

  const sonnyImages2 = [
    { 
      src: "/sony8.jpg", 
      alt: "Sonny Angel 8",
      series: "Marine Series",
      title: "Dolphin",
      price: "$16.99"
    },
    { 
      src: "/sony9.webp", 
      alt: "Sonny Angel 9",
      series: "Marine Series",
      title: "Octopus",
      price: "$15.99"
    },
    { 
      src: "/sony10.avif", 
      alt: "Sonny Angel 10",
      series: "Marine Series",
      title: "Shark",
      price: "$17.99"
    },
    { 
      src: "/sony11.webp", 
      alt: "Sonny Angel 11",
      series: "Marine Series",
      title: "Turtle",
      price: "$14.99"
    },
    { 
      src: "/sony12.jpg", 
      alt: "Sonny Angel 12",
      series: "Marine Series",
      title: "Whale",
      price: "$16.99"
    },
    { 
      src: "/sony13.webp", 
      alt: "Sonny Angel 13",
      series: "Marine Series",
      title: "Seahorse",
      price: "$15.99"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        {/* Hero section */}
        <div className="w-full">
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] bg-gray-100">
            <Image
              src="/SonnyHero.png"
              alt="Sonny Angel Collection"
              fill
              className="object-cover w-full"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        <SignedIn>
          {/* Recommended For You Carousel - Only shown when signed in */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {sonnyImages2.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/6">
                      <div className="p-1">
                        <div className="w-full">
                          <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                            />
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                              {image.series} - {image.title}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-blue-600">
                              {image.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>
        </SignedIn>

        {/*Trending Series Carousel*/}
        <div className="w-full py-8">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-2xl font-bold mb-4">Trending Series</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                {seriesImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/3">
                    <div className="p-1">
                      <div className="w-full">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute bottom-0 left-0 px-3 py-1">
                            <p className="text-sm font-medium text-white">{image.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        </div>

        {/* Second Popular Listings Carousel */}
        <div className="w-full py-8">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-2xl font-bold mb-4">Popular Listings</h2>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                {sonnyImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/6">
                    <div className="p-1">
                      <div className="w-full">
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16vw"
                          />
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                            {image.series} - {image.title}
                          </p>
                          <p className="text-xs sm:text-sm font-bold text-blue-600">
                            {image.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        </div>

        {/* Limited Edition Section */}
        <div className="w-full relative border-t border-b border-gray-200">
          {/* Pink background for desktop */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-pink-100 hidden md:block" />
          
          {/* Pink background for mobile */}
          <div className="md:hidden w-full bg-pink-100">
            <div className="p-6 space-y-3">
              <div className="flex items-center space-x-1">
                <span className="text-2xl">✨</span>
                <h2 className="text-2xl font-bold">Limited Edition</h2>
              </div>
              <h3 className="text-xl font-semibold">Sonny Angels</h3>
              <p className="text-sm text-gray-600">Get them before they're gone!</p>
              <Link 
                href="/limited-edition" 
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
              >
                See All
              </Link>
            </div>
          </div>

          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Box - Hidden on mobile since we show it above */}
                <div className="hidden md:flex md:col-span-1 px-8 flex-col justify-center items-start space-y-3 relative">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl">✨</span>
                    <h2 className="text-2xl font-bold">Limited Edition</h2>
                  </div>
                  <h3 className="text-xl font-semibold">Sonny Angels</h3>
                  <p className="text-sm text-gray-600">Get them before they're gone!</p>
                  <Link 
                    href="/limited-edition" 
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                  >
                    See All
                  </Link>
                </div>

                {/* Right Carousel */}
                <div className="md:col-span-2 md:pl-8">
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2">
                      {sonnyImages2.map((image, index) => (
                        <CarouselItem key={index} className="pl-2 md:basis-1/3 basis-1/2">
                          <div className="p-1">
                            <div className="w-full">
                              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                />
                                <div className="absolute top-2 right-2">
                                  <span className="bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Limited
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 space-y-1">
                                <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                                  {image.series} - {image.title}
                                </p>
                                <p className="text-xs sm:text-sm font-bold text-blue-600">
                                  {image.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Favorite Sonny Angels Section */}
        <div className="w-full py-12">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-2xl font-bold mb-8">Our Favorite Sonny Angels</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Large center image */}
              <div className="col-span-2 row-span-2 relative">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/sony2.webp"
                    alt="Featured Sonny Angel"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <button className="absolute top-4 right-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Smaller surrounding images */}
              <div className="relative">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/sony1.webp"
                    alt="Sonny Angel"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <button className="absolute top-4 right-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/sony3.webp"
                    alt="Sonny Angel"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <button className="absolute top-4 right-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/sony4.webp"
                    alt="Sonny Angel"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <button className="absolute top-4 right-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/sony5.jpg"
                    alt="Sonny Angel"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <button className="absolute top-4 right-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Process Section */}
        <div className="w-full py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Our Process Card */}
              <div className="bg-blue-100 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Our Process</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Sonny Angels are shipped to our facilities for verification before they are shipped to you.
                </p>
                <Link 
                  href="/learn-more"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block"
                >
                  Learn More
                </Link>
              </div>

              {/* Safe and Secure Trading Card */}
              <div className="bg-blue-100 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Safe and Secure Trading</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  We make sure both parties fulfill their trades—if not, your Sonny Angel is returned to you.
                </p>
                <Link 
                  href="/learn-more"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block"
                >
                  Learn More
                </Link>
              </div>

              {/* Building a Circular Economy Card */}
              <div className="bg-blue-100 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.91 4.91a2.764 2.764 0 0 1 0 3.908l-.884.884a7.454 7.454 0 0 0-2.122-2.122l.884-.884a2.764 2.764 0 0 1 3.908 0M16.818 8.818a2.764 2.764 0 0 1 0 3.908l-.884.884a7.454 7.454 0 0 0-2.122-2.122l.884-.884a2.764 2.764 0 0 1 3.908 0M8.818 16.818a2.764 2.764 0 0 1 0 3.908l-.884.884a7.454 7.454 0 0 0-2.122-2.122l.884-.884a2.764 2.764 0 0 1 3.908 0M4.91 12.91a2.764 2.764 0 0 1 0 3.908l-.884.884a7.454 7.454 0 0 0-2.122-2.122l.884-.884a2.764 2.764 0 0 1 3.908 0" />
                  </svg>
                  <h3 className="text-xl font-semibold">Building a Circular Economy</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  We are committed to changing the culture of consumption in the Sonny Angel community.
                </p>
                <Link 
                  href="/learn-more"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
