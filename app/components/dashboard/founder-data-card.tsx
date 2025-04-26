import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FounderDataCardProps = {
    onboardingData: FounderOnboardingData;
};

export function FounderDataCard({ onboardingData }: FounderDataCardProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Founder Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Age Range</span>
                        <span className="font-medium">
                            {onboardingData.ageRange}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Gender Identity
                        </span>
                        <span className="font-medium">
                            {onboardingData.genderCustom ||
                                onboardingData.genderIdentity}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                        Traits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {onboardingData.traits.map((trait) => (
                            <Badge key={trait} variant="secondary">
                                {trait}
                            </Badge>
                        ))}
                        {onboardingData.customTraits.map((trait) => (
                            <Badge key={trait} variant="outline">
                                {trait}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
