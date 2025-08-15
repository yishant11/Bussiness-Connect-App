"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Upload, Download, Search, Eye } from "lucide-react"

interface Document {
  id: number
  name: string
  type: string
  uploadedBy: string
  uploadedAt: string
  size: string
  status: "reviewed" | "pending_review" | "needs_revision" | "signed"
  category: string
}

interface DocumentManagerProps {
  documents: Document[]
  onUpload?: () => void
  onDownload?: (docId: number) => void
  onReview?: (docId: number) => void
}

export function DocumentManager({ documents, onUpload, onDownload, onReview }: DocumentManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", ...new Set(documents.map((doc) => doc.category))]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reviewed":
        return "bg-green-100 text-green-700"
      case "signed":
        return "bg-blue-100 text-blue-700"
      case "pending_review":
        return "bg-yellow-100 text-yellow-700"
      case "needs_revision":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Document Manager</span>
          <Button onClick={onUpload} className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </CardTitle>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
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
                <Badge className={getStatusColor(doc.status)}>{doc.status.replace("_", " ")}</Badge>
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="outline" onClick={() => onReview?.(doc.id)} className="bg-transparent">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDownload?.(doc.id)} className="bg-transparent">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
