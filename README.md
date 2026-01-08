# 🎯 BWG 60-Day Accountability Sprint

A personal accountability app designed to help you stay consistent for 60 days and reach your goals. Built with React, powered by determination.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite) ![License](https://img.shields.io/badge/License-MIT-green)

**[Live Demo](https://134ch.github.io/bwg-accountability/)**

---

## 💡 The Philosophy

> *"I am not saying I am trying my best. I am saying I will do whatever it takes so only one outcome is the possible outcome."*

This app was built on a simple principle:

- **Work as hard as possible** to reach your daily goal
- **Rest and repeat** 
- **Iterate** until you finally reach the vision you had when you started

**When do you fail?** You only fail if you stop completely.

---

## 📖 My Story

I'm not a developer. I'm someone who wanted to land my first client within 60 days.

I realized that the gap between where I was and where I wanted to be wasn't talent or luck—it was **consistency**. The people who succeed are the ones who show up every single day, do the work, and don't stop.

But consistency is hard. Life gets in the way. Motivation fades. Some days you just don't feel like it.

So I built this app to hold myself accountable.

**Why 60 days?** Because habits take time to form. Because meaningful change doesn't happen overnight. Because I wanted a finish line close enough to feel real, but far enough to demand commitment.

**Why share it?** Because maybe you're like me. Maybe you have a goal that feels impossibly far away. Maybe you've started things before and stopped. Maybe you need something—anything—to help you stay on track.

This app won't do the work for you. But it will remind you what you committed to. It will show you your streak. It will celebrate when you complete the day. And it will be waiting for you tomorrow.

**The irony?** Building this app felt like "productive procrastination"—working on the tool instead of doing the actual work. But after finishing it, I realized: the tool was never the point. **Using it** is the point. **Showing up every day** is the point.

If you're reading this, stop perfecting. Stop planning. Start doing.

I'll see you on Day 60.

---

## ⚠️ Before You Start — Important Notes

### 🔒 Your Data Stays With You
This app uses **your browser's local storage (localStorage + IndexedDB)** to save all data. I don't have a server. I don't collect anything. Your progress, streaks, and reflections exist only on your device.

**This means:**
- ✅ Complete privacy — your data never leaves your browser
- ✅ Works offline after first load
- ⚠️ Data is tied to the specific browser + device you use
- ⚠️ Clearing browser data will delete your progress

### 💻 Choose Your Primary Device
Since data is stored in your browser, **use this app on your preferred device** — the one you'll access every day. Whether that's your phone, laptop, or PC, pick one and stick with it. Your progress won't sync across devices.

### 🔄 Use a Separate Browser Profile (Recommended)
To avoid accidental data loss (like when you clear cookies or cache), consider:
- Creating a **dedicated browser profile** just for this app
- Or using a different browser than your main one (e.g., Firefox for daily browsing, Chrome for this app)

This protects your 60-day streak from being wiped out by routine browser cleanup.

### 🎯 Set Realistic Expectations

**This app is a tool, not magic.** It will:
- ✅ Show you what to do each day (after you edit the tasks)
- ✅ Track your streaks and progress
- ✅ Remind you of yesterday's unfinished tasks
- ✅ Celebrate your daily wins

It will NOT:
- ❌ Do the work for you
- ❌ Send push notifications (it's a web app)
- ❌ Sync across devices or browsers
- ❌ Survive if you clear all browser data

**The app is only as useful as your commitment to open it every day and complete the tasks.**

---

## ✨ What This App Does

### 🗓️ 60-Day Sprint System
- Pre-defined daily tasks for each day of your 60-day journey
- Three phases: **Foundation** (Days 1-20), **Momentum** (Days 21-40), **Acceleration** (Days 41-60)
- Progressive task difficulty that builds on previous days

### 📊 Progress Tracking
- **Daily progress bar** - Visual completion percentage
- **Streak counter** - Track consecutive days of completion
- **Weekly calendar** - See your last 7 days at a glance
- **Goal countdown** - Days remaining until your milestone

### ⏱️ Task Timer System
- Built-in countdown timer for each task
- Buffer time automatically added (because tasks always take longer!)
- Audio alerts when timer expires
- Time tracking history to improve estimates

### 🎉 Motivation Features
- **Celebration animation** when you complete all daily tasks
- **Carryover reminders** - Yesterday's incomplete tasks can be added to today
- **Motivational messages** based on your streak length
- **Phase-specific guidance** for each stage of the journey

### 💾 Data Persistence
- **Dual storage**: IndexedDB (permanent) + localStorage (fast)
- Survives browser cache clears
- Weekly reflection prompts
- Soft reset (cache only) vs Hard reset (everything)

### 📱 Beautiful UI
- Dark theme with orange/green energy accents
- Glassmorphism design
- Fully responsive - works on desktop and mobile
- Smooth animations and micro-interactions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/134ch/bwg-accountability.git
cd bwg-accountability

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173/bwg-accountability/](http://localhost:5173/bwg-accountability/) in your browser.

---

## 🎨 Customize for Your Goals

### Edit Daily Tasks

Tasks are defined in `src/utils/dayFocus.js`. Each day has a phase, focus area, and specific tasks:

```javascript
{
  dayNumber: 1,
  phase: 'Foundation',
  focus: 'Setup infrastructure',
  tasks: [
    {
      id: 'task-1',
      name: 'Your task here',
      estimatedMinutes: 15,
      link: 'https://optional-resource.com',
      linkLabel: 'Resource'
    }
  ]
}
```

### Edit Quick Links

Quick access links are in `src/utils/quickLinks.js`:

```javascript
export const quickLinks = [
  { id: 'notion', name: 'Notion', url: 'https://notion.so', icon: 'FileText' },
  // Add your tools...
];
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 6 | Build tool & dev server |
| Lucide React | Beautiful icons |
| Tone.js | Celebration sounds |
| IndexedDB + localStorage | Hybrid data persistence |
| CSS Variables | Custom design system |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Celebration.jsx       # Confetti & sound on completion
│   ├── CarryoverReminder.jsx # Yesterday's incomplete tasks
│   ├── ProgressBar.jsx       # Daily progress visualization
│   ├── ResetDataModal.jsx    # Soft/Hard reset options
│   ├── WeeklyCalendar.jsx    # 7-day completion view
│   └── FutureStartTimer.jsx  # Countdown to start date
├── hooks/
│   └── useTimer.js           # Task timer logic
├── styles/
│   ├── index.css             # Design system & utilities
│   └── App.css               # App-specific styles
├── utils/
│   ├── dayFocus.js           # 60 days of task definitions
│   ├── quickLinks.js         # Quick access links
│   ├── storage.js            # Data persistence helpers
│   └── storage-service.js    # IndexedDB + localStorage hybrid
├── App.jsx                   # Main application
└── main.jsx                  # Entry point
```

---

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

> **Note:** Update the `homepage` field in `package.json` with your GitHub username before deploying.

---

## 🤝 Contributing

This is a personal accountability project, but if you find it useful:

1. Fork the repository
2. Customize tasks in `dayFocus.js` for your goals
3. Make it yours!

---

## 📄 License

MIT License - Use this for your own accountability journey.

---

## 🙏 Acknowledgments

Built with the help of AI coding assistants. The future of development is collaborative - humans providing vision and direction, AI helping with implementation.

---

<div align="center">

### The only way to fail is to stop completely.

**Stay consistent. Build momentum. Achieve your vision.** 🎯

</div>
