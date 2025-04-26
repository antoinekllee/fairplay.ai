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

// MEETING REPORT DATA

declare type Participant = {
    userId?: string;
    talkTime: number;
    interruptions: number;
    sentiment: string;
    sentimentScore: number;
};

declare type Summary = {
    promotionQuestions: number;
    preventionQuestions: number;
    keywordTriggers: string[];
    overallTone: string;
};

declare type Question = {
    id: string;
    type: "prevention" | "promotion";
    question: string;
    answer: string;
    talkTime: {
        founder: number;
        vc: number;
    };
    interruptions: {
        founder: number;
        vc: number;
    };
    sentiment: {
        founder: string;
        vc: string;
    };
    keywords: string[];
    analysis: string;
};

declare type ReportData = {
    _id?: string;
    participants: {
        founder: Participant;
        vc: Participant;
    };
    summary: Summary;
    questions: Question[];
    transcript: string;
    reports: any;
    createdAt?: string | Date;
    updatedAt?: string | Date;
};

declare type Meeting = {
    _id: string;
    botId: string;
    userId: string;
    reportId: string | null;
    createdAt: string;
    updatedAt: string;
};

declare type Transcript = Array<{
    speaker: string;
    transcript: string;
    timestamp: string;
    words: Array<{
        // Using any for now since the actual word object structure is not shown
        [key: string]: any;
    }>;
}>;
