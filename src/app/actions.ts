'use server';

import {
    generateApiRoutes,
    type GenerateApiRoutesInput,
  } from '../ai/flows/generate-api-routes';
import {
  suggestConfigImprovements,
  type SuggestConfigImprovementsInput,
} from '../ai/flows/suggest-config-improvements';

export async function handleGenerateRoutesAction(
  input: GenerateApiRoutesInput
): Promise<{ data?: string; error?: string }> {
  if (!input.authConfig) {
    return { error: 'Configuration cannot be empty.' };
  }
  if (!input.outputPath) {
    return { error: 'Output path cannot be empty.' };
  }
  try {
    JSON.parse(input.authConfig);
  } catch (e) {
    return { error: 'Invalid JSON format in configuration.' };
  }

  try {
    const result = await generateApiRoutes({
      authConfig: input.authConfig,
      outputPath: input.outputPath,
    });
    return { data: result.generatedCode };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate API routes. Please try again.' };
  }
}

export async function handleSuggestImprovementsAction(
  input: SuggestConfigImprovementsInput
): Promise<{ data?: string; error?: string }> {
  if (!input.config) {
    return { error: 'Configuration cannot be empty.' };
  }
  try {
    JSON.parse(input.config);
  } catch (e) {
    return { error: 'Invalid JSON format in configuration.' };
  }

  try {
    const result = await suggestConfigImprovements({ config: input.config });
    return { data: result.suggestions };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to analyze configuration. Please try again.' };
  }
}
