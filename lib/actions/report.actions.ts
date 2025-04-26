"use server";

import { connectToDatabase } from "@/lib/database";
import Report from "@/lib/database/models/report.model";
import { revalidatePath } from "next/cache";
import { getUser } from "./user.actions";

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

        // Add the current user's ID to the appropriate participant
        const isFounder = user.onboardingData?.userRole === "founder";
        if (isFounder) {
            reportData.participants.founder.userId = user._id;
        } else {
            reportData.participants.vc.userId = user._id;
        }

        const newReport = await Report.create(reportData);
        revalidatePath("/dashboard");

        return JSON.parse(JSON.stringify(newReport));
    } catch (error) {
        console.error("Error creating report:", error);
        throw error;
    }
}
