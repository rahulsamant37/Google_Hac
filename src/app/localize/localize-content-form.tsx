'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { localizeContent, LocalizeContentInput, LocalizeContentOutput } from "@/ai/flows/localize-content";
import { FeatureCard } from "@/components/feature-card";

const FormSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  language: z.string().min(2, {
    message: "Language must be at least 2 characters.",
  }),
});

export function LocalizeContentForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<LocalizeContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      language: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await localizeContent(data as LocalizeContentInput);
        setResult(result);
      } catch (e: any) {
        setError(e.message || "Failed to localize content.");
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
      <form id="localize-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FeatureCard
          formId="localize-form"
          isPending={isPending}
          hasResult={!!result}
          hasError={!!error}
          errorMessage={error || undefined}
          resultComponent={
            result && <p>{result.localizedContent}</p>
          }
        >
          <div className="grid w-full gap-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content to Localize</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a story, worksheet instructions, or any other text..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Hindi, Swahili, Spanish" {...field} />
                  </FormControl>
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
