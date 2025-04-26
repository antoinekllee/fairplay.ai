"use server";

import { connectToDatabase } from "@/lib/database";
import Report from "@/lib/database/models/report.model";
import { revalidatePath } from "next/cache";
import { getUser } from "./user.actions";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { SYSTEM_PROMPT } from "@/constants/prompt";

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
    audioPath: string,
    transcriptPath: string
) {
    try {
        console.log("🚀 Starting audio and transcript processing...");
        console.log("📂 Reading files from:", { audioPath, transcriptPath });

        // Read the audio file
        const audioFile = await fs.readFile(audioPath);
        const audioBase64 = audioFile.toString("base64");
        console.log("🎵 Audio file read successfully", {
            audioSizeBytes: audioFile.length,
            base64Length: audioBase64.length,
        });

        // Read the transcript
        const transcript = await fs.readFile(transcriptPath, "utf-8");
        console.log("📝 Transcript read successfully", {
            transcriptLength: transcript.length,
            previewText: transcript.slice(0, 100) + "...",
        });

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
                        {
                            inlineData: {
                                mimeType: "audio/m4a",
                                data: audioBase64,
                            },
                        },
                        { text: `Transcript:\n${transcript}` },
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

export async function createReport(reportData: ReportData) {
    try {
        await connectToDatabase();
        const user = await getUser();
        if (!user) throw new Error("User not found");

        // Process the audio and transcript files
        const audioPath = path.join(
            process.cwd(),
            "public",
            "data",
            "test1",
            "audio.m4a"
        );
        const transcriptPath = path.join(
            process.cwd(),
            "public",
            "data",
            "test1",
            "transcript.txt"
        );

        const generatedReport = await processAudioAndTranscript(
            audioPath,
            transcriptPath
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

        return JSON.parse(JSON.stringify(newReport));
    } catch (error) {
        console.error("Error creating report:", error);
        throw error;
    }
}
