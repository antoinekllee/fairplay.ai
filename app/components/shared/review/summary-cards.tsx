import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BarChart2, MessageCircle, Zap } from "lucide-react";

type SummaryCardsProps = {
    data: ReportData;
};

export function SummaryCards({ data }: SummaryCardsProps) {
    const { participants, summary } = data;
    const totalTalkTime =
        participants.founder.talkTime + participants.vc.talkTime;
    const founderPercentage = Math.round(
        (participants.founder.talkTime / totalTalkTime) * 100
    );
    const vcPercentage = 100 - founderPercentage;

    return (
        <div>
            <div className="flex items-center justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <h2 className="text-lg font-bold text-gray-800">
                        Meeting Overview
                    </h2>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {/* Talk Time Distribution */}
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-purple-500" />
                            Talk Time Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full -mr-12 -mt-12 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-sm border border-purple-50 group-hover:scale-105 transition-transform duration-300">
                                    <p className="text-xs text-gray-500">
                                        Total
                                    </p>
                                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        {Math.floor(totalTalkTime / 60)}m
                                    </p>
                                </div>
                            </div>
                            <svg
                                viewBox="0 0 100 100"
                                className="h-full w-full -rotate-90 drop-shadow-md"
                            >
                                <defs>
                                    <linearGradient
                                        id="founderGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#22c55e" />
                                        <stop
                                            offset="100%"
                                            stopColor="#16a34a"
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="vcGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop
                                            offset="100%"
                                            stopColor="#4f46e5"
                                        />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#f0f0f0"
                                    strokeWidth="20"
                                    fill="none"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#founderGradient)"
                                    strokeWidth="20"
                                    strokeDasharray={`${
                                        founderPercentage * 2.51
                                    } 251`}
                                    fill="none"
                                    className="drop-shadow-md"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#vcGradient)"
                                    strokeWidth="20"
                                    strokeDasharray={`${
                                        vcPercentage * 2.51
                                    } 251`}
                                    strokeDashoffset={`-${
                                        founderPercentage * 2.51
                                    }`}
                                    fill="none"
                                    className="drop-shadow-md"
                                />
                            </svg>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 text-center text-xs">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-100 shadow-sm group-hover:shadow transition-all duration-300">
                                <div className="flex items-center justify-center gap-1">
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-600" />
                                    <span className="font-medium">Founder</span>
                                </div>
                                <p className="text-green-800 mt-1 font-bold">
                                    {founderPercentage}%
                                </p>
                            </div>
                            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm group-hover:shadow transition-all duration-300">
                                <div className="flex items-center justify-center gap-1">
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600" />
                                    <span className="font-medium">VC</span>
                                </div>
                                <p className="text-indigo-800 mt-1 font-bold">
                                    {vcPercentage}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Question Types */}
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-purple-500" />
                            Question Types
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full -mr-12 -mt-12 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="font-medium flex items-center gap-1.5">
                                        <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                        Promotion Questions
                                    </span>
                                    <span className="font-bold text-sm bg-gradient-to-r from-indigo-50 to-indigo-100 px-3 py-1 rounded-full border border-indigo-200 shadow-sm">
                                        {summary.promotionQuestions}
                                    </span>
                                </div>
                                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-1000 group-hover:from-indigo-500 group-hover:to-indigo-700"
                                        style={{
                                            width: `${
                                                summary.promotionQuestions *
                                                12.5
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="font-medium flex items-center gap-1.5">
                                        <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                        Prevention Questions
                                    </span>
                                    <span className="font-bold text-sm bg-gradient-to-r from-red-50 to-red-100 px-3 py-1 rounded-full border border-red-200 shadow-sm">
                                        {summary.preventionQuestions}
                                    </span>
                                </div>
                                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000 group-hover:from-red-500 group-hover:to-red-700"
                                        style={{
                                            width: `${
                                                summary.preventionQuestions *
                                                12.5
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="pt-2 text-center">
                                <Badge
                                    variant={
                                        summary.preventionQuestions >
                                        summary.promotionQuestions
                                            ? "destructive"
                                            : "default"
                                    }
                                    className={`px-4 py-1.5 text-xs font-medium shadow-sm ${
                                        summary.preventionQuestions >
                                        summary.promotionQuestions
                                            ? "bg-gradient-to-r from-red-500 to-red-600"
                                            : "bg-gradient-to-r from-indigo-500 to-indigo-600"
                                    }`}
                                >
                                    {summary.preventionQuestions >
                                    summary.promotionQuestions
                                        ? "Prevention-Focused"
                                        : "Promotion-Focused"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sentiment Analysis */}
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Zap className="h-4 w-4 text-purple-500" />
                            Sentiment Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full -mr-12 -mt-12 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="font-medium flex items-center gap-1.5">
                                        <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        Founder Sentiment
                                    </span>
                                    <span className="font-medium px-3 py-1 rounded-full bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-sm">
                                        {participants.founder.sentiment}
                                    </span>
                                </div>
                                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000 group-hover:from-green-500 group-hover:to-green-700"
                                        style={{
                                            width: `${
                                                participants.founder
                                                    .sentimentScore * 100
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="font-medium flex items-center gap-1.5">
                                        <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                        VC Sentiment
                                    </span>
                                    <span className="font-medium px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200 shadow-sm">
                                        {participants.vc.sentiment}
                                    </span>
                                </div>
                                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-1000 group-hover:from-indigo-500 group-hover:to-indigo-700"
                                        style={{
                                            width: `${
                                                participants.vc.sentimentScore *
                                                100
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="pt-2 text-center">
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200 shadow-sm group-hover:shadow transition-all duration-300">
                                    <p className="font-medium text-gray-500 text-xs">
                                        Overall Tone:
                                    </p>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        {summary.overallTone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Interruptions */}
                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
                    <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-purple-500" />
                            Interruptions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full -mr-12 -mt-12 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-600" />
                                    <span className="text-xs font-medium">
                                        Founder
                                    </span>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100 text-sm font-bold text-green-700 border border-green-200 shadow-sm group-hover:shadow-md transition-all duration-300">
                                    {participants.founder.interruptions}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600" />
                                    <span className="text-xs font-medium">
                                        VC
                                    </span>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 text-sm font-bold text-indigo-700 border border-indigo-200 shadow-sm group-hover:shadow-md transition-all duration-300">
                                    {participants.vc.interruptions}
                                </div>
                            </div>
                            <div className="pt-2 text-center">
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200 shadow-sm group-hover:shadow transition-all duration-300">
                                    <p className="font-medium text-gray-500 text-xs">
                                        Total Interruptions:
                                    </p>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        {participants.founder.interruptions +
                                            participants.vc.interruptions}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
