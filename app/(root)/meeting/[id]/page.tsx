"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createReport } from "@/lib/actions/report.actions";
import {
    updateMeetingWithReport,
    checkMeetingStatus,
    getMeetingTranscript,
    getMeetingAudio,
} from "@/lib/actions/meeting.actions";
import { Loader2, FileText, Volume2 } from "lucide-react";
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
    const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    async function handleCheckMeetingStatus() {
        try {
            const result = await checkMeetingStatus(id as string);
            if (!result.success) {
                setStatus("error");
                return;
            }

            if (result.reportId) {
                router.push(`/reports/${result.reportId}`);
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

    async function handleGetTranscript() {
        try {
            setIsLoadingTranscript(true);
            const result = await getMeetingTranscript(id as string);

            if (!result.success) {
                toast.error(result.error || "Failed to get transcript");
                return;
            }

            // For now, let's just show the transcript in a toast
            // You could also store it in state and display it in the UI
            toast.success("Transcript retrieved successfully!");
            console.log("Transcript:", result.data);

            if (!result.data) {
                toast.error("Failed to get transcript");
                return;
            }

            setTranscript(result.data);
        } catch (error) {
            console.error("Error getting transcript:", error);
            toast.error("Failed to get transcript");
        } finally {
            setIsLoadingTranscript(false);
        }
    }

    async function handleGetAudio() {
        try {
            setIsLoadingAudio(true);
            const result = await getMeetingAudio(id as string);

            if (!result.success || !result.audioData) {
                toast.error(result.error || "Failed to get audio");
                return;
            }

            // Create a blob URL from the base64 audio data
            const blob = new Blob([Buffer.from(result.audioData, "base64")], {
                type: "audio/wav",
            });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            toast.success("Audio loaded successfully!");
        } catch (error) {
            console.error("Error getting audio:", error);
            toast.error("Failed to get audio");
        } finally {
            setIsLoadingAudio(false);
        }
    }

    // Cleanup blob URL on unmount
    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    // Add initial redirect check
    useEffect(() => {
        handleCheckMeetingStatus();
    }, []);

    // Add polling effect separately
    useEffect(() => {
        const interval = setInterval(handleCheckMeetingStatus, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container max-w-7xl py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    onClick={handleGenerateReport}
                                    disabled={
                                        status !== "Stopped" || isGenerating
                                    }
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

                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={handleGetTranscript}
                                    disabled={isLoadingTranscript}
                                >
                                    {isLoadingTranscript ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading Transcript...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="mr-2 h-4 w-4" />
                                            Get Transcript
                                        </>
                                    )}
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={handleGetAudio}
                                    disabled={isLoadingAudio}
                                >
                                    {isLoadingAudio ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading Audio...
                                        </>
                                    ) : (
                                        <>
                                            <Volume2 className="mr-2 h-4 w-4" />
                                            Get Audio
                                        </>
                                    )}
                                </Button>
                            </div>

                            {audioUrl && (
                                <div className="w-full max-w-md mt-4">
                                    <audio
                                        controls
                                        className="w-full"
                                        src={audioUrl}
                                    >
                                        Your browser does not support the audio
                                        element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {transcript && (
                    <Card className="p-8 h-[600px] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-6">
                            Meeting Transcript
                        </h2>
                        <div className="space-y-4">
                            {transcript.map((entry, index) => (
                                <div
                                    key={`${entry.timestamp}-${index}`}
                                    className="border-b border-border pb-4 last:border-0"
                                >
                                    <p className="font-medium text-primary mb-1">
                                        {entry.speaker}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {entry.transcript}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
