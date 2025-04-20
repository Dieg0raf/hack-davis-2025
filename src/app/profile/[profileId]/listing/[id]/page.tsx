"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import ListingContent from "./ListingContent";
import ListingContent from "@/app/profile/[profileId]/listing/[id]/ListingContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ListingPage() {
  const params = useParams();
  const profileId = params.profileId as string;
  const listingId = params.id as string;

  const [profile, setProfile] = useState(null);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch profile data
        const profileResponse = await fetch(`/api/profiles/${profileId}`);
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Find the listing in the profile's listings
        const listingData = profileData.listings.find(
          (l: { id: string }) => l.id === listingId
        );

        if (!listingData) {
          throw new Error("Listing not found");
        }

        setListing(listingData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (profileId && listingId) {
      fetchData();
    }
  }, [profileId, listingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !profile || !listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Error Loading Listing
            </h2>
            <p className="text-gray-600 mb-4">{error || "Listing not found"}</p>
            <Link href={`/profile/${profileId}`}>
              <Button>Return to Profile</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to profile button */}
        <div className="mb-6">
          <Link href={`/profile/${profileId}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Profile
            </Button>
          </Link>
        </div>

        {/* Listing Content */}
        <ListingContent listing={listing} profile={profile} />
      </main>
    </div>
  );
}
