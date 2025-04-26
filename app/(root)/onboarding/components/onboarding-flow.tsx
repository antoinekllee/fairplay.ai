"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserTypeSelection from "./user-type-selection";
import FounderForm from "./founder-form";
import InvestorForm from "./investor-form";
import { completeOnboarding } from "@/lib/actions/user.actions";

export default function OnboardingFlow() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userType, setUserType] = useState<UserRole | null>(null);
    const [formData, setFormData] = useState<OnboardingData>({
        userRole: "" as UserRole,
        founderData: {
            ageRange: "",
            genderIdentity: "",
            genderCustom: "",
            traits: [],
            customTraits: [],
        },
        investorData: {
            firmName: "",
        },
    });

    const handleUserTypeSelect = (type: UserRole) => {
        setUserType(type);
        setFormData({
            ...formData,
            userRole: type,
        });
        setStep(2);
    };

    const handleFounderSubmit = async (founderData: FounderOnboardingData) => {
        setIsSubmitting(true);
        const updatedFormData = {
            ...formData,
            founderData,
        };
        console.log("Final Onboarding Data:", updatedFormData);

        try {
            await completeOnboarding(updatedFormData);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error completing onboarding:", error);
            setIsSubmitting(false);
        }
    };

    const handleInvestorSubmit = async (
        investorData: InvestorOnboardingData
    ) => {
        setIsSubmitting(true);
        const updatedFormData = {
            ...formData,
            investorData,
        };
        console.log("Final Onboarding Data:", updatedFormData);

        try {
            await completeOnboarding(updatedFormData);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error completing onboarding:", error);
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    Fairplay AI Onboarding
                </CardTitle>
                <CardDescription>
                    {step === 1 && "Let's get to know you better"}
                    {step === 2 &&
                        userType === "founder" &&
                        "Tell us about yourself as a founder"}
                    {step === 2 &&
                        userType === "investor" &&
                        "Tell us about your investment firm"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {step === 1 && (
                    <UserTypeSelection onSelect={handleUserTypeSelect} />
                )}

                {step === 2 && userType === "founder" && (
                    <FounderForm
                        onSubmit={handleFounderSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}

                {step === 2 && userType === "investor" && (
                    <InvestorForm
                        onSubmit={handleInvestorSubmit}
                        isSubmitting={isSubmitting}
                    />
                )}
            </CardContent>

            {step > 1 && (
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={isSubmitting}
                    >
                        Back
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
