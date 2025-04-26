import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    BarChart3,
    MessageSquare,
    Brain,
    Zap,
    Users,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white">
            {/* Navigation */}
            <header className="container mx-auto py-6 px-4">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                F
                            </span>
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                            FairPlay AI
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#why"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            Why It Matters
                        </a>
                        <a
                            href="#what"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            What We Do
                        </a>
                        <a
                            href="#how"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            How It Works
                        </a>
                        <a
                            href="#impact"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            Impact
                        </a>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        <Button
                            variant="outline"
                            className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                        >
                            Sign In
                        </Button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto py-16 px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-flex items-center justify-center p-1 mb-4 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                Now in Private Beta
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent leading-tight">
                            Elevate Founder-Investor Conversations with Clarity
                            and Confidence.
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl">
                            An AI meeting companion that transforms fundraising
                            conversations — empowering founders, enlightening
                            investors.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 shadow-md hover:shadow-lg transition-all duration-300">
                                Request Early Access
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                            >
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 border-b border-purple-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex space-x-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs font-medium text-gray-600">
                                        FairPlay AI Meeting Analysis
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-white">
                                            F
                                        </span>
                                    </div>
                                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-white">
                                            VC
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <img
                                    src="/ai-meeting-dashboard.png"
                                    alt="FairPlay AI Dashboard"
                                    className="w-full h-auto rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section
                id="why"
                className="py-20 bg-gradient-to-b from-white to-gray-50"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            <h2 className="text-lg font-bold text-gray-800">
                                Why It Matters
                            </h2>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
                            Startup Capital Isn't Distributed Fairly.
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The venture capital landscape is filled with
                            unconscious biases that prevent great ideas from
                            getting the funding they deserve.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: (
                                    <Users className="h-8 w-8 text-purple-600" />
                                ),
                                stat: "<3%",
                                text: "of VC funding goes to female-only teams",
                            },
                            {
                                icon: (
                                    <MessageSquare className="h-8 w-8 text-indigo-600" />
                                ),
                                stat: "<1%",
                                text: "of introverted founders get funded",
                            },
                            {
                                icon: (
                                    <BarChart3 className="h-8 w-8 text-purple-600" />
                                ),
                                stat: "78%",
                                text: "of VCs admit to unconscious bias in decisions",
                            },
                            {
                                icon: (
                                    <Zap className="h-8 w-8 text-indigo-600" />
                                ),
                                stat: "40%",
                                text: "of great ideas get overlooked — equity is broken",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                        {item.stat}
                                    </h4>
                                    <p className="text-gray-600">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section id="what" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            <h2 className="text-lg font-bold text-gray-800">
                                What We Do
                            </h2>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
                            ClarityLoop: The AI Companion for Better
                            Conversations.
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our AI-powered platform analyzes investor-founder
                            conversations to provide insights that level the
                            playing field.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
                            <img
                                src="/ai-meeting-insights.png"
                                alt="AI Meeting Analysis"
                                className="w-full h-auto rounded-2xl shadow-xl border border-purple-100"
                            />
                        </div>
                        <div className="space-y-8 flex flex-col justify-center">
                            {[
                                {
                                    title: "Joins live meetings",
                                    description:
                                        "Seamlessly integrates with Zoom, Google Meet, and Microsoft Teams",
                                    icon: (
                                        <MessageSquare className="h-6 w-6 text-white" />
                                    ),
                                },
                                {
                                    title: "Analyzes conversation dynamics",
                                    description:
                                        "Evaluates tone, question framing, interruptions, and speaking time",
                                    icon: (
                                        <Brain className="h-6 w-6 text-white" />
                                    ),
                                },
                                {
                                    title: "Delivers private insights",
                                    description:
                                        "Provides personalized reports to both founders & investors",
                                    icon: (
                                        <BarChart3 className="h-6 w-6 text-white" />
                                    ),
                                },
                                {
                                    title: "Helps ideas — not identities — win",
                                    description:
                                        "Creates a more equitable fundraising environment",
                                    icon: (
                                        <Users className="h-6 w-6 text-white" />
                                    ),
                                },
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section
                id="how"
                className="py-20 bg-gradient-to-b from-gray-50 to-white"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            <h2 className="text-lg font-bold text-gray-800">
                                How It Works
                            </h2>
                        </div>
                    </div>

                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
                            How ClarityLoop Elevates Meetings:
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our advanced AI technology works behind the scenes
                            to provide valuable insights in real-time.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>

                            {[
                                {
                                    title: "Real-time transcription",
                                    description:
                                        "Powered by Meetstream.ai API for accurate, real-time speech recognition",
                                    icon: (
                                        <MessageSquare className="h-6 w-6 text-white" />
                                    ),
                                    align: "right",
                                },
                                {
                                    title: "AI-driven tone & question analysis",
                                    description:
                                        "Our proprietary algorithms detect subtle patterns in conversation dynamics and question framing",
                                    icon: (
                                        <Brain className="h-6 w-6 text-white" />
                                    ),
                                    align: "left",
                                },
                                {
                                    title: "Founder empowerment + VC reflection reports",
                                    description:
                                        "Personalized insights delivered to each participant, highlighting strengths and opportunities",
                                    icon: (
                                        <BarChart3 className="h-6 w-6 text-white" />
                                    ),
                                    align: "right",
                                },
                                {
                                    title: "Continuous improvement",
                                    description:
                                        "Our AI learns from each conversation, becoming more accurate and insightful over time",
                                    icon: (
                                        <Zap className="h-6 w-6 text-white" />
                                    ),
                                    align: "left",
                                },
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    className="relative mb-16 last:mb-0"
                                >
                                    <div
                                        className={`flex items-center gap-8 ${
                                            step.align === "left"
                                                ? "flex-row"
                                                : "flex-row-reverse text-right"
                                        }`}
                                    >
                                        <div className="w-1/2 md:w-5/12">
                                            <div
                                                className={`bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 ${
                                                    step.align === "left"
                                                        ? "ml-auto mr-8"
                                                        : "mr-auto ml-8"
                                                }`}
                                            >
                                                <h4 className="text-xl font-bold text-gray-800 mb-2">
                                                    {step.title}
                                                </h4>
                                                <p className="text-gray-600">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg z-10">
                                            {step.icon}
                                        </div>

                                        <div className="w-1/2 md:w-5/12"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                            <h2 className="text-lg font-bold text-gray-800">
                                Impact
                            </h2>
                        </div>
                    </div>

                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4">
                            For Founders. For Investors. For the Future.
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            FairPlay AI creates positive change for all
                            participants in the startup ecosystem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Founders",
                                description:
                                    "Build clarity, boost confidence, and present your ideas with maximum impact",
                                icon: <Users className="h-8 w-8 text-white" />,
                                color: "from-green-500 to-green-600",
                            },
                            {
                                title: "Investors",
                                description:
                                    "Grow inclusive practices, reduce bias, and discover overlooked opportunities",
                                icon: (
                                    <BarChart3 className="h-8 w-8 text-white" />
                                ),
                                color: "from-indigo-500 to-indigo-600",
                            },
                            {
                                title: "Ecosystem",
                                description:
                                    "Fairer capital flow, better companies funded, and a more diverse startup landscape",
                                icon: <Zap className="h-8 w-8 text-white" />,
                                color: "from-purple-500 to-purple-600",
                            },
                        ].map((column, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div
                                        className={`p-4 rounded-xl mb-6 bg-gradient-to-br ${column.color} group-hover:scale-110 transition-transform duration-300 shadow-md`}
                                    >
                                        {column.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-3">
                                        {column.title}
                                    </h4>
                                    <p className="text-gray-600">
                                        {column.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
                        <div className="relative p-12 text-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-3xl"></div>
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl"></div>

                            <div className="relative">
                                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-6">
                                    Ready to Illuminate the Signal?
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Join our beta program and be among the first
                                    to experience the future of equitable
                                    fundraising conversations.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 shadow-md hover:shadow-lg transition-all duration-300">
                                        Join the Beta
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                                    >
                                        Request Demo
                                    </Button>
                                </div>

                                <p className="text-sm text-gray-500 mt-8">
                                    Let's make the future of venture capital
                                    more fair, one conversation at a time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-12 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-6 md:mb-0">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    F
                                </span>
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                                FairPlay AI
                            </span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
                            <a
                                href="#why"
                                className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                            >
                                Why It Matters
                            </a>
                            <a
                                href="#what"
                                className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                            >
                                What We Do
                            </a>
                            <a
                                href="#how"
                                className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                            >
                                How It Works
                            </a>
                            <a
                                href="#impact"
                                className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                            >
                                Impact
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-10 w-10 bg-gray-100 hover:bg-gray-200 text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-10 w-10 bg-gray-100 hover:bg-gray-200 text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                                <span className="sr-only">Twitter</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-10 w-10 bg-gray-100 hover:bg-gray-200 text-gray-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect
                                        x="2"
                                        y="9"
                                        width="4"
                                        height="12"
                                    ></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
                        <p>© 2025 FairPlay AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
