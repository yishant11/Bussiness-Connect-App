"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, TrendingUp, User, DollarSign, Target, Briefcase } from "lucide-react"

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Investment Profile", icon: DollarSign },
  { id: 3, title: "Acquisition Goals", icon: Target },
  { id: 4, title: "Experience", icon: Briefcase },
]

export default function BuyerOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    bio: "",
    investmentRange: "",
    liquidCapital: "",
    financingOptions: [],
    timeframe: "",
    preferredIndustries: [],
    businessSize: "",
    geographicPreference: "",
    acquisitionType: "",
    previousExperience: "",
    businessBackground: "",
    advisorTeam: [],
    dealStructure: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Tell us about yourself</h2>
              <p className="text-slate-600">Help sellers understand who you are as a buyer</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Smith"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
                <Input
                  id="linkedIn"
                  value={formData.linkedIn}
                  onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                  placeholder="linkedin.com/in/yourprofile"
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Background</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell sellers about your professional background, experience, and what makes you a serious buyer..."
                rows={4}
                className="rounded-lg"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Investment Profile</h2>
              <p className="text-slate-600">Share your financial capacity and investment approach</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="investmentRange">Investment Range</Label>
                <Select
                  value={formData.investmentRange}
                  onValueChange={(value) => handleInputChange("investmentRange", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">Under $100K</SelectItem>
                    <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                    <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="over-10m">Over $10M</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="liquidCapital">Available Liquid Capital</Label>
                <Select
                  value={formData.liquidCapital}
                  onValueChange={(value) => handleInputChange("liquidCapital", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Liquid capital available" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50k">Under $50K</SelectItem>
                    <SelectItem value="50k-200k">$50K - $200K</SelectItem>
                    <SelectItem value="200k-500k">$200K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="over-1m">Over $1M</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Investment Timeframe</Label>
                <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="When are you looking to buy?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Ready to buy now</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within 1 year</SelectItem>
                    <SelectItem value="exploring">Just exploring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Financing Options (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Cash Purchase",
                  "SBA Loan",
                  "Bank Financing",
                  "Seller Financing",
                  "Investor Partnership",
                  "Asset-Based Lending",
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.financingOptions.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleInputChange("financingOptions", [...formData.financingOptions, option])
                        } else {
                          handleInputChange(
                            "financingOptions",
                            formData.financingOptions.filter((o) => o !== option),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={option} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Acquisition Goals</h2>
              <p className="text-slate-600">Define what type of business you're looking for</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Preferred Industries (Select up to 3)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Retail",
                    "Restaurant & Food Service",
                    "Manufacturing",
                    "Technology",
                    "Healthcare",
                    "Professional Services",
                    "Construction",
                    "E-commerce",
                    "Real Estate",
                    "Transportation",
                    "Education",
                    "Other",
                  ].map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={industry}
                        checked={formData.preferredIndustries.includes(industry)}
                        onCheckedChange={(checked) => {
                          if (checked && formData.preferredIndustries.length < 3) {
                            handleInputChange("preferredIndustries", [...formData.preferredIndustries, industry])
                          } else if (!checked) {
                            handleInputChange(
                              "preferredIndustries",
                              formData.preferredIndustries.filter((i) => i !== industry),
                            )
                          }
                        }}
                        disabled={
                          !formData.preferredIndustries.includes(industry) && formData.preferredIndustries.length >= 3
                        }
                      />
                      <Label htmlFor={industry} className="text-sm">
                        {industry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessSize">Preferred Business Size</Label>
                  <Select
                    value={formData.businessSize}
                    onValueChange={(value) => handleInputChange("businessSize", value)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select business size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="micro">Micro (1-5 employees)</SelectItem>
                      <SelectItem value="small">Small (6-20 employees)</SelectItem>
                      <SelectItem value="medium">Medium (21-50 employees)</SelectItem>
                      <SelectItem value="large">Large (50+ employees)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="geographicPreference">Geographic Preference</Label>
                  <Select
                    value={formData.geographicPreference}
                    onValueChange={(value) => handleInputChange("geographicPreference", value)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Location preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local (within 50 miles)</SelectItem>
                      <SelectItem value="regional">Regional (within state)</SelectItem>
                      <SelectItem value="national">National</SelectItem>
                      <SelectItem value="remote">Remote-friendly businesses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acquisitionType">Acquisition Type</Label>
                  <Select
                    value={formData.acquisitionType}
                    onValueChange={(value) => handleInputChange("acquisitionType", value)}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Type of acquisition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner-operator">Owner-operator (hands-on)</SelectItem>
                      <SelectItem value="passive-investment">Passive investment</SelectItem>
                      <SelectItem value="strategic-add-on">Strategic add-on to existing business</SelectItem>
                      <SelectItem value="turnaround">Turnaround opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Experience & Team</h2>
              <p className="text-slate-600">Showcase your experience and support team</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="previousExperience">Previous Acquisition Experience</Label>
                <Select
                  value={formData.previousExperience}
                  onValueChange={(value) => handleInputChange("previousExperience", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Your acquisition experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time">First-time buyer</SelectItem>
                    <SelectItem value="1-2-deals">1-2 previous acquisitions</SelectItem>
                    <SelectItem value="3-5-deals">3-5 previous acquisitions</SelectItem>
                    <SelectItem value="serial-acquirer">Serial acquirer (5+ deals)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessBackground">Business Management Experience</Label>
                <Textarea
                  id="businessBackground"
                  value={formData.businessBackground}
                  onChange={(e) => handleInputChange("businessBackground", e.target.value)}
                  placeholder="Describe your experience running or managing businesses, relevant industry experience, and key achievements..."
                  rows={4}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Label>Advisory Team (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Business Broker",
                    "M&A Attorney",
                    "CPA/Tax Advisor",
                    "Business Valuation Expert",
                    "Industry Consultant",
                    "SBA Lender",
                    "Investment Banker",
                    "Business Coach/Mentor",
                  ].map((advisor) => (
                    <div key={advisor} className="flex items-center space-x-2">
                      <Checkbox
                        id={advisor}
                        checked={formData.advisorTeam.includes(advisor)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("advisorTeam", [...formData.advisorTeam, advisor])
                          } else {
                            handleInputChange(
                              "advisorTeam",
                              formData.advisorTeam.filter((a) => a !== advisor),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={advisor} className="text-sm">
                        {advisor}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-semibold text-slate-800 mb-3">What happens next?</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    We'll review and verify your buyer profile
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Sellers will see your profile when browsing buyers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    You'll be notified when sellers want to connect
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Start conversations and manage deals seamlessly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
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
          <div className="text-sm text-slate-500">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${step.id <= currentStep ? "text-accent" : "text-slate-400"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.id <= currentStep ? "bg-accent text-white" : "bg-slate-200"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-center">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="max-w-4xl mx-auto border-0 shadow-xl">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 rounded-lg bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="bg-accent hover:bg-accent/90 px-6 py-2 rounded-lg">
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Handle form submission
                console.log("Form submitted:", formData)
                // Redirect to dashboard or success page
              }}
              className="bg-accent hover:bg-accent/90 px-6 py-2 rounded-lg"
            >
              Complete Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
