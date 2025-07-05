import { VisualAidForm } from './visual-aid-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VisualAidPage() {
  return (
    <div>
      <Card className="shadow-md animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Visual Aid Designer</CardTitle>
          <CardDescription>
            Describe any diagram or illustration, and our AI will generate a simple, clean visual aid for your classroom.
          </CardDescription>
        </CardHeader>
        <VisualAidForm />
      </Card>
    </div>
  );
}
