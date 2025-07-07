import { z } from 'zod';
import { tool } from 'ai';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';

const turndownService = new TurndownService();

export const fetchUrlTool = tool({
  description: 'Fetch the content of a URL and convert it to Markdown.',
  parameters: z.object({
    url: z.string().describe('The URL to fetch.'),
  }),
  execute: async ({ url }) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const title = $('title').text();
      const content = turndownService.turndown(html);

      return {
        url,
        title,
        content,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
});
