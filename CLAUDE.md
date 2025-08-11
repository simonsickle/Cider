# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cider is a cross-platform Apple Music client built with Electron, Vue.js 2, and TypeScript. The project has been archived and is no longer actively maintained.

## Build Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Build TypeScript and compile LESS
npm run build

# Run the application
npm run start

# Build distributables
npm run dist          # Current platform
npm run dist:win      # Windows
npm run dist:linux    # Linux
npm run dist:all      # Windows and Linux

# Format code
npm run format:check  # Check formatting
npm run format:write  # Auto-format code
```

## Architecture

### Core Structure

- **Electron Main Process** (`src/main/`)
  - Entry point: `src/main/index.ts`
  - Core modules in `src/main/base/`:
    - `app.ts` - App lifecycle and event handling
    - `browserwindow.ts` - Window management and Express server for renderer
    - `plugins.ts` - Plugin system loader
    - `store.ts` - Electron Store configuration
    - `wsapi.ts` - WebSocket API for client communication
    - `utils.ts` - Utility functions

- **Renderer Process** (`src/renderer/`)
  - Vue.js 2 application with EJS templates
  - Main app logic in `src/renderer/main/`
  - Views in `src/renderer/views/` (EJS templates)
  - Audio processing in `src/renderer/audio/`
  - Themes in `src/renderer/themes/` (LESS files)

- **Plugins** (`src/main/plugins/`)
  - Discord RPC, Last.fm, MPRIS, Chromecast support
  - Loaded dynamically by the plugin system
  - User plugins can be placed in `userData/Plugins`

### Key Technologies

- **Build System**: TypeScript compiled to `build/` directory
- **Styling**: LESS preprocessor for styles
- **Templates**: EJS for view templates
- **State Management**: Vuex for Vue state
- **IPC**: Electron IPC for main-renderer communication
- **Audio**: Web Audio API with spatial audio support

### Important Patterns

- Plugins extend functionality through a class-based system
- Express server runs on dynamic port for serving renderer content
- WebSocket API enables real-time communication
- Store uses electron-store for persistent configuration
- Translation system using Crowdin OTA client

## Development Notes

- Development mode detected via `!app.isPackaged`
- User data stored in different paths for dev vs production
- Vue DevTools automatically loaded in development
- Source maps enabled for debugging