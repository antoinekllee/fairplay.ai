import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ReportSectionProps = {
    data: ReportData;
};

export function ReportSection({ data }: ReportSectionProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
                Detailed Reports
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">VC Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Strengths</h3>
                            <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                {data.reports.vc.strengths.map(
                                    (strength: string, index: number) => (
                                        <li key={index}>{strength}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">
                                Areas for Improvement
                            </h3>
                            <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                {data.reports.vc.improvements.map(
                                    (improvement: string, index: number) => (
                                        <li key={index}>{improvement}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">
                                Recommendations
                            </h3>
                            <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                {data.reports.vc.recommendations.map(
                                    (recommendation: string, index: number) => (
                                        <li key={index}>{recommendation}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Founder Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Strengths</h3>
                            <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                {data.reports.founder.strengths.map(
                                    (strength: string, index: number) => (
                                        <li key={index}>{strength}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">
                                Areas for Improvement
                            </h3>
                            <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                {data.reports.founder.improvements.map(
                                    (improvement: string, index: number) => (
                                        <li key={index}>{improvement}</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">
                                Recommendations
                            </h3>
                            <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                {data.reports.founder.recommendations.map(
                                    (recommendation: string, index: number) => (
                                        <li key={index}>{recommendation}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
