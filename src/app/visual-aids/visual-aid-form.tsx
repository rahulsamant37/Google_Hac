'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createVisualAid, CreateVisualAidInput, CreateVisualAidOutput } from "@/ai/flows/visual-aid-creator";
import { FeatureCard } from "@/components/feature-card";

const FormSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function VisualAidForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<CreateVisualAidOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await createVisualAid(data as CreateVisualAidInput);
        setResult(result);
      } catch (e: any) {
        setError(e.message || "Failed to create visual aid.");
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
      <form id="visual-aid-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FeatureCard
          formId="visual-aid-form"
          isPending={isPending}
          hasResult={!!result}
          hasError={!!error}
          errorMessage={error || undefined}
          resultComponent={
            result && (
              <div className="relative aspect-video w-full max-w-2xl mx-auto overflow-hidden rounded-lg border">
                <Image src={result.visualAid} alt="Generated visual aid" layout="fill" objectFit="contain" data-ai-hint="diagram illustration" />
              </div>
            )
          }
        >
          <div className="grid w-full gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visual Aid Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'e.g., "A diagram of the water cycle." or "A plant cell with labels."'}
                      className="min-h-[150px]"
                      {...field}
                    />
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
