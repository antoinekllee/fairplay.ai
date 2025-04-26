import { getUser } from "@/lib/actions/user.actions";
import { FounderDashboard } from "@/app/components/dashboard/founder-dashboard";
import { InvestorDashboard } from "@/app/components/dashboard/investor-dashboard";

export default async function DashboardPage() {
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
                    <FounderDashboard
                        onboardingData={user.onboardingData.founderData}
                    />
                )}

            {user.onboardingData.userRole === "investor" &&
                user.onboardingData.investorData && (
                    <InvestorDashboard
                        onboardingData={user.onboardingData.investorData}
                    />
                )}
        </div>
    );
}
