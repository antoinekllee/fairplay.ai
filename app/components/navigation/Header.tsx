"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
    return (
        <header className="container mx-auto py-6 px-4">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                        FairPlay AI
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <SignedOut>
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
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/meeting/new"
                            className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors"
                        >
                            New Meeting
                        </Link>
                    </SignedIn>
                </div>
                <div>
                    <SignedOut>
                        <Button
                            variant="outline"
                            className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                            asChild
                        >
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
}
