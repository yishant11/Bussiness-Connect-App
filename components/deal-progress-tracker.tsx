import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface DealStage {
  id: string
  name: string
  status: "completed" | "in_progress" | "pending" | "blocked"
  completedAt?: string
  startedAt?: string
  estimatedDuration?: string
}

interface DealProgressTrackerProps {
  stages: DealStage[]
  currentStage: string
  overallProgress: number
}

export function DealProgressTracker({ stages, currentStage, overallProgress }: DealProgressTrackerProps) {
  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "blocked":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
    }
  }

  const getStageColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "in_progress":
        return "text-blue-600 font-semibold"
      case "blocked":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Deal Progress</CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Overall Progress</span>
          <span className="text-sm font-semibold">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                {getStageIcon(stage.status)}
                {index < stages.length - 1 && (
                  <div className={`w-0.5 h-8 mt-2 ${stage.status === "completed" ? "bg-green-500" : "bg-slate-300"}`} />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${getStageColor(stage.status)}`}>{stage.name}</h4>
                <p className="text-xs text-slate-500">
                  {stage.status === "completed" && stage.completedAt && (
                    <>Completed {new Date(stage.completedAt).toLocaleDateString()}</>
                  )}
                  {stage.status === "in_progress" && stage.startedAt && (
                    <>Started {new Date(stage.startedAt).toLocaleDateString()}</>
                  )}
                  {stage.status === "pending" && stage.estimatedDuration && (
                    <>Estimated duration: {stage.estimatedDuration}</>
                  )}
                </p>
              </div>
              {stage.id === currentStage && <Badge className="bg-blue-100 text-blue-700 text-xs">Current</Badge>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
