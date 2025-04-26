"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    founderTraits,
    ageRanges,
    genderOptions,
} from "@/data/onboarding-options";
import { X, Plus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FounderFormProps {
    onSubmit: (data: FounderOnboardingData) => void;
    isSubmitting?: boolean;
}

export default function FounderForm({
    onSubmit,
    isSubmitting = false,
}: FounderFormProps) {
    const [ageRange, setAgeRange] = useState("");
    const [genderIdentity, setGenderIdentity] = useState("");
    const [genderCustom, setGenderCustom] = useState("");
    const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
    const [customTraitInput, setCustomTraitInput] = useState("");
    const [customTraits, setCustomTraits] = useState<string[]>([]);

    const handleTraitChange = (trait: string) => {
        setSelectedTraits((prev) =>
            prev.includes(trait)
                ? prev.filter((t) => t !== trait)
                : [...prev, trait]
        );
    };

    const handleAddCustomTrait = () => {
        if (
            customTraitInput.trim() !== "" &&
            !customTraits.includes(customTraitInput.trim())
        ) {
            setCustomTraits((prev) => [...prev, customTraitInput.trim()]);
            setCustomTraitInput("");
        }
    };

    const handleRemoveCustomTrait = (trait: string) => {
        setCustomTraits((prev) => prev.filter((t) => t !== trait));
    };

    const handleRemoveSelectedTrait = (trait: string) => {
        setSelectedTraits((prev) => prev.filter((t) => t !== trait));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && customTraitInput.trim() !== "") {
            e.preventDefault();
            handleAddCustomTrait();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ageRange,
            genderIdentity,
            genderCustom,
            traits: selectedTraits,
            customTraits,
        });
    };

    // All traits to display as tags (both selected from list and custom)
    const allTraits = [
        ...selectedTraits.filter((trait) => trait !== "Other"),
        ...customTraits,
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="age-range">Age Range</Label>
                    <Select
                        value={ageRange}
                        onValueChange={setAgeRange}
                        required
                        disabled={isSubmitting}
                    >
                        <SelectTrigger id="age-range">
                            <SelectValue placeholder="Select your age range" />
                        </SelectTrigger>
                        <SelectContent>
                            {ageRanges.map((age) => (
                                <SelectItem key={age} value={age}>
                                    {age}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gender-identity">Gender Identity</Label>
                    <Select
                        value={genderIdentity}
                        onValueChange={(value) => {
                            setGenderIdentity(value);
                            if (value !== "self-describe") {
                                setGenderCustom("");
                            }
                        }}
                        required
                        disabled={isSubmitting}
                    >
                        <SelectTrigger id="gender-identity">
                            <SelectValue placeholder="Select your gender identity" />
                        </SelectTrigger>
                        <SelectContent>
                            {genderOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {genderIdentity === "self-describe" && (
                        <div className="mt-2">
                            <Input
                                id="gender-custom"
                                placeholder="Please describe your gender identity"
                                value={genderCustom}
                                onChange={(e) =>
                                    setGenderCustom(e.target.value)
                                }
                                required={genderIdentity === "self-describe"}
                                disabled={isSubmitting}
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <Label>Traits (Select all that apply)</Label>

                    {/* Display all selected traits as tags */}
                    {allTraits.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedTraits
                                .filter((trait) => trait !== "Other")
                                .map((trait, index) => (
                                    <Badge
                                        key={`selected-${index}`}
                                        variant="secondary"
                                        className="px-3 py-1 text-sm"
                                    >
                                        {trait}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveSelectedTrait(trait)
                                            }
                                            className="ml-2 text-muted-foreground hover:text-foreground"
                                            disabled={isSubmitting}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            {customTraits.map((trait, index) => (
                                <Badge
                                    key={`custom-${index}`}
                                    variant="secondary"
                                    className="px-3 py-1 text-sm"
                                >
                                    {trait}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveCustomTrait(trait)
                                        }
                                        className="ml-2 text-muted-foreground hover:text-foreground"
                                        disabled={isSubmitting}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {founderTraits.map((trait) => (
                            <div
                                key={trait}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`trait-${trait}`}
                                    checked={selectedTraits.includes(trait)}
                                    onCheckedChange={() =>
                                        handleTraitChange(trait)
                                    }
                                    disabled={isSubmitting}
                                />
                                <Label
                                    htmlFor={`trait-${trait}`}
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    {trait}
                                </Label>
                            </div>
                        ))}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="trait-other"
                                checked={selectedTraits.includes("Other")}
                                onCheckedChange={() =>
                                    handleTraitChange("Other")
                                }
                                disabled={isSubmitting}
                            />
                            <Label
                                htmlFor="trait-other"
                                className="text-sm font-normal cursor-pointer"
                            >
                                Other
                            </Label>
                        </div>
                    </div>

                    {selectedTraits.includes("Other") && (
                        <div className="mt-4">
                            <div className="flex gap-2">
                                <Input
                                    id="trait-custom"
                                    placeholder="Add a custom trait"
                                    value={customTraitInput}
                                    onChange={(e) =>
                                        setCustomTraitInput(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    className="flex-1"
                                    disabled={isSubmitting}
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddCustomTrait}
                                    disabled={
                                        customTraitInput.trim() === "" ||
                                        isSubmitting
                                    }
                                    size="icon"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Continue"
                )}
            </Button>
        </form>
    );
}
