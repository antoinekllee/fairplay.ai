export const ageRanges = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
] as const;

export const genderOptions = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "non-binary", label: "Non-binary" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
    { value: "self-describe", label: "Self describe" },
] as const;

export const founderTraits = [
    "First-time founder",
    "Serial entrepreneur",
    "Technical background",
    "Business background",
    "Underrepresented founder",
    "International founder",
    "Student founder",
] as const;

// Type helpers
export type AgeRange = (typeof ageRanges)[number];
export type GenderOption = (typeof genderOptions)[number]["value"];
export type FounderTrait = (typeof founderTraits)[number];
