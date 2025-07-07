# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This project is a command-line interface (CLI) translation tool built with Node.js, TypeScript, React, and Ink. It provides an interactive terminal interface for translating text, files, and web pages.

## Tech Stack

-   **Language**: TypeScript
-   **UI**: React + Ink
-   **AI**: Anthropic AI SDK
-   **Runtime**: Node.js v20+
-   **Web Scraping**: `cheerio`, `turndown`

## Project Structure

-   `src/cli.tsx`: The main entry point of the CLI application. It uses Ink to render the React tree.
-   `src/app.tsx`: The root React component.
-   `src/components/`: Contains all the React components for the UI.
-   `src/hooks/`: Contains custom React hooks.
-   `src/tools/`: Contains tool definitions for use with the AI SDK.
-   `src/utils/`: Contains utility functions.

## Development

-   **Run in development mode**: `npm run dev`
-   **Build for production**: `npm run build`
-   **Run production build**: `npm start`
-   **Execute TypeScript directly**: `npx tsx src/cli.tsx`

## Important

-   After each feature update, update `CHANGELOG.md`.
-   After each update, commit the changes to Git. The commit message should include the original prompt.
