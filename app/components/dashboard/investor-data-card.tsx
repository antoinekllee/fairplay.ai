import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InvestorDataCardProps = {
    onboardingData: InvestorOnboardingData;
};

export function InvestorDataCard({ onboardingData }: InvestorDataCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Investor Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Firm Name</span>
                        <span className="font-medium">
                            {onboardingData.firmName}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
