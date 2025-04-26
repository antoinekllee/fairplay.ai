"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface InvestorFormProps {
    onSubmit: (data: InvestorOnboardingData) => void;
    isSubmitting?: boolean;
}

export default function InvestorForm({
    onSubmit,
    isSubmitting = false,
}: InvestorFormProps) {
    const [firmName, setFirmName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            firmName,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="firm-name">Firm Name</Label>
                    <Input
                        id="firm-name"
                        placeholder="Enter your firm's name"
                        value={firmName}
                        onChange={(e) => setFirmName(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Continue"
                )}
            </Button>
        </form>
    );
}
