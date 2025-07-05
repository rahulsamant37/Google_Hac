'use server';

/**
 * @fileOverview AI Knowledge Assistant flow.
 *
 * - knowledgeAssistant - A function that simplifies teacher questions into age-appropriate answers in the local language.
 * - KnowledgeAssistantInput - The input type for the knowledgeAssistant function.
 * - KnowledgeAssistantOutput - The return type for the knowledgeAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KnowledgeAssistantInputSchema = z.object({
  question: z.string().describe('The question from the teacher.'),
  localLanguage: z.string().describe('The local language to translate the answer into.'),
  ageAppropriateLevel: z
    .string()
    .describe('The age or grade level for which the explanation should be appropriate.'),
});
export type KnowledgeAssistantInput = z.infer<typeof KnowledgeAssistantInputSchema>;

const KnowledgeAssistantOutputSchema = z.object({
  simplifiedAnswer: z
    .string()
    .describe('The simplified, age-appropriate explanation in the local language.'),
});
export type KnowledgeAssistantOutput = z.infer<typeof KnowledgeAssistantOutputSchema>;

export async function knowledgeAssistant(input: KnowledgeAssistantInput): Promise<KnowledgeAssistantOutput> {
  return knowledgeAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'knowledgeAssistantPrompt',
  input: {schema: KnowledgeAssistantInputSchema},
  output: {schema: KnowledgeAssistantOutputSchema},
  prompt: `You are an AI assistant for teachers, skilled at providing simplified, age-appropriate explanations in the local language.

  The teacher will ask a question, and you will provide a simplified answer appropriate for the specified age/grade level, translated into the local language.

  Question: {{{question}}}
  Local Language: {{{localLanguage}}}
  Age/Grade Level: {{{ageAppropriateLevel}}}

  Simplified Answer:`,
});

const knowledgeAssistantFlow = ai.defineFlow(
  {
    name: 'knowledgeAssistantFlow',
    inputSchema: KnowledgeAssistantInputSchema,
    outputSchema: KnowledgeAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
