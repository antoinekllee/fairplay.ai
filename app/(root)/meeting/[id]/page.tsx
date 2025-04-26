"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createReport } from "@/lib/actions/report.actions";
import {
    updateMeetingWithReport,
    checkMeetingStatus,
} from "@/lib/actions/meeting.actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type MeetingStatus = "Joining" | "InMeeting" | "Stopped" | "error";

function getStatusColor(status: MeetingStatus) {
    switch (status) {
        case "Joining":
            return "animate-pulse bg-yellow-500";
        case "InMeeting":
            return "animate-pulse bg-blue-500";
        case "Stopped":
            return "bg-green-500";
        case "error":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
}

export default function MeetingPage() {
    const { id } = useParams();
    const router = useRouter();
    const [status, setStatus] = useState<MeetingStatus>("Joining");
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    async function handleCheckMeetingStatus() {
        try {
            const result = await checkMeetingStatus(id as string);
            if (!result.success) {
                setStatus("error");
                return;
            }

            setStatus(result.status as MeetingStatus);
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error checking meeting status:", error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGenerateReport() {
        try {
            setIsGenerating(true);
            const report = await createReport(id as string);
            if (report._id) {
                await updateMeetingWithReport(id as string, report._id);
                router.push(`/reports/${report._id}`);
            }
        } catch (error) {
            console.error("Error generating report:", error);
            toast.error("Failed to generate report");
        } finally {
            setIsGenerating(false);
        }
    }

    useEffect(() => {
        handleCheckMeetingStatus();
        const interval = setInterval(handleCheckMeetingStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container max-w-4xl py-10">
            <Card className="p-8">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <h1 className="text-3xl font-bold">Meeting Status</h1>

                    <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-2">
                            <div
                                className={`h-3 w-3 rounded-full ${getStatusColor(
                                    status
                                )}`}
                            ></div>
                            <p className="text-xl text-muted-foreground">
                                {status}
                            </p>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </p>

                        <Button
                            size="lg"
                            onClick={handleGenerateReport}
                            disabled={status !== "Stopped" || isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Report...
                                </>
                            ) : (
                                "Generate Report"
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
