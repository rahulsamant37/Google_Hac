
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        question: "How do I generate a worksheet?",
        answer: "Navigate to the 'Worksheet Generator' from the dashboard. Upload a clear photo of a textbook page, specify the desired learning levels (e.g., Beginner, Intermediate), and click 'Generate'. The AI will create differentiated worksheets based on the page content."
    },
    {
        question: "How does the Content Localizer work?",
        answer: "Go to the 'Content Localizer', paste the text you want to adapt (like a story or instructions), and enter the target language (e.g., Hindi, Swahili). The AI will translate and culturally adapt the content to be more relevant for your students."
    },
    {
        question: "What kind of visual aids can I create?",
        answer: "The 'Visual Aid Designer' can generate simple, clean diagrams suitable for a blackboard. You can describe things like 'a diagram of the water cycle', 'a plant cell with labels', or 'the solar system'. Be as descriptive as possible for the best results."
    },
    {
        question: "Can I use the app offline?",
        answer: "Yes, the 'Offline Content' section allows you to access and manage resources you've saved for use without an internet connection. This is perfect for classrooms with limited connectivity. Make sure to save your most-needed resources beforehand."
    },
    {
        question: "How does the AI Assistant help me in the classroom?",
        answer: "The 'AI Assistant' is your on-the-spot teaching partner. When a student asks a tricky question (like 'Why is the sky blue?'), you can type it into the assistant, specify the student's age, and get a simple, age-appropriate explanation in your local language instantly."
    }
]

export default function HelpPage() {
  return (
    <div>
      <Card className="w-full shadow-md animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Help &amp; Tutorials</CardTitle>
          <CardDescription>
            Find answers to common questions and learn how to use Sahayak effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
