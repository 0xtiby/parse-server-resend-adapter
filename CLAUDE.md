# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript package for a Parse Server Resend adapter. The project follows a simple single-file architecture pattern and is built as a dual-format package (CommonJS and ESM) using tsup.

## Development Commands

- **Build**: `npm run build` - Uses tsup to build both CommonJS and ESM formats with TypeScript declarations
- **Test**: Tests are not currently configured (placeholder script exits with error)

## Code Architecture

- **Main entry point**: `src/index.ts` - Contains the primary `YourClass` export
- **Build configuration**: `tsup.config.ts` - Configured for dual format output (CJS/ESM) with sourcemaps and TypeScript declarations
- **TypeScript**: Standard configuration targeting ES2016 with strict mode enabled

## Package Structure

- Single source file architecture in `src/`
- Outputs to `dist/` directory with multiple formats
- Uses semantic-release for automated versioning and publishing
- Built with TypeScript and bundled with tsup

## Key Implementation Notes

- The main class `YourClass` appears to be template/placeholder code that should be replaced with actual Resend adapter implementation
- Package is set up for NPM publishing with proper dual-format exports
- No testing framework is currently configured