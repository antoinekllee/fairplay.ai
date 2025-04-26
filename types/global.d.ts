// TYPES

// Onboarding
declare interface CustomJwtSessionClaims {
    metadata: {
        onboardingComplete?: boolean;
    };
}

// Users

declare type UserRole = "founder" | "investor";

declare type FounderOnboardingData = {
    ageRange: string;
    genderIdentity: string;
    genderCustom?: string;
    traits: string[];
    customTraits: string[];
};

declare type InvestorOnboardingData = {
    firmName: string;
};

declare type OnboardingData = {
    userRole: UserRole;
    founderData?: FounderOnboardingData;
    investorData?: InvestorOnboardingData;
};

declare type User = {
    // USER INFO
    _id: string;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;

    // ONBOARDING DATA
    onboardingData?: OnboardingData;

    createdAt: Date;
    updatedAt: Date;
};

// USER PARAMS

declare type CreateUserParams = {
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    photo: string;
    onboardingData?: OnboardingData;
};

declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    photo: string;
    onboardingData?: OnboardingData;
};
