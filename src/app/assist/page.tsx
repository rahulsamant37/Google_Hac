import { KnowledgeAssistantForm } from './knowledge-assistant-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function KnowledgeAssistantPage() {
  return (
    <div>
      <Card className="shadow-md animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">AI Teaching Assistant</CardTitle>
          <CardDescription>
            Get instant, simple, and age-appropriate explanations for any question. Perfect for answering curious students on the fly.
          </CardDescription>
        </CardHeader>
        <KnowledgeAssistantForm />
      </Card>
    </div>
  );
}
