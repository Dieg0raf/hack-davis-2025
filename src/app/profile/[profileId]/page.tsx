"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import Link from "next/link";

// Define the Profile type based on your database schema
type Profile = {
  id: string;
  userId: string;
  starRating: number | null;
  amountProductsSold: number;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
  listings: Array<{
    id: string;
    productId: string;
    description: string;
    price: number | null;
    status: string;
    colors: string[];
    imageUrls: string[];
    product: {
      id: string;
      name: string;
      series: string;
    };
  }>;
};

export default function ProfilePage() {
  const params = useParams();
  const profileId = params.profileId as string;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data when component mounts
  useEffect(() => {
    async function fetchProfileData() {
      try {
        setLoading(true);
        // Use the new dynamic route
        const response = await fetch(`/api/profiles/${profileId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchProfileData();
    }
  }, [profileId]);

  // Filter listings based on their actual properties (not alternating)
  const forSaleListings =
    profile?.listings.filter(
      (listing) =>
        listing.status === "available" &&
        listing.price !== null &&
        listing.price > 0
    ) || [];

  const forTradeListings =
    profile?.listings.filter(
      (listing) =>
        listing.status === "available" &&
        (listing.price === null || listing.price === 0)
    ) || [];

  console.log(profile?.listings);

  // Keep sold listings as they are
  const soldListings =
    profile?.listings.filter((listing) => listing.status === "sold") || [];

  const ListingCard = ({ listing }: { listing: Profile["listings"][0] }) => {
    // Generate a random price between 10 and 50 if price is null
    const displayPrice =
      listing.price !== null
        ? listing.price
        : Math.floor(Math.random() * 41) + 10; // Random number between 10-50

    // Determine if this is a trade item even if it has a price
    const isTrade =
      listing.status === "available" &&
      (listing.price === null || listing.price === 0);

    // Status badge colors
    const getStatusBadge = () => {
      switch (listing.status) {
        case "sold":
          return (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sold
            </span>
          );
        case "pending":
          return (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Pending
            </span>
          );
        case "reserved":
          return (
            <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
              Reserved
            </span>
          );
        default:
          return null;
      }
    };

    return (
      <Link href={`/listings/${listing.id}`}>
        <div className="p-1 cursor-pointer">
          <Card className="border-2 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={listing.imageUrls[0] || "/placeholder-image.jpg"}
                  alt={listing.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If image fails to load, replace with backup
                    e.currentTarget.src =
                      "https://sonnyangel.jp/wp2/wp-content/uploads/2021/03/marine1-4-640x640.jpg";
                  }}
                />
                {getStatusBadge()}
                {isTrade && (
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    For Trade
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">
                  {listing.product.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {listing.product.series}
                </p>
                {displayPrice > 0 && !isTrade ? (
                  <p className="font-bold text-sm mt-1">${displayPrice}</p>
                ) : (
                  <p className="text-sm italic mt-1">For Trade</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Link>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar /> */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Error Loading Profile
            </h2>
            <p className="text-gray-600 mb-4">{error || "Profile not found"}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Profile Section */}
          <div className="px-auto p-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={profile.user.image || "/default-avatar.png"}
                  alt={profile.user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold">{profile.user.name}</h1>
                <div className="flex justify-center mt-2">
                  {/* Star rating - using RED stars */}
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < (profile.starRating || 0)
                            ? "text-red-500" // Changed to red-500 from yellow-400
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Uncomment if you want to show the rating number
                  <span className="text-sm text-gray-600 ml-2">
                    {profile.starRating
                      ? profile.starRating.toFixed(1)
                      : "No ratings yet"}
                  </span> 
                  */}
                </div>
                <p className="mt-1 text-gray-600 text-center">
                  {profile.amountProductsSold} items sold
                </p>
              </div>

              {/* Uncomment if you want to show the Create Listing button 
              <div className="flex-shrink-0">
                <Link href={`/profile/${profileId}/create-listing`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Create Listing
                  </button>
                </Link>
              </div>
              */}
            </div>
          </div>

          {/* Items for Sale */}
          <div className="w-full pb-8 pt-2">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Items for Sale</h2>

              {forSaleListings.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2">
                    {forSaleListings.map((listing) => (
                      <CarouselItem key={listing.id} className="pl-2 basis-1/4">
                        <ListingCard listing={listing} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              ) : (
                <p className="text-gray-500 italic">No items for sale</p>
              )}
            </div>
          </div>

          {/* Items for Trade */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Items for Trade</h2>

              {forTradeListings.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2">
                    {forTradeListings.map((listing) => (
                      <CarouselItem key={listing.id} className="pl-2 basis-1/4">
                        <ListingCard listing={listing} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              ) : (
                <p className="text-gray-500 italic">No items for trade</p>
              )}
            </div>
          </div>

          {/* Past Trades */}
          <div className="w-full py-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Sold Items</h2>

              {soldListings.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2">
                    {soldListings.map((listing) => (
                      <CarouselItem key={listing.id} className="pl-2 basis-1/4">
                        <ListingCard listing={listing} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              ) : (
                <p className="text-gray-500 italic">No sold items</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
