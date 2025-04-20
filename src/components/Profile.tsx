'use client'
import React from 'react'
import { UserCircle, Star } from "lucide-react"
import Link from "next/link"

type ProfileProps = {
  userId: string
  isCompact?: boolean
  showLink?: boolean
}

export default function Profile({ userId, isCompact = false, showLink = false }: ProfileProps) {
  // TODO: Fetch user data based on userId
  const userData = {
    name: `User ${userId}`,
    rating: 4.8,
    totalRatings: 120
  }

  const ProfileContent = () => (
    <div className={`flex items-center ${isCompact ? 'gap-3' : 'justify-center gap-8'}`}>
      <div className={`${isCompact ? 'w-12 h-12' : 'w-32 h-32'} rounded-full bg-blue-100 flex items-center justify-center`}>
        <UserCircle className={`${isCompact ? 'w-10 h-10' : 'w-24 h-24'} text-blue-600`} />
      </div>
      <div className="flex flex-col">
        <h1 className={`${isCompact ? 'text-lg' : 'text-3xl'} font-bold text-gray-900 ${isCompact ? 'mb-0.5' : 'mb-2'}`}>
          {userData.name}
        </h1>
        <div className="flex items-center space-x-1">
          <Star className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400 fill-current`} />
          <span className={`${isCompact ? 'text-base' : 'text-lg'} font-semibold`}>{userData.rating}</span>
          <span className={`${isCompact ? 'text-sm' : 'text-base'} text-gray-500`}>({userData.totalRatings} ratings)</span>
        </div>
      </div>
    </div>
  )

  if (showLink) {
    return (
      <Link 
        href={{ pathname: `/profile/${userId}` }}
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <ProfileContent />
      </Link>
    )
  }

  return <ProfileContent />
}
