import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Building2, Search, TrendingUp } from "lucide-react"

export default function OnboardingPage() {
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">Let's get you started</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Choose your path to begin connecting with the right opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Seller Card */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white group cursor-pointer">
            <Link href="/onboarding/seller">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-slate-800">I'm Selling My Business</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Connect with qualified buyers who are actively looking for businesses like yours. You stay in control
                  of who you talk to.
                </p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Browse verified buyer profiles
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Choose who to connect with
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    AI-powered deal management
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold rounded-xl group-hover:shadow-lg transition-all">
                  Start as Seller
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Link>
          </Card>

          {/* Buyer Card */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white group cursor-pointer">
            <Link href="/onboarding/buyer">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Search className="w-10 h-10 text-accent" />
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-slate-800">I'm Looking to Buy</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Create a compelling buyer profile that attracts the right sellers. Get matched with businesses that
                  fit your criteria.
                </p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Showcase your acquisition experience
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Get matched with quality businesses
                  </li>
                  <li className="flex items-center text-slate-600">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Streamlined due diligence tools
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-white py-3 text-lg font-semibold rounded-xl group-hover:shadow-lg transition-all bg-transparent"
                >
                  Start as Buyer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500">
            Not sure which path is right for you?{" "}
            <Link href="/help" className="text-primary hover:underline font-semibold">
              Get help choosing
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
