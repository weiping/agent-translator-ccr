# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2025-07-07
### Added
- Implemented tool support for reading local files and fetching web content.
- Created two new tools: `readFileTool` and `fetchUrlTool`.
- Updated the chat component to handle tool calls and display tool results.
- Enhanced the system prompt to make the AI aware of its new tool capabilities.

### Fixed
- Resolved build errors related to module imports and TypeScript types.
- Corrected the property name for controlling tool execution loops in the AI SDK.

## [0.2.0] - 2025-07-07
### Added
- Integrated with the Anthropic AI SDK to connect with a Large Language Model.
- Implemented a utility for creating and managing the language model instance.
- Added loading, success, and error states to the status bar.
- Set up environment variable handling with `.env` and `dotenv`.

## [0.1.0] - 2025-07-07
### Added
- Basic chat interface with welcome message, message history, input field, and status bar.
- Implemented components for each UI section: `Welcome`, `History`, `Input`, and `Status`.
- Added state management for message history.

### Fixed
- Resolved a React key warning by ensuring unique IDs for messages.
- Handled terminal environments that do not support raw mode.

## [0.0.1] - 2025-07-07
### Added
- Initial project structure for Translator Agent.
- Basic CLI setup with TypeScript, React, and Ink.
- Welcome message UI.
