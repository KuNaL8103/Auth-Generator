'use server';

/**
 * @fileOverview A flow to generate Godspeed API routes for authentication based on a Better Auth configuration.
 *
 * - generateApiRoutes - A function that generates the API routes.
 * - GenerateApiRoutesInput - The input type for the generateApiRoutes function.
 * - GenerateApiRoutesOutput - The return type for the generateApiRoutes function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const GenerateApiRoutesInputSchema = z.object({
  authConfig: z
    .string()
    .describe("A JSON string representing the Better Auth configuration."),
  outputPath: z.string().describe('The file path where the generated code should be saved.'),
});
export type GenerateApiRoutesInput = z.infer<typeof GenerateApiRoutesInputSchema>;

const GenerateApiRoutesOutputSchema = z.object({
  generatedCode: z.string().describe('The generated Godspeed API route code.'),
});
export type GenerateApiRoutesOutput = z.infer<typeof GenerateApiRoutesOutputSchema>;

export async function generateApiRoutes(input: GenerateApiRoutesInput): Promise<GenerateApiRoutesOutput> {
  return generateApiRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateApiRoutesPrompt',
  input: {schema: GenerateApiRoutesInputSchema},
  output: {schema: GenerateApiRoutesOutputSchema},
  prompt: `You are an expert in integrating Better Auth with Godspeed Framework.

  Based on the provided Better Auth configuration, generate the Godspeed API routes.
  The generated code should be compatible with Node.js and Express.

  Better Auth Configuration:
  {{authConfig}}

  Output File Path:
  {{outputPath}}

  Ensure the generated code includes all necessary imports, middleware, and route handlers for authentication.
  Provide the complete code, including any necessary comments for explanation.
  Follow Godspeed's conventions and best practices.
  The configuration is JSON so the keys can be accessed in the handlebars template.
  For example, you can use {{authConfig.providers}} to access the list of providers.
  If the authConfig specifies social providers such as Google, Facebook, etc, make sure to generate a route for each one.
  The generated code should be production ready.
  For example, never log passwords and API keys.
  Assume the routes will be saved in a file named "auth.ts".
  Assume the authentication logic must be implemented inside routes and is based on Better Auth.
  Do not include any UI code.
  Only include Node.js + Express backend code.
  The user will use this code to handle authentication using Better Auth.
  Make sure to use the better-auth library to handle authentication.
  Import the required modules from better-auth.

  Generated Code:`,
});

const generateApiRoutesFlow = ai.defineFlow(
  {
    name: 'generateApiRoutesFlow',
    inputSchema: GenerateApiRoutesInputSchema,
    outputSchema: GenerateApiRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
