import { getUser } from "@/lib/actions/user.actions";
import { getReports } from "@/lib/actions/report.actions";
import { FounderDataCard } from "@/app/components/shared/founder-data-card";
import { InvestorDataCard } from "@/app/components/shared/investor-data-card";
import { ReportsGrid } from "@/app/components/shared/reports-grid";

export default async function DashboardPage() {
    // const user = await getUser();
    const reports = await getReports();

    // if (!user?.onboardingData) {
    //     return (
    //         <div className="flex items-center justify-center min-h-[200px]">
    //             <p className="text-muted-foreground">
    //                 Please complete onboarding to view your dashboard.
    //             </p>
    //         </div>
    //     );
    // }

    return (
        <div className="space-y-8 p-6">
            {/* {user.onboardingData.userRole === "founder" &&
                user.onboardingData.founderData && (
                    <FounderDataCard
                        onboardingData={user.onboardingData.founderData}
                    />
                )}

            {user.onboardingData.userRole === "investor" &&
                user.onboardingData.investorData && (
                    <InvestorDataCard
                        onboardingData={user.onboardingData.investorData}
                    />
                )} */}

            <ReportsGrid reports={reports} />
        </div>
    );
}
