import { Schema, model, models } from "mongoose";

const MeetingSchema = new Schema(
    {
        botId: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        reportId: {
            type: Schema.Types.ObjectId,
            ref: "Report",
            required: false,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Meeting = models.Meeting || model("Meeting", MeetingSchema);

export default Meeting;
