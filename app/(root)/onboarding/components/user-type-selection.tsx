"use client";

import { Button } from "@/components/ui/button";
import { UserRound, Building2 } from "lucide-react";

interface UserTypeSelectionProps {
    onSelect: (type: UserRole) => void;
}

export default function UserTypeSelection({
    onSelect,
}: UserTypeSelectionProps) {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8">
                Are you a Founder or an Investor?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                    onClick={() => onSelect("founder")}
                    className="h-auto py-8 flex flex-col items-center gap-4 text-lg"
                    variant="outline"
                >
                    <UserRound size={48} />
                    <span>Founder</span>
                </Button>

                <Button
                    onClick={() => onSelect("investor")}
                    className="h-auto py-8 flex flex-col items-center gap-4 text-lg"
                    variant="outline"
                >
                    <Building2 size={48} />
                    <span>Investor (VC)</span>
                </Button>
            </div>
        </div>
    );
}
