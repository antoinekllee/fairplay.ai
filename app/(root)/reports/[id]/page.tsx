import { getReportById } from "@/lib/actions/report.actions";
import MeetingDashboard from "@/app/components/shared/review/meeting-dashboard";
import { notFound } from "next/navigation";

type ReportPageProps = {
    params: {
        id: string;
    };
};

export default async function ReportPage({ params }: ReportPageProps) {
    let report;
    try {
        report = await getReportById(params.id);
    } catch (error) {
        notFound();
    }

    return (
        <div className="space-y-8 p-6">
            <MeetingDashboard reportData={report} />
        </div>
    );
}
