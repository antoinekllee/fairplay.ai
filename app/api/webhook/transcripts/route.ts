import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        // console.log("payload");
        // console.log(payload);

        // console.log("Transcript received:", JSON.stringify(payload, null, 2));

        return NextResponse.json({ status: "received" });
    } catch (error) {
        console.error("Error processing transcript webhook:", error);
        return NextResponse.json(
            { error: "Failed to process transcript" },
            { status: 500 }
        );
    }
}
