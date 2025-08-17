# SmoothChat

A modern, animated chat UI built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (utility-first, themeable, responsive)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) (for smooth transitions and morphing effects)
- **UI Components:** Custom components, Radix UI primitives, and Lucide React icons
- **State Management:** React Context (for chat state)
- **TypeScript:** Full type safety

# Folder Structure

```
chatsmooth/
│
├── ChatSmooth_Grinning/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatDock.tsx
│   │   │   │   ├── ChatMessages.tsx
│   │   │   │   ├── dummymessage.ts
│   │   │   │   ├── ChatHeader/
│   │   │   │   │   └── ChatHeader.tsx
│   │   │   │   ├── ChatBackground/
│   │   │   │   │   └── ChatBackground.tsx
│   │   │   │   ├── ChatToggleButton.tsx
│   │   │   │   ├── input/
│   │   │   │   │   └── input.tsx
│   │   │   ├── ui/
│   │   │   │   ├── card.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── select.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   │   └── use-mobile.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── pages/
│   │       └── index.tsx
│   └── README.md
└── ...
```

## Features

- Animated chat dock that morphs between a full-width bottom bar (Home) and a compact sidebar (Secondary page)
- Smooth fade and morph transitions between layouts using Framer Motion
- Minimized state for the chat dock on secondary pages, with animated expand/collapse
- Responsive and accessible design
- Theming via CSS variables and Tailwind config

## Technical Requirements

- **Framework:** Next.js
- **Styling:** Tailwind CSS (chosen for rapid prototyping, theming, and utility-first workflow; easy to maintain and extend)
- **Animation:** Framer Motion (for declarative, interruptible, and performant UI transitions)
- **Server:** The development server runs on port **8080** (see `package.json` or your Next.js config for custom port setup)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server on port 8080:
   ```bash
   npm run dev -- -p 8080
   # or
   next dev -p 8080
   ```
3. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Deployed on vercel

Depolyment: [Link](https://chat-smooth-grinning-mq8j.vercel.app/)

## Why Tailwind CSS?

- Utility-first for rapid UI development
- Easy to theme with CSS variables (see `tailwind.config.ts`)
- Responsive, accessible, and maintainable

## Why Framer Motion?

- Declarative animation API
- Supports complex morphing and fade transitions
- Integrates seamlessly with React and Next.js

---
