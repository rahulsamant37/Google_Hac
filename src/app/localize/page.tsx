import { LocalizeContentForm } from './localize-content-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LocalizeContentPage() {
  return (
    <div>
      <Card className="shadow-md animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Content Localizer</CardTitle>
          <CardDescription>
            Translate educational materials into any language, ensuring they are culturally and contextually appropriate for your students.
          </CardDescription>
        </CardHeader>
        <LocalizeContentForm />
      </Card>
    </div>
  );
}
