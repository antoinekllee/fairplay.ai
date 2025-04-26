"use client";

import { Button } from "@/components/ui/button";
import { createReport } from "@/lib/actions/report.actions";
import { mockReportData } from "./review/meeting-dashboard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function GenerateReportButton() {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateDummy = async () => {
        try {
            setIsGenerating(true);
            await createReport(mockReportData);
            router.refresh();
        } catch (error) {
            console.error("Error generating dummy report:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            onClick={handleGenerateDummy}
            disabled={isGenerating}
            className="min-w-[180px]"
        >
            {isGenerating ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                "Generate Demo Report"
            )}
        </Button>
    );
}
