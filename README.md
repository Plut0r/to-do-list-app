# 🧩 To-Do List App with 3D Feedback

A sleek task management interface built with **Next.js**, featuring interactive drag-and-drop functionality and a dynamic 3D cube powered by **React Three Fiber**. This project uses static data and focuses on visual feedback and smooth UI interactions.

---

## ✨ Core Features

- 🗂️ **Kanban Board** — Tasks organized into "To Do", "In Progress", and "Done"
- 🎯 **Drag & Drop** — Move tasks between columns with fluid transitions
- ✅ **Progress Bar** — Automatically turns green when a task is marked as "Done"
- 🎲 **3D Cube Widget** — Rotates, floats, and changes color based on drag state
- 🌗 **Theme Support** — Toggle between light and dark modes

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit the app
http://localhost:3000

```

## 🛠️ Technology Stack

- **Next.js** - React framework with App Router
- **React Three Fiber** - 3D graphics library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **@hello-pangea/dnd** - Drag and drop functionality
- **shadcn/ui** - Accessible components


## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── shared/            # Reusable components
│   ├── tasks/             # Task-related components
│   └── ui/                # UI component library
├── contexts/
│   └── theme-manager.tsx  # Theme context
├── lib/
│   └── utils.ts           # Utilities and color system
└── constants/
    └── data.ts            # Static data
```
