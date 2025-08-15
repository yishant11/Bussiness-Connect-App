"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, FileText, AlertTriangle, CheckCircle, TrendingUp, Clock } from "lucide-react"

interface DocumentAnalysis {
  summary: string
  keyFindings: string[]
  riskFactors: string[]
  recommendations: string[]
  confidence: number
  documentType: string
  criticalIssues: string[]
}

interface AIDocumentAnalyzerProps {
  documentId: string
  documentName: string
  documentContent: string
  documentType: string
}

export function AIDocumentAnalyzer({
  documentId,
  documentName,
  documentContent,
  documentType,
}: AIDocumentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeDocument = async () => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentContent,
          fileName: documentName,
          documentType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze document")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError("Failed to analyze document. Please try again.")
      console.error("Analysis error:", err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-emerald-100 text-emerald-800"
    if (confidence >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "financial_statement":
        return <TrendingUp className="h-4 w-4" />
      case "contract":
      case "legal_document":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-emerald-600" />
              <CardTitle>AI Document Analysis</CardTitle>
            </div>
            {!analysis && (
              <Button onClick={analyzeDocument} disabled={isAnalyzing} className="bg-emerald-600 hover:bg-emerald-700">
                {isAnalyzing ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Document
                  </>
                )}
              </Button>
            )}
          </div>
          <CardDescription>Get AI-powered insights and risk assessment for {documentName}</CardDescription>
        </CardHeader>

        {error && (
          <CardContent>
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        )}

        {analysis && (
          <CardContent className="space-y-6">
            {/* Header with confidence and document type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getDocumentTypeIcon(analysis.documentType)}
                <span className="font-medium capitalize">{analysis.documentType.replace("_", " ")}</span>
              </div>
              <Badge className={getConfidenceColor(analysis.confidence)}>{analysis.confidence}% Confidence</Badge>
            </div>

            {/* Summary */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Executive Summary</h4>
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>

            <Separator />

            {/* Critical Issues */}
            {analysis.criticalIssues.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <h4 className="font-semibold text-red-900">Critical Issues</h4>
                </div>
                <div className="space-y-2">
                  {analysis.criticalIssues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-red-800 text-sm">{issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Findings */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <h4 className="font-semibold text-gray-900">Key Findings</h4>
              </div>
              <div className="space-y-2">
                {analysis.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            {analysis.riskFactors.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <h4 className="font-semibold text-gray-900">Risk Factors</h4>
                </div>
                <div className="space-y-2">
                  {analysis.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Recommendations</h4>
              </div>
              <div className="space-y-2">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
