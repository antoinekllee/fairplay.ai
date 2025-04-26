"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SummaryCards } from "./summary-cards"
import { QuestionsList } from "./questions-list"
import { ReportSection } from "./report-section"

export default function MeetingDashboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">FairPlay AI Meeting Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Meeting between Sarah Johnson (Founder) and Michael Chen (VC) on April 24, 2025
        </p>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="transcript">Full Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-8">
          <SummaryCards />
          <QuestionsList />
          <ReportSection />
        </TabsContent>

        <TabsContent value="transcript">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Meeting Transcript</h2>
            <div className="bg-gray-50 p-4 rounded overflow-auto max-h-[600px] text-sm">
              <pre className="whitespace-pre-wrap font-sans">{mockMeetingData.transcript}</pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data for the dashboard
export const mockMeetingData = {
  meetingId: "m-2025-04-24-001",
  date: "2025-04-24T14:30:00Z",
  duration: "58m 42s",
  participants: {
    founder: {
      name: "Sarah Johnson",
      company: "EcoTech Solutions",
      talkTime: 2340, // in seconds
      interruptions: 3,
      sentiment: "Positive",
      sentimentScore: 0.78,
    },
    vc: {
      name: "Michael Chen",
      firm: "Horizon Ventures",
      talkTime: 1182, // in seconds
      interruptions: 7,
      sentiment: "Neutral",
      sentimentScore: 0.52,
    },
  },
  summary: {
    promotionQuestions: 3,
    preventionQuestions: 5,
    keywordTriggers: ["market validation", "burn rate", "24/7 commitment", "work-life balance", "real market need"],
    overallTone: "Professional with moments of tension",
  },
  questions: [
    {
      id: "q1",
      type: "prevention",
      question: "How are you planning to address the regulatory challenges in this space?",
      answer:
        "We've been working closely with legal experts in the field and have already initiated conversations with regulatory bodies. Our approach is to be proactive rather than reactive, ensuring compliance from day one.",
      talkTime: {
        founder: 85,
        vc: 15,
      },
      interruptions: {
        founder: 0,
        vc: 1,
      },
      sentiment: {
        founder: "Confident",
        vc: "Skeptical",
      },
      keywords: ["regulatory challenges", "compliance"],
      analysis: "Defensive but well-prepared",
    },
    {
      id: "q2",
      type: "promotion",
      question: "What's your vision for scaling this technology over the next five years?",
      answer:
        "Our roadmap includes expanding to three additional markets by 2026, with a projected user base of 500,000. We're also developing complementary products that will create a comprehensive ecosystem for our users.",
      talkTime: {
        founder: 110,
        vc: 18,
      },
      interruptions: {
        founder: 0,
        vc: 0,
      },
      sentiment: {
        founder: "Enthusiastic",
        vc: "Interested",
      },
      keywords: ["scaling", "roadmap", "ecosystem"],
      analysis: "Ambitious and visionary",
    },
    {
      id: "q3",
      type: "prevention",
      question:
        "Given that you're juggling family responsibilities, how can you commit to the 24/7 demands of a startup?",
      answer:
        "I've built a strong support system and an exceptional leadership team. We have clear protocols for handling emergencies and maintaining operational continuity. My commitment is unwavering, but I also believe in sustainable work practices for the entire team.",
      talkTime: {
        founder: 95,
        vc: 22,
      },
      interruptions: {
        founder: 1,
        vc: 2,
      },
      sentiment: {
        founder: "Resolute",
        vc: "Concerned",
      },
      keywords: ["juggling family", "24/7 demands", "commitment"],
      analysis: "Defensive with clear boundaries",
    },
    {
      id: "q4",
      type: "prevention",
      question: "How do you know there's a real market need for this solution?",
      answer:
        "We've conducted extensive market research, including surveys with over 1,000 potential users and in-depth interviews with 50 industry experts. Our beta product has a waitlist of 3,000 users, and we've seen a 40% conversion rate in our early access program.",
      talkTime: {
        founder: 105,
        vc: 12,
      },
      interruptions: {
        founder: 0,
        vc: 1,
      },
      sentiment: {
        founder: "Confident",
        vc: "Skeptical",
      },
      keywords: ["real market need", "market research", "conversion rate"],
      analysis: "Data-driven and prepared",
    },
    {
      id: "q5",
      type: "promotion",
      question: "What unique insights does your team bring to this problem that others might miss?",
      answer:
        "Our founding team combines expertise from both the technology and sustainability sectors. I spent five years researching this specific problem at MIT, and our CTO previously built and sold a company in an adjacent space. This cross-disciplinary approach gives us unique perspectives on both the technical challenges and market opportunities.",
      talkTime: {
        founder: 120,
        vc: 20,
      },
      interruptions: {
        founder: 0,
        vc: 0,
      },
      sentiment: {
        founder: "Passionate",
        vc: "Engaged",
      },
      keywords: ["unique insights", "expertise", "cross-disciplinary"],
      analysis: "Confident and authoritative",
    },
    {
      id: "q6",
      type: "prevention",
      question: "What's your burn rate, and how long will this funding round last you?",
      answer:
        "Our current burn rate is $120,000 per month. With the funding we're seeking, we'll have an 18-month runway. We've identified key milestones that will unlock additional revenue streams within 12 months, which should extend our runway further.",
      talkTime: {
        founder: 75,
        vc: 15,
      },
      interruptions: {
        founder: 1,
        vc: 0,
      },
      sentiment: {
        founder: "Transparent",
        vc: "Analytical",
      },
      keywords: ["burn rate", "runway", "milestones"],
      analysis: "Direct and financially literate",
    },
    {
      id: "q7",
      type: "prevention",
      question: "Who do you see as your biggest competitors, and what happens if they decide to copy your approach?",
      answer:
        "We're watching companies like GreenTech and EcoSolutions closely. Our competitive advantage lies in our proprietary algorithm and the network effects of our platform. We've also filed three patents that protect our core technology. Even if competitors attempt to copy our approach, we'll have a 12-18 month head start in the market.",
      talkTime: {
        founder: 115,
        vc: 25,
      },
      interruptions: {
        founder: 0,
        vc: 2,
      },
      sentiment: {
        founder: "Strategic",
        vc: "Probing",
      },
      keywords: ["competitors", "proprietary", "patents"],
      analysis: "Competitive awareness with strategic thinking",
    },
    {
      id: "q8",
      type: "promotion",
      question: "If resources weren't a constraint, what would be your most ambitious goal for this company?",
      answer:
        "Our ultimate vision is to transform how the entire industry approaches sustainability. Beyond our current products, we see opportunities to create an open standard that could be adopted globally. With unlimited resources, we'd accelerate our R&D to develop next-generation technologies that could reduce industry emissions by up to 40% within a decade.",
      talkTime: {
        founder: 130,
        vc: 18,
      },
      interruptions: {
        founder: 0,
        vc: 0,
      },
      sentiment: {
        founder: "Visionary",
        vc: "Impressed",
      },
      keywords: ["ambitious goal", "vision", "transform"],
      analysis: "Bold and inspiring",
    },
  ],
  transcript:
    "Michael Chen (VC): Thanks for coming in today, Sarah. I'm excited to learn more about EcoTech Solutions.\n\nSarah Johnson (Founder): Thank you for the opportunity, Michael. I'm looking forward to sharing our vision with you.\n\nMichael Chen (VC): Before we dive in, could you give me a quick overview of what EcoTech does?\n\nSarah Johnson (Founder): Of course. EcoTech Solutions is developing a platform that helps manufacturing companies reduce their carbon footprint through AI-powered process optimization. Our technology can identify inefficiencies in production lines and recommend changes that both save costs and reduce emissions.\n\nMichael Chen (VC): That sounds interesting. How are you planning to address the regulatory challenges in this space?\n\nSarah Johnson (Founder): We've been working closely with legal experts in the field and have already initiated conversations with regulatory bodies. Our approach is to be proactive rather than reactive, ensuring compliance from day one.\n\nMichael Chen (VC): What's your vision for scaling this technology over the next five years?\n\nSarah Johnson (Founder): Our roadmap includes expanding to three additional markets by 2026, with a projected user base of 500,000. We're also developing complementary products that will create a comprehensive ecosystem for our users.\n\nMichael Chen (VC): Given that you're juggling family responsibilities, how can you commit to the 24/7 demands of a startup?\n\nSarah Johnson (Founder): I've built a strong support system and an exceptional leadership team. We have clear protocols for handling emergencies and maintaining operational continuity. My commitment is unwavering, but I also believe in sustainable work practices for the entire team.\n\nMichael Chen (VC): How do you know there's a real market need for this solution?\n\nSarah Johnson (Founder): We've conducted extensive market research, including surveys with over 1,000 potential users and in-depth interviews with 50 industry experts. Our beta product has a waitlist of 3,000 users, and we've seen a 40% conversion rate in our early access program.\n\nMichael Chen (VC): What unique insights does your team bring to this problem that others might miss?\n\nSarah Johnson (Founder): Our founding team combines expertise from both the technology and sustainability sectors. I spent five years researching this specific problem at MIT, and our CTO previously built and sold a company in an adjacent space. This cross-disciplinary approach gives us unique perspectives on both the technical challenges and market opportunities.\n\nMichael Chen (VC): What's your burn rate, and how long will this funding round last you?\n\nSarah Johnson (Founder): Our current burn rate is $120,000 per month. With the funding we're seeking, we'll have an 18-month runway. We've identified key milestones that will unlock additional revenue streams within 12 months, which should extend our runway further.\n\nMichael Chen (VC): Who do you see as your biggest competitors, and what happens if they decide to copy your approach?\n\nSarah Johnson (Founder): We're watching companies like GreenTech and EcoSolutions closely. Our competitive advantage lies in our proprietary algorithm and the network effects of our platform. We've also filed three patents that protect our core technology. Even if competitors attempt to copy our approach, we'll have a 12-18 month head start in the market.\n\nMichael Chen (VC): If resources weren't a constraint, what would be your most ambitious goal for this company?\n\nSarah Johnson (Founder): Our ultimate vision is to transform how the entire industry approaches sustainability. Beyond our current products, we see opportunities to create an open standard that could be adopted globally. With unlimited resources, we'd accelerate our R&D to develop next-generation technologies that could reduce industry emissions by up to 40% within a decade.\n\nMichael Chen (VC): That's a compelling vision. Let's talk about your current traction and customer acquisition strategy...",
  reports: {
    vc: {
      strengths: [
        "Asked a balanced mix of promotion and prevention questions",
        "Maintained professional tone throughout the interview",
        "Asked specific, detailed questions about the business model",
      ],
      improvements: [
        "Higher than average interruption rate (7 interruptions)",
        "Used potentially biased framing around work-life balance",
        "Could provide more space for the founder to elaborate on technical details",
      ],
      recommendations: [
        "Consider allowing more time for responses before follow-up questions",
        "Frame questions about commitment in a more neutral way",
        "Balance skepticism with more opportunity-focused questions",
      ],
    },
    founder: {
      strengths: [
        "Provided data-backed responses to challenging questions",
        "Maintained positive, confident tone throughout",
        "Effectively communicated both vision and practical execution",
      ],
      improvements: [
        "Could be more concise in some responses",
        "Occasionally became defensive when discussing potential challenges",
        "Limited discussion of team beyond founding members",
      ],
      recommendations: [
        "Prepare more concise answers to common prevention questions",
        "Proactively address team capabilities beyond founders",
        "Consider using more storytelling to illustrate market validation",
      ],
    },
  },
}
