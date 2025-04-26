import { NewMeetingForm } from "@/app/components/shared/new-meeting-form";

export default function NewMeetingPage() {
    return (
        <div className="container max-w-2xl py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">New Meeting Analysis</h1>
                <p className="text-muted-foreground mt-2">
                    Paste your Zoom meeting link below to start analyzing your
                    meeting.
                </p>
            </div>
            <NewMeetingForm />
        </div>
    );
}
