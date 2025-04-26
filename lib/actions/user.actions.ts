"use server";

import { connectToDatabase } from "@/lib/database";
import { revalidatePath } from "next/cache";

import User from "@/lib/database/models/user.model";

import { auth, clerkClient } from "@clerk/nextjs/server";
import mongoose from "mongoose";

export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = (await User.create(user)) as User;

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserById(userId: string): Promise<User> {
    try {
        await connectToDatabase();

        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        // Find user to delete
        const userToDelete = (await User.findOne({ clerkId })) as User;

        if (!userToDelete) {
            throw new Error("User not found");
        }

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserId(): Promise<string | null> {
    const { sessionClaims } = await auth();

    const userId = sessionClaims?.userId as string;
    return userId || null;
}

export async function getUser(): Promise<(User & mongoose.Document) | null> {
    const userId = await getUserId();
    if (!userId) return null;
    const user = (await User.findById(userId)) as User & mongoose.Document;
    return user ? JSON.parse(JSON.stringify(user)) : null;
}

// export async function completeOnboarding(onboardingData: {
//     selectedCurriculums: string[];
//     examPeriods: { course: string; examPeriod: string }[];
//     selectedSubjects: UserSubject[];
//     school: string;
// }) {
//     try {
//         await connectToDatabase();

//         const user = await getUser();
//         if (!user) throw new Error("User not found");

//         // Update user in database with onboarding data
//         const updatedUser = await User.findByIdAndUpdate(
//             user._id,
//             {
//                 subjects: onboardingData.selectedSubjects,
//                 selectedCurriculums: onboardingData.selectedCurriculums,
//                 examPeriods: onboardingData.examPeriods,
//                 school: onboardingData.school
//             },
//             { new: true }
//         );

//         if (!updatedUser) throw new Error("Failed to update user");

//         // Update clerk user metadata to mark onboarding as complete
//         const clerk = await clerkClient();
//         await clerk.users.updateUserMetadata(user.clerkId, {
//             publicMetadata: {
//                 onboardingComplete: true
//             }
//         });

//         return JSON.parse(JSON.stringify(updatedUser));
//     } catch (error) {
//         console.error("Error completing onboarding:", error);
//         throw error;
//     }
// }

// export async function getUserSubjects(): Promise<UserSubject[]> {
//     try {
//         await connectToDatabase();

//         const user = await getUser();
//         if (!user) throw new Error("User not found");

//         return JSON.parse(JSON.stringify(user.subjects));
//     } catch (error) {
//         console.error("Error fetching user subjects:", error);
//         throw error;
//     }
// }
