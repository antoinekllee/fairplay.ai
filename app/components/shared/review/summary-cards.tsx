import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { mockMeetingData } from "./meeting-dashboard"

export function SummaryCards() {
  const { participants, summary } = mockMeetingData
  const totalTalkTime = participants.founder.talkTime + participants.vc.talkTime
  const founderPercentage = Math.round((participants.founder.talkTime / totalTalkTime) * 100)
  const vcPercentage = 100 - founderPercentage

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Talk Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{Math.floor(totalTalkTime / 60)}m</p>
              </div>
            </div>
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="#f0f0f0" strokeWidth="20" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#22c55e"
                strokeWidth="20"
                strokeDasharray={`${founderPercentage * 2.51} 251`}
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray={`${vcPercentage * 2.51} 251`}
                strokeDashoffset={`-${founderPercentage * 2.51}`}
                fill="none"
              />
            </svg>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-4 text-center text-xs">
            <div>
              <div className="flex items-center justify-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Founder</span>
              </div>
              <p className="text-muted-foreground">{founderPercentage}%</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>VC</span>
              </div>
              <p className="text-muted-foreground">{vcPercentage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Question Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Promotion Questions</span>
                <span className="font-medium">{summary.promotionQuestions}</span>
              </div>
              <Progress value={summary.promotionQuestions * 12.5} className="h-2 bg-gray-100" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Prevention Questions</span>
                <span className="font-medium">{summary.preventionQuestions}</span>
              </div>
              <Progress value={summary.preventionQuestions * 12.5} className="h-2 bg-gray-100" />
            </div>
            <div className="pt-2 text-center">
              <Badge
                variant={summary.preventionQuestions > summary.promotionQuestions ? "destructive" : "default"}
                className="px-3 py-1"
              >
                {summary.preventionQuestions > summary.promotionQuestions ? "Prevention-Focused" : "Promotion-Focused"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Founder Sentiment</span>
                <span className="font-medium">{participants.founder.sentiment}</span>
              </div>
              <Progress value={participants.founder.sentimentScore * 100} className="h-2 bg-gray-100" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>VC Sentiment</span>
                <span className="font-medium">{participants.vc.sentiment}</span>
              </div>
              <Progress value={participants.vc.sentimentScore * 100} className="h-2 bg-gray-100" />
            </div>
            <div className="pt-2 text-center text-xs text-muted-foreground">
              <p>Overall Tone:</p>
              <p className="font-medium text-foreground">{summary.overallTone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Interruptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-xs">Founder</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                {participants.founder.interruptions}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs">VC</span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                {participants.vc.interruptions}
              </div>
            </div>
            <div className="pt-2 text-center text-xs text-muted-foreground">
              <p>Total Interruptions:</p>
              <p className="font-medium text-foreground">
                {participants.founder.interruptions + participants.vc.interruptions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
