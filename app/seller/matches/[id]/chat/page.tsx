"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp,
  ArrowLeft,
  Send,
  Calendar,
  Phone,
  Video,
  Paperclip,
  MoreVertical,
  Star,
  MapPin,
} from "lucide-react"

// Mock chat data
const mockChatData = {
  match: {
    id: 1,
    buyer: {
      firstName: "Sarah",
      lastName: "Chen",
      avatar: "/professional-woman-diverse.png",
      location: "San Francisco, CA",
      investmentRange: "$1M - $3M",
      matchScore: 95,
      status: "online",
    },
    matchedAt: "2024-01-15",
  },
  messages: [
    {
      id: 1,
      senderId: "buyer",
      senderName: "Sarah Chen",
      content:
        "Hi! I'm very interested in your business. Could you tell me more about your revenue growth over the past 3 years?",
      timestamp: "2024-01-15T10:00:00Z",
      type: "text",
    },
    {
      id: 2,
      senderId: "seller",
      senderName: "You",
      content:
        "Hello Sarah! Thanks for your interest. We've seen consistent 25% YoY growth. I'd be happy to share more details in a call.",
      timestamp: "2024-01-15T10:15:00Z",
      type: "text",
    },
    {
      id: 3,
      senderId: "buyer",
      senderName: "Sarah Chen",
      content:
        "That's impressive! I'd love to schedule a call. I'm available this week. Also, could you share some high-level financials?",
      timestamp: "2024-01-15T10:30:00Z",
      type: "text",
    },
    {
      id: 4,
      senderId: "seller",
      senderName: "You",
      content: "I can share a summary after we sign an NDA. When works best for you this week?",
      timestamp: "2024-01-15T11:00:00Z",
      type: "text",
    },
    {
      id: 5,
      senderId: "buyer",
      senderName: "Sarah Chen",
      content: "Absolutely, I'm happy to sign an NDA. How about Thursday at 2 PM PST?",
      timestamp: "2024-01-16T09:00:00Z",
      type: "text",
    },
    {
      id: 6,
      senderId: "seller",
      senderName: "You",
      content: "Perfect! I'll send you a calendar invite and the NDA. Looking forward to our conversation.",
      timestamp: "2024-01-16T09:15:00Z",
      type: "text",
    },
    {
      id: 7,
      senderId: "buyer",
      senderName: "Sarah Chen",
      content:
        "Great! I've signed the NDA and accepted the meeting invite. I'd love to discuss your business further and share my acquisition experience.",
      timestamp: "2024-01-16T10:30:00Z",
      type: "text",
    },
  ],
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(mockChatData.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: "seller",
        senderName: "You",
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: "text" as const,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const { match } = mockChatData

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/seller/matches">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Matches
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-serif font-bold text-xl text-primary">DealMatch</span>
              </Link>
            </div>

            {/* Chat Header Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={match.buyer.avatar || "/placeholder.svg"}
                      alt={`${match.buyer.firstName} ${match.buyer.lastName}`}
                    />
                    <AvatarFallback className="bg-primary text-white">
                      {match.buyer.firstName[0]}
                      {match.buyer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {match.buyer.firstName} {match.buyer.lastName}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Badge className="bg-primary/10 text-primary text-xs">
                      <Star className="w-2 h-2 mr-1" />
                      {match.buyer.matchScore}%
                    </Badge>
                    <span className="text-green-500">Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Calendar className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="max-w-4xl mx-auto">
              {/* Match Info Card */}
              <Card className="border-0 shadow-lg mb-6 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                    <span>
                      You matched with {match.buyer.firstName} on {formatDate(match.matchedAt)}
                    </span>
                    <Badge className="bg-primary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {match.buyer.matchScore}% Match
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              {messages.map((message, index) => {
                const isCurrentUser = message.senderId === "seller"
                const showDate =
                  index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                          {formatDate(message.timestamp)}
                        </Badge>
                      </div>
                    )}

                    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
                      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md`}>
                        {!isCurrentUser && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={match.buyer.avatar || "/placeholder.svg"}
                              alt={`${match.buyer.firstName} ${match.buyer.lastName}`}
                            />
                            <AvatarFallback className="bg-primary text-white text-sm">
                              {match.buyer.firstName[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isCurrentUser
                              ? "bg-primary text-white rounded-br-sm"
                              : "bg-white border shadow-sm rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isCurrentUser ? "text-primary-foreground/70" : "text-slate-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>

                        {isCurrentUser && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-accent text-white text-sm">You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t bg-white p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Paperclip className="w-4 h-4" />
                </Button>

                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="min-h-[44px] max-h-32 resize-none rounded-xl border-slate-200 focus:border-primary"
                    rows={1}
                  />
                </div>

                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary hover:bg-primary/90 rounded-xl px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Share Documents
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l bg-white/50 p-4 space-y-6">
          {/* Buyer Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <Avatar className="w-20 h-20 mx-auto mb-3">
                <AvatarImage
                  src={match.buyer.avatar || "/placeholder.svg"}
                  alt={`${match.buyer.firstName} ${match.buyer.lastName}`}
                />
                <AvatarFallback className="bg-primary text-white text-lg">
                  {match.buyer.firstName[0]}
                  {match.buyer.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-serif text-lg font-semibold text-slate-800">
                {match.buyer.firstName} {match.buyer.lastName}
              </h3>
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
                <MapPin className="w-3 h-3" />
                <span>{match.buyer.location}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Investment Range</span>
                <span className="font-semibold text-slate-800">{match.buyer.investmentRange}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Match Score</span>
                <Badge className="bg-primary text-white">
                  <Star className="w-3 h-3 mr-1" />
                  {match.buyer.matchScore}%
                </Badge>
              </div>
              <Link href={`/seller/buyer/${match.id}`}>
                <Button variant="outline" className="w-full bg-transparent">
                  View Full Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <h4 className="font-semibold text-slate-800">Quick Actions</h4>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                Start Voice Call
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Video className="w-4 h-4 mr-2" />
                Start Video Call
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Paperclip className="w-4 h-4 mr-2" />
                Share Documents
              </Button>
            </CardContent>
          </Card>

          {/* Match Timeline */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <h4 className="font-semibold text-slate-800">Timeline</h4>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Matched</p>
                  <p className="text-xs text-slate-500">{formatDate(match.matchedAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">First Message</p>
                  <p className="text-xs text-slate-500">Jan 15</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <div>
                  <p className="text-sm text-slate-600">Meeting Scheduled</p>
                  <p className="text-xs text-slate-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
