"use client";
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { user } = useUser();
  const [profileId, setProfileId] = useState<string | null>(null);

  // Fetch profile ID when user loads
  useEffect(() => {
    if (!user) return;

    async function fetchProfileId() {
      try {
        // Direct DB query using your API
        const response = await fetch(`/api/profiles?clerkId=${user?.id}`);

        if (response.ok) {
          const data = await response.json();
          setProfileId(data.profileId);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfileId();
  }, [user]);

  // Create link URL - if profileId exists, use it, otherwise default to /create
  const createLink = profileId
    ? `/profile/${profileId}/create-listing`
    : "/create";

  const profileLink = profileId ? `/profile/${profileId}` : "/create";

  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/SonnySwapLogo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </Link>
        </div>

        <div className="flex-grow max-w-xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search items..." className="w-full pl-10" />
          </div>
        </div>

        <NavigationMenu className="w-full">
          <div className="flex items-center h-16 px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-center gap-4">
              <NavigationMenuList className="flex items-center space-x-4">
                {/* Show these components when user is signed in */}
                <SignedIn>
                  <NavigationMenuItem>
                    <Link href="/events" passHref>
                      <Button>Community Events</Button>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href={profileLink} passHref>
                      <Button variant="outline">Profile</Button>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    {/* Use the dynamic createLink instead of hardcoded "/create" */}
                    <Link href={createLink} passHref>
                      <Button variant="outline">Sell Now</Button>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <UserButton afterSignOutUrl="/" />
                  </NavigationMenuItem>
                </SignedIn>

                {/* Show these components when user is signed out */}
                <SignedOut>
                  <NavigationMenuItem>
                    <Link href="/create" legacyBehavior passHref>
                      <Button className="mr-2" asChild>
                        <NavigationMenuLink>Sell Now</NavigationMenuLink>
                      </Button>
                    </Link>

                    <SignUpButton mode="modal">
                      <Button variant="outline" className="mr-2">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <SignInButton mode="modal">
                      <Button variant="outline">Login</Button>
                    </SignInButton>
                  </NavigationMenuItem>
                </SignedOut>
              </NavigationMenuList>
            </div>
          </div>
        </NavigationMenu>
      </div>
    </div>
  );
}
