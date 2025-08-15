import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const DocumentAnalysisSchema = z.object({
  summary: z.string().describe("Brief summary of the document content"),
  keyFindings: z.array(z.string()).describe("Important findings or highlights"),
  riskFactors: z.array(z.string()).describe("Potential risks or concerns identified"),
  recommendations: z.array(z.string()).describe("Recommended actions or next steps"),
  confidence: z.number().min(0).max(100).describe("Confidence level of the analysis"),
  documentType: z.enum(["financial_statement", "contract", "legal_document", "tax_return", "business_plan", "other"]),
  criticalIssues: z.array(z.string()).describe("Critical issues that need immediate attention"),
})

export async function POST(request: NextRequest) {
  try {
    const { documentContent, fileName, documentType } = await request.json()

    if (!documentContent) {
      return NextResponse.json({ error: "Document content is required" }, { status: 400 })
    }

    const { object: analysis } = await generateObject({
      model: openai("gpt-4o"),
      schema: DocumentAnalysisSchema,
      prompt: `Analyze this business document for a potential acquisition. Document name: ${fileName}, Type: ${documentType}

Document content:
${documentContent}

Provide a comprehensive analysis focusing on:
1. Financial health and performance indicators
2. Legal compliance and potential liabilities
3. Operational risks and opportunities
4. Market position and competitive advantages
5. Any red flags or concerns for potential buyers

Be thorough but concise in your analysis.`,
    })

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Document analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}
