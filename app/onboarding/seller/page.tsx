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
import { ArrowLeft, ArrowRight, TrendingUp, Building2, DollarSign, Users, FileText } from "lucide-react"

const steps = [
  { id: 1, title: "Business Basics", icon: Building2 },
  { id: 2, title: "Financial Overview", icon: DollarSign },
  { id: 3, title: "Operations", icon: Users },
  { id: 4, title: "Deal Preferences", icon: FileText },
]

export default function SellerOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    location: "",
    businessType: "",
    yearEstablished: "",
    description: "",
    annualRevenue: "",
    netProfit: "",
    employees: "",
    ownerInvolvement: "",
    reasonForSelling: "",
    timeframe: "",
    minimumPrice: "",
    includeAssets: [],
    confidentiality: false,
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
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Tell us about your business</h2>
              <p className="text-slate-600">Help buyers understand what makes your business special</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Your business name"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="restaurant">Restaurant & Food Service</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="professional-services">Professional Services</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="yearEstablished">Year Established</Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  value={formData.yearEstablished}
                  onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                  placeholder="2010"
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what your business does, your competitive advantages, and what makes it attractive to buyers..."
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
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Financial Overview</h2>
              <p className="text-slate-600">Share key financial metrics to attract serious buyers</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="annualRevenue">Annual Revenue</Label>
                <Select
                  value={formData.annualRevenue}
                  onValueChange={(value) => handleInputChange("annualRevenue", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">Under $100K</SelectItem>
                    <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                    <SelectItem value="over-10m">Over $10M</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="netProfit">Net Profit Margin</Label>
                <Select value={formData.netProfit} onValueChange={(value) => handleInputChange("netProfit", value)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select profit margin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-10">Under 10%</SelectItem>
                    <SelectItem value="10-20">10% - 20%</SelectItem>
                    <SelectItem value="20-30">20% - 30%</SelectItem>
                    <SelectItem value="over-30">Over 30%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Select value={formData.employees} onValueChange={(value) => handleInputChange("employees", value)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-5">1-5 employees</SelectItem>
                    <SelectItem value="6-20">6-20 employees</SelectItem>
                    <SelectItem value="21-50">21-50 employees</SelectItem>
                    <SelectItem value="51-100">51-100 employees</SelectItem>
                    <SelectItem value="over-100">Over 100 employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerInvolvement">Owner Involvement</Label>
                <Select
                  value={formData.ownerInvolvement}
                  onValueChange={(value) => handleInputChange("ownerInvolvement", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="How involved are you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                    <SelectItem value="part-time">Part-time (20-40 hours/week)</SelectItem>
                    <SelectItem value="minimal">Minimal (Under 20 hours/week)</SelectItem>
                    <SelectItem value="absentee">Absentee owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Operations & Transition</h2>
              <p className="text-slate-600">Help buyers understand the transition process</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reasonForSelling">Reason for Selling</Label>
                <Select
                  value={formData.reasonForSelling}
                  onValueChange={(value) => handleInputChange("reasonForSelling", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Why are you selling?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="new-opportunity">Pursuing new opportunity</SelectItem>
                    <SelectItem value="relocation">Relocation</SelectItem>
                    <SelectItem value="health">Health reasons</SelectItem>
                    <SelectItem value="partnership-change">Partnership change</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeframe">Desired Timeframe</Label>
                <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="When do you want to sell?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within 1 year</SelectItem>
                    <SelectItem value="flexible">Flexible timing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>What's included in the sale?</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Equipment & Machinery",
                    "Inventory",
                    "Customer Database",
                    "Intellectual Property",
                    "Real Estate",
                    "Vehicles",
                    "Contracts & Agreements",
                    "Training & Support",
                  ].map((asset) => (
                    <div key={asset} className="flex items-center space-x-2">
                      <Checkbox
                        id={asset}
                        checked={formData.includeAssets.includes(asset)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("includeAssets", [...formData.includeAssets, asset])
                          } else {
                            handleInputChange(
                              "includeAssets",
                              formData.includeAssets.filter((a) => a !== asset),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={asset} className="text-sm">
                        {asset}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-2">Deal Preferences</h2>
              <p className="text-slate-600">Set your expectations for the sale</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="minimumPrice">Asking Price Range</Label>
                <Select
                  value={formData.minimumPrice}
                  onValueChange={(value) => handleInputChange("minimumPrice", value)}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100k">Under $100K</SelectItem>
                    <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                    <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                    <SelectItem value="over-5m">Over $5M</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="confidentiality"
                  checked={formData.confidentiality}
                  onCheckedChange={(checked) => handleInputChange("confidentiality", checked)}
                />
                <Label htmlFor="confidentiality" className="text-sm">
                  I require a signed NDA before sharing detailed financial information
                </Label>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="font-semibold text-slate-800 mb-3">What happens next?</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    We'll review your profile and verify key details
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    You'll get access to browse qualified buyer profiles
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Choose which buyers you'd like to connect with
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Start conversations and manage deals in one place
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
                className={`flex flex-col items-center ${step.id <= currentStep ? "text-primary" : "text-slate-400"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.id <= currentStep ? "bg-primary text-white" : "bg-slate-200"
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
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg">
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
              className="bg-primary hover:bg-primary/90 px-6 py-2 rounded-lg"
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
