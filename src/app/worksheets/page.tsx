import { WorksheetGeneratorForm } from './worksheet-generator-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function WorksheetGeneratorPage() {
  return (
    <div>
      <Card className="shadow-md animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Worksheet Generator</CardTitle>
          <CardDescription>
            Upload a photo of a textbook page, and our AI will instantly generate differentiated worksheets for multiple learning levels.
          </CardDescription>
        </CardHeader>
        <WorksheetGeneratorForm />
      </Card>
    </div>
  );
}
