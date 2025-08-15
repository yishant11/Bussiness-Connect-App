"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Sparkles, MapPin } from "lucide-react"
import Link from "next/link"

interface MatchNotificationProps {
  match: {
    id: number
    name: string
    age: number
    photo: string
    location: string
    interests: string[]
  }
  onClose: () => void
}

export function MatchNotification({ match, onClose }: MatchNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card
          className={`border-0 shadow-2xl bg-white max-w-sm w-full transition-all duration-500 transform ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">It's a Match!</h3>
              <p className="text-gray-600">You and {match.name} liked each other</p>
            </div>

            <div className="mb-6">
              <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={match.photo || "/placeholder.svg"} alt={match.name} />
                <AvatarFallback className="bg-primary text-white text-xl">{match.name[0]}</AvatarFallback>
              </Avatar>

              <h4 className="font-serif text-xl font-semibold text-gray-800 mb-1">
                {match.name}, {match.age}
              </h4>

              <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{match.location}</span>
              </div>

              <div className="flex flex-wrap justify-center gap-1">
                {match.interests.slice(0, 3).map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs bg-primary/10 text-primary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Link href={`/chat/${match.id}`}>
                <Button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white py-3 rounded-full shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Send a Message
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full border-2 border-gray-200 hover:bg-gray-50 py-3 rounded-full bg-transparent"
              >
                Keep Swiping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
