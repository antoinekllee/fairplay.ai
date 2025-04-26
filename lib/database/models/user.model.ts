import { Schema, model, models } from "mongoose";

// Founder Onboarding Schema
const FounderOnboardingSchema = new Schema({
    ageRange: { type: String, required: true },
    genderIdentity: { type: String, required: true },
    genderCustom: { type: String },
    traits: { type: [String], required: true },
    customTraits: { type: [String], default: [] },
});

// Investor Onboarding Schema
const InvestorOnboardingSchema = new Schema({
    firmName: { type: String, required: true },
});

// Onboarding Data Schema
const OnboardingDataSchema = new Schema({
    userRole: { type: String, enum: ["founder", "investor"], required: true },
    founderData: { type: FounderOnboardingSchema },
    investorData: { type: InvestorOnboardingSchema },
});

// User Schema
const UserSchema = new Schema(
    {
        // USER INFO
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        photo: { type: String, required: true },

        // ONBOARDING DATA
        onboardingData: { type: OnboardingDataSchema },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);

export default User;
