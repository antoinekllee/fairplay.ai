import { NextResponse } from "next/server";
import { checkMeetingStatus } from "@/lib/actions/meeting.actions";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const result = await checkMeetingStatus(params.id);

        if (!result.success) {
            throw new Error(result.error);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error checking meeting status:", error);
        return NextResponse.json(
            { error: "Failed to check meeting status" },
            { status: 500 }
        );
    }
}
