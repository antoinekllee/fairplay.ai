"use server";

import { connectToDatabase } from "@/lib/database";
import Report from "@/lib/database/models/report.model";
import { revalidatePath } from "next/cache";
import { getUser } from "./user.actions";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { SYSTEM_PROMPT } from "@/constants/prompt";

export async function addBotToMeeting(meetingLink: string) {
    try {
        const API_KEY = process.env.MEETSTREAM_API_KEY;
        if (!API_KEY) {
            throw new Error("MEETSTREAM_API_KEY is not configured");
        }

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
                }),
            }
        );

        console.log("🚀 Response:", response);

        if (!response.ok) {
            throw new Error(`Failed to add bot: ${response.statusText}`);
        }

        const data = await response.json();
        return data.bot_id;
    } catch (error) {
        console.error("Error adding bot to meeting:", error);
        throw error;
    }
}
