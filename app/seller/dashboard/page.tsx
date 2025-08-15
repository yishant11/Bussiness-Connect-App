"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Heart,
  X,
  Filter,
  Star,
  Users,
  Building2,
} from "lucide-react"

// Mock buyer data
const mockBuyers = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Chen",
    avatar: "/professional-woman-diverse.png",
    location: "San Francisco, CA",
    investmentRange: "$1M - $3M",
    liquidCapital: "$500K - $1M",
    industries: ["Technology", "SaaS", "E-commerce"],
    experience: "3-5 deals",
    timeframe: "Within 3 months",
    bio: "Former tech executive with 15 years of experience scaling startups. Looking for profitable SaaS businesses with recurring revenue.",
    verified: true,
    matchScore: 95,
    acquisitionType: "Owner-operator",
    financingOptions: ["Cash Purchase", "SBA Loan"],
    background: "VP of Engineering at two successful exits",
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Rodriguez",
    avatar: "/professional-man.png",
    location: "Austin, TX",
    investmentRange: "$500K - $1M",
    liquidCapital: "$200K - $500K",
    industries: ["Restaurant", "Retail", "Local Services"],
    experience: "First-time buyer",
    timeframe: "Within 6 months",
    bio: "Restaurant industry veteran seeking to acquire an established local restaurant with growth potential.",
    verified: true,
    matchScore: 88,
    acquisitionType: "Owner-operator",
    financingOptions: ["SBA Loan", "Seller Financing"],
    background: "20 years restaurant management experience",
  },
  {
    id: 3,
    firstName: "Jennifer",
    lastName: "Park",
    avatar: "/professional-woman-diverse.png",
    location: "Chicago, IL",
    investmentRange: "$3M - $5M",
    liquidCapital: "$1M+",
    industries: ["Manufacturing", "Healthcare", "Professional Services"],
    experience: "Serial acquirer",
    timeframe: "Ready to buy now",
    bio: "Private equity background with focus on operational improvements and growth acceleration.",
    verified: true,
    matchScore: 92,
    acquisitionType: "Strategic add-on",
    financingOptions: ["Cash Purchase", "Bank Financing"],
    background: "Former PE associate, 8 successful acquisitions",
  },
]

export default function SellerDashboard() {
  const [currentBuyerIndex, setCurrentBuyerIndex] = useState(0)
  const [matches, setMatches] = useState<number[]>([])
  const [passed, setPassed] = useState<number[]>([])

  const currentBuyer = mockBuyers[currentBuyerIndex]

  const handleAccept = () => {
    if (currentBuyer) {
      setMatches([...matches, currentBuyer.id])
      nextBuyer()
    }
  }

  const handlePass = () => {
    if (currentBuyer) {
      setPassed([...passed, currentBuyer.id])
      nextBuyer()
    }
  }

  const nextBuyer = () => {
    if (currentBuyerIndex < mockBuyers.length - 1) {
      setCurrentBuyerIndex(currentBuyerIndex + 1)
    }
  }

  if (!currentBuyer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-bold text-xl text-primary">DealMatch</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/seller/matches" className="text-slate-600 hover:text-primary">
                Matches ({matches.length})
              </Link>
              <Link href="/seller/profile" className="text-slate-600 hover:text-primary">
                My Profile
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">You've seen all buyers!</h2>
            <p className="text-slate-600 mb-6">Check back later for new buyer profiles, or review your matches.</p>
            <Link href="/seller/matches">
              <Button className="bg-primary hover:bg-primary/90">View My Matches ({matches.length})</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-primary">DealMatch</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Link href="/seller/matches" className="text-slate-600 hover:text-primary">
              Matches ({matches.length})
            </Link>
            <Link href="/seller/profile" className="text-slate-600 hover:text-primary">
              My Profile
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="text-center mb-6">
          <p className="text-slate-500">
            {currentBuyerIndex + 1} of {mockBuyers.length} buyers
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden bg-white">
            {/* Match Score Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary text-white font-semibold">
                <Star className="w-3 h-3 mr-1" />
                {currentBuyer.matchScore}% Match
              </Badge>
            </div>

            {/* Profile Header */}
            <CardHeader className="text-center pb-4 bg-gradient-to-b from-slate-50 to-white">
              <div className="relative">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={currentBuyer.avatar || "/placeholder.svg"}
                    alt={`${currentBuyer.firstName} ${currentBuyer.lastName}`}
                  />
                  <AvatarFallback className="text-xl font-semibold bg-primary text-white">
                    {currentBuyer.firstName[0]}
                    {currentBuyer.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {currentBuyer.verified && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white text-xs">Verified</Badge>
                  </div>
                )}
              </div>
              <h2 className="font-serif text-2xl font-bold text-slate-800">
                {currentBuyer.firstName} {currentBuyer.lastName}
              </h2>
              <div className="flex items-center justify-center text-slate-600 mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{currentBuyer.location}</span>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Investment Range */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-semibold text-slate-800">Investment Range</p>
                    <p className="text-sm text-slate-600">{currentBuyer.investmentRange}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Liquid Capital</p>
                  <p className="font-semibold text-slate-700">{currentBuyer.liquidCapital}</p>
                </div>
              </div>

              {/* Experience & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                  <Briefcase className="w-4 h-4 text-accent mr-2" />
                  <div>
                    <p className="text-xs text-slate-500">Experience</p>
                    <p className="font-semibold text-slate-700 text-sm">{currentBuyer.experience}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                  <Clock className="w-4 h-4 text-accent mr-2" />
                  <div>
                    <p className="text-xs text-slate-500">Timeline</p>
                    <p className="font-semibold text-slate-700 text-sm">{currentBuyer.timeframe}</p>
                  </div>
                </div>
              </div>

              {/* Industries */}
              <div>
                <p className="font-semibold text-slate-800 mb-3">Interested Industries</p>
                <div className="flex flex-wrap gap-2">
                  {currentBuyer.industries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="bg-primary/10 text-primary">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="font-semibold text-slate-800 mb-2">About</p>
                <p className="text-slate-600 leading-relaxed">{currentBuyer.bio}</p>
              </div>

              {/* Background */}
              <div className="p-4 bg-accent/5 rounded-xl border border-accent/20">
                <div className="flex items-center mb-2">
                  <Building2 className="w-4 h-4 text-accent mr-2" />
                  <p className="font-semibold text-slate-800">Background</p>
                </div>
                <p className="text-sm text-slate-600">{currentBuyer.background}</p>
              </div>

              {/* Financing Options */}
              <div>
                <p className="font-semibold text-slate-800 mb-3">Financing Options</p>
                <div className="flex flex-wrap gap-2">
                  {currentBuyer.financingOptions.map((option) => (
                    <Badge key={option} variant="outline" className="border-slate-300">
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-6 mt-8">
            <Button
              onClick={handlePass}
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-slate-300 hover:border-red-300 hover:bg-red-50 group bg-transparent"
            >
              <X className="w-6 h-6 text-slate-400 group-hover:text-red-500" />
            </Button>

            <Link href={`/seller/buyer/${currentBuyer.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                View Full Profile
              </Button>
            </Link>

            <Button
              onClick={handleAccept}
              size="lg"
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Heart className="w-6 h-6 text-white" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-primary" />
                <span>{matches.length} matches</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{mockBuyers.length - currentBuyerIndex - 1} remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
