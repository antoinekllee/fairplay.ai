"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type ReportsGridProps = {
    reports: ReportData[];
};

export function ReportsGrid({ reports }: ReportsGridProps) {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Your Reports
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map((report, index) => (
                    <Card
                        key={report._id || index}
                        className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/reports/${report._id}`)}
                    >
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                {new Date(
                                    report.createdAt || Date.now()
                                ).toLocaleDateString()}
                            </p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        Meeting Analysis
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {report.summary.overallTone}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">
                                        Questions: {report.questions.length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {report.summary.promotionQuestions}{" "}
                                        promotion
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {report.summary.preventionQuestions}{" "}
                                        prevention
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
