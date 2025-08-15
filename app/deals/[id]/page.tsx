"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  TrendingUp,
  ArrowLeft,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Download,
  MessageCircle,
  Users,
  DollarSign,
  Target,
  Briefcase,
} from "lucide-react"

// Mock deal data
const mockDeal = {
  id: "deal-001",
  buyer: {
    firstName: "Sarah",
    lastName: "Chen",
    avatar: "/professional-woman-diverse.png",
    company: "Chen Ventures",
  },
  seller: {
    firstName: "John",
    lastName: "Smith",
    avatar: "/professional-man.png",
    company: "TechFlow Solutions",
  },
  business: {
    name: "TechFlow Solutions",
    industry: "SaaS",
    revenue: "$2.1M ARR",
    asking_price: "$8.5M",
  },
  currentStage: "due_diligence",
  progress: 45,
  startDate: "2024-01-15",
  estimatedClosing: "2024-04-15",
  stages: [
    { id: "initial", name: "Initial Discussion", status: "completed", completedAt: "2024-01-15" },
    { id: "nda", name: "NDA Signed", status: "completed", completedAt: "2024-01-18" },
    { id: "loi", name: "Letter of Intent", status: "completed", completedAt: "2024-01-25" },
    { id: "due_diligence", name: "Due Diligence", status: "in_progress", startedAt: "2024-01-26" },
    { id: "final_negotiation", name: "Final Negotiation", status: "pending" },
    { id: "closing", name: "Closing", status: "pending" },
  ],
}

const dueDiligenceChecklist = [
  {
    category: "Financial",
    items: [
      { id: 1, task: "3 years of financial statements", completed: true, assignee: "seller" },
      { id: 2, task: "Tax returns (3 years)", completed: true, assignee: "seller" },
      { id: 3, task: "Monthly P&L statements (12 months)", completed: false, assignee: "seller" },
      { id: 4, task: "Cash flow statements", completed: false, assignee: "seller" },
      { id: 5, task: "Accounts receivable aging", completed: true, assignee: "seller" },
    ],
  },
  {
    category: "Legal",
    items: [
      { id: 6, task: "Articles of incorporation", completed: true, assignee: "seller" },
      { id: 7, task: "Operating agreements", completed: true, assignee: "seller" },
      { id: 8, task: "Material contracts review", completed: false, assignee: "buyer" },
      { id: 9, task: "Intellectual property documentation", completed: false, assignee: "seller" },
      { id: 10, task: "Employment agreements", completed: true, assignee: "seller" },
    ],
  },
  {
    category: "Operations",
    items: [
      { id: 11, task: "Customer contracts and agreements", completed: false, assignee: "seller" },
      { id: 12, task: "Vendor and supplier agreements", completed: true, assignee: "seller" },
      { id: 13, task: "Technology stack documentation", completed: false, assignee: "seller" },
      { id: 14, task: "Employee handbook and policies", completed: true, assignee: "seller" },
      { id: 15, task: "Insurance policies", completed: false, assignee: "seller" },
    ],
  },
]

const recentDocuments = [
  {
    id: 1,
    name: "Financial_Statements_2023.pdf",
    type: "Financial",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-28",
    size: "2.4 MB",
    status: "reviewed",
  },
  {
    id: 2,
    name: "LOI_Final_Signed.pdf",
    type: "Legal",
    uploadedBy: "Sarah Chen",
    uploadedAt: "2024-01-25",
    size: "1.1 MB",
    status: "signed",
  },
  {
    id: 3,
    name: "Customer_Analysis_Q4.xlsx",
    type: "Operations",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-27",
    size: "856 KB",
    status: "pending_review",
  },
  {
    id: 4,
    name: "Tech_Stack_Overview.pdf",
    type: "Operations",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-26",
    size: "3.2 MB",
    status: "reviewed",
  },
]

const upcomingTasks = [
  {
    id: 1,
    task: "Review customer contracts",
    assignee: "Sarah Chen",
    dueDate: "2024-02-02",
    priority: "high",
  },
  {
    id: 2,
    task: "Upload Q4 financial reports",
    assignee: "John Smith",
    dueDate: "2024-02-01",
    priority: "high",
  },
  {
    id: 3,
    task: "Schedule management team interviews",
    assignee: "Sarah Chen",
    dueDate: "2024-02-05",
    priority: "medium",
  },
  {
    id: 4,
    task: "Finalize SBA loan pre-approval",
    assignee: "Sarah Chen",
    dueDate: "2024-02-08",
    priority: "medium",
  },
]

