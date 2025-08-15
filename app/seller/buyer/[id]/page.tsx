"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  MapPin,
  DollarSign,
  Briefcase,
  Heart,
  ArrowLeft,
  Star,
  Building2,
  Users,
  Target,
  CheckCircle,
  Phone,
  Mail,
  LinkedinIcon,
  FileText,
  Calendar,
} from "lucide-react"

// Mock detailed buyer data
const mockBuyerDetails = {
  id: 1,
  firstName: "Sarah",
  lastName: "Chen",
  avatar: "/professional-woman-diverse.png",
  location: "San Francisco, CA",
  email: "sarah.chen@email.com",
  phone: "(555) 123-4567",
  linkedIn: "linkedin.com/in/sarahchen",
  investmentRange: "$1M - $3M",
  liquidCapital: "$500K - $1M",
  industries: ["Technology", "SaaS", "E-commerce"],
  experience: "3-5 deals",
  timeframe: "Within 3 months",
  bio: "Former tech executive with 15 years of experience scaling startups from seed to IPO. I'm passionate about finding profitable SaaS businesses with strong recurring revenue and growth potential. My background in engineering and product management allows me to quickly assess technical businesses and identify optimization opportunities.",
  verified: true,
  matchScore: 95,
  acquisitionType: "Owner-operator",
  financingOptions: ["Cash Purchase", "SBA Loan", "Bank Financing"],
  background: "VP of Engineering at two successful exits (acquired by Google and Microsoft)",

  // Detailed information
  previousDeals: [
    {
      company: "CloudSync Solutions",
      year: "2022",
      industry: "SaaS",
      size: "$2.1M",
      outcome: "Grew revenue 180% in 18 months",
    },
    {
      company: "DataFlow Analytics",
      year: "2020",
      industry: "Technology",
      size: "$1.4M",
      outcome: "Successful exit to enterprise client",
    },
  ],

  advisoryTeam: [
    "M&A Attorney - Johnson & Associates",
    "CPA/Tax Advisor - Smith Tax Group",
    "SBA Lender - First National Bank",
    "Business Valuation Expert - ValuPro",
  ],

  preferences: {
    businessSize: "Small to Medium (6-50 employees)",
    geographicPreference: "West Coast preferred, open to remote",
    ownerInvolvement: "Hands-on management preferred",
    dealStructure: "Asset purchase preferred",
  },

  financialCapacity: {
    liquidCash: "$750K",
    creditLine: "$500K",
    sbaPreApproval: true,
    investorPartners: "2 silent partners available for larger deals",
  },
}

export default function BuyerDetailPage({ params }: { params: { id: string } }) {
  const [isMatched, setIsMatched] = useState(false)
  const buyer = mockBuyerDetails

  const handleMatch = () => {
    setIsMatched(true)
    // Here you would typically make an API call to create the match
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/seller/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Buyers
              </Button>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif font-bold text-xl text-primary">DealMatch</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-primary text-white font-semibold">
              <Star className="w-3 h-3 mr-1" />
              {buyer.matchScore}% Match
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="border-0 shadow-xl mb-8">
            <CardHeader className="text-center pb-6 bg-gradient-to-b from-slate-50 to-white">
              <div className="flex flex-col md:flex-row items-center md:items-start md:text-left text-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={buyer.avatar || "/placeholder.svg"}
                      alt={`${buyer.firstName} ${buyer.lastName}`}
                    />
                    <AvatarFallback className="text-2xl font-semibold bg-primary text-white">
                      {buyer.firstName[0]}
                      {buyer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {buyer.verified && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-accent text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">
                    {buyer.firstName} {buyer.lastName}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{buyer.location}</span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>{buyer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>{buyer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <LinkedinIcon className="w-4 h-4 mr-1" />
                      <span>LinkedIn Profile</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-xs text-slate-500">Investment Range</p>
                      <p className="font-semibold text-slate-700">{buyer.investmentRange}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-slate-500">Experience</p>
                      <p className="font-semibold text-slate-700">{buyer.experience}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-slate-500">Timeline</p>
                      <p className="font-semibold text-slate-700">{buyer.timeframe}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs text-slate-500">Type</p>
                      <p className="font-semibold text-slate-700">{buyer.acquisitionType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border shadow-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* About */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      About {buyer.firstName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{buyer.bio}</p>
                  </CardContent>
                </Card>

                {/* Industries of Interest */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Industries of Interest
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {buyer.industries.map((industry) => (
                        <Badge key={industry} className="bg-primary/10 text-primary">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Background */}
                <Card className="border-0 shadow-lg md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-primary" />
                      Professional Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{buyer.background}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Previous Deals */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-primary" />
                      Previous Acquisitions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {buyer.previousDeals.map((deal, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-slate-800">{deal.company}</h4>
                          <Badge variant="outline">{deal.year}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">
                          {deal.industry} • {deal.size}
                        </p>
                        <p className="text-sm text-slate-700">{deal.outcome}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Advisory Team */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Advisory Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {buyer.advisoryTeam.map((advisor, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent mr-3" />
                          <span className="text-slate-600">{advisor}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Investment Capacity */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-primary" />
                      Investment Capacity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Investment Range:</span>
                      <span className="font-semibold">{buyer.investmentRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Liquid Cash:</span>
                      <span className="font-semibold">{buyer.financialCapacity.liquidCash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Credit Line:</span>
                      <span className="font-semibold">{buyer.financialCapacity.creditLine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">SBA Pre-approval:</span>
                      <Badge className="bg-accent text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Financing Options */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-primary" />
                      Financing Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {buyer.financingOptions.map((option) => (
                        <div key={option} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-accent mr-3" />
                          <span className="text-slate-600">{option}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-accent/5 rounded-lg">
                      <p className="text-sm text-slate-600">
                        <strong>Additional:</strong> {buyer.financialCapacity.investorPartners}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Acquisition Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Business Size</p>
                        <p className="text-slate-600">{buyer.preferences.businessSize}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Geographic Preference</p>
                        <p className="text-slate-600">{buyer.preferences.geographicPreference}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Owner Involvement</p>
                        <p className="text-slate-600">{buyer.preferences.ownerInvolvement}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Deal Structure</p>
                        <p className="text-slate-600">{buyer.preferences.dealStructure}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Link href="/seller/dashboard">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Back to Browsing
              </Button>
            </Link>

            {!isMatched ? (
              <Button
                onClick={handleMatch}
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                Connect with {buyer.firstName}
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <Badge className="bg-accent text-white px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Match Created!
                </Badge>
                <Link href="/seller/matches">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Meeting
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
