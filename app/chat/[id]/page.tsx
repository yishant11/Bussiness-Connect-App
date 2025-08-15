"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft, MoreVertical, Phone, Video } from "lucide-react"
import Link from "next/link"

// Mock chat data
const mockChatData = {
  1: {
    user: {
      id: 1,
      name: "Emma",
      age: 26,
      photo: "/attractive-woman-smiling.png",
      isOnline: true,
      interests: ["Photography", "Hiking", "Coffee"],
    },
    messages: [
      {
        id: 1,
        text: "Hey! Thanks for the match 😊",
        sender: "them",
        timestamp: "2:30 PM",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: 2,
        text: "Hi Emma! I love your hiking photos, where was that mountain shot taken?",
        sender: "me",
        timestamp: "2:35 PM",
        time: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      },
      {
        id: 3,
        text: "That was at Mount Washington! It was such an amazing sunrise hike. Do you hike often?",
        sender: "them",
        timestamp: "2:40 PM",
        time: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: 4,
        text: "I try to get out every weekend when the weather's nice. Would love to find a hiking buddy!",
        sender: "me",
        timestamp: "2:45 PM",
        time: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: 5,
        text: "That sounds perfect! I know some great trails around here. Maybe we could plan something for this weekend?",
        sender: "them",
        timestamp: "2:50 PM",
        time: new Date(Date.now() - 10 * 60 * 1000),
      },
    ],
  },
  2: {
    user: {
      id: 2,
      name: "Alex",
      age: 29,
      photo: "/handsome-man-outdoors.png",
      isOnline: false,
      interests: ["Cooking", "Tech", "Music"],
    },
    messages: [
      {
        id: 1,
        text: "Would love to grab coffee sometime!",
        sender: "them",
        timestamp: "Yesterday",
        time: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: 2,
        text: "That sounds great! I know a perfect little cafe downtown",
        sender: "me",
        timestamp: "Yesterday",
        time: new Date(Date.now() - 23 * 60 * 60 * 1000),
      },
    ],
  },
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const chatId = Number.parseInt(params.id)
  const chatData = mockChatData[chatId as keyof typeof mockChatData]
  const [messages, setMessages] = useState(chatData?.messages || [])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "me" as const,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      time: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate typing indicator and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const responses = [
        "That sounds amazing!",
        "I'd love that!",
        "When works for you?",
        "Perfect! Can't wait 😊",
        "You're so sweet!",
      ]
      const response = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "them" as const,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        time: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  if (!chatData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Chat not found</h2>
          <Link href="/matches">
            <Button className="bg-gradient-to-r from-primary to-pink-500">Back to Matches</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex flex-col">
      {/* Chat Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/matches">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>

            <Avatar className="w-10 h-10">
              <AvatarImage src={chatData.user.photo || "/placeholder.svg"} alt={chatData.user.name} />
              <AvatarFallback>{chatData.user.name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="font-semibold text-gray-800">
                {chatData.user.name}, {chatData.user.age}
              </h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${chatData.user.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                <span className="text-sm text-gray-500">
                  {chatData.user.isOnline ? "Online" : "Last seen recently"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 text-primary">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-primary">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Match Info Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-pink-500/10 p-4 border-b">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">You matched with {chatData.user.name}!</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {chatData.user.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs bg-white/50">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "me"
                    ? "bg-gradient-to-r from-primary to-pink-500 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white/70" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-sm px-4 py-2 rounded-2xl max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white/90 backdrop-blur-sm border-t p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${chatData.user.name}...`}
                className="pr-12 rounded-full border-2 border-gray-200 focus:border-primary"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
