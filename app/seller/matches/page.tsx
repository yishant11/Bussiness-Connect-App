"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  MessageCircle,
  Calendar,
  Phone,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Heart,
  Star,
  MapPin,
  DollarSign,
} from "lucide-react"

// Mock matches data
const mockMatches = [
  {
    id: 1,
    buyer: {
      firstName: "Sarah",
      lastName: "Chen",
      avatar: "/professional-woman-diverse.png",
      location: "San Francisco, CA",
      investmentRange: "$1M - $3M",
      industries: ["Technology", "SaaS"],
      matchScore: 95,
    },
    status: "active",
    matchedAt: "2024-01-15",
    lastMessage: "I'd love to schedule a call to discuss your business further.",
    lastMessageAt: "2024-01-16T10:30:00Z",
    unreadCount: 2,
    nextStep: "Schedule initial call",
    meetingScheduled: false,
  },
  {
    id: 2,
    buyer: {
      firstName: "Michael",
      lastName: "Rodriguez",
      avatar: "/professional-man.png",
      location: "Austin, TX",
      investmentRange: "$500K - $1M",
      industries: ["Restaurant", "Retail"],
      matchScore: 88,
    },
    status: "pending",
    matchedAt: "2024-01-14",
    lastMessage: "Thanks for connecting! I'm very interested in learning more.",
    lastMessageAt: "2024-01-14T15:45:00Z",
    unreadCount: 0,
    nextStep: "Waiting for your response",
    meetingScheduled: false,
  },
  {
    id: 3,
    buyer: {
      firstName: "Jennifer",
      lastName: "Park",
      avatar: "/professional-woman-diverse.png",
      location: "Chicago, IL",
      investmentRange: "$3M - $5M",
      industries: ["Manufacturing", "Healthcare"],
      matchScore: 92,
    },
    status: "meeting_scheduled",
    matchedAt: "2024-01-12",
    lastMessage: "Looking forward to our call tomorrow at 2 PM EST.",
    lastMessageAt: "2024-01-15T14:20:00Z",
    unreadCount: 0,
    nextStep: "Initial call scheduled for Jan 17, 2 PM EST",
    meetingScheduled: true,
    meetingDate: "2024-01-17T19:00:00Z",
  },
  {
    id: 4,
    buyer: {
      firstName: "David",
      lastName: "Kim",
      avatar: "/professional-man.png",
      location: "Seattle, WA",
      investmentRange: "$1M - $3M",
      industries: ["Technology", "E-commerce"],
      matchScore: 90,
    },
    status: "in_negotiation",
    matchedAt: "2024-01-08",
    lastMessage: "I've reviewed the financials and would like to discuss the terms.",
    lastMessageAt: "2024-01-15T11:15:00Z",
    unreadCount: 1,
    nextStep: "Review LOI draft",
    meetingScheduled: false,
  },
]

export default function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch =
      match.buyer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.buyer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.buyer.location.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && match.status === "active"
    if (activeTab === "scheduled") return matchesSearch && match.status === "meeting_scheduled"
    if (activeTab === "negotiating") return matchesSearch && match.status === "in_negotiation"

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-primary text-white">
            <MessageCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-300 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "meeting_scheduled":
        return (
          <Badge className="bg-accent text-white">
            <Calendar className="w-3 h-3 mr-1" />
            Meeting Scheduled
          </Badge>
        )
      case "in_negotiation":
        return (
          <Badge className="bg-blue-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            In Negotiation
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return formatDate(dateString)
    }
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
          <nav className="flex items-center space-x-6">
            <Link href="/seller/dashboard" className="text-slate-600 hover:text-primary transition-colors">
              Browse Buyers
            </Link>
            <Link href="/seller/profile" className="text-slate-600 hover:text-primary transition-colors">
              My Profile
            </Link>
            <Link href="/seller/settings" className="text-slate-600 hover:text-primary transition-colors">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">Your Matches</h1>
              <p className="text-slate-600">Manage your connections with potential buyers</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">{mockMatches.length}</p>
                <p className="text-sm text-slate-600">Total Matches</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">
                  {mockMatches.filter((m) => m.status === "active").length}
                </p>
                <p className="text-sm text-slate-600">Active Conversations</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">
                  {mockMatches.filter((m) => m.status === "meeting_scheduled").length}
                </p>
                <p className="text-sm text-slate-600">Meetings Scheduled</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-800">
                  {mockMatches.filter((m) => m.status === "in_negotiation").length}
                </p>
                <p className="text-sm text-slate-600">In Negotiation</p>
              </CardContent>
            </Card>
          </div>

          {/* Matches List */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
              <TabsTrigger value="all">All Matches</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="negotiating">Negotiating</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredMatches.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-slate-600 mb-2">No matches found</h3>
                    <p className="text-slate-500 mb-6">
                      {searchTerm ? "Try adjusting your search terms" : "Start browsing buyers to create matches"}
                    </p>
                    <Link href="/seller/dashboard">
                      <Button className="bg-primary hover:bg-primary/90">Browse Buyers</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredMatches.map((match) => (
                    <Card key={match.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16 border-2 border-white shadow-lg">
                                <AvatarImage
                                  src={match.buyer.avatar || "/placeholder.svg"}
                                  alt={`${match.buyer.firstName} ${match.buyer.lastName}`}
                                />
                                <AvatarFallback className="text-lg font-semibold bg-primary text-white">
                                  {match.buyer.firstName[0]}
                                  {match.buyer.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              {match.unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                  {match.unreadCount}
                                </div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-serif text-xl font-semibold text-slate-800">
                                  {match.buyer.firstName} {match.buyer.lastName}
                                </h3>
                                <Badge className="bg-primary/10 text-primary">
                                  <Star className="w-3 h-3 mr-1" />
                                  {match.buyer.matchScore}% Match
                                </Badge>
                                {getStatusBadge(match.status)}
                              </div>

                              <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  <span>{match.buyer.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  <span>{match.buyer.investmentRange}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {match.buyer.industries.map((industry) => (
                                    <Badge key={industry} variant="secondary" className="text-xs">
                                      {industry}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-slate-600 text-sm mb-1">{match.lastMessage}</p>
                                  <p className="text-xs text-slate-500">
                                    Last message: {formatTime(match.lastMessageAt)}
                                  </p>
                                </div>
                              </div>

                              {match.nextStep && (
                                <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                  <p className="text-sm font-medium text-slate-700">Next Step:</p>
                                  <p className="text-sm text-slate-600">{match.nextStep}</p>
                                  {match.meetingScheduled && match.meetingDate && (
                                    <div className="flex items-center mt-2 text-sm text-accent">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      <span>
                                        {new Date(match.meetingDate).toLocaleDateString("en-US", {
                                          weekday: "long",
                                          month: "long",
                                          day: "numeric",
                                          hour: "numeric",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <Link href={`/seller/matches/${match.id}/chat`}>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Chat
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule
                            </Button>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
