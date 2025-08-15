"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Edit, MapPin, Briefcase, GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock user profile data
const userProfile = {
  name: "You",
  age: 28,
  location: "New York, NY",
  job: "Product Designer at Tech Co",
  education: "NYU Design School",
  photos: ["/my-profile.png", "/profile-photo-2.png"],
  bio: "Love exploring new places, trying different cuisines, and having deep conversations over coffee. Looking for someone genuine who shares my passion for adventure and creativity.",
  interests: ["Photography", "Travel", "Coffee", "Design", "Hiking", "Art", "Music", "Cooking"],
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/discover" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">Back</span>
          </Link>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            </div>
            <span className="font-serif font-bold text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              BizConnect
            </span>
          </Link>
          <Button variant="ghost" size="sm" className="text-primary">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-2">Your Profile</h1>
          <p className="text-gray-600 text-lg">This is how others see you</p>
        </div>

        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Photo Gallery */}
          <div className="grid grid-cols-2 gap-1">
            {userProfile.photos.map((photo, index) => (
              <div key={index} className={`relative ${index === 0 ? "col-span-2 h-96" : "h-48"}`}>
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Profile photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                )}
                {index === 0 && (
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="font-serif text-3xl font-bold mb-1">
                      {userProfile.name}, {userProfile.age}
                    </h2>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {userProfile.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>{userProfile.job}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>{userProfile.education}</span>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">About Me</h3>
              <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
            </div>

            {/* Interests */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">My Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="bg-primary/10 text-primary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Link href="/profile/edit" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Link href="/settings" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tips */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-pink-500/5 border-0">
          <CardHeader>
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              Profile Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• Add more photos to increase your match rate by 40%</p>
            <p>• Update your bio regularly to keep your profile fresh</p>
            <p>• Show your personality through your interests and photos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
