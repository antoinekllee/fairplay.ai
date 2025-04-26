import { Schema, model, models } from "mongoose";

// Participant Schema
const ParticipantSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    talkTime: { type: Number, required: true },
    interruptions: { type: Number, required: true },
    sentiment: { type: String, required: true },
    sentimentScore: { type: Number, required: true },
});

// Summary Schema
const SummarySchema = new Schema({
    promotionQuestions: { type: Number, required: true },
    preventionQuestions: { type: Number, required: true },
    keywordTriggers: { type: [String], required: true },
    overallTone: { type: String, required: true },
});

// Question Schema
const QuestionSchema = new Schema({
    type: { type: String, enum: ["prevention", "promotion"], required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    talkTime: {
        founder: { type: Number, required: true },
        vc: { type: Number, required: true },
    },
    interruptions: {
        founder: { type: Number, required: true },
        vc: { type: Number, required: true },
    },
    sentiment: {
        founder: { type: String, required: true },
        vc: { type: String, required: true },
    },
    keywords: { type: [String], required: true },
    analysis: { type: String, required: true },
});

// Report Schema
const ReportSchema = new Schema(
    {
        participants: {
            founder: { type: ParticipantSchema, required: true },
            vc: { type: ParticipantSchema, required: true },
        },
        summary: { type: SummarySchema, required: true },
        questions: { type: [QuestionSchema], required: true },
        transcript: { type: String, required: true },
        reports: { type: Schema.Types.Mixed },
    },
    {
        timestamps: true,
    }
);

const Report = models.Report || model("Report", ReportSchema);

export default Report;
