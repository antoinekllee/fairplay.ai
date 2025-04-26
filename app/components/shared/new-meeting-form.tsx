"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    meetingLink: z
        .string()
        .url("Please enter a valid URL")
        .refine((url) => url.includes("zoom.us"), {
            message: "Please enter a valid Zoom meeting link",
        }),
});

export function NewMeetingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            meetingLink: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            // TODO: Handle the meeting link submission
            console.log(values);
            // For now, just redirect back to dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error("Error submitting meeting link:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="meetingLink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meeting Link</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://zoom.us/j/..."
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormDescription>
                                Paste your Zoom meeting link here
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        "Start Analysis"
                    )}
                </Button>
            </form>
        </Form>
    );
}
