'use server';

/**
 * @fileOverview Generates differentiated worksheets based on a textbook page image.
 *
 * - generateWorksheets - A function that generates worksheets for multiple learning levels.
 * - GenerateWorksheetsInput - The input type for the generateWorksheets function.
 * - GenerateWorksheetsOutput - The return type for the generateWorksheets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWorksheetsInputSchema = z.object({
  textbookPageImage: z
    .string()
    .describe(
      "A photo of a textbook page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  learningLevels: z
    .array(z.string())
    .describe('An array of learning levels (e.g., beginner, intermediate, advanced).'),
});
export type GenerateWorksheetsInput = z.infer<typeof GenerateWorksheetsInputSchema>;

const GenerateWorksheetsOutputSchema = z.object({
  worksheets: z.array(
    z.object({
      level: z.string().describe('The learning level of the worksheet.'),
      worksheetContent: z.string().describe('The content of the generated worksheet.'),
    })
  ),
});
export type GenerateWorksheetsOutput = z.infer<typeof GenerateWorksheetsOutputSchema>;

export async function generateWorksheets(input: GenerateWorksheetsInput): Promise<GenerateWorksheetsOutput> {
  return generateWorksheetsFlow(input);
}

const generateWorksheetsPrompt = ai.definePrompt({
  name: 'generateWorksheetsPrompt',
  input: {schema: GenerateWorksheetsInputSchema},
  output: {schema: GenerateWorksheetsOutputSchema},
  prompt: `You are an expert educator. You will generate differentiated worksheets for different learning levels based on the content of a textbook page.

  The textbook page is represented by this image: {{media url=textbookPageImage}}

  The requested learning levels are: {{learningLevels}}

  For each learning level, generate a worksheet that is appropriate for that level. The worksheet should cover the key concepts from the textbook page.
  `,
});

const generateWorksheetsFlow = ai.defineFlow(
  {
    name: 'generateWorksheetsFlow',
    inputSchema: GenerateWorksheetsInputSchema,
    outputSchema: GenerateWorksheetsOutputSchema,
  },
  async input => {
    const {output} = await generateWorksheetsPrompt(input);
    return output!;
  }
);