export default function DealPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const deal = mockDeal

  const getStageStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "pending":
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "reviewed":
        return "bg-green-100 text-green-700"
      case "signed":
        return "bg-blue-100 text-blue-700"
      case "pending_review":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
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

            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700">Due Diligence</Badge>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Deal Header */}
          <Card className="border-0 shadow-xl mb-8">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-slate-800 mb-2">
                    {deal.business.name} Acquisition
                  </h1>
                  <div className="flex items-center space-x-6 text-slate-600">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>
                        {deal.business.revenue} • {deal.business.asking_price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{deal.business.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Est. Closing: {new Date(deal.estimatedClosing).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-center">
                      <Avatar className="w-12 h-12 mx-auto mb-2">
                        <AvatarImage src={deal.buyer.avatar || "/placeholder.svg"} alt={deal.buyer.firstName} />
                        <AvatarFallback className="bg-accent text-white">
                          {deal.buyer.firstName[0]}
                          {deal.buyer.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">
                        {deal.buyer.firstName} {deal.buyer.lastName}
                      </p>
                      <p className="text-xs text-slate-500">Buyer</p>
                    </div>
                    <div className="text-center">
                      <Avatar className="w-12 h-12 mx-auto mb-2">
                        <AvatarImage src={deal.seller.avatar || "/placeholder.svg"} alt={deal.seller.firstName} />
                        <AvatarFallback className="bg-primary text-white">
                          {deal.seller.firstName[0]}
                          {deal.seller.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">
                        {deal.seller.firstName} {deal.seller.lastName}
                      </p>
                      <p className="text-xs text-slate-500">Seller</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Deal Progress</span>
                  <span className="text-sm text-slate-500">{deal.progress}% Complete</span>
                </div>
                <Progress value={deal.progress} className="h-3" />
              </div>

              {/* Stage Timeline */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  {deal.stages.map((stage, index) => (
                    <div key={stage.id} className="flex flex-col items-center">
                      <div className="flex items-center">
                        {getStageStatus(stage.status)}
                        {index < deal.stages.length - 1 && (
                          <div
                            className={`w-16 h-0.5 ml-2 ${
                              stage.status === "completed" ? "bg-green-500" : "bg-slate-300"
                            }`}
                          />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center max-w-20 ${
                          stage.status === "in_progress" ? "font-semibold text-blue-600" : "text-slate-600"
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white border shadow-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Current Stage */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary" />
                      Current Stage: Due Diligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">
                      Both parties are currently in the due diligence phase. The buyer is reviewing financial and
                      operational documents while the seller is providing requested information.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Documents Reviewed</span>
                        <span className="font-semibold">12 of 18</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <FileText className="w-4 h-4 mr-2" />
                      View Due Diligence Checklist
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Upcoming Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingTasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-slate-800 text-sm">{task.task}</p>
                          <p className="text-xs text-slate-500">
                            {task.assignee} • Due {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm text-slate-800">Financial statements uploaded</p>
                          <p className="text-xs text-slate-500">John Smith • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm text-slate-800">Customer analysis reviewed</p>
                          <p className="text-xs text-slate-500">Sarah Chen • 5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <p className="text-sm text-slate-800">Meeting scheduled for Feb 5</p>
                          <p className="text-xs text-slate-500">Sarah Chen • 1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-primary" />
                      Deal Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-slate-800">$8.5M</p>
                        <p className="text-xs text-slate-500">Asking Price</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-slate-800">4.0x</p>
                        <p className="text-xs text-slate-500">Revenue Multiple</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-slate-800">$2.1M</p>
                        <p className="text-xs text-slate-500">Annual Revenue</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-slate-800">23%</p>
                        <p className="text-xs text-slate-500">Profit Margin</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Upload Area */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-primary" />
                      Upload Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-4">Drag and drop files here, or click to browse</p>
                      <Button variant="outline" className="bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Categories */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Document Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">Financial</span>
                      <Badge variant="secondary">8 files</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">Legal</span>
                      <Badge variant="secondary">5 files</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">Operations</span>
                      <Badge variant="secondary">6 files</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">HR</span>
                      <Badge variant="secondary">3 files</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Status */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Review Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Reviewed</span>
                        <span className="font-semibold">12 files</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Pending Review</span>
                        <span className="font-semibold">6 files</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Needs Revision</span>
                        <span className="font-semibold">2 files</span>
                      </div>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-slate-500">60% of documents reviewed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Documents */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <FileText className="w-8 h-8 text-slate-400" />
                          <div>
                            <p className="font-medium text-slate-800">{doc.name}</p>
                            <p className="text-sm text-slate-600">
                              {doc.uploadedBy} • {new Date(doc.uploadedAt).toLocaleDateString()} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getDocumentStatusColor(doc.status)}>{doc.status.replace("_", " ")}</Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklist" className="space-y-6">
              <div className="space-y-6">
                {dueDiligenceChecklist.map((category) => (
                  <Card key={category.category} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{category.category} Due Diligence</span>
                        <Badge variant="secondary">
                          {category.items.filter((item) => item.completed).length} of {category.items.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Checkbox checked={item.completed} />
                              <span className={`${item.completed ? "line-through text-slate-500" : "text-slate-800"}`}>
                                {item.task}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {item.assignee}
                              </Badge>
                              {item.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Clock className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                      High Priority Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingTasks
                      .filter((task) => task.priority === "high")
                      .map((task) => (
                        <div key={task.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800">{task.task}</h4>
                            <Badge className="bg-red-100 text-red-700">High</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Assigned to: {task.assignee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                      Medium Priority Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingTasks
                      .filter((task) => task.priority === "medium")
                      .map((task) => (
                        <div key={task.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800">{task.task}</h4>
                            <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            Assigned to: {task.assignee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Task Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Button className="bg-primary hover:bg-primary/90">
                      <FileText className="w-4 h-4 mr-2" />
                      Create New Task
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Sort
                      </Button>
                    </div>
                  </div>
                  <div className="text-center py-8 text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>All tasks are displayed above by priority</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Deal Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {deal.stages.map((stage, index) => (
                      <div key={stage.id} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          {getStageStatus(stage.status)}
                          {index < deal.stages.length - 1 && <div className="w-0.5 h-12 bg-slate-300 mt-2" />}
                        </div>
                        <div className="flex-1 pb-8">
                          <h3
                            className={`font-semibold ${
                              stage.status === "in_progress" ? "text-blue-600" : "text-slate-800"
                            }`}
                          >
                            {stage.name}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {stage.status === "completed" && stage.completedAt && (
                              <>Completed on {new Date(stage.completedAt).toLocaleDateString()}</>
                            )}
                            {stage.status === "in_progress" && stage.startedAt && (
                              <>Started on {new Date(stage.startedAt).toLocaleDateString()}</>
                            )}
                            {stage.status === "pending" && <>Pending</>}
                          </p>
                          {stage.status === "in_progress" && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                Currently reviewing financial documents and conducting operational due diligence.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
