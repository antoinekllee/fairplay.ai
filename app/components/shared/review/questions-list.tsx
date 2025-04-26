"use client"

import { ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockMeetingData } from "./meeting-dashboard"
import { useState } from "react"

export function QuestionsList() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Questions Analysis</h2>
        <p className="text-muted-foreground">Detailed analysis of each question and response</p>
      </div>

      <div className="space-y-4">
        {mockMeetingData.questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  )
}

function QuestionCard({ question }: { question: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const totalTalkTime = question.talkTime.founder + question.talkTime.vc
  const founderPercentage = Math.round((question.talkTime.founder / totalTalkTime) * 100)
  const vcPercentage = 100 - founderPercentage

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{question.question}</CardTitle>
            <div>
              <Badge variant={question.type === "prevention" ? "destructive" : "default"}>
                {question.type === "prevention" ? "Prevention" : "Promotion"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">VC: </span>
              {question.question}
            </p>
            <Separator className="my-2" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Founder: </span>
              {question.answer}
            </p>
            <div className="mt-2">
              <Badge variant="outline" className="bg-gray-100">
                Analysis: {question.analysis}
              </Badge>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="w-full justify-between p-0" onClick={() => setIsOpen(!isOpen)}>
            <span className="text-xs font-medium">{isOpen ? "Hide Detailed Analysis" : "View Detailed Analysis"}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {isOpen && (
          <div className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Talk Time</h4>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs">
                    Founder: {question.talkTime.founder}s ({founderPercentage}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-xs">
                    VC: {question.talkTime.vc}s ({vcPercentage}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: `${founderPercentage}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Interruptions</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs">Founder: {question.interruptions.founder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs">VC: {question.interruptions.vc}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sentiment</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs">Founder: {question.sentiment.founder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs">VC: {question.sentiment.vc}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {question.keywords.map((keyword: string) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
