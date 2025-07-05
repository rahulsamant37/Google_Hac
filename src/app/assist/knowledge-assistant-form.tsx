'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

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
import { knowledgeAssistant, KnowledgeAssistantInput, KnowledgeAssistantOutput } from "@/ai/flows/knowledge-assistant";
import { FeatureCard } from "@/components/feature-card";

const FormSchema = z.object({
  question: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
  localLanguage: z.string().min(2, {
    message: "Language must be at least 2 characters.",
  }),
  ageAppropriateLevel: z.string().min(3, {
    message: "Age level must be at least 3 characters.",
  }),
});

export function KnowledgeAssistantForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<KnowledgeAssistantOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
      localLanguage: "English",
      ageAppropriateLevel: "8 years old",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await knowledgeAssistant(data as KnowledgeAssistantInput);
        setResult(result);
      } catch (e: any) {
        setError(e.message || "Failed to get an answer.");
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
      <form id="assist-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FeatureCard
          formId="assist-form"
          isPending={isPending}
          hasResult={!!result}
          hasError={!!error}
          errorMessage={error || undefined}
          resultComponent={
            result && <p>{result.simplifiedAnswer}</p>
          }
        >
          <div className="grid w-full gap-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Why is the sky blue? How do plants make food?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="localLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language for Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., English" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageAppropriateLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Age Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5 years old, Grade 4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </FeatureCard>
      </form>
    </Form>
  );
}
