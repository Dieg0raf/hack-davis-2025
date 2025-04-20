"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Heart } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Davis Sonny Angel Meetup",
    date: "April 15, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "UC Davis Memorial Union",
    description: "Join fellow collectors for trading and showcasing your favorite Sonny Angels! Bring your duplicates for trading.",
    image: "/sonyG.webp",
    attendees: 25,
  },
  {
    id: 2,
    title: "Sacramento Sonny Swap",
    date: "April 20, 2024",
    time: "1:00 PM - 5:00 PM",
    location: "Midtown Sacramento",
    description: "Large scale Sonny Angel trading event! Special focus on Easter and Spring series. Refreshments provided.",
    image: "/sonyH.webp",
    attendees: 50,
  },
  {
    id: 3,
    title: "Bay Area Collector's Convention",
    date: "May 5, 2024",
    time: "11:00 AM - 6:00 PM",
    location: "San Francisco Convention Center",
    description: "The biggest Sonny Angel event in Northern California! Featuring rare collections, trading zones, and special guests.",
    image: "/sonyF.jpg",
    attendees: 200,
  },
];

export default function EventsPage() {
  const [interestedEvents, setInterestedEvents] = useState<number[]>([]);

  const toggleInterest = (eventId: number) => {
    setInterestedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7]">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src="/sonyHero.webp"
          alt="Sonny Angel Events"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFF5F7]/90">
          <div className="container mx-auto h-full flex items-end justify-center pb-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                Sonny Angel Events Near You
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Join our community events and meet fellow Sonny Angel enthusiasts!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-pink-100"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 relative h-48 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-pink-100 flex items-center justify-center">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                      <Button
                        variant="ghost"
                        className="rounded-full p-2"
                        onClick={() => toggleInterest(event.id)}
                      >
                        <Heart
                          className={`h-6 w-6 ${
                            interestedEvents.includes(event.id)
                              ? "fill-[#FFA6BD] text-[#FFA6BD]"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-[#FFA6BD]" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-[#FFA6BD]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-[#FFA6BD]" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <Button 
                      className="rounded-full bg-[#FFA6BD] hover:bg-[#ff8fab] text-gray-700 border-gray-700"
                    >
                      RSVP Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 