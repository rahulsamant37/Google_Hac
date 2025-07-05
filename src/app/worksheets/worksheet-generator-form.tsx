'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generateWorksheets, GenerateWorksheetsInput, GenerateWorksheetsOutput } from "@/ai/flows/generate-worksheets";
import { FeatureCard } from "@/components/feature-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

const FormSchema = z.object({
  textbookPageImage: z.string().min(1, { message: "Please upload an image." }),
  learningLevels: z.string().min(3, { message: "Please specify at least one learning level." }),
});

export function WorksheetGeneratorForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<GenerateWorksheetsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      textbookPageImage: "",
      learningLevels: "Beginner, Intermediate, Advanced",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast({ variant: "destructive", title: "File too large", description: "Please upload an image smaller than 4MB." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        form.setValue("textbookPageImage", dataUrl);
        setPreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const input: GenerateWorksheetsInput = {
          ...data,
          learningLevels: data.learningLevels.split(',').map(s => s.trim()),
        };
        const result = await generateWorksheets(input);
        setResult(result);
      } catch (e: any) {
        setError(e.message || "Failed to generate worksheets.");
        toast({
          variant: "destructive",
          title: "Error",
          description: e.message || "An unexpected error occurred.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form id="worksheet-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FeatureCard
          formId="worksheet-form"
          isPending={isPending}
          hasResult={!!result}
          hasError={!!error}
          errorMessage={error || undefined}
          resultComponent={
            result && result.worksheets.length > 0 && (
              <Tabs defaultValue={result.worksheets[0].level} className="w-full">
                <TabsList>
                  {result.worksheets.map(ws => (
                    <TabsTrigger key={ws.level} value={ws.level}>{ws.level}</TabsTrigger>
                  ))}
                </TabsList>
                {result.worksheets.map(ws => (
                  <TabsContent key={ws.level} value={ws.level} className="whitespace-pre-wrap mt-4 p-4 border rounded-md bg-background">
                    {ws.worksheetContent}
                  </TabsContent>
                ))}
              </Tabs>
            )
          }
        >
          <div className="grid w-full gap-6">
            <FormField
              control={form.control}
              name="textbookPageImage"
              render={() => (
                <FormItem>
                  <FormLabel>Textbook Page Image</FormLabel>
                  <FormControl>
                    <div className="relative flex justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {preview ? (
                        <Image src={preview} alt="Textbook page preview" layout="fill" objectFit="contain" className="rounded-lg p-2" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <Upload className="w-10 h-10 mb-2" />
                          <p className="font-semibold">Upload Textbook Page</p>
                          <p className="text-xs">Supports: PNG, JPG, GIF up to 4MB</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learningLevels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learning Levels</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Beginner, Intermediate, Advanced" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter comma-separated learning levels for differentiated worksheets.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FeatureCard>
      </form>
    </Form>
  );
}
