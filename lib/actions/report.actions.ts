"use server";

import { connectToDatabase } from "@/lib/database";
import Report from "@/lib/database/models/report.model";
import { revalidatePath } from "next/cache";
import { getUser } from "./user.actions";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { SYSTEM_PROMPT } from "@/constants/prompt";
import { getMeetingAudio, getMeetingTranscript } from "./meeting.actions";
import { redirect } from "next/navigation";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define the response schema for Gemini
const reportResponseSchema = {
    type: SchemaType.OBJECT,
    properties: {
        participants: {
            type: SchemaType.OBJECT,
            properties: {
                founder: {
                    type: SchemaType.OBJECT,
                    properties: {
                        talkTime: { type: SchemaType.NUMBER },
                        interruptions: { type: SchemaType.NUMBER },
                        sentiment: { type: SchemaType.STRING },
                        sentimentScore: { type: SchemaType.NUMBER },
                    },
                    required: [
                        "talkTime",
                        "interruptions",
                        "sentiment",
                        "sentimentScore",
                    ],
                },
                vc: {
                    type: SchemaType.OBJECT,
                    properties: {
                        talkTime: { type: SchemaType.NUMBER },
                        interruptions: { type: SchemaType.NUMBER },
                        sentiment: { type: SchemaType.STRING },
                        sentimentScore: { type: SchemaType.NUMBER },
                    },
                    required: [
                        "talkTime",
                        "interruptions",
                        "sentiment",
                        "sentimentScore",
                    ],
                },
            },
            required: ["founder", "vc"],
        },
        summary: {
            type: SchemaType.OBJECT,
            properties: {
                promotionQuestions: { type: SchemaType.NUMBER },
                preventionQuestions: { type: SchemaType.NUMBER },
                keywordTriggers: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                },
                overallTone: { type: SchemaType.STRING },
            },
            required: [
                "promotionQuestions",
                "preventionQuestions",
                "keywordTriggers",
                "overallTone",
            ],
        },
        questions: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    id: { type: SchemaType.STRING },
                    type: {
                        type: SchemaType.STRING,
                        enum: ["prevention", "promotion"],
                    },
                    question: { type: SchemaType.STRING },
                    answer: { type: SchemaType.STRING },
                    talkTime: {
                        type: SchemaType.OBJECT,
                        properties: {
                            founder: { type: SchemaType.NUMBER },
                            vc: { type: SchemaType.NUMBER },
                        },
                        required: ["founder", "vc"],
                    },
                    interruptions: {
                        type: SchemaType.OBJECT,
                        properties: {
                            founder: { type: SchemaType.NUMBER },
                            vc: { type: SchemaType.NUMBER },
                        },
                        required: ["founder", "vc"],
                    },
                    sentiment: {
                        type: SchemaType.OBJECT,
                        properties: {
                            founder: { type: SchemaType.STRING },
                            vc: { type: SchemaType.STRING },
                        },
                        required: ["founder", "vc"],
                    },
                    keywords: {
                        type: SchemaType.ARRAY,
                        items: { type: SchemaType.STRING },
                    },
                    analysis: { type: SchemaType.STRING },
                },
                required: [
                    "id",
                    "type",
                    "question",
                    "answer",
                    "talkTime",
                    "interruptions",
                    "sentiment",
                    "keywords",
                    "analysis",
                ],
            },
        },
        transcript: { type: SchemaType.STRING },
        reports: {
            type: SchemaType.OBJECT,
            properties: {
                vc: {
                    type: SchemaType.OBJECT,
                    properties: {
                        strengths: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                        improvements: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                        recommendations: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                    },
                    required: ["strengths", "improvements", "recommendations"],
                },
                founder: {
                    type: SchemaType.OBJECT,
                    properties: {
                        strengths: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                        improvements: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                        recommendations: {
                            type: SchemaType.ARRAY,
                            items: { type: SchemaType.STRING },
                        },
                    },
                    required: ["strengths", "improvements", "recommendations"],
                },
            },
            required: ["vc", "founder"],
        },
    },
    required: ["participants", "summary", "questions", "transcript", "reports"],
};

