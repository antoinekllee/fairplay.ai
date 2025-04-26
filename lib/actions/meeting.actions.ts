"use server";

import { connectToDatabase } from "@/lib/database";
import Meeting from "@/lib/database/models/meeting.model";
import { revalidatePath } from "next/cache";
import { getUser } from "./user.actions";

export async function addBotToMeeting(meetingLink: string) {
    try {
        const API_KEY = process.env.MEETSTREAM_API_KEY;
        if (!API_KEY) {
            throw new Error("MEETSTREAM_API_KEY is not configured");
        }

        // Get the current user
        const user = await getUser();
        if (!user) {
            throw new Error("User not found");
        }

        // Create bot in MeetStream
        const response = await fetch(
            "https://api-meetstream-tst-hack.meetstream.ai/api/v1/bots/create_bot",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${API_KEY}`,
                },
                body: JSON.stringify({
                    meeting_link: meetingLink,
                    bot_name: "FairPlayAI Bot",
                    audio_required: true,
                    video_required: false,
                    live_transcription_required: {
                        webhook_url: `https://dove-engaging-leech.ngrok-free.app/api/webhook/transcripts`,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to add bot: ${response.statusText}`);
        }

        const data = await response.json();

        // Connect to database
        await connectToDatabase();

        // Create meeting in database
        const meeting = await Meeting.create({
            botId: data.bot_id,
            userId: user._id,
        });

        revalidatePath("/meeting/[id]");
        return { success: true, meetingId: meeting._id.toString() };
    } catch (error) {
        console.error("Error adding bot to meeting:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        };
    }
}

export async function updateMeetingWithReport(
    meetingId: string,
    reportId: string
) {
    try {
        await connectToDatabase();
        const meeting = await Meeting.findByIdAndUpdate(
            meetingId,
            { reportId },
            { new: true }
        );
        return meeting;
    } catch (error) {
        console.error("Error updating meeting with report:", error);
        throw error;
    }
}

export async function checkMeetingStatus(meetingId: string) {
    try {
        const API_KEY = process.env.MEETSTREAM_API_KEY;
        if (!API_KEY) {
            throw new Error("MEETSTREAM_API_KEY is not configured");
        }

        // Connect to database and get meeting
        await connectToDatabase();
        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            throw new Error("Meeting not found");
        }

        // If meeting already has a report, return completed
        if (meeting.reportId) {
            return {
                success: true,
                status: "completed",
                reportId: JSON.parse(JSON.stringify(meeting.reportId)),
            };
        }

        const response = await fetch(
            `https://api-meetstream-tst-hack.meetstream.ai/api/v1/bots/${meeting.botId}/status`,
            {
                headers: {
                    Authorization: `Token ${API_KEY}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to get status: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            success: true,
            status: data.status,
            reportId: meeting.reportId,
        };
    } catch (error) {
        console.error("Error checking meeting status:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to check meeting status",
        };
    }
}

export async function getMeetings(): Promise<Meeting[]> {
    try {
        // Get the current user
        const user = await getUser();
        if (!user) {
            throw new Error("User not found");
        }

        // Connect to database
        await connectToDatabase();

        // Get meetings for the user
        const meetings = await Meeting.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .lean();

        return meetings.map((meeting) => ({
            _id: String(meeting._id),
            botId: String(meeting.botId),
            userId: String(meeting.userId),
            reportId: meeting.reportId ? String(meeting.reportId) : null,
            createdAt: new Date(meeting.createdAt).toISOString(),
            updatedAt: new Date(meeting.updatedAt).toISOString(),
        }));
    } catch (error) {
        console.error("Error getting meetings:", error);
        return [];
    }
}

export async function getMeetingTranscript(
    meetingId: string
): Promise<{ success: boolean; data?: Transcript; error?: string }> {
    try {
        const API_KEY = process.env.MEETSTREAM_API_KEY;
        if (!API_KEY) {
            throw new Error("MEETSTREAM_API_KEY is not configured");
        }

        // Connect to database and get meeting
        await connectToDatabase();
        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            throw new Error("Meeting not found");
        }

        const response = await fetch(
            `https://api-meetstream-tst-hack.meetstream.ai/api/v1/bots/${meeting.botId}/get_transcript`,
            {
                headers: {
                    Authorization: `Token ${API_KEY}`,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return {
                    success: false,
                    error: "Transcript not available yet",
                };
            }
            throw new Error(`Failed to get transcript: ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Transcript:", JSON.stringify(data, null, 2));

        return {
            success: true,
            data: JSON.parse(JSON.stringify(data as Transcript)),
        };
    } catch (error) {
        console.error("Error getting meeting transcript:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to get transcript",
        };
    }
}

export async function getMeetingAudio(
    meetingId: string
): Promise<{ success: boolean; audioData?: string; error?: string }> {
    try {
        const API_KEY = process.env.MEETSTREAM_API_KEY;
        if (!API_KEY) {
            throw new Error("MEETSTREAM_API_KEY is not configured");
        }

        // Connect to database and get meeting
        await connectToDatabase();
        const meeting = await Meeting.findById(meetingId);

        if (!meeting) {
            throw new Error("Meeting not found");
        }

        const response = await fetch(
            `https://api-meetstream-tst-hack.meetstream.ai/api/v1/bots/${meeting.botId}/get_audio`,
            {
                headers: {
                    Authorization: `Token ${API_KEY}`,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return {
                    success: false,
                    error: "Audio not available yet",
                };
            }
            throw new Error(`Failed to get audio: ${response.statusText}`);
        }

        // Convert the audio buffer to base64
        const arrayBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString("base64");

        console.log("Audio:", base64Audio);

        return {
            success: true,
            audioData: base64Audio,
        };
    } catch (error) {
        console.error("Error getting meeting audio:", error);
        return {
            success: false,
            error:
                error instanceof Error ? error.message : "Failed to get audio",
        };
    }
}
