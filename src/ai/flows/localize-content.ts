// use server'
'use server';
/**
 * @fileOverview A content localization AI agent.
 *
 * - localizeContent - A function that handles the content localization process.
 * - LocalizeContentInput - The input type for the localizeContent function.
 * - LocalizeContentOutput - The return type for the localizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocalizeContentInputSchema = z.object({
  content: z.string().describe('The content to be localized (story or worksheet).'),
  language: z.string().describe('The target language for localization.'),
});
export type LocalizeContentInput = z.infer<typeof LocalizeContentInputSchema>;

const LocalizeContentOutputSchema = z.object({
  localizedContent: z.string().describe('The localized content in the target language.'),
});
export type LocalizeContentOutput = z.infer<typeof LocalizeContentOutputSchema>;

export async function localizeContent(input: LocalizeContentInput): Promise<LocalizeContentOutput> {
  return localizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'localizeContentPrompt',
  input: {schema: LocalizeContentInputSchema},
  output: {schema: LocalizeContentOutputSchema},
  prompt: `You are an expert translator specializing in localizing educational content.

You will translate the provided content into the specified language, ensuring it is culturally relevant and age-appropriate.

Content: {{{content}}}
Language: {{{language}}}

Localized Content:`, // Ensure the prompt is clear and concise
});

const localizeContentFlow = ai.defineFlow(
  {
    name: 'localizeContentFlow',
    inputSchema: LocalizeContentInputSchema,
    outputSchema: LocalizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
