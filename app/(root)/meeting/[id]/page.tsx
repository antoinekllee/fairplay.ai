"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type MeetingStatus = "in_meeting" | "completed" | "error";

export default function MeetingPage() {
    const { id } = useParams();
    const [status, setStatus] = useState<MeetingStatus>("in_meeting");
    const [isLoading, setIsLoading] = useState(true);

    async function checkMeetingStatus() {
        try {
            const response = await fetch(`/api/meeting/${id}/status`);
            const data = await response.json();

            if (data.status === "completed") {
                setStatus("completed");
            } else if (!response.ok) {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error checking meeting status:", error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkMeetingStatus();
        const interval = setInterval(checkMeetingStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container max-w-4xl py-10">
            <Card className="p-8">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <h1 className="text-3xl font-bold">Meeting Status</h1>

                    {status === "in_meeting" && (
                        <>
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                                <p className="text-xl text-muted-foreground">
                                    Meeting in Progress
                                </p>
                            </div>
                            <Button size="lg" disabled>
                                Generate Report
                            </Button>
                        </>
                    )}

                    {status === "completed" && (
                        <>
                            <div className="flex items-center space-x-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <p className="text-xl text-muted-foreground">
                                    Meeting Completed
                                </p>
                            </div>
                            <Button size="lg">Generate Report</Button>
                        </>
                    )}

                    {status === "error" && (
                        <p className="text-red-500">
                            Error checking meeting status
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}
