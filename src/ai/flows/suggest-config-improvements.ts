'use server';

import {ai} from '@/ai/genkit'; 
import {z} from 'genkit';

const SuggestConfigImprovementsInputSchema = z.object({
  config: z
    .string()
    .describe('The Better Auth configuration as a JSON string.'),
});
export type SuggestConfigImprovementsInput = z.infer<
  typeof SuggestConfigImprovementsInputSchema
>;

const SuggestConfigImprovementsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions for improving the Better Auth configuration.'),
});
export type SuggestConfigImprovementsOutput = z.infer<
  typeof SuggestConfigImprovementsOutputSchema
>;

export async function suggestConfigImprovements(
  input: SuggestConfigImprovementsInput
): Promise<SuggestConfigImprovementsOutput> {
  return suggestConfigImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestConfigImprovementsPrompt',
  input: {schema: SuggestConfigImprovementsInputSchema},
  output: {schema: SuggestConfigImprovementsOutputSchema},
  prompt: `You are a security and performance expert specializing in the Godspeed Framework and its 'better-auth' library.
Your task is to analyze the following 'better-auth' JSON configuration and provide actionable suggestions for improvement.

Focus on the following areas:
1.  **Security:** Identify potential vulnerabilities (e.g., weak session secrets, insecure cookie settings, missing production-ready settings).
2.  **Best Practices:** Suggest improvements based on established best practices (e.g., using environment variables for secrets, appropriate session duration).
3.  **Completeness:** Point out any missing but recommended configuration options.

Present your findings as a concise list of suggestions in plain text. Do not use any markdown formatting (like ** for bolding, or * for list items).
If the configuration is already excellent, provide a confirmation that it follows best practices.

Configuration to analyze:
\`\`\`json
{{config}}
\`\`\`

Your response must be a clear, helpful set of suggestions formatted as a single string, using only plain text.
`,
});

const suggestConfigImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestConfigImprovementsFlow',
    inputSchema: SuggestConfigImprovementsInputSchema,
    outputSchema: SuggestConfigImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
