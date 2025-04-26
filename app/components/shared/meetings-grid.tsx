"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type Meeting = {
    _id: string;
    botId: string;
    userId: string;
    reportId: string | null;
    createdAt: string;
    updatedAt: string;
};

type MeetingsGridProps = {
    meetings: Meeting[];
};

export function MeetingsGrid({ meetings }: MeetingsGridProps) {
    const router = useRouter();

    const handleCardClick = (meeting: Meeting) => {
        if (meeting.reportId) {
            router.push(`/reports/${meeting.reportId}`);
        } else {
            router.push(`/meeting/${meeting._id}`);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">
                    Your Meetings
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetings.map((meeting) => (
                    <Card
                        key={meeting._id}
                        className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => handleCardClick(meeting)}
                    >
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <p className="text-sm text-muted-foreground">
                                    {new Date(
                                        meeting.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <Badge
                                    variant={
                                        meeting.reportId ? "default" : "outline"
                                    }
                                >
                                    {meeting.reportId
                                        ? "Report Ready"
                                        : "In Progress"}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">
                                        Meeting Session
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Bot ID: {meeting.botId.slice(0, 8)}...
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            meeting.createdAt
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
