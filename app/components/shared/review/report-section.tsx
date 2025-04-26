import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockMeetingData } from "./meeting-dashboard"

export function ReportSection() {
  const { reports } = mockMeetingData

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Meeting Reports</h2>
        <p className="text-muted-foreground">AI-generated insights and recommendations for both parties</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>VC Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-green-600">Strengths</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {reports.vc.strengths.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-600">Areas for Improvement</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {reports.vc.improvements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-600">Recommendations</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {reports.vc.recommendations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Founder Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-green-600">Strengths</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {reports.founder.strengths.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-600">Areas for Improvement</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {reports.founder.improvements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-amber-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-600">Recommendations</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {reports.founder.recommendations.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-blue-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
