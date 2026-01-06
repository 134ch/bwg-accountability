# BWG Daily Task Accountability

A beautiful, modern React-based daily task accountability app to track your goals, build consistent habits, and stay accountable every day.

![BWG Accountability](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎯 **Daily Task Tracking** - Check off tasks as you complete them
- ⏱️ **Built-in Timer Support** - Each task has an estimated duration
- 📊 **Progress Visualization** - Beautiful progress ring shows daily completion
- 💾 **Automatic Persistence** - Data saved to localStorage, persists across sessions
- 🌙 **Stunning Dark Theme** - Modern glassmorphism design with gradient accents
- 📱 **Fully Responsive** - Works perfectly on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bwg-accountability.git
cd bwg-accountability

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/bwg-accountability`

> **Note:** Before deploying, update the `homepage` field in `package.json` with your GitHub username.

## 🎨 Customize Your Tasks

Edit `src/utils/tasks.js` to customize your daily accountability tasks:

```javascript
export const defaultTasks = [
  {
    id: 1,
    name: "Morning Routine",
    description: "Complete morning habits",
    duration: 30,        // minutes
    icon: "Sunrise",     // lucide-react icon name
    category: "wellness" // category for color coding
  },
  // Add more tasks...
];
```

### Available Categories
- `wellness` - Green accent
- `productivity` - Purple accent  
- `growth` - Orange accent
- `creativity` - Pink accent
- `reflection` - Violet accent

### Available Icons
Browse all icons at [lucide.dev/icons](https://lucide.dev/icons)

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool & dev server
- **Lucide React** - Beautiful icons
- **CSS Variables** - Custom design system
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskList.jsx      # Task items with checkboxes
│   ├── ProgressRing.jsx  # Circular progress indicator
│   └── StatsCard.jsx     # Statistics display cards
├── styles/
│   ├── index.css         # Design system & utilities
│   └── App.css           # Component-specific styles
├── utils/
│   ├── tasks.js          # Task configuration
│   ├── timer.js          # Timer utilities
│   └── storage.js        # LocalStorage helpers
├── App.jsx               # Main application
└── main.jsx              # Entry point
```

## 📄 License

MIT License - feel free to use this for your own accountability journey!

---

**Stay accountable. Build habits. Achieve your goals.** 🎯
