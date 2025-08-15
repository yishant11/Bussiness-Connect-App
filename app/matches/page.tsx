"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {  MessageCircle, Search, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock matches data
const mockMatches = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    photo: "/attractive-woman-smiling.png",
    lastMessage: "Hey! Thanks for the match 😊",
    timeAgo: "2 hours ago",
    isNew: true,
    interests: ["Photography", "Hiking", "Coffee"],
  },
  {
    id: 2,
    name: "Alex",
    age: 29,
    photo: "/handsome-man-outdoors.png",
    lastMessage: "Would love to grab coffee sometime!",
    timeAgo: "1 day ago",
    isNew: false,
    interests: ["Cooking", "Tech", "Music"],
  },
  {
    id: 3,
    name: "Sofia",
    age: 24,
    photo: "/beautiful-woman-laughing.png",
    lastMessage: "That hiking photo is amazing! Where was it taken?",
    timeAgo: "3 days ago",
    isNew: false,
    interests: ["Yoga", "Wine", "Reading"],
  },
  {
    id: 4,
    name: "Marcus",
    age: 31,
    photo: "/handsome-professional-man.png",
    lastMessage: null,
    timeAgo: "Just matched",
    isNew: true,
    interests: ["Fitness", "Travel", "Movies"],
  },
  {
    id: 5,
    name: "Lily",
    age: 27,
    photo: "/beautiful-woman-artistic.png",
    lastMessage: "Love your taste in music!",
    timeAgo: "1 week ago",
    isNew: false,
    interests: ["Art", "Dancing", "Fashion"],
  },
]

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "new" | "recent">("all")

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" || (filter === "new" && match.isNew) || (filter === "recent" && match.lastMessage)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            </div>
            <span className="font-serif font-bold text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                BizConnect
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/discover">
              <Button variant="ghost" size="sm" className="text-primary">
                Discover
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            Your Matches
            <Sparkles className="w-8 h-8 text-primary" />
          </h1>
          <p className="text-gray-600 text-lg">People who liked you back</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-2 border-gray-200 focus:border-primary"
            />
          </div>

          <div className="flex justify-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-primary" : ""}
            >
              All ({mockMatches.length})
            </Button>
            <Button
              variant={filter === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("new")}
              className={filter === "new" ? "bg-primary" : ""}
            >
              New ({mockMatches.filter((m) => m.isNew).length})
            </Button>
            <Button
              variant={filter === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("recent")}
              className={filter === "recent" ? "bg-primary" : ""}
            >
              Recent ({mockMatches.filter((m) => m.lastMessage).length})
            </Button>
          </div>
        </div>

        {/* Matches Grid */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <Link href="/discover">
              <Button className="bg-gradient-to-r from-primary to-pink-500">
                Keep Swiping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <Card
                key={match.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0 bg-white relative"
              >
                {match.isNew && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-gradient-to-r from-primary to-pink-500 text-white">New</Badge>
                  </div>
                )}

                <div className="relative">
                  <img src={match.photo || "/placeholder.svg"} alt={match.name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-serif text-xl font-bold">
                      {match.name}, {match.age}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Interests */}
                  <div className="flex flex-wrap gap-1">
                    {match.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {/* Last Message */}
                  {match.lastMessage ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-700 line-clamp-2">{match.lastMessage}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {match.timeAgo}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-500 mb-2">Start the conversation!</p>
                      <div className="flex items-center justify-center gap-1 text-xs text-primary">
                        <Sparkles className="w-3 h-3" />
                        {match.timeAgo}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link href={`/chat/${match.id}`} className="block">
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white rounded-full"
                      size="sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {match.lastMessage ? "Continue Chat" : "Say Hello"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filteredMatches.length > 0 && (
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-pink-500/10 rounded-2xl">
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">Want more matches?</h3>
            <p className="text-gray-600 mb-4">Keep swiping to find more amazing people</p>
            <Link href="/discover">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white px-8 py-3 rounded-full"
              >
                Back to Discover
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
