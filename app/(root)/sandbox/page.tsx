import { getUser } from "@/lib/actions/user.actions";
import { FounderDataCard } from "@/app/components/shared/founder-data-card";
import { InvestorDataCard } from "@/app/components/shared/investor-data-card";
import MeetingDashboard from "@/app/components/shared/review/meeting-dashboard";

export default async function SandboxPage() {
    const user = await getUser();

    if (!user?.onboardingData) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground">
                    Please complete onboarding to view your dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            {user.onboardingData.userRole === "founder" &&
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
                )}

            <MeetingDashboard />
        </div>
    );
}
