'use server';

/**
 * @fileOverview A visual aid creation AI agent.
 *
 * - createVisualAid - A function that handles the visual aid creation process.
 * - CreateVisualAidInput - The input type for the createVisualAid function.
 * - CreateVisualAidOutput - The return type for the createVisualAid function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateVisualAidInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A description of the visual aid to generate. Be as specific as possible about the elements and layout you want to see in the image.'
    ),
});
export type CreateVisualAidInput = z.infer<typeof CreateVisualAidInputSchema>;

const CreateVisualAidOutputSchema = z.object({
  visualAid: z.string().describe(
    'A data URI containing a base64 encoded image of the visual aid, suitable for display in an <img> tag.'
  ),
});
export type CreateVisualAidOutput = z.infer<typeof CreateVisualAidOutputSchema>;

export async function createVisualAid(input: CreateVisualAidInput): Promise<CreateVisualAidOutput> {
  return createVisualAidFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createVisualAidPrompt',
  input: {schema: CreateVisualAidInputSchema},
  output: {schema: CreateVisualAidOutputSchema},
  prompt: `You are an AI assistant that generates visual aids for teachers to use in their classrooms.

  You will receive a description of the visual aid that the teacher wants to create. Your goal is to generate an image that matches the description and is suitable for display on a blackboard.

  Description: {{{description}}}

  Include a title and labels where appropriate.
  Images are poorly compressed (~1MB) and should be handled appropriately where used.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const createVisualAidFlow = ai.defineFlow(
  {
    name: 'createVisualAidFlow',
    inputSchema: CreateVisualAidInputSchema,
    outputSchema: CreateVisualAidOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',

      prompt: input.description,

      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media || !media.url) {
      throw new Error('No visual aid was generated.');
    }

    return {visualAid: media.url};
  }
);