async function processAudioAndTranscript(
    audioBase64: string,
    transcriptText: string
) {
    try {
        console.log("🚀 Starting audio and transcript processing...");

        // Setup Gemini model
        console.log("🤖 Initializing Gemini model...");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-pro-preview-03-25",
        });

        // Log the request configuration
        console.log("📤 Preparing Gemini API request with config:", {
            model: "gemini-2.5-pro-preview-03-25",
            temperature: 0.7,
            maxOutputTokens: 8000,
        });

        // Create the prompt with both audio and transcript
        const result = await model.generateContent({
            systemInstruction: SYSTEM_PROMPT,
            contents: [
                {
                    role: "user",
                    parts: [
                        // {
                        //     inlineData: {
                        //         mimeType: "audio/wav",
                        //         data: audioBase64,
                        //     },
                        // },
                        { text: `Transcript:\n${transcriptText}` },
                    ],
                },
            ],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: reportResponseSchema as any,
                temperature: 0.7,
                maxOutputTokens: 12000,
            },
        });

        console.log("✅ Gemini API response received");

        const response = await result.response;
        const parsedResponse = JSON.parse(response.text());

        console.log("📊 Response statistics:", {
            questionCount: parsedResponse.questions?.length || 0,
            keywordTriggers:
                parsedResponse.summary?.keywordTriggers?.length || 0,
            overallTone: parsedResponse.summary?.overallTone,
        });

        return parsedResponse;
    } catch (error) {
        console.error("Error processing audio and transcript:", error);
        throw error;
    }
}

export async function getReports() {
    try {
        await connectToDatabase();
        const user = await getUser();
        if (!user) throw new Error("User not found");

        const reports = await Report.find({
            $or: [
                { "participants.founder.userId": user._id },
                { "participants.vc.userId": user._id },
            ],
        }).sort({ createdAt: -1 });

        return JSON.parse(JSON.stringify(reports));
    } catch (error) {
        console.error("Error fetching reports:", error);
        throw error;
    }
}

export async function getReportById(reportId: string) {
    try {
        await connectToDatabase();
        const user = await getUser();
        if (!user) throw new Error("User not found");

        const report = await Report.findOne({
            _id: reportId,
            $or: [
                { "participants.founder.userId": user._id },
                { "participants.vc.userId": user._id },
            ],
        });

        if (!report) throw new Error("Report not found");

        return JSON.parse(JSON.stringify(report));
    } catch (error) {
        console.error("Error fetching report:", error);
        throw error;
    }
}

export async function createReport(meetingId: string) {
    try {
        await connectToDatabase();
        const user = await getUser();
        if (!user) throw new Error("User not found");

        // Get the meeting audio and transcript
        const audioResult = await getMeetingAudio(meetingId);
        if (!audioResult.success || !audioResult.audioData) {
            throw new Error(audioResult.error || "Failed to get meeting audio");
        }

        const transcriptResult = await getMeetingTranscript(meetingId);
        if (!transcriptResult.success || !transcriptResult.data) {
            throw new Error(
                transcriptResult.error || "Failed to get meeting transcript"
            );
        }

        // Convert transcript array to string format expected by Gemini
        const transcriptText = transcriptResult.data
            .map(
                (entry: { speaker: string; transcript: string }) =>
                    `${entry.speaker}: ${entry.transcript}`
            )
            .join("\n");

        // Process the audio and transcript directly with Gemini
        const generatedReport = await processAudioAndTranscript(
            audioResult.audioData,
            transcriptText
        );

        // Add the current user's ID to the appropriate participant
        const isFounder = user.onboardingData?.userRole === "founder";
        if (isFounder) {
            generatedReport.participants.founder.userId = user._id;
        } else {
            generatedReport.participants.vc.userId = user._id;
        }

        const newReport = await Report.create(generatedReport);
        revalidatePath("/dashboard");

        redirect(`/reports/${newReport._id}`);

        return JSON.parse(JSON.stringify(newReport));
    } catch (error) {
        console.error("Error creating report:", error);
        throw error;
    }
}
