"use client";

import { ChevronDown, MessageSquare, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type QuestionsListProps = {
    data: ReportData;
};

export function QuestionsList({ data }: QuestionsListProps) {
    return (
        <div className="space-y-10">
            <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <h2 className="text-lg font-bold text-gray-800">
                        Questions Analysis
                    </h2>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
                {data.questions.map((question, index) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

function QuestionCard({
    question,
    index,
}: {
    question: Question;
    index: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const totalTalkTime = question.talkTime.founder + question.talkTime.vc;
    const founderPercentage = Math.round(
        (question.talkTime.founder / totalTalkTime) * 100
    );
    const vcPercentage = 100 - founderPercentage;

    return (
        <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white backdrop-blur-sm rounded-2xl">
            <CardHeader
                className={`pb-3 ${
                    question.type === "prevention"
                        ? "bg-gradient-to-r from-red-50 via-red-50 to-orange-50"
                        : "bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50"
                } border-b ${
                    question.type === "prevention"
                        ? "border-red-100"
                        : "border-indigo-100"
                }`}
            >
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-sm font-bold shadow-sm border border-gray-100">
                                {index + 1}
                            </div>
                            <CardTitle className="text-base">
                                {question.question}
                            </CardTitle>
                        </div>
                        <div>
                            <Badge
                                variant={
                                    question.type === "prevention"
                                        ? "destructive"
                                        : "default"
                                }
                                className={`mt-2 ${
                                    question.type === "prevention"
                                        ? "bg-gradient-to-r from-red-500 to-red-600 border-red-600"
                                        : "bg-gradient-to-r from-indigo-500 to-indigo-600 border-indigo-600"
                                } text-white shadow-sm`}
                            >
                                {question.type === "prevention"
                                    ? "Prevention"
                                    : "Promotion"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-5 space-y-4">
                    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white p-4 border border-gray-100 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                                <MessageSquare className="h-5 w-5 text-white" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-medium text-indigo-600">
                                    VC Question
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {question.question}
                                </p>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="text-xs font-medium text-green-600">
                                    Founder Response
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {question.answer}
                                </p>
                                <Badge
                                    variant="outline"
                                    className="bg-white text-xs border-purple-200 text-purple-700 shadow-sm"
                                >
                                    Analysis: {question.analysis}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all duration-300"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="text-xs font-medium">
                            {isOpen
                                ? "Hide Detailed Analysis"
                                : "View Detailed Analysis"}
                        </span>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </Button>
                </div>

                {isOpen && (
                    <div className="p-5 pt-0 space-y-6 animate-in slide-in-from-top-5 duration-500">
                        <div className="grid gap-6 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></span>
                                    Talk Time
                                </h4>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-green-600" />
                                    <span className="text-xs">
                                        Founder: {question.talkTime.founder}s (
                                        {founderPercentage}%)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600" />
                                    <span className="text-xs">
                                        VC: {question.talkTime.vc}s (
                                        {vcPercentage}%)
                                    </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner">
                                    <div
                                        className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                                        style={{
                                            width: `${founderPercentage}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></span>
                                    Interruptions
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-green-600" />
                                        <span className="text-xs">Founder</span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100 text-xs font-medium text-green-700 border border-green-200 shadow-sm">
                                        {question.interruptions.founder}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600" />
                                        <span className="text-xs">VC</span>
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 text-xs font-medium text-indigo-700 border border-indigo-200 shadow-sm">
                                        {question.interruptions.vc}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></span>
                                    Sentiment
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-green-600" />
                                        <span className="text-xs">Founder</span>
                                    </div>
                                    <Badge className="bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200 shadow-sm">
                                        {question.sentiment.founder}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600" />
                                        <span className="text-xs">VC</span>
                                    </div>
                                    <Badge className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border-indigo-200 shadow-sm">
                                        {question.sentiment.vc}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></span>
                                    Keywords
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {question.keywords.map(
                                        (keyword: string) => (
                                            <Badge
                                                key={keyword}
                                                variant="outline"
                                                className="text-xs bg-white border-purple-200 text-purple-700 shadow-sm"
                                            >
                                                {keyword}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
