# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm start` — dev server (opens browser)
- `pnpm build` — production build
- No tests configured

## Architecture

React 18 bingo board app (mobile-only). Single `Card` component renders a 5x5 grid from a JSON data file. State persisted to `localStorage`.

To change the active card, update the import in `src/js/components/Card.jsx` to a different file from `src/js/data/`.

JSON card format: `TITLE` (string), `TEXTS` (24+ square labels), `FREE` (center square). Squares ending in `.jpg` render as images from `src/img/`.
