import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  Users,
  MessageCircle,
  Shield,
  TrendingUp,
  ArrowRight,
  Building,
  Handshake,
  Target,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              BizConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="/success-stories" className="text-gray-600 hover:text-primary transition-colors">
              Success Stories
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-primary transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Handshake className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Connect with
          <br />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            business leaders
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Network, collaborate, and grow your business with verified professionals and industry leaders worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Start Networking
              <Building className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 mb-16">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Verified Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span>500K+ Business Leaders</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>10K+ Deals Closed</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-serif text-4xl font-bold text-center text-gray-800 mb-12">How BizConnect Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-4">Build Your Profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Showcase your expertise, company, and achievements. Connect with verified business professionals.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-4">Find & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover relevant business opportunities and connect with industry leaders in your field.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-4">Collaborate & Grow</h3>
              <p className="text-gray-600 leading-relaxed">
                Start meaningful business conversations, share opportunities, and grow your professional network.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-gray-800 mb-6">Ready to grow your business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals building meaningful business relationships every day.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started Today
              <Briefcase className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mr-2">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl">BizConnect</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 BizConnect. Where business relationships thrive.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
