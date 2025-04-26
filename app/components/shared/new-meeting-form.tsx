"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addBotToMeeting } from "@/lib/actions/meeting.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    meetingLink: z.string().url("Please enter a valid meeting URL"),
});

export function NewMeetingForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            meetingLink: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);

            console.log("Sending request to addBotToMeeting");
            const result = await addBotToMeeting(values.meetingLink);
            console.log("Request sent to addBotToMeeting");

            if (result.success && result.meetingId) {
                toast.success("Meeting created successfully!");
                router.push(`/meeting/${result.meetingId}`);
            } else {
                toast.error(result.error || "Failed to create meeting");
            }
        } catch (error) {
            toast.error("Failed to create meeting");
        } finally {
            setIsLoading(false);
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
                            <FormControl>
                                <Input
                                    placeholder="Paste your Zoom meeting link here"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Meeting"}
                </Button>
            </form>
        </Form>
    );
}
