"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Briefcase, RotateCcw, MessageCircle } from "lucide-react"
import Link from "next/link"
import { MatchNotification } from "@/components/match-notification"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    location: "New York, NY",
    job: "Graphic Designer",
    photos: ["/attractive-woman-smiling.png"],
    bio: "Love exploring new coffee shops and weekend hiking adventures. Looking for someone who shares my passion for creativity and outdoor activities.",
    interests: ["Photography", "Hiking", "Coffee", "Art", "Travel"],
  },
  {
    id: 2,
    name: "Alex",
    age: 29,
    location: "Brooklyn, NY",
    job: "Software Engineer",
    photos: ["/handsome-man-outdoors.png"],
    bio: "Tech enthusiast by day, chef by night. Always up for trying new restaurants or cooking something delicious at home.",
    interests: ["Cooking", "Tech", "Music", "Fitness", "Movies"],
  },
  {
    id: 3,
    name: "Sofia",
    age: 24,
    location: "Manhattan, NY",
    job: "Marketing Manager",
    photos: ["/beautiful-woman-laughing.png"],
    bio: "Yoga instructor and marketing professional. Seeking genuine connections and meaningful conversations over great wine.",
    interests: ["Yoga", "Wine", "Reading", "Dancing", "Fashion"],
  },
]

export default function DiscoverPage() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showMatchNotification, setShowMatchNotification] = useState(false)
  const [matchedUser, setMatchedUser] = useState<any>(null)

  const currentUser = mockUsers[currentUserIndex]

  const handleSwipe = (direction: "left" | "right") => {
    setIsAnimating(true)

    if (direction === "right") {
      // Simulate 30% chance of match
      if (Math.random() > 0.7) {
        setMatchedUser(currentUser)
        setShowMatchNotification(true)
      }
    }

    setTimeout(() => {
      setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length)
      setIsAnimating(false)
    }, 300)
  }

  const handlePass = () => handleSwipe("left")
  const handleLike = () => handleSwipe("right")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            </div>
            <span className="font-serif font-bold text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              BizConnect
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/matches">
              <Button variant="ghost" size="sm" className="text-primary">
                <MessageCircle className="w-5 h-5 mr-2" />
               BizConnect
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-primary">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-2">Discover</h1>
          <p className="text-gray-600">Swipe right to like, left to pass</p>
        </div>

        {/* Profile Card */}
        <div className="relative">
          <Card
            className={`overflow-hidden shadow-2xl border-0 transition-all duration-300 ${
              isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
            }`}
          >
            {/* Photo */}
            <div className="relative">
              <img
                src={currentUser.photos[0] || "/placeholder.svg"}
                alt={currentUser.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Basic Info Overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="font-serif text-3xl font-bold mb-1">
                  {currentUser.name}, {currentUser.age}
                </h2>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentUser.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {currentUser.job}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">{currentUser.bio}</p>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-primary/10 text-primary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <Button
              onClick={handlePass}
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 transition-all duration-200 hover:scale-110 bg-transparent"
            >
              <X className="w-8 h-8 text-gray-600 hover:text-red-500" />
            </Button>

            <Button
              onClick={() => setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length)}
              size="lg"
              variant="outline"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 hover:scale-110"
            >
              <RotateCcw className="w-5 h-5 text-gray-600 hover:text-blue-500" />
            </Button>

            <Button
              onClick={handleLike}
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Tip: Tap the photo to see more pictures</p>
        </div>
      </div>

      {showMatchNotification && matchedUser && (
        <MatchNotification
          match={matchedUser}
          onClose={() => {
            setShowMatchNotification(false)
            setMatchedUser(null)
          }}
        />
      )}
    </div>
  )
}
