"use client";
import * as React from "react";
// import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShoppingCart,
  //   Share2,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card } from "@/components/ui/card";

type ListingContentProps = {
  listing: {
    price: number | null;
    imageUrls: string[];
    description: string;
    product?: {
      name?: string;
    };
  }; // Define a proper type for listing
  profile: {
    id: string;
    user: {
      name?: string;
      image?: string;
    };
  }; // Define a proper type for profile
};

export default function ListingContent({
  listing,
  profile,
}: ListingContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [offersSent] = React.useState(Math.floor(Math.random() * 8) + 1); // Random number between 1-8
  const [cartsCount] = React.useState(Math.floor(Math.random() * 5) + 1); // Random number between 1-5
  const [isPopular] = React.useState(Math.random() > 0.3); // 70% chance of being popular
  const [isTradeLoading, setIsTradeLoading] = React.useState(false);
  const [tradeStatus, setTradeStatus] = React.useState<'initial' | 'pending'>('initial');
  const [messageStatus, setMessageStatus] = React.useState<'initial' | 'copied'>('initial');
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);
  //   const isTrade = listing.price === null || listing.price === 0;

  // Make sure we have image URLs
  const imageUrls =
    listing.imageUrls && listing.imageUrls.length > 0
      ? listing.imageUrls
      : [
          `https://placehold.co/600x600/e4f9ff/000000?text=${encodeURIComponent(
            listing.product?.name || "Sonny Angel"
          )}`,
        ];

  // Navigation functions for image carousel
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  // Generate similar items based on the series
  const similarItems = [
    {
      id: "1",
      name: "Sky Color Series—Snowy",
      price: 35,
      imageUrl: "/55ba72a58f5086d0bb64b58ff9943ec9.jpg",
    },
    {
      id: "2",
      name: "Cat Life Series—Tuxedo Cat",
      price: 32,
      imageUrl: "/399e1a86e72a81c529ca9c90bf1745d2.jpg",
    },
    {
      id: "3",
      name: "Cherry Blossom Series—Rabbit",
      price: 35,
      imageUrl: "/cute-sonny-angel-pics-v0-2ttnqchuj7ld1.webp",
    },
    {
      id: "4",
      name: "Marine Series—Dolphin",
      price: 35,
      imageUrl: "/cute-sonny-angel-pics-v0-bfw5gxmjx4ld1.webp",
    },
    {
      id: "5",
      name: "Banana Series—Monkey",
      price: 32,
      imageUrl: "/f913e53a57a657ff3512453336584da8.jpg",
    },
  ];

  const handleTradeOffer = async () => {
    setIsTradeLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTradeLoading(false);
    setTradeStatus('pending');
  };

  const handleMessage = async () => {
    const contactInfo = `Contact ${profile.user?.name || 'Seller'} about ${listing.product?.name || 'this item'}`;
    
    try {
      await navigator.clipboard.writeText(contactInfo);
      setMessageStatus('copied');
      setTimeout(() => setMessageStatus('initial'), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Function to update cart count in localStorage
  const updateCartCount = () => {
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    localStorage.setItem('cartCount', (currentCount + 1).toString());
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsAddingToCart(false);
    setIsInCart(true);
    updateCartCount();
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/series/marine" className="hover:text-blue-600">
            Marine Series
          </Link>
          <span>/</span>
          <span className="text-gray-700">Clownfish</span>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image Carousel */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative aspect-square bg-[#e4f9ff] rounded-lg overflow-hidden">
              <img
                src={imageUrls[currentImageIndex]}
                alt={listing.product?.name || "Sonny Angel figurine"}
                className="w-full h-full object-contain"
              />

              {/* Heart button */}
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                <Heart size={20} className="text-gray-500" />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex mt-4 gap-2 overflow-x-auto">
              {imageUrls.map((url: string, idx: number) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`cursor-pointer w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    idx === currentImageIndex
                      ? "border-gray-200"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Listing Details */}
          <div>
            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {isPopular && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  Popular!
                </span>
              )}
              {offersSent > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {offersSent} {offersSent === 1 ? "offer" : "offers"} sent
                </span>
              )}
              {cartsCount > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In {cartsCount} {cartsCount === 1 ? "person's" : "people's"}{" "}
                  cart
                </span>
              )}
            </div>

            {/* Product title */}
            <h1 className="text-3xl border-b pb-3 font-semibold text-gray-800">
              {listing.product?.name && `${listing.product.name}`}
            </h1>

            {/* Price */}
            <div className="mt-4">
              <div className="text-lg font-bold">
                USD{" "}
                <span className="text-xl text-green-600">
                  ${listing.price ? Number(listing.price).toFixed(2) : "10.00"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Market Price: USD $
                {listing.price
                  ? (Number(listing.price) * 1.2).toFixed(2)
                  : "12.50"}
              </div>
            </div>

            {/* Seller and Buy buttons */}
            <div className="mt-4 space-y-2 max-w-xs mx-auto md:mx-0">
              {/* Message button */}
              <button 
                onClick={handleMessage}
                className="w-full bg-pink-400 text-white py-2 px-4 rounded-full font-medium flex items-center justify-center space-x-2 hover:bg-pink-500 border border-pink-500 shadow-sm"
              >
                <Avatar className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={profile.user?.image} alt={profile.user?.name} />
                  <AvatarFallback className="bg-purple-700 text-white text-xs">
                    {profile.user?.name?.charAt(0) || "J"}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2">
                  {messageStatus === 'copied' ? 'Info Copied!' : 'Message'}
                </span>
              </button>

              {/* Trade offer button */}
              <button 
                onClick={handleTradeOffer}
                disabled={isTradeLoading || tradeStatus === 'pending'}
                className={`w-full py-2 px-4 rounded-full font-medium shadow-sm flex items-center justify-center ${
                  tradeStatus === 'pending'
                    ? 'bg-gray-200 text-gray-700 border border-gray-300'
                    : 'bg-blue-400 text-white hover:bg-blue-500 border border-blue-500'
                }`}
              >
                {isTradeLoading && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isTradeLoading ? 'Sending...' : 
                 tradeStatus === 'pending' ? 'Offer Sent' : 
                 'Send Trade Offer'}
              </button>

              {/* Add to cart button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || isInCart}
                className={`w-full py-2 px-4 rounded-full font-medium shadow-sm flex items-center justify-center ${
                  isInCart
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding to Cart...
                  </>
                ) : isInCart ? (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Product details */}
            <div className="mt-6 border-t pt-5 space-y-4">
              <div>
                <div className="text-gray-700 font-bold">Condition:</div>
                <div>Excellent</div>
              </div>

              <div>
                <div className="font-bold text-gray-700">ISO:</div>
                <div>{listing.product.series}</div>
              </div>

              <div>
                <div className="font-bold text-gray-700">Notes:</div>
                <div>{listing.description}</div>
              </div>
            </div>

            {/* Seller details */}
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center">
                <Link
                  href={`/profile/${profile.id}`}
                  className="flex items-center"
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage
                      src={profile.user?.image}
                      alt={profile.user?.name}
                    />
                    <AvatarFallback className="bg-purple-700 text-white">
                      {profile.user?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {profile.user?.name || "alfo_noto"}
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1">(90)</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span>123 sold</span>
                    </div>
                  </div>
                </Link>
                <div className="ml-auto flex">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <MessageCircle size={20} />
                  </button>
                  <button className="p-2 ml-2 text-gray-500 hover:text-gray-700">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Sonny Angels */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Similar Sonny Angels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {similarItems.map((item, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart size={16} className="text-gray-500" />
                </button>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="font-bold mt-1">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="/f02889bcb631108051ab7474f39759cd.jpg"
                alt="Sky Color Series—Snowy"
                className="w-full h-full object-cover"
              />
              <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium">Sky Color Series—Snowy</h3>
              <p className="font-bold mt-1">$35</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
