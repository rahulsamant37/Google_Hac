
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div>
      <Card className="w-full shadow-md animate-in fade-in-50">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Offline Content</CardTitle>
          <CardDescription>
            Access your saved resources without an internet connection.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center p-12 text-muted-foreground">
            <WifiOff className="w-16 h-16 mb-4" />
            <h3 className="text-lg font-semibold">No Offline Content Available</h3>
            <p className="mt-2">Content you save for offline use will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
