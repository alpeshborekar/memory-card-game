# Memory — Card Matching Game

A production-quality memory card matching game built with React, Tailwind CSS, and Framer Motion.

## Features

- **4×4 grid** — 16 cards, 8 matching pairs
- **3 difficulty levels** — Easy (1.2s), Medium (0.8s), Hard (0.5s) flip-back delay
- **Live stats** — move counter, timer, matched pairs
- **Personal bests** — stored per difficulty in localStorage
- **Victory modal** — completion time, total moves, new best indicator + confetti
- **Smooth animations** — CSS 3D card flips, Framer Motion entrance animations
- **Keyboard accessible** — full keyboard navigation, ARIA roles
- **Responsive** — works from 320px wide to desktop

## Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Utility styling |
| Framer Motion | Entrance animations, modal transitions |
| Lucide React | Card icons |
| canvas-confetti | Victory celebration |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/     # UI components (Header, GameBoard, MemoryCard, WinModal…)
├── hooks/          # useMemoryGame, useTimer
├── utils/          # shuffle, storage, helpers
├── constants/      # gameConfig (difficulty settings, grid size)
├── data/           # card definitions (icon, label, color)
└── styles/         # global CSS + Tailwind config
```

## Design Principles

- **No gradients** — flat colors, texture through whitespace
- **Earthy palette** — `#F8F5F0` background, `#D97757` accent, `#7BAE7F` success
- **Geist typeface** — clean, editorial feel
- **Reduced motion** — respects `prefers-reduced-motion`
