import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";

type ReportSectionProps = {
    data: ReportData;
};

export function ReportSection({ data }: ReportSectionProps) {
    const { reports } = data;

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <h2 className="text-lg font-bold text-gray-800">
                        Meeting Reports
                    </h2>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                {/* VC Report */}
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 border-b border-indigo-100">
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <span className="text-xs font-bold text-white">
                                    VC
                                </span>
                            </div>
                            <div>
                                <div className="text-xs text-indigo-600 font-medium">
                                    Michael Chen
                                </div>
                                VC Report
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full -mr-16 -mt-16 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                        <div>
                            <h3 className="font-medium text-green-600 flex items-center gap-2 mb-3">
                                <Award className="h-4 w-4" />
                                Strengths
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {reports.vc.strengths.map(
                                    (item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-start bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl border border-green-200 shadow-sm group-hover:shadow transition-all duration-300"
                                        >
                                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-amber-600 flex items-center gap-2 mb-3">
                                <AlertTriangle className="h-4 w-4" />
                                Areas for Improvement
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {reports.vc.improvements.map(
                                    (item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-start bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-xl border border-amber-200 shadow-sm group-hover:shadow transition-all duration-300"
                                        >
                                            <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-blue-600 flex items-center gap-2 mb-3">
                                <Lightbulb className="h-4 w-4" />
                                Recommendations
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {reports.vc.recommendations.map(
                                    (item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-start bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200 shadow-sm group-hover:shadow transition-all duration-300"
                                        >
                                            <Lightbulb className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Founder Report */}
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
                    <CardHeader className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 border-b border-green-100">
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <span className="text-xs font-bold text-white">
                                    F
                                </span>
                            </div>
                            <div>
                                <div className="text-xs text-green-600 font-medium">
                                    Sarah Johnson
                                </div>
                                Founder Report
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-full -mr-16 -mt-16 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                        <div>
                            <h3 className="font-medium text-green-600 flex items-center gap-2 mb-3">
                                <Award className="h-4 w-4" />
                                Strengths
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {reports.founder.strengths.map(
                                    (item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-start bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl border border-green-200 shadow-sm group-hover:shadow transition-all duration-300"
                                        >
                                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-amber-600 flex items-center gap-2 mb-3">
                                <AlertTriangle className="h-4 w-4" />
                                Areas for Improvement
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {reports.founder.improvements.map(
                                    (item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-start bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-xl border border-amber-200 shadow-sm group-hover:shadow transition-all duration-300"
                                        >
                                            <AlertTriangle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-blue-600 flex items-center gap-2 mb-3">
                                <Lightbulb className="h-4 w-4" />
                                Recommendations
                            </h3>
                            <ul className="space-y-2 text-sm">
                                {reports.founder.recommendations.map(
                                    (item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-start bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200 shadow-sm group-hover:shadow transition-all duration-300"
                                        >
                                            <Lightbulb className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
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
