// TYPES

// Onboarding
declare interface CustomJwtSessionClaims {
    metadata: {
        onboardingComplete?: boolean;
    };
}

// Users

declare type User = {
    // USER INFO
    _id: string;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;

    // ONBOARDING DATA
    // TBD

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
};

declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    photo: string;
};
