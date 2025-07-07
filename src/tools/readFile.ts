import { z } from 'zod';
import { tool } from 'ai';
import { promises as fs } from 'fs';

export const readFileTool = tool({
  description: 'Read a local text file.',
  parameters: z.object({
    path: z.string().describe('The path to the file to read.'),
  }),
  execute: async ({ path }) => {
    try {
      const content = await fs.readFile(path, 'utf-8');
      return {
        filename: path,
        content,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
});
