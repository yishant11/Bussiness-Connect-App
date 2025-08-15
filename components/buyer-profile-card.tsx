import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MapPin, DollarSign, Briefcase, Clock, Star, Building2 } from "lucide-react"

interface BuyerProfileCardProps {
  buyer: {
    id: number
    firstName: string
    lastName: string
    avatar: string
    location: string
    investmentRange: string
    liquidCapital: string
    industries: string[]
    experience: string
    timeframe: string
    bio: string
    verified: boolean
    matchScore: number
    acquisitionType: string
    financingOptions: string[]
    background: string
  }
  className?: string
}

export function BuyerProfileCard({ buyer, className = "" }: BuyerProfileCardProps) {
  return (
    <Card
      className={`border-0 shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {/* Match Score Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-primary text-white font-semibold">
          <Star className="w-3 h-3 mr-1" />
          {buyer.matchScore}% Match
        </Badge>
      </div>

      {/* Profile Header */}
      <CardHeader className="text-center pb-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="relative">
          <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-white shadow-lg">
            <AvatarImage src={buyer.avatar || "/placeholder.svg"} alt={`${buyer.firstName} ${buyer.lastName}`} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-white">
              {buyer.firstName[0]}
              {buyer.lastName[0]}
            </AvatarFallback>
          </Avatar>
          {buyer.verified && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-accent text-white text-xs">Verified</Badge>
            </div>
          )}
        </div>
        <h3 className="font-serif text-xl font-bold text-slate-800">
          {buyer.firstName} {buyer.lastName}
        </h3>
        <div className="flex items-center justify-center text-slate-600 text-sm">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{buyer.location}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Investment Range */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-primary mr-2" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">{buyer.investmentRange}</p>
              <p className="text-xs text-slate-500">Investment Range</p>
            </div>
          </div>
        </div>

        {/* Experience & Timeline */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center p-2 bg-slate-50 rounded-lg">
            <Briefcase className="w-3 h-3 text-accent mr-2" />
            <div>
              <p className="text-xs text-slate-500">Experience</p>
              <p className="font-semibold text-slate-700 text-xs">{buyer.experience}</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-slate-50 rounded-lg">
            <Clock className="w-3 h-3 text-accent mr-2" />
            <div>
              <p className="text-xs text-slate-500">Timeline</p>
              <p className="font-semibold text-slate-700 text-xs">{buyer.timeframe}</p>
            </div>
          </div>
        </div>

        {/* Industries */}
        <div>
          <p className="font-semibold text-slate-800 mb-2 text-sm">Interested Industries</p>
          <div className="flex flex-wrap gap-1">
            {buyer.industries.slice(0, 3).map((industry) => (
              <Badge key={industry} variant="secondary" className="bg-primary/10 text-primary text-xs">
                {industry}
              </Badge>
            ))}
            {buyer.industries.length > 3 && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-xs">
                +{buyer.industries.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Bio Preview */}
        <div>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{buyer.bio}</p>
        </div>

        {/* Background */}
        <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center mb-1">
            <Building2 className="w-3 h-3 text-accent mr-1" />
            <p className="font-semibold text-slate-800 text-xs">Background</p>
          </div>
          <p className="text-xs text-slate-600 line-clamp-2">{buyer.background}</p>
        </div>
      </CardContent>
    </Card>
  )
}
