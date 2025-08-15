"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Upload, MapPin, Briefcase, GraduationCap, X } from "lucide-react"
import Link from "next/link"

const interests = [
  "Travel",
  "Photography",
  "Cooking",
  "Fitness",
  "Music",
  "Movies",
  "Reading",
  "Dancing",
  "Hiking",
  "Art",
  "Gaming",
  "Sports",
  "Yoga",
  "Wine",
  "Coffee",
  "Fashion",
  "Tech",
  "Pets",
]

export default function CreateProfile() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [photos, setPhotos] = useState<string[]>([])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const addPhoto = () => {
    // Simulate photo upload with placeholder
    const newPhoto = `/placeholder.svg?height=400&width=300&query=attractive person photo ${photos.length + 1}`
    setPhotos((prev) => [...prev, newPhoto])
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-serif font-bold text-2xl bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              BizConnect
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-800 mb-4">Create Your Profile</h1>
          <p className="text-gray-600 text-lg">Show the world who you are and what you're looking for</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Tell us about yourself</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photos Section */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">Your Photos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Profile photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {photos.length < 6 && (
                  <button
                    onClick={addPhoto}
                    className="h-48 border-2 border-dashed border-primary rounded-lg flex flex-col items-center justify-center text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Upload className="w-8 h-8 mb-2" />
                    <span>Add Photo</span>
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Add up to 6 photos. Your first photo will be your main profile picture.
              </p>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your first name" />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="25" />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input id="location" placeholder="New York, NY" />
            </div>

            <div>
              <Label htmlFor="job" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Job Title
              </Label>
              <Input id="job" placeholder="Software Engineer at Google" />
            </div>

            <div>
              <Label htmlFor="education" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </Label>
              <Input id="education" placeholder="University of California, Berkeley" />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">About Me</Label>
              <Textarea
                id="bio"
                placeholder="Tell people about yourself, your hobbies, what you're looking for..."
                className="min-h-[120px]"
              />
            </div>

            {/* Interests */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedInterests.includes(interest) ? "bg-primary hover:bg-primary/90" : "hover:bg-primary/10"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">Select interests that represent you</p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Link href="/discover">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Matching
                  <Heart className="ml-2 w-5 h-5 fill-white" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
